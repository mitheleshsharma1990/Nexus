'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function ModalPortal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Only render the portal if we are on the client
  return mounted
    ? createPortal(

      <div className="fixed inset-0 z-50 flex items-center justify-center">

        <div
          className="absolute inset-0  bg-black/50"
          onClick={onClose}
        >
        </div>
        <div className="relative z-10 w-full max-w-lg">
          {children}
        </div>
      </div>

      , document.body)
    : null;
}
