import { RefObject, useEffect } from 'react';

interface UseClickOutsideProps {
  ref: RefObject<HTMLElement>;
  handler: () => void;
  excludeSelector?: string;
}

export const useClickOutside = ({
  ref,
  handler,
  excludeSelector,
}: UseClickOutsideProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (
          !excludeSelector ||
          !(event.target as HTMLElement).closest(excludeSelector)
        ) {
          handler();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref, handler, excludeSelector]);
};
