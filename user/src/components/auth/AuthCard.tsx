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
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md rounded-card bg-cream p-6 shadow-soft sm:p-10">
        <div className="mb-8 text-center">
          <h1 className="font-heading text-3xl text-text sm:text-4xl">{title}</h1>
          {subtitle && (
            <p className="mt-2 font-body text-sm text-text/60">{subtitle}</p>
          )}
        </div>

        {children}

        {footer && (
          <div className="mt-6 text-center font-body text-sm text-text/60">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export { AuthCard };
