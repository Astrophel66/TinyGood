from rest_framework import serializers
from .models import Completion
from dailyact.serializer import DailyActSerializer

class CompletionSerializer(serializers.ModelSerializer):
    act = DailyActSerializer(read_only=True)  # nested serializer
    
    class Meta:
        model = Completion
        fields = ['id', 'act', 'date']
        read_only_fields = ['date']