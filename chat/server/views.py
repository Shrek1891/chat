from django.shortcuts import render
from drf_spectacular.utils import extend_schema
from rest_framework import viewsets, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from unicodedata import category
from server.models import Server
from server.serializer import ServerSerializer
from server.schema import list_server_docs

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
    #permission_classes = [IsAuthenticated]

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
        if by_user and not request.user.is_authenticated:
            return Response({"detail": "Authentication credentials were not provided."}, status=401)
        if category is not None:
            queryset = self.queryset.filter(category__name=category)
        if qty is not None:
            queryset = self.queryset[: int(qty)]
        if by_user:
            user_id = request.user.id
            queryset = self.queryset.filter(members__id=user_id)
        if by_server_id is not None:
            try:
                queryset = self.queryset.get(id=by_server_id)
                if queryset.members.filter(id=request.user.id).exists():
                    queryset = [queryset]
                else:
                    raise Exception("You are not a member of this server")
            except Server.DoesNotExist:
                queryset = []
                return Response({"detail": "Server not found"}, status=404)
        number_of_members = queryset.count()
        serializer = ServerSerializer(queryset, many=True, context={'number_of_members': number_of_members})
        return Response(serializer.data)
