import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FeatureTourOverlay } from './FeatureTourOverlay';
import { needsTour } from '../../auth/authStorage';

/** Global in-app product tour — portaled above the shell */
export function ProductTourHost() {
  const location = useLocation();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const bump = () => setTick((n) => n + 1);
    window.addEventListener('adgm-tour-start', bump);
    window.addEventListener('adgm-tour-complete', bump);
    return () => {
      window.removeEventListener('adgm-tour-start', bump);
      window.removeEventListener('adgm-tour-complete', bump);
    };
  }, []);

  if (!needsTour()) return null;

  return <FeatureTourOverlay key={`tour-${tick}-${location.pathname}`} />;
}
