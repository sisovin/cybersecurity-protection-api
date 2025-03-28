import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 p-4 mt-8">
      <div className="container mx-auto text-center text-white">
        <p>&copy; 2023 Cybersecurity Protection. All rights reserved.</p>
        <div className="mt-4">
          <Link href="/privacy-policy">
            <a className="text-blue-500 hover:underline">Privacy Policy</a>
          </Link>
          <span className="mx-2">|</span>
          <Link href="/terms-of-service">
            <a className="text-blue-500 hover:underline">Terms of Service</a>
          </Link>
        </div>
      </div>
    </footer>
  );
}
