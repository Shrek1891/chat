from django.db.models import Count
from django.shortcuts import render
from drf_spectacular.utils import extend_schema
from jsonschema import ValidationError
from rest_framework import viewsets, serializers, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from unicodedata import category
from server.models import Server
from server.serializer import ServerSerializer
from server.schema import list_server_docs
from django.shortcuts import get_object_or_404
from server.models import Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class CategoryListViewSet(viewsets.ViewSet):
    queryset = Category.objects.all()

    @extend_schema(
        responses=CategorySerializer,
    )
    def list(self, request):
        queryset = self.queryset
        serializer = CategorySerializer(queryset, many=True)
        return Response(serializer.data)


# Create your views here.
class ServerListViewSet(viewsets.ViewSet):
    queryset = Server.objects.all()

    # permission_classes = [IsAuthenticated]

    @list_server_docs
    def list(self, request):
        """
        List all servers.

        Query Parameters:
        - category: Filter by category name
        - qty: Limit number of servers
        - by_user: If true, filter servers by current user membership
        - by_server_id: Retrieve a specific server by ID

        Example:
        /api/server/select/?category=General&qty=10&by_user=true&by_server_id=1
        """
        queryset = self.queryset
        category = request.query_params.get('category')
        qty = request.query_params.get('qty')
        by_user = request.query_params.get('by_user') == 'true'
        by_server_id = request.query_params.get('by_server_id')
        with_num_members = request.query_params.get("with_num_members") == "true"
        if by_user and not request.user.is_authenticated:
            return Response({"detail": "Authentication credentials were not provided."}, status=401)
        if category is not None:
            queryset = self.queryset.filter(category__name=category)
        if by_user:
            user_id = request.user.id
            queryset = self.queryset.filter(members__id=user_id)
        try:
            self.queryset = self.queryset.filter(id=by_server_id)
            if not self.queryset.exists():
                raise ValidationError(detail=f"Server with id {by_server_id} not found")
        except ValueError:
            raise ValidationError(detail="Server value error")
        if qty:
            self.queryset = self.queryset[: int(qty)]
        if with_num_members:
            self.queryset = self.queryset.annotate(num_members=Count("member"))
        serializer = ServerSerializer(self.queryset, many=True, context={"num_members": with_num_members})
        return Response(serializer.data)


class ServerMemebershipViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def create(self, request, server_id):
        server = get_object_or_404(Server, id=server_id)

        user = request.user

        if server.member.filter(id=user.id).exists():
            return Response({"error": "User is already a member"}, status=status.HTTP_409_CONFLICT)

        server.member.add(user)

        return Response({"message": "User joined server successfully"}, status=status.HTTP_200_OK)

    @action(detail=False, methods=["DELETE"])
    def remove_member(self, request, server_id):
        server = get_object_or_404(Server, id=server_id)
        user = request.user
        if not server.member.filter(id=user.id).exists():
            return Response({"error": "User is not a member"}, status=status.HTTP_404_NOT_FOUND)
        if server.owner == user:
            return Response({"error": "Owners cannot be removed as a member"}, status=status.HTTP_409_CONFLICT)
        server.member.remove(user)
        return Response({"message": "User removed from server..."}, status=status.HTTP_200_OK)

    @action(detail=False, methods=["GET"])
    def is_member(self, request, server_id=None):
        server = get_object_or_404(Server, id=server_id)
        user = request.user

        is_member = server.member.filter(id=user.id).exists()

        return Response({"is_member": is_member})
