import { ReactNode } from "react";
import { Text, Card } from "../atoms";

export interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
}

export default function AuthLayout({ 
  children, 
  title,
  subtitle,
  className = '' 
}: AuthLayoutProps) {
  return (
    <div className={`min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 ${className}`}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mb-8">
          <Text as="h1" size="3xl" weight="bold" color="primary">
            MyShop
          </Text>
        </div>
        
        <Card variant="elevated" className="p-8">
          <div className="text-center mb-6">
            <Text as="h2" size="2xl" weight="bold" className="mb-2">
              {title}
            </Text>
            {subtitle && (
              <Text color="muted">
                {subtitle}
              </Text>
            )}
          </div>
          
          {children}
        </Card>
      </div>
    </div>
  );
}