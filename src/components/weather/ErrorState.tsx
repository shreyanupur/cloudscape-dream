import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
  return (
    <div className="glass-card p-8 text-center">
      <AlertCircle className="w-16 h-16 mx-auto mb-4 text-destructive" />
      <h3 className="text-xl font-semibold mb-2">Something went wrong</h3>
      <p className="text-foreground/60 mb-6">{message}</p>
      <Button onClick={onRetry} variant="outline" className="gap-2">
        <RefreshCw className="w-4 h-4" />
        Try Again
      </Button>
    </div>
  );
};
