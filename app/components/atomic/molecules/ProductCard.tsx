import { Link } from "react-router";
import { Button, Card, Text, Badge, Image } from "../atoms";
import AddToCart from "./AddToCart";

export interface ProductCardProps {
  id: number;
  slug: string;
  name: string;
  price: number;
  category?: string;
  image?: string;
  description?: string;
}

export default function ProductCard({ 
  id, 
  slug, 
  name, 
  price, 
  category,
  image,
  description 
}: ProductCardProps) {
  return (
    <Card variant="elevated" className="group hover:shadow-lg transition-shadow duration-200">
      <div className="aspect-square mb-4 overflow-hidden rounded-lg">
        <Image
          src={image || '/placeholder-product.jpg'}
          alt={name}
          aspectRatio="square"
          objectFit="cover"
          className="group-hover:scale-105 transition-transform duration-200"
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <Text as="h3" size="lg" weight="semibold" className="line-clamp-2 flex-1">
            {name}
          </Text>
          {category && (
            <Badge variant="primary" size="sm" className="ml-2 flex-shrink-0">
              {category}
            </Badge>
          )}
        </div>
        
        {description && (
          <Text size="sm" color="muted" className="line-clamp-2">
            {description}
          </Text>
        )}
        
        <div className="flex items-center justify-between">
          <Text size="xl" weight="bold" color="primary">
            ${price.toFixed(2)}
          </Text>
        </div>
        
        <div className="flex gap-2 pt-2">
          <Link to={`/catalog/p/${slug}`} className="flex-1">
            <Button variant="secondary" size="sm" className="w-full">
              View Details
            </Button>
          </Link>
          <AddToCart productId={id} />
        </div>
      </div>
    </Card>
  );
}