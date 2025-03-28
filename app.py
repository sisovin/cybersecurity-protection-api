from flask import Flask, request, jsonify
from cryptography.fernet import Fernet
from argon2 import PasswordHasher
import jwt
import pyotp
import redis
import os

app = Flask(__name__)

# Initialize Redis
redis_client = redis.StrictRedis(host='localhost', port=6379, db=0)

# Generate a secure encryption key (128 bytes)
def generate_encryption_key():
    return Fernet.generate_key()

# Load the encryption key
def load_encryption_key():
    return os.getenv('ENCRYPTION_KEY').encode()

# Encrypt data using Fernet
def encrypt_data(data, key):
    fernet = Fernet(key)
    return fernet.encrypt(data.encode())

# Decrypt data
def decrypt_data(encrypted_data, key):
    fernet = Fernet(key)
    return fernet.decrypt(encrypted_data).decode()

# Hash a password with Argon2
ph = PasswordHasher()

def hash_password(password):
    return ph.hash(password)

# Verify the hashed password
def verify_password(hashed_password, password):
    try:
        ph.verify(hashed_password, password)
        return True
    except:
        return False

# Generate OTP
def generate_otp(secret):
    totp = pyotp.TOTP(secret)
    return totp.now()

# Verify OTP
def verify_otp(secret, otp):
    totp = pyotp.TOTP(secret)
    return totp.verify(otp)

# Generate JWT token
def generate_jwt(payload, secret):
    return jwt.encode(payload, secret, algorithm='HS256')

# Verify JWT token
def verify_jwt(token, secret):
    try:
        return jwt.decode(token, secret, algorithms=['HS256'])
    except:
        return None

# User registration route
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    password = data['password']
    hashed_password = hash_password(password)
    mfa_secret = pyotp.random_base32()
    # Store user in Redis for faster access
    redis_client.set(username, hashed_password)
    return jsonify({"message": "User registered successfully"})

# User login route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']
    otp = data['otp']
    # Check Redis for user
    hashed_password = redis_client.get(username)
    if hashed_password and verify_password(hashed_password.decode(), password):
        # Verify OTP
        if verify_otp(mfa_secret, otp):
            token = generate_jwt({"username": username}, os.getenv('JWT_SECRET'))
            return jsonify({"message": "Login successful", "token": token})
    return jsonify({"message": "Invalid credentials"}), 401

# Encrypt data route
@app.route('/encrypt', methods=['POST'])
def encrypt():
    data = request.get_json()
    encrypted_data = encrypt_data(data['data'], load_encryption_key())
    return jsonify({"encrypted_data": encrypted_data})

# Decrypt data route
@app.route('/decrypt', methods=['POST'])
def decrypt():
    data = request.get_json()
    decrypted_data = decrypt_data(data['encrypted_data'], load_encryption_key())
    return jsonify({"data": decrypted_data})

if __name__ == '__main__':
    app.run(debug=True)
