import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';

export default function SignInPage() {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-gray-50">
      {/* Left - SignIn */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Heading Section */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
            <p className="text-gray-600">Sign in to continue to your admin dashboard</p>
          </div>

          {/* Clerk SignIn Card */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm ">
            <div className="m-10 mx-auto max-w-md">
              <SignIn />
            </div>
          </div>
        </div>
      </div>

      {/* Right - Illustration */}
      <div className="hidden lg:flex w-1/2 items-center justify-center p-8 bg-gray-50">
        <div className="max-w-lg w-full text-center">
          <div className="mb-8">
            <Image
              src="/auth.svg"
              alt="Admin Dashboard Illustration"
              width={400}
              height={400}
              className="w-full h-auto mx-auto"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Powerful Admin Dashboard
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Manage your stores, products, orders, and customers with our comprehensive admin platform.
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Multi-store Support
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                Real-time Analytics
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}