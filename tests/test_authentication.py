import unittest
from app import app, hash_password, verify_password, generate_otp, verify_otp, generate_jwt, verify_jwt
from cache import set_cache, get_cache

class TestAuthentication(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_user_registration(self):
        response = self.app.post('/register', json={
            'username': 'test_user',
            'password': 'test_password'
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn('User registered successfully', response.get_data(as_text=True))

    def test_user_login(self):
        # Register user first
        self.app.post('/register', json={
            'username': 'test_user',
            'password': 'test_password'
        })
        # Generate OTP
        mfa_secret = 'JBSWY3DPEHPK3PXP'
        otp = generate_otp(mfa_secret)
        # Login user
        response = self.app.post('/login', json={
            'username': 'test_user',
            'password': 'test_password',
            'otp': otp
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn('Login successful', response.get_data(as_text=True))

    def test_hash_password(self):
        password = 'test_password'
        hashed_password = hash_password(password)
        self.assertTrue(verify_password(hashed_password, password))

    def test_generate_otp(self):
        mfa_secret = 'JBSWY3DPEHPK3PXP'
        otp = generate_otp(mfa_secret)
        self.assertTrue(verify_otp(mfa_secret, otp))

    def test_generate_jwt(self):
        payload = {'username': 'test_user'}
        secret = 'test_secret'
        token = generate_jwt(payload, secret)
        decoded_payload = verify_jwt(token, secret)
        self.assertEqual(decoded_payload['username'], 'test_user')

    def test_role_based_access_control(self):
        # This is a placeholder test. Implement role-based access control tests here.
        self.assertTrue(True)

if __name__ == '__main__':
    unittest.main()
