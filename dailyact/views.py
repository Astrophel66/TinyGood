import datetime
import requests

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .models import DailyAct
from .serializer import DailyActSerializer

from decouple import config


class TodaysActView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        today = datetime.date.today()

        try:
            act = DailyAct.objects.get(date=today)

        except DailyAct.DoesNotExist:
            # 🔥 Call Gemini API (FREE)
            url = f"https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key={config('GEMINI_API_KEY')}"

            data = {
                "contents": [
                    {
                        "parts": [
                            {
                                "text": "Give me one simple, specific kind act a person can do today. One sentence only. No explanation, no prefix, always specify the task , not generic"
                            }
                        ]
                    }
                ]
            }

            try:
                response = requests.post(url, json=data)
                result = response.json()

                act_text = result["candidates"][0]["content"]["parts"][0]["text"]

            except Exception:
                # fallback if API fails
                act_text = "Help someone without expecting anything in return."

            act = DailyAct.objects.create(date=today, act=act_text)

        serializer = DailyActSerializer(act)
        return Response(serializer.data, status=status.HTTP_200_OK)