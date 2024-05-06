import { RefObject, useEffect, useState } from 'react';

export default function useScroll(targetRef: RefObject<HTMLElement>) {
  const [pos, setPos] = useState<number | null>(null);

  useEffect(() => {
    function onScroll() {
      if (!targetRef.current) {
        return;
      }
      const viewportOffset = targetRef.current.getBoundingClientRect();
      const top = viewportOffset.top;
      setPos(top);
    }

    const options: any = { passive: true };

    window.addEventListener('scroll', onScroll, options);

    return () => {
      window.removeEventListener('scroll', onScroll, options);
    };
  }, [targetRef]);

  return { pos };
}
