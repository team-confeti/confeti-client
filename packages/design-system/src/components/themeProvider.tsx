import '../styles/reset.css';

export default function ThemeProvider({
  className,
  children,
}: {
  children: React.ReactNode;
  theme?: string;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
