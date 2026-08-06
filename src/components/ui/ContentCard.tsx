import type { ElementType, PropsWithChildren } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export function ContentCard({
  children,
  className = '',
  as = 'article',
  interactive = false,
}: PropsWithChildren<{ className?: string; as?: ElementType; interactive?: boolean }>) {
  const reduceMotion = useReducedMotion();
  const Component = motion.create(as);
  return (
    <Component
      className={`rounded-card border border-line bg-surface p-6 shadow-card ${interactive ? 'transition-shadow hover:shadow-raised' : ''} ${className}`}
      whileHover={interactive && !reduceMotion ? { y: -3 } : undefined}
    >
      {children}
    </Component>
  );
}
