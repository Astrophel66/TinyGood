from .models import DailyAct
from rest_framework import serializers

class DailyActSerializer(serializers.ModelSerializer):
    class Meta:
        model=DailyAct
        fields=[
            'id',
            'act',
            'date'
        ]
        read_only_fields=['act','date']