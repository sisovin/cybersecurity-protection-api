import { useState } from 'react';
import axios from 'axios';

export default function UserDashboard() {
  const [data, setData] = useState('');
  const [encryptedData, setEncryptedData] = useState('');
  const [decryptedData, setDecryptedData] = useState('');
  const [message, setMessage] = useState('');

  const handleEncrypt = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/encrypt', { data });
      setEncryptedData(response.data.encrypted_data);
      setMessage('Data encrypted successfully');
    } catch (error) {
      setMessage('Error encrypting data');
    }
  };

  const handleDecrypt = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/decrypt', { encrypted_data: encryptedData });
      setDecryptedData(response.data.data);
      setMessage('Data decrypted successfully');
    } catch (error) {
      setMessage('Error decrypting data');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      <form onSubmit={handleEncrypt}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="data">
            Data to Encrypt
          </label>
          <input
            type="text"
            id="data"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Encrypt
        </button>
      </form>
      {encryptedData && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Encrypted Data</h2>
          <p>{encryptedData}</p>
        </div>
      )}
      <form onSubmit={handleDecrypt}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="encryptedData">
            Encrypted Data to Decrypt
          </label>
          <input
            type="text"
            id="encryptedData"
            value={encryptedData}
            onChange={(e) => setEncryptedData(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Decrypt
        </button>
      </form>
      {decryptedData && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Decrypted Data</h2>
          <p>{decryptedData}</p>
        </div>
      )}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
