"use client";

// Fix linting issues in the success page
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { trackCoachRevenue } from '@/lib/stripe';

// Create a component that uses useSearchParams
function SuccessContent() {
  const searchParams = useSearchParams();
  const [downloadUrl, setDownloadUrl] = useState('');

  useEffect(() => {
    // Your existing useEffect code here
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      // Track coach revenue
      trackCoachRevenue(sessionId, 'paul_chelimo');

      // Set download URL
      setDownloadUrl('/downloads/CopyAthlete-Windows-Installer.exe');
    }
  }, [searchParams]);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Thank you for your purchase!</h1>
      <p className="mb-4">Your transaction was successful.</p>

      {downloadUrl && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Download Your Software</h2>
          <Link
            href={downloadUrl}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Download CopyAthlete
          </Link>
        </div>
      )}

      <div className="mt-12">
        <Link href="/" className="text-blue-600 hover:underline">
          Return to Home
        </Link>
      </div>
    </div>
  );
}

// Main component with Suspense boundary
export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
