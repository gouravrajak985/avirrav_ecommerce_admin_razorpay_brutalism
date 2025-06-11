import { SignUp } from '@clerk/nextjs';
import Image from 'next/image';

export default function SignUpPage() {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-gray-50">
      {/* Left - SignUp Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Heading */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Our Platform!</h1>
            <p className="text-gray-600">Create your account to start managing your business</p>
          </div>

          {/* Clerk SignUp Card */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="m-10 mx-auto max-w-md">
              <SignUp />
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
              alt="Join our platform illustration"
              width={400}
              height={400}
              className="w-full h-auto mx-auto"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Start Your Journey
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Join thousands of businesses already using our platform to grow their online presence.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Easy Setup
              </div>
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                24/7 Support
              </div>
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                Secure Platform
              </div>
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                Free Trial
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}