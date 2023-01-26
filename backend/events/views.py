from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import EventSerializer
from .models import Event

# Create your views here.

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def events_list(request):
    if request.method == 'GET':
        events = Event.objects.filter(user_id=request.user.id)
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = EventSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)



