import { Input, Button, Select } from "../atoms";

export interface SearchBarProps {
  q?: string;
  sort?: string;
  onSearch?: (query: string, sort: string) => void;
  className?: string;
}

export default function SearchBar({ 
  q, 
  sort, 
  onSearch,
  className = '' 
}: SearchBarProps) {
  const sortOptions = [
    { value: '', label: 'Sort by...' },
    { value: 'price', label: 'Price ↑' },
    { value: 'price_desc', label: 'Price ↓' },
    { value: 'name', label: 'Name A-Z' },
    { value: 'name_desc', label: 'Name Z-A' },
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' }
  ];

  return (
    <form 
      method="get" 
      className={`flex flex-col sm:flex-row gap-3 mb-6 ${className}`}
      onSubmit={(e) => {
        if (onSearch) {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const query = formData.get('q') as string;
          const sortValue = formData.get('sort') as string;
          onSearch(query, sortValue);
        }
      }}
    >
      <div className="flex-1">
        <Input
          type="text"
          name="q"
          placeholder="Search products..."
          defaultValue={q || ""}
          className="w-full"
        />
      </div>
      
      <div className="sm:w-48">
        <Select
          name="sort"
          options={sortOptions}
          defaultValue={sort || ""}
          className="w-full"
        />
      </div>
      
      <Button type="submit" className="sm:w-auto">
        Search
      </Button>
    </form>
  );
}