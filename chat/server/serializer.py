from rest_framework import serializers

from server.models import Server, Chanel


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chanel
        fields = '__all__'


class ServerSerializer(serializers.ModelSerializer):
    num_members = serializers.SerializerMethodField()
    chanel_server = ChannelSerializer(many=True)
    category = serializers.StringRelatedField()

    class Meta:
        model = Server
        exclude = ("member",)

    def get_num_members(self, obj):
        if hasattr(obj, "num_members"):
            return obj.num_members
        return None

    def to_representation(self, instance):
        data = super().to_representation(instance)
        num_members = self.context.get("num_members")
        if not num_members:
            data.pop("num_members", None)
        return data
