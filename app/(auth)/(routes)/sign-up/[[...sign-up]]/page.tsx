import { SignUp } from '@clerk/nextjs';
import Image from 'next/image';

export default function SignUpPage() {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-gray-50">
      {/* Left - SignUp Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Heading */}
          <div className="mb-8 text-center">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Our Platform!</h1>
              <p className="text-gray-600">Create your account to start managing your business</p>
            </div>
          </div>

          {/* Clerk SignUp */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <SignUp
              appearance={{
                elements: {
                  card: 'bg-transparent shadow-none border-0 p-0',
                  headerTitle: 'text-xl font-semibold text-gray-900 mb-2',
                  headerSubtitle: 'text-gray-600 mb-6',
                  formButtonPrimary: 'bg-blue-600 text-white border border-blue-600 rounded-md hover:bg-blue-700 transition-colors font-medium py-2.5 px-4',
                  formFieldInput: 'bg-white border border-gray-300 text-gray-900 rounded-md px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors',
                  formFieldLabel: 'font-medium text-gray-700 mb-1.5',
                  footerActionLink: 'font-medium text-blue-600 hover:text-blue-700 underline',
                  dividerLine: 'border-gray-200',
                  dividerText: 'bg-white text-gray-500 font-medium px-3',
                  socialButtonsBlockButton: 'bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium py-2.5',
                  identityPreviewText: 'text-gray-600',
                  identityPreviewEditButton: 'text-blue-600 hover:text-blue-700',
                  formResendCodeLink: 'text-blue-600 hover:text-blue-700 font-medium',
                  otpCodeFieldInput: 'border border-gray-300 rounded-md text-center font-mono',
                  alertText: 'text-red-600 bg-red-50 border border-red-200 rounded-md p-3',
                  phoneInputBox: 'border border-gray-300 rounded-md px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                },
                variables: {
                  colorPrimary: "#2563eb",
                  colorText: "#111827",
                  colorTextSecondary: "#6b7280",
                  colorBackground: "#ffffff",
                  colorInputBackground: "#ffffff",
                  colorInputText: "#111827",
                  borderRadius: "6px",
                  fontFamily: "system-ui, -apple-system, sans-serif"
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Right - Illustration */}
      <div className="hidden lg:flex w-1/2 items-center justify-center p-8 bg-gradient-to-br from-green-50 to-emerald-100">
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

      {/* Footer */}
      <footer className="absolute bottom-4 w-full text-center text-sm text-gray-500">
        <span className="font-semibold text-gray-900">Pugly</span> 
        <span className="mx-2">·</span> 
        <span>Powered by</span> 
        <span className="mx-1 font-semibold text-gray-900">Avirrav</span>
      </footer>
    </div>
  );
}