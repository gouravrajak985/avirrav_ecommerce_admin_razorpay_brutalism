'use client';

import { useEffect, useState } from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/providers/theme-provider';
import { ToasterProvider } from '@/providers/toast-provider';
import { ModalProvider } from '@/providers/modal-provider';

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-gray-50">
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            <ToasterProvider />
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}