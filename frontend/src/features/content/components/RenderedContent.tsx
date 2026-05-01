import { cn } from '@/lib/utils';

interface RenderedContentProps {
  html: string;
  className?: string;
}

/**
 * Renders server-sanitized HTML content from a note body.
 * Applies prose + font-serif typography classes.
 * The backend is responsible for sanitizing HTML before sending it to the client.
 */
export function RenderedContent({ html, className }: RenderedContentProps) {
  return (
    <div
      className={cn(
        'prose prose-stone dark:prose-invert max-w-none font-serif',
        'prose-headings:font-serif prose-headings:font-semibold',
        'prose-a:text-accent prose-a:no-underline hover:prose-a:underline',
        'prose-blockquote:border-l-accent prose-blockquote:font-serif prose-blockquote:italic',
        'prose-code:font-mono prose-code:text-sm',
        className
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
