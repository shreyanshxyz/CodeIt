'use client';

import { Suspense } from 'react';
import { FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';

const AuthErrorContent = () => {
  const { useSearchParams, useRouter } = require('next/navigation');
  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams.get('error');

  const getErrorMessage = (errorCode?: string) => {
    switch (errorCode) {
      case 'OAuthAccountNotLinked':
        return 'This email is already linked to another account';
      case 'CredentialsSignin':
        return 'Invalid email or password';
      case 'EmailSignin':
        return 'Failed to sign in with email';
      case 'CallbackRouteError':
        return 'Error during authentication process';
      default:
        return 'An unexpected error occurred';
    }
  };

  return (
    <div className="min-h-screen bg-dark-layer-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-900/20 text-red-500 mb-4">
          <FaExclamationTriangle className="h-8 w-8" />
        </div>
        
        <h2 className="text-xl font-semibold text-gray-200 mb-2">Sign in error</h2>
        <p className="text-gray-400 mb-6">{getErrorMessage(error || undefined)}</p>

        <button
          onClick={() => router.push('/auth/signin')}
          className="inline-flex items-center px-4 py-2 border border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-300 bg-dark-layer-2 hover:bg-dark-layer-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <FaArrowLeft className="h-4 w-4 mr-2" />
          Try again
        </button>
      </div>
    </div>
  );
};

export default function AuthErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-dark-layer-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-900/20 text-red-500 mb-4">
            <FaExclamationTriangle className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-semibold text-gray-200 mb-2">Loading...</h2>
        </div>
      </div>
    }>
      <AuthErrorContent />
    </Suspense>
  );
}
