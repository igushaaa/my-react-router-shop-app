import type { ReactNode } from "react";
import { Text, Button, Card } from "../atoms";

export interface ErrorLayoutProps {
  children: ReactNode;
  statusCode?: number;
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export default function ErrorLayout({ 
  children, 
  statusCode,
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again.",
  onRetry,
  className = '' 
}: ErrorLayoutProps) {
  return (
    <div className={`min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 ${className}`}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Card variant="elevated" className="p-8 text-center">
          {statusCode && (
            <Text as="h1" size="6xl" weight="bold" color="danger" className="mb-4">
              {statusCode}
            </Text>
          )}
          
          <Text as="h2" size="2xl" weight="bold" className="mb-2">
            {title}
          </Text>
          
          <Text color="muted" className="mb-6">
            {description}
          </Text>
          
          {children}
          
          {onRetry && (
            <div className="mt-6">
              <Button onClick={onRetry} variant="primary">
                Try Again
              </Button>
            </div>
          )}
          
          <div className="mt-6">
            <a 
              href="/"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              ← Go back home
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}