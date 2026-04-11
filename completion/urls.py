from django.urls import path
from .views import CompleteActView, HistoryView, StreakView
urlpatterns = [
    path('complete/', CompleteActView.as_view(), name='complete-act'),
    path('history/', HistoryView.as_view(), name='history'),
    path('streak/', StreakView.as_view(), name='streak'),

]