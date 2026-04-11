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
    

class HistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        completions = Completion.objects.filter(user=request.user).order_by('-date')
        serializer = CompletionSerializer(completions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class StreakView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        completions = Completion.objects.filter(
            user=request.user
        ).order_by('-date').values_list('date', flat=True)

        if not completions:
            return Response({"streak": 0}, status=status.HTTP_200_OK)

        streak = 0
        check_date = datetime.datetime.now(datetime.timezone.utc).date()

        for completion_date in completions:
            if completion_date.date() == check_date:
                streak += 1
                check_date -= datetime.timedelta(days=1)
            else:
                break

        return Response({"streak": streak}, status=status.HTTP_200_OK)