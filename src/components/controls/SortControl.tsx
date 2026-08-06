import { Select } from '@/components/ui/Select';
export function SortControl({ value, onChange }: { value: string; onChange: (value: string) => void }) { return <Select aria-label="Sort" value={value} onChange={(event) => onChange(event.target.value)}><option value="newest">Newest</option><option value="title">Title</option></Select>; }
