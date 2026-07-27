from django.urls import reverse
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from rest_framework import status
from rest_framework.test import APITestCase

User = get_user_model()

class AuthTests(APITestCase):
    def setUp(self):
        self.register_url = reverse('auth_register')
        self.login_url = reverse('auth_login')
        self.profile_url = reverse('auth_profile')
        self.change_password_url = reverse('auth_change_password')
        self.forgot_password_url = reverse('auth_forgot_password')
        self.reset_password_url = reverse('auth_reset_password')
        self.verify_email_url = reverse('auth_verify_email')
        
        self.user_data = {
            "email": "test@example.com",
            "full_name": "Test User",
            "mobile_number": "1234567890",
            "password": "Password123!",
            "confirm_password": "Password123!",
            "accept_terms": True
        }

    def test_registration_success(self):
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().email, "test@example.com")
        self.assertFalse(User.objects.get().is_email_verified)

    def test_registration_validation_fails(self):
        # Mismatched passwords
        bad_data = self.user_data.copy()
        bad_data['confirm_password'] = 'Mismatch123!'
        response = self.client.post(self.register_url, bad_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('confirm_password', response.data)

        # Weak password (no number or special character)
        bad_data = self.user_data.copy()
        bad_data['password'] = 'password'
        bad_data['confirm_password'] = 'password'
        response = self.client.post(self.register_url, bad_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_email_verification(self):
        # Register user
        register_response = self.client.post(self.register_url, self.user_data, format='json')
        user = User.objects.get(email="test@example.com")
        
        # Verify email using generated link tokens
        uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)
        
        verify_response = self.client.post(self.verify_email_url, {
            "uidb64": uidb64,
            "token": token
        }, format='json')
        
        self.assertEqual(verify_response.status_code, status.HTTP_200_OK)
        user.refresh_from_db()
        self.assertTrue(user.is_email_verified)

    def test_login_and_jwt_profile_access(self):
        # Create user
        user = User.objects.create_user(
            email=self.user_data['email'],
            full_name=self.user_data['full_name'],
            mobile_number=self.user_data['mobile_number'],
            password=self.user_data['password']
        )
        
        # Login
        response = self.client.post(self.login_url, {
            "email": self.user_data['email'],
            "password": self.user_data['password']
        }, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
        self.assertEqual(response.data['user']['email'], self.user_data['email'])
        
        access_token = response.data['access']
        
        # Access profile without token (should fail)
        self.client.credentials()  # Clear credentials
        profile_fail_response = self.client.get(self.profile_url)
        self.assertEqual(profile_fail_response.status_code, status.HTTP_401_UNAUTHORIZED)
        
        # Access profile with token (should succeed)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
        profile_success_response = self.client.get(self.profile_url)
        self.assertEqual(profile_success_response.status_code, status.HTTP_200_OK)
        self.assertEqual(profile_success_response.data['full_name'], self.user_data['full_name'])

    def test_profile_update(self):
        user = User.objects.create_user(
            email=self.user_data['email'],
            full_name=self.user_data['full_name'],
            mobile_number=self.user_data['mobile_number'],
            password=self.user_data['password']
        )
        response = self.client.post(self.login_url, {
            "email": self.user_data['email'],
            "password": self.user_data['password']
        }, format='json')
        access_token = response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
        
        # Update profile
        update_data = {
            "full_name": "Updated Name",
            "mobile_number": "9876543210"
        }
        update_response = self.client.patch(self.profile_url, update_data, format='json')
        self.assertEqual(update_response.status_code, status.HTTP_200_OK)
        self.assertEqual(update_response.data['user']['full_name'], "Updated Name")
        self.assertEqual(update_response.data['user']['mobile_number'], "9876543210")

    def test_change_password(self):
        user = User.objects.create_user(
            email=self.user_data['email'],
            full_name=self.user_data['full_name'],
            mobile_number=self.user_data['mobile_number'],
            password=self.user_data['password']
        )
        response = self.client.post(self.login_url, {
            "email": self.user_data['email'],
            "password": self.user_data['password']
        }, format='json')
        access_token = response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
        
        # Change password
        change_data = {
            "old_password": self.user_data['password'],
            "new_password": "NewPassword123!",
            "confirm_password": "NewPassword123!"
        }
        change_response = self.client.post(self.change_password_url, change_data, format='json')
        self.assertEqual(change_response.status_code, status.HTTP_200_OK)
        
        # Try to log in with old password (should fail)
        self.client.credentials()
        login_old_response = self.client.post(self.login_url, {
            "email": self.user_data['email'],
            "password": self.user_data['password']
        }, format='json')
        self.assertEqual(login_old_response.status_code, status.HTTP_401_UNAUTHORIZED)
        
        # Try to log in with new password (should succeed)
        login_new_response = self.client.post(self.login_url, {
            "email": self.user_data['email'],
            "password": "NewPassword123!"
        }, format='json')
        self.assertEqual(login_new_response.status_code, status.HTTP_200_OK)

    def test_forgot_and_reset_password(self):
        user = User.objects.create_user(
            email=self.user_data['email'],
            full_name=self.user_data['full_name'],
            mobile_number=self.user_data['mobile_number'],
            password=self.user_data['password']
        )
        
        # Forgot password request
        forgot_response = self.client.post(self.forgot_password_url, {"email": self.user_data['email']}, format='json')
        self.assertEqual(forgot_response.status_code, status.HTTP_200_OK)
        self.assertIn('reset_link', forgot_response.data)
        
        reset_link = forgot_response.data['reset_link']
        # Extract token and uidb64 from simulated link: http://localhost:5173/reset-password?uidb64=<uidb64>&token=<token>
        query_params = reset_link.split('?')[1]
        params = dict(param.split('=') for param in query_params.split('&'))
        
        uidb64 = params['uidb64']
        token = params['token']
        
        # Reset password
        reset_response = self.client.post(self.reset_password_url, {
            "uidb64": uidb64,
            "token": token,
            "new_password": "NewPassword789!",
            "confirm_password": "NewPassword789!"
        }, format='json')
        
        self.assertEqual(reset_response.status_code, status.HTTP_200_OK)
        
        # Log in with new password
        login_response = self.client.post(self.login_url, {
            "email": self.user_data['email'],
            "password": "NewPassword789!"
        }, format='json')
        self.assertEqual(login_response.status_code, status.HTTP_200_OK)
