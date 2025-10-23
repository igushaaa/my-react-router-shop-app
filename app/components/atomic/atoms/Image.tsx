import React from 'react';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
  aspectRatio?: 'square' | 'video' | 'wide' | 'auto';
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

export default function Image({ 
  src,
  alt,
  fallback = '/placeholder-image.jpg',
  aspectRatio = 'auto',
  objectFit = 'cover',
  className = '',
  onError,
  ...props 
}: ImageProps) {
  const [imageSrc, setImageSrc] = React.useState(src);
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[16/9]',
    auto: ''
  };

  const objectFitClasses = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down'
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasError) {
      setHasError(true);
      setImageSrc(fallback);
    }
    onError?.(e);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const classes = [
    'w-full',
    aspectRatioClasses[aspectRatio],
    objectFitClasses[objectFit],
    isLoading ? 'animate-pulse bg-gray-200' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded">
          <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <img
        src={imageSrc}
        alt={alt}
        className={classes}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
      />
    </div>
  );
}