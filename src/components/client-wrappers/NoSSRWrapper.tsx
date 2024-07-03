"use client"
import { ReactNode, useEffect, useState } from 'react';

const NoSSRWrapper = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <>{children}</>;
};

export default NoSSRWrapper;
