from rest_framework import serializers

from server.models import Server, Chanel


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chanel
        fields = '__all__'


class ServerSerializer(serializers.ModelSerializer):
    chanel_server = ChannelSerializer(many=True)
    number_of_members = serializers.SerializerMethodField()
    category = serializers.StringRelatedField()

    class Meta:
        model = Server
        fields = '__all__'

    def get_number_of_members(self, obj):
        return obj.members.count()

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['number_of_members'] = self.context.get('number_of_members')
        if representation['number_of_members'] is None:
            representation.pop('number_of_members', None)
        return representation
