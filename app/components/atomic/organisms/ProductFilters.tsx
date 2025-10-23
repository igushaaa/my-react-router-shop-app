import { useState } from "react";
import { Select, Button, Card, Text } from "../atoms";

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface ProductFiltersProps {
  categories: FilterOption[];
  priceRanges: FilterOption[];
  onFiltersChange: (filters: {
    category?: string;
    priceRange?: string;
    sort?: string;
  }) => void;
  className?: string;
}

export default function ProductFilters({ 
  categories,
  priceRanges,
  onFiltersChange,
  className = '' 
}: ProductFiltersProps) {
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    sort: ''
  });

  const sortOptions = [
    { value: '', label: 'Sort by...' },
    { value: 'price', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'name', label: 'Name: A to Z' },
    { value: 'name_desc', label: 'Name: Z to A' },
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' }
  ];

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = { category: '', priceRange: '', sort: '' };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <Card variant="outlined" className={`p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <Text as="h3" size="lg" weight="semibold">
          Filters
        </Text>
        {hasActiveFilters && (
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={clearFilters}
          >
            Clear All
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {/* Category Filter */}
        <div>
          <Text size="sm" weight="medium" className="mb-2">
            Category
          </Text>
          <Select
            options={[
              { value: '', label: 'All Categories' },
              ...categories
            ]}
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
          />
        </div>

        {/* Price Range Filter */}
        <div>
          <Text size="sm" weight="medium" className="mb-2">
            Price Range
          </Text>
          <Select
            options={[
              { value: '', label: 'All Prices' },
              ...priceRanges
            ]}
            value={filters.priceRange}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
          />
        </div>

        {/* Sort Filter */}
        <div>
          <Text size="sm" weight="medium" className="mb-2">
            Sort By
          </Text>
          <Select
            options={sortOptions}
            value={filters.sort}
            onChange={(e) => handleFilterChange('sort', e.target.value)}
          />
        </div>
      </div>
    </Card>
  );
}