import { Link } from '@tanstack/react-router';

export function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-auto">
      <div className="container mx-auto max-w-content px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} Vincenzo Pirozzi. Tutti i diritti riservati.
        </p>
        <nav className="flex items-center gap-4">
          <Link
            to="/"
            className="hover:text-foreground transition-colors"
          >
            About
          </Link>
          <a
            href="/feed.xml"
            className="hover:text-foreground transition-colors"
            rel="alternate"
            type="application/rss+xml"
          >
            RSS
          </a>
        </nav>
      </div>
    </footer>
  );
}
