import unittest
from app import encrypt_data, decrypt_data, load_encryption_key

class TestEncryption(unittest.TestCase):

    def setUp(self):
        self.key = load_encryption_key()

    def test_encrypt_data(self):
        data = "sensitive_data"
        encrypted_data = encrypt_data(data, self.key)
        self.assertNotEqual(data, encrypted_data)

    def test_decrypt_data(self):
        data = "sensitive_data"
        encrypted_data = encrypt_data(data, self.key)
        decrypted_data = decrypt_data(encrypted_data, self.key)
        self.assertEqual(data, decrypted_data)

if __name__ == '__main__':
    unittest.main()
