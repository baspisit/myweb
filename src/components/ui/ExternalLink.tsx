import type { AnchorHTMLAttributes } from 'react';
export function ExternalLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) { return <a target="_blank" rel="noreferrer" className="text-brand underline decoration-transparent underline-offset-4 hover:decoration-current" {...props} />; }
