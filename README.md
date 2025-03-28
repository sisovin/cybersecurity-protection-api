# Cybersecurity Protection for Restful API Endpoint

This project demonstrates how to write secure authentication code in Python using Argon2 for password hashing and 128-byte encryption using Fernet from the cryptography library. The project also integrates PostgreSQL (Drizzle ORM) for storage, Redis caching for faster access, and Multi-Factor Authentication (MFA) with OTP (One-Time Password).

## Setup and Run the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/githubnext/workspace-blank.git
   cd workspace-blank
   ```

2. Create a virtual environment and activate it:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install the dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the Flask application:
   ```bash
   flask run
   ```

## Dependencies

- cryptography
- argon2-cffi
- drizzle-orm
- redis
- pyjwt
- pyotp

To install the dependencies, run:
```bash
pip install -r requirements.txt
```

## Using the API Endpoints

### User Registration

- **Endpoint:** `/register`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "username": "example_user",
    "password": "example_password"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully"
  }
  ```

### User Login

- **Endpoint:** `/login`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "username": "example_user",
    "password": "example_password",
    "otp": "123456"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Login successful",
    "token": "jwt_token"
  }
  ```

### Encrypt Data

- **Endpoint:** `/encrypt`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "data": "sensitive_data"
  }
  ```
- **Response:**
  ```json
  {
    "encrypted_data": "encrypted_data"
  }
  ```

### Decrypt Data

- **Endpoint:** `/decrypt`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "encrypted_data": "encrypted_data"
  }
  ```
- **Response:**
  ```json
  {
    "data": "sensitive_data"
  }
  ```
