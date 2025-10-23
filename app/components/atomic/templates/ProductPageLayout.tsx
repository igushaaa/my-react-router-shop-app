import type { ReactNode } from "react";
import { Navigation } from "../organisms";
import { Text, Card } from "../atoms";

export interface ProductPageLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  breadcrumbs?: Array<{
    label: string;
    href?: string;
  }>;
  sidebar?: ReactNode;
  className?: string;
}

export default function ProductPageLayout({ 
  children, 
  title,
  subtitle,
  breadcrumbs,
  sidebar,
  className = '' 
}: ProductPageLayoutProps) {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && (
                    <svg className="w-4 h-4 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  {crumb.href ? (
                    <a 
                      href={crumb.href}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {crumb.label}
                    </a>
                  ) : (
                    <span className="text-gray-500">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Page Header */}
        <div className="mb-8">
          <Text as="h1" size="4xl" weight="bold" className="mb-2">
            {title}
          </Text>
          {subtitle && (
            <Text size="lg" color="muted">
              {subtitle}
            </Text>
          )}
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          {sidebar && (
            <aside className="lg:col-span-1">
              <div className="sticky top-8">
                {sidebar}
              </div>
            </aside>
          )}
          
          {/* Main Content */}
          <div className={sidebar ? 'lg:col-span-3' : 'col-span-full'}>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}