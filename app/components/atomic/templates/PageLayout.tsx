import { ReactNode } from "react";
import { Navigation } from "../organisms";
import { Text } from "../atoms";

export interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  showNavigation?: boolean;
  className?: string;
}

export default function PageLayout({ 
  children, 
  title,
  subtitle,
  showNavigation = true,
  className = '' 
}: PageLayoutProps) {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {showNavigation && <Navigation />}
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {(title || subtitle) && (
          <div className="mb-8">
            {title && (
              <Text as="h1" size="4xl" weight="bold" className="mb-2">
                {title}
              </Text>
            )}
            {subtitle && (
              <Text size="lg" color="muted">
                {subtitle}
              </Text>
            )}
          </div>
        )}
        
        {children}
      </main>
    </div>
  );
}