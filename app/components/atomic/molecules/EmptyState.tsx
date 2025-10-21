import { Text, Button, Card } from "../atoms";

export interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export default function EmptyState({ 
  title,
  description,
  actionLabel,
  onAction,
  icon,
  className = '' 
}: EmptyStateProps) {
  return (
    <Card variant="filled" className={`text-center py-12 ${className}`}>
      <div className="max-w-md mx-auto">
        {icon && (
          <div className="mb-4 text-gray-400">
            {icon}
          </div>
        )}
        
        <Text as="h3" size="xl" weight="semibold" className="mb-2">
          {title}
        </Text>
        
        {description && (
          <Text size="lg" color="muted" className="mb-6">
            {description}
          </Text>
        )}
        
        {actionLabel && onAction && (
          <Button onClick={onAction} variant="primary">
            {actionLabel}
          </Button>
        )}
      </div>
    </Card>
  );
}