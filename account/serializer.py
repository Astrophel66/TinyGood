from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from .models import User
class RegisterSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'full_name', 'phone', 'password1', 'password2']
       
    def validate(self, attrs):
            if attrs['password1'] != attrs['password2']:
                raise serializers.ValidationError({'password': 'Passwords do not match'})
            return attrs
    def create(self, validated_data):
        validated_data.pop('password2')
        password = validated_data.pop('password1')
        user = User.objects.create(**validated_data)  # creates instance
        user.set_password(password)                    # hashes on instance
        user.save()                                    # saves to DB
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'email',
            'full_name',
            'phone',
            'bio',
            'profile_picture',
            'is_active',
            'is_staff',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['is_active', 'is_staff', 'created_at', 'updated_at']