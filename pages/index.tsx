import Link from 'next/link';
import '../styles/globals.css';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to Cybersecurity Protection</h1>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link href="/login">
              <a className="text-blue-500 hover:underline">Login</a>
            </Link>
          </li>
          <li>
            <Link href="/register">
              <a className="text-blue-500 hover:underline">Register</a>
            </Link>
          </li>
          <li>
            <Link href="/user-dashboard">
              <a className="text-blue-500 hover:underline">User Dashboard</a>
            </Link>
          </li>
          <li>
            <Link href="/admin-panel">
              <a className="text-blue-500 hover:underline">Admin Panel</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
