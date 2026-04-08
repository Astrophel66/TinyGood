from django.shortcuts import render
from rest_framework.views import APIView
from .serializer import RegisterSerializer, UserProfileSerializer
from rest_framework.response import Response 
from rest_framework import status
from .models import User
from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework.permissions import IsAuthenticated
# Create your views here.
class RegisterView(APIView):
    def post(self,request):
        serializer=RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "message": "User registered successfully",
            "user": UserProfileSerializer(user).data
        }, status=status.HTTP_201_CREATED)

class LoginView(APIView):

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        # 🔐 bcrypt password check
        if user.check_password(password):
            refresh = RefreshToken.for_user(user)
            return Response({
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                    "user": UserProfileSerializer(user).data
                }, status=status.HTTP_200_OK)
            

#         return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
# from rest_framework.permissions import AllowAny

# class ProfileView(APIView):

#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         serializer = UserProfileSerializer(request.user)
#         return Response(serializer.data, status=status.HTTP_200_OK)