import { Button } from '@/components/ui/Button';
export function CitationActions({ citation }: { citation: string }) { return <Button onClick={() => void navigator.clipboard.writeText(citation)}>Copy citation</Button>; }
