/**
 * Synchro - Queue Page
 * Design Philosophy: Romantic Modernism
 * Shows queue message for unqualified applicants (no WhatsApp button)
 */

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useLocation } from 'wouter';

export default function QueuePage() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <Button
            variant="ghost"
            onClick={() => setLocation('/')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.nav.home}
          </Button>
          
          <h1 className="text-2xl font-bold text-primary">Synchro</h1>
          
          <div className="w-24" /> {/* Spacer for centering */}
        </div>
      </nav>

      {/* Queue Message Content */}
      <section className="flex-1 flex items-center justify-center pt-16 pb-20">
        <div className="container max-w-2xl">
          <div className="bg-card p-12 md:p-16 rounded-3xl shadow-2xl text-center fade-in-up">
            {/* Icon */}
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl mb-6">{t.queue.title}</h1>

            {/* Message */}
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              {t.queue.message}
            </p>

            {/* Note */}
            <div className="bg-muted/50 p-6 rounded-xl">
              <p className="text-sm text-muted-foreground">
                {t.queue.note}
              </p>
            </div>

            {/* Return Home Button */}
            <div className="mt-8">
              <Button
                variant="outline"
                onClick={() => setLocation('/')}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                {t.nav.home}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-card border-t border-border">
        <div className="container text-center text-sm text-muted-foreground">
          <p>{t.footer.copyright}</p>
        </div>
      </footer>
    </div>
  );
}
