import { render, screen } from '@testing-library/react'; import { LocaleProvider } from '@/app/providers/LocaleProvider';
describe('locale provider', () => { it('renders children', () => { render(<LocaleProvider><span>Locale ready</span></LocaleProvider>); expect(screen.getByText('Locale ready')).toBeInTheDocument(); }); });
