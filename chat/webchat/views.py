from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from webchat.models import Conversation

from webchat.schema import list_message_docs

from webchat.serializers import MessageSerializer


# Create your views here.
class MessageListViewSet(viewsets.ViewSet):
    @list_message_docs
    def list(self, request):
        channel_id = request.query_params.get("channel_id")
        try:
            conversation = Conversation.objects.get(channel_id=channel_id)
            messages = conversation.message.all()
            serializer = MessageSerializer(messages, many=True)
            return Response(serializer.data)
        except Conversation.DoesNotExist:
            return Response({"error": "Conversation not found"}, status=404)
