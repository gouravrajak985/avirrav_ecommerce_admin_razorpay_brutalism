'use client';

import { useStoreModal } from '@/hooks/use-store-modal';
import { useEffect } from 'react';

export default function SetupPage() {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    // Check if it's a mobile device
    const userAgent = navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    
    // If mobile, redirect to mobile version after store creation
    if (isMobile && !isOpen) {
      onOpen();
    } else if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
}