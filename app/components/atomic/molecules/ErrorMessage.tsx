import { Text, Card, Button } from "../atoms";

export interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

export default function ErrorMessage({ 
  title = "Something went wrong",
  message,
  onRetry,
  retryLabel = "Try again",
  className = '' 
}: ErrorMessageProps) {
  return (
    <Card variant="outlined" className={`border-red-200 bg-red-50 p-6 ${className}`}>
      <div className="text-center">
        <div className="mb-4">
          <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        </div>
        
        <Text as="h3" size="lg" weight="semibold" color="danger" className="mb-2">
          {title}
        </Text>
        
        <Text color="muted" className="mb-4">
          {message}
        </Text>
        
        {onRetry && (
          <Button onClick={onRetry} variant="primary">
            {retryLabel}
          </Button>
        )}
      </div>
    </Card>
  );
}