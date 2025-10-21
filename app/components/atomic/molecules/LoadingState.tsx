import { Spinner, Text, Card } from "../atoms";

export interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function LoadingState({ 
  message = "Loading...",
  size = 'md',
  className = '' 
}: LoadingStateProps) {
  return (
    <Card variant="filled" className={`text-center py-12 ${className}`}>
      <div className="flex flex-col items-center space-y-4">
        <Spinner size={size} color="primary" />
        <Text size="lg" color="muted">
          {message}
        </Text>
      </div>
    </Card>
  );
}