from django.urls import path
from .views import TodaysActView

urlpatterns = [
    path('today/', TodaysActView.as_view(), name='todays-act'),
]