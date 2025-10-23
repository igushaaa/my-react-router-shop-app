// Atomic Design - Pages
// Конкретні сторінки додатку

export { default as HomePage } from './HomePage';
export { default as CatalogPage } from './CatalogPage';
export { default as CartPage } from './CartPage';
export { default as OrdersPage } from './OrdersPage';

export type { HomePageProps } from './HomePage';
export type { CatalogPageProps } from './CatalogPage';
export type { CartPageProps } from './CartPage';
export type { OrdersPageProps, Order } from './OrdersPage';