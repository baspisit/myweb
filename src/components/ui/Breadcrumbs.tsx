import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';

export function Breadcrumbs({ items }: { items: { label: string; path?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
        {items.map((item, index) => (
          <li className="flex items-center gap-2" key={`${item.label}-${index}`}>
            {index > 0 && <ChevronRightIcon aria-hidden="true" className="size-4 text-line" />}
            {item.path ? (
              <Link className="inline-flex items-center gap-1.5 transition hover:text-accent" to={item.path}>
                {index === 0 && <HomeIcon aria-hidden="true" className="size-4" />}{item.label}
              </Link>
            ) : <span aria-current="page" className="font-medium text-ink">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
