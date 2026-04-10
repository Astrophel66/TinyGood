from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Completion
from dailyact.models import DailyAct
from .serializers import CompletionSerializer
import datetime

class CompleteActView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        today = datetime.date.today()

        # get today's act
        try:
            act = DailyAct.objects.get(date=today)
        except DailyAct.DoesNotExist:
            return Response({"error": "No act for today"}, status=status.HTTP_404_NOT_FOUND)

        # prevent duplicate completion
        already_done = Completion.objects.filter(user=request.user, act=act).exists()
        if already_done:
            return Response({"error": "Already completed today's act"}, status=status.HTTP_400_BAD_REQUEST)

        # create completion
        completion = Completion.objects.create(user=request.user, act=act)
        return Response({
            "message": "Great job! Act completed.",
            "completion": CompletionSerializer(completion).data
        }, status=status.HTTP_201_CREATED)