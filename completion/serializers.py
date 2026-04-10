from rest_framework import serializers
from .models import Completion

class CompletionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Completion
        fields = ['id', 'act', 'date']
        read_only_fields = ['date']