import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export default authMiddleware({
  publicRoutes: [
    '/api/:path*/checkout',
    '/api/:path*/verify-payment',
    '/api/:path*',
    '/',
    '/mobile/:path*'
  ],
  beforeAuth: (req) => {
    // Check if it's a mobile device
    const userAgent = req.headers.get('user-agent') || '';
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    
    // If mobile and accessing desktop routes, redirect to mobile version
    if (isMobile && req.nextUrl.pathname.startsWith('/') && !req.nextUrl.pathname.startsWith('/api') && !req.nextUrl.pathname.startsWith('/sign-') && !req.nextUrl.pathname.startsWith('/mobile')) {
      const url = req.nextUrl.clone();
      // Only redirect if it's a store route (has UUID pattern)
      const storeIdMatch = url.pathname.match(/^\/([a-f0-9-]{36})/);
      if (storeIdMatch) {
        url.pathname = `/mobile${url.pathname}`;
        return NextResponse.redirect(url);
      }
    }
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};