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
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
            <SignIn
              appearance={{
                elements: {
                  card: 'bg-transparent shadow-none border-0 p-0 w-full',
                  rootBox: 'w-full',
                  headerTitle: 'hidden',
                  headerSubtitle: 'hidden',
                  socialButtonsBlockButton: 'w-full bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium py-3 px-4 mb-3',
                  socialButtonsBlockButtonText: 'font-medium text-gray-700',
                  dividerLine: 'border-gray-200 my-6',
                  dividerText: 'bg-white text-gray-500 font-medium px-4',
                  formFieldRow: 'mb-4',
                  formFieldLabel: 'block font-medium text-gray-700 mb-2 text-sm',
                  formFieldInput: 'w-full bg-white border border-gray-300 text-gray-900 rounded-md px-3 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm',
                  formButtonPrimary: 'w-full bg-blue-600 text-white border border-blue-600 rounded-md hover:bg-blue-700 transition-colors font-medium py-3 px-4 mt-6',
                  footerActionLink: 'font-medium text-blue-600 hover:text-blue-700 underline text-sm',
                  identityPreviewText: 'text-gray-600 text-sm',
                  identityPreviewEditButton: 'text-blue-600 hover:text-blue-700 text-sm',
                  formResendCodeLink: 'text-blue-600 hover:text-blue-700 font-medium text-sm',
                  otpCodeFieldInput: 'border border-gray-300 rounded-md text-center font-mono py-3 px-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                  alertText: 'text-red-600 bg-red-50 border border-red-200 rounded-md p-3 text-sm mb-4',
                  formFieldSuccessText: 'text-green-600 text-sm mt-1',
                  formFieldErrorText: 'text-red-600 text-sm mt-1',
                  footer: 'mt-6 pt-6 border-t border-gray-200 text-center',
                },
                variables: {
                  colorPrimary: "#2563eb",
                  colorText: "#111827",
                  colorTextSecondary: "#6b7280",
                  colorBackground: "#ffffff",
                  colorInputBackground: "#ffffff",
                  colorInputText: "#111827",
                  borderRadius: "6px",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  spacingUnit: "1rem"
                }
              }}
            />
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