import { useEffect, useState, type ImgHTMLAttributes, type ReactNode } from 'react';

export function OptionalImage({
  src,
  fallback,
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & { src: string; fallback: ReactNode }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  if (failed) return <>{fallback}</>;
  return <img src={src} onError={() => setFailed(true)} {...props} />;
}
