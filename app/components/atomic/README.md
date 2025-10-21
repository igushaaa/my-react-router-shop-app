# Atomic Design Component Library

Ця бібліотека компонентів організована за принципами **Atomic Design** - методології, яка розділяє UI компоненти на 5 рівнів складності.

## 🏗️ Структура

```
app/components/atomic/
├── atoms/          # Базові UI компоненти
├── molecules/      # Компоненти з атомів
├── organisms/      # Складні компоненти
├── templates/      # Макети сторінок
├── pages/          # Конкретні сторінки
└── index.ts        # Експорт всіх компонентів
```

## 📚 Рівні Atomic Design

### 1. Atoms (Атоми)
Базові UI компоненти, які не можна розбити на менші частини.

**Компоненти:**
- `Button` - кнопки з різними варіантами
- `Input` - поля вводу з підтримкою помилок
- `Text` - текст з різними розмірами та кольорами
- `Image` - зображення з fallback
- `Select` - випадаючі списки
- `Card` - картки з різними варіантами
- `Badge` - значки/мітки
- `Spinner` - індикатори завантаження

**Приклад використання:**
```tsx
import { Button, Input, Text, Card } from './components/atomic';

<Card variant="elevated" padding="lg">
  <Text as="h1" size="2xl" weight="bold">
    Title
  </Text>
  <Input 
    label="Email"
    type="email"
    placeholder="Enter email"
  />
  <Button variant="primary" size="lg">
    Submit
  </Button>
</Card>
```

### 2. Molecules (Молекули)
Компоненти, що складаються з атомів та мають конкретну функціональність.

**Компоненти:**
- `ProductCard` - картка товару
- `SearchBar` - пошукова панель
- `AddToCart` - кнопка додавання в кошик
- `CartItem` - елемент кошика
- `OrderItem` - елемент замовлення
- `EmptyState` - стан порожнього списку
- `LoadingState` - стан завантаження
- `ErrorMessage` - повідомлення про помилку

**Приклад використання:**
```tsx
import { ProductCard, SearchBar, AddToCart } from './components/atomic';

<SearchBar 
  q="search query"
  sort="price"
  onSearch={(query, sort) => handleSearch(query, sort)}
/>

<ProductCard
  id={1}
  slug="product-slug"
  name="Product Name"
  price={29.99}
  category="Electronics"
/>
```

### 3. Organisms (Організми)
Складні компоненти, що складаються з молекул та атомів.

**Компоненти:**
- `ProductList` - список товарів
- `Navigation` - навігаційне меню
- `Cart` - кошик покупок
- `OrderList` - список замовлень
- `ProductFilters` - фільтри товарів

**Приклад використання:**
```tsx
import { ProductList, Navigation, Cart } from './components/atomic';

<Navigation />
<ProductList 
  items={products}
  isLoading={false}
  error={null}
/>
```

### 4. Templates (Темплейти)
Макети сторінок та загальні layout компоненти.

**Компоненти:**
- `PageLayout` - базовий layout сторінки
- `ProductPageLayout` - layout для сторінок товарів
- `AuthLayout` - layout для аутентифікації
- `ErrorLayout` - layout для помилок

**Приклад використання:**
```tsx
import { PageLayout, ProductPageLayout } from './components/atomic';

<PageLayout
  title="Page Title"
  subtitle="Page subtitle"
>
  <div>Page content</div>
</PageLayout>
```

### 5. Pages (Сторінки)
Конкретні сторінки додатку.

**Компоненти:**
- `HomePage` - головна сторінка
- `CatalogPage` - сторінка каталогу
- `CartPage` - сторінка кошика
- `OrdersPage` - сторінка замовлень

**Приклад використання:**
```tsx
import { HomePage, CatalogPage } from './components/atomic';

<HomePage 
  featuredProducts={products}
  isLoading={false}
  error={null}
/>
```

## 🎯 Переваги Atomic Design

1. **Модульність** - компоненти легко перевикористовувати
2. **Консистентність** - єдиний дизайн по всьому додатку
3. **Масштабованість** - легко додавати нові компоненти
4. **Тестування** - кожен рівень можна тестувати окремо
5. **Співпраця** - зрозуміла структура для команди

## 🚀 Як почати

1. Імпортуйте потрібні компоненти:
```tsx
import { Button, ProductCard, ProductList } from './components/atomic';
```

2. Використовуйте компоненти в своїх сторінках:
```tsx
export default function MyPage() {
  return (
    <PageLayout title="My Page">
      <ProductList items={products} />
    </PageLayout>
  );
}
```

3. Кастомізуйте компоненти через props:
```tsx
<Button 
  variant="primary" 
  size="lg" 
  isLoading={true}
  onClick={handleClick}
>
  Click me
</Button>
```

## 📝 Конвенції

- **Naming**: PascalCase для компонентів, camelCase для props
- **Props**: Всі компоненти мають TypeScript типи
- **Styling**: Використовується Tailwind CSS
- **Accessibility**: Всі компоненти доступні для скрін-рідерів
- **Responsive**: Компоненти адаптивні для всіх пристроїв

## 🔧 Розширення

Для додавання нового компонента:

1. Створіть файл в відповідній папці (atoms/molecules/organisms/templates/pages)
2. Додайте TypeScript типи
3. Експортуйте в index.ts файлі відповідної папки
4. Оновіть головний index.ts файл
5. Додайте документацію та приклади використання