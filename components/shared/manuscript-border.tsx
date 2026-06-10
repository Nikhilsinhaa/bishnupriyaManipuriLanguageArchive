export function ManuscriptBorder({
  className = '',
  children,
  variant = 'top',
}: {
  className?: string;
  children?: React.ReactNode;
  variant?: 'top' | 'bottom' | 'both' | 'none';
}) {
  const topBorder = variant === 'top' || variant === 'both';
  const bottomBorder = variant === 'bottom' || variant === 'both';

  return (
    <div className={`relative ${className}`}>
      {topBorder && (
        <div className="flex items-center justify-center gap-4 py-6">
          <div className="h-px flex-1 bg-border" />
          <svg width="48" height="16" viewBox="0 0 48 16" fill="none" aria-hidden="true" className="text-primary/60">
            <circle cx="24" cy="8" r="3" fill="currentColor" />
            <path d="M4 8h14M30 8h14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
          <div className="h-px flex-1 bg-border" />
        </div>
      )}
      {children}
      {bottomBorder && (
        <div className="flex items-center justify-center gap-4 py-6">
          <div className="h-px flex-1 bg-border" />
          <svg width="48" height="16" viewBox="0 0 48 16" fill="none" aria-hidden="true" className="text-primary/60">
            <circle cx="24" cy="8" r="3" fill="currentColor" />
            <path d="M4 8h14M30 8h14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
          <div className="h-px flex-1 bg-border" />
        </div>
      )}
    </div>
  );
}
