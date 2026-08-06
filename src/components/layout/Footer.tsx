import { Link } from 'react-router-dom';
import { Container } from './Container';
import { IndependentSiteNotice } from './IndependentSiteNotice';

export function Footer() {
  return <footer className="border-t border-line bg-surface py-10 sm:py-12"><Container><div className="flex flex-col justify-between gap-8 md:flex-row md:items-start"><div className="max-w-xl"><Link className="inline-flex items-center gap-2 font-semibold text-brand" to="/"><img alt="" className="size-7" src="/images/branding/ps-chemlab-mark.svg" />PS ChemLab</Link><div className="mt-4"><IndependentSiteNotice /></div></div><nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-muted"><Link className="hover:text-accent" to="/courses">Courses</Link><Link className="hover:text-accent" to="/software">Software</Link><Link className="hover:text-accent" to="/research">Research</Link><Link className="hover:text-accent" to="/about">About</Link></nav></div><div className="mt-8 border-t border-line pt-6 text-sm text-muted">© {new Date().getFullYear()} PS ChemLab</div></Container></footer>;
}
