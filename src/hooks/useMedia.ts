import { useLayoutEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export default function useMedia() {
  const mobile = useMediaQuery({ query: '(max-width: 641px)' });
  const [isMobile, setIsMobile] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      setIsReady(true);
      setIsMobile(mobile);
    }
  }, [mobile]);

  return { isMobile, isReady };
}
