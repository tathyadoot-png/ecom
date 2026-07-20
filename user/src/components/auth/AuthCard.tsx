interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

// Shared centered, responsive shell for auth pages (login, register,
// and any future auth-adjacent page — forgot-password, etc.).
const AuthCard = ({ title, subtitle, children, footer }: AuthCardProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-md rounded-card border border-warm-beige/40 bg-cream p-8 shadow-medium sm:p-12">
        <div className="mb-9 text-center">
          <h1 className="font-heading text-4xl font-light text-text sm:text-5xl">{title}</h1>
          <span className="mx-auto mt-4 block h-px w-12 bg-accent" />
          {subtitle && (
            <p className="mt-4 font-body text-sm text-text/60">{subtitle}</p>
          )}
        </div>

        {children}

        {footer && (
          <div className="mt-7 text-center font-body text-sm text-text/60">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export { AuthCard };
