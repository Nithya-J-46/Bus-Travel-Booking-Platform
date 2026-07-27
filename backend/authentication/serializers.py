import re
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

def validate_strong_password(value):
    if len(value) < 8:
        raise serializers.ValidationError("Password must be at least 8 characters long.")
    if not re.search(r"[a-z]", value):
        raise serializers.ValidationError("Password must contain at least one lowercase letter.")
    if not re.search(r"[A-Z]", value):
        raise serializers.ValidationError("Password must contain at least one uppercase letter.")
    if not re.search(r"[0-9]", value):
        raise serializers.ValidationError("Password must contain at least one digit.")
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", value):
        raise serializers.ValidationError("Password must contain at least one special character.")
    return value

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'full_name', 'mobile_number', 'avatar', 'is_email_verified', 'date_joined', 'gender', 'date_of_birth', 'city', 'state', 'country', 'emergency_contact', 'language_preference', 'theme_preference', 'is_staff', 'points_balance')
        read_only_fields = ('id', 'email', 'is_email_verified', 'date_joined', 'is_staff', 'points_balance')

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_strong_password])
    confirm_password = serializers.CharField(write_only=True, required=True)
    accept_terms = serializers.BooleanField(required=True)

    class Meta:
        model = User
        fields = ('email', 'full_name', 'mobile_number', 'password', 'confirm_password', 'accept_terms')

    def validate_mobile_number(self, value):
        if not re.match(r"^\+?[0-9]{7,15}$", value):
            raise serializers.ValidationError("Enter a valid mobile number (e.g., +123456789 or 123456789).")
        if User.objects.filter(mobile_number=value).exists():
            raise serializers.ValidationError("A user with this mobile number already exists.")
        return value

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"confirm_password": "Passwords do not match."})
        if not attrs.get('accept_terms'):
            raise serializers.ValidationError({"accept_terms": "You must accept the terms and conditions."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        validated_data.pop('accept_terms')
        user = User.objects.create_user(
            email=validated_data['email'],
            full_name=validated_data['full_name'],
            mobile_number=validated_data['mobile_number'],
            password=validated_data['password']
        )
        return user

class UserProfileUpdateSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = User
        fields = ('full_name', 'mobile_number', 'avatar', 'gender', 'date_of_birth', 'city', 'state', 'country', 'emergency_contact', 'language_preference', 'theme_preference')

    def validate_mobile_number(self, value):
        user = self.context['request'].user
        if not re.match(r"^\+?[0-9]{7,15}$", value):
            raise serializers.ValidationError("Enter a valid mobile number.")
        if User.objects.filter(mobile_number=value).exclude(id=user.id).exists():
            raise serializers.ValidationError("A user with this mobile number already exists.")
        return value

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(required=True, write_only=True, validators=[validate_strong_password])
    confirm_password = serializers.CharField(required=True, write_only=True)

    def validate(self, attrs):
        if attrs['new_password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"confirm_password": "New passwords do not match."})
        return attrs

class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("No user is registered with this email address.")
        return value

class ResetPasswordSerializer(serializers.Serializer):
    token = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, write_only=True, validators=[validate_strong_password])
    confirm_password = serializers.CharField(required=True, write_only=True)

    def validate(self, attrs):
        if attrs['new_password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"confirm_password": "Passwords do not match."})
        return attrs

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        # Add user detail representation in the login response
        user_serializer = UserSerializer(self.user)
        data['user'] = user_serializer.data
        return data

from .models import Notification, RewardTransaction

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'
        read_only_fields = ['user', 'created_at']

class RewardTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = RewardTransaction
        fields = '__all__'
        read_only_fields = ['user', 'created_at']
