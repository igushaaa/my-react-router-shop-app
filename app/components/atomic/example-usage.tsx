// Приклад використання Atomic Design компонентів
// Цей файл показує, як правильно використовувати компоненти

import React from 'react';
import { 
  // Atoms
  Button, 
  Input, 
  Text, 
  Card, 
  Badge,
  // Molecules
  ProductCard,
  SearchBar,
  AddToCart,
  // Organisms
  ProductList,
  Navigation,
  Cart,
  // Templates
  PageLayout,
  ProductPageLayout,
  // Pages
  HomePage,
  CatalogPage
} from './index';

// Приклад використання атомів
export function AtomsExample() {
  return (
    <div className="space-y-4">
      <Text as="h1" size="2xl" weight="bold">
        Atoms Example
      </Text>
      
      <Card variant="elevated" padding="lg">
        <Text size="lg" className="mb-4">
          This is a card with different button variants:
        </Text>
        
        <div className="flex gap-2 mb-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        
        <div className="flex gap-2 mb-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
        
        <Input 
          label="Email"
          type="email"
          placeholder="Enter your email"
          helperText="We'll never share your email"
        />
        
        <Badge variant="success">Success</Badge>
      </Card>
    </div>
  );
}

// Приклад використання молекул
export function MoleculesExample() {
  const products = [
    {
      id: 1,
      slug: 'sample-product',
      name: 'Sample Product',
      price: 29.99,
      category: 'Electronics',
      image: '/placeholder.jpg'
    }
  ];

  return (
    <div className="space-y-6">
      <Text as="h1" size="2xl" weight="bold">
        Molecules Example
      </Text>
      
      <SearchBar 
        q=""
        sort=""
        onSearch={(query, sort) => console.log('Search:', query, sort)}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}

// Приклад використання організмів
export function OrganismsExample() {
  const products = [
    {
      id: 1,
      slug: 'sample-product',
      name: 'Sample Product',
      price: 29.99,
      category: 'Electronics',
      image: '/placeholder.jpg'
    }
  ];

  return (
    <div className="space-y-6">
      <Text as="h1" size="2xl" weight="bold">
        Organisms Example
      </Text>
      
      <ProductList 
        items={products}
        isLoading={false}
        error={undefined}
      />
    </div>
  );
}

// Приклад використання темплейтів
export function TemplatesExample() {
  return (
    <PageLayout
      title="Template Example"
      subtitle="This is how you use templates"
    >
      <Card variant="elevated" padding="lg">
        <Text>
          This content is wrapped in a PageLayout template.
        </Text>
      </Card>
    </PageLayout>
  );
}

// Приклад використання сторінок
export function PagesExample() {
  const featuredProducts = [
    {
      id: 1,
      slug: 'featured-product',
      name: 'Featured Product',
      price: 49.99,
      category: 'Featured',
      image: '/placeholder.jpg'
    }
  ];

  return (
    <HomePage 
      featuredProducts={featuredProducts}
      isLoading={false}
      error={undefined}
    />
  );
}