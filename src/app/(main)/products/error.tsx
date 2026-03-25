'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function Error() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 font-inter">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="text-6xl">⚡</div>
        <h1 className="text-2xl font-bold text-grey-950">Product Currently Unavailable</h1>
        <p className="text-grey-500 text-sm">
          We couldn&apos;t load this product right now. It may have been removed or there was a temporary issue.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 bg-primary text-white px-5 py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <ChevronLeft size={16} /> Back to Products
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center border border-grey-200 text-grey-700 px-5 py-2.5 rounded-md text-sm font-medium hover:bg-grey-100 transition-colors"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
