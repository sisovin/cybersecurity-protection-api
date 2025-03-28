import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link href="/">
            <a>Cybersecurity Protection</a>
          </Link>
        </div>
        <div className="space-x-4">
          <Link href="/login">
            <a className="text-white hover:underline">Login</a>
          </Link>
          <Link href="/register">
            <a className="text-white hover:underline">Register</a>
          </Link>
          <Link href="/user-dashboard">
            <a className="text-white hover:underline">User Dashboard</a>
          </Link>
          <Link href="/admin-panel">
            <a className="text-white hover:underline">Admin Panel</a>
          </Link>
          <button
            onClick={toggleTheme}
            className="bg-gray-700 text-white px-3 py-2 rounded"
          >
            Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
        </div>
      </div>
    </nav>
  );
}
