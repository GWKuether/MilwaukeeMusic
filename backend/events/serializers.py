from rest_framework import serializers
from .models import Event

class EventSerializer(serializers.ModelSerializer):
    user_id_id = serializers.IntegerField(write_only = True)
    class Meta:
        model = Event
        fields = ['id', 'title', 'date', 'venue', 'user_id', 'user_id_id']
        depth = 1