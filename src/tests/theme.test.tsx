import { render, screen } from '@testing-library/react'; import { ThemeProvider } from '@/app/providers/ThemeProvider';
describe('theme provider', () => { it('renders children', () => { render(<ThemeProvider><span>Theme ready</span></ThemeProvider>); expect(screen.getByText('Theme ready')).toBeInTheDocument(); }); });
