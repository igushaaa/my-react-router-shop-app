import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Категорії
  const phones = await prisma.category.create({
    data: { name: "Phones", slug: "phones" },
  });

  const laptops = await prisma.category.create({
    data: { name: "Laptops", slug: "laptops" },
  });

  // Товари
  await prisma.product.createMany({
    data: [
      { name: "iPhone 15", slug: "iphone-15", price: 999, categoryId: phones.id },
      { name: "Pixel 8", slug: "pixel-8", price: 799, categoryId: phones.id },
      { name: "Galaxy S24", slug: "galaxy-s24", price: 899, categoryId: phones.id },
      { name: "MacBook Pro", slug: "macbook-pro", price: 1999, categoryId: laptops.id },
      { name: "Dell XPS 15", slug: "dell-xps-15", price: 1499, categoryId: laptops.id },
    ],
  });

  console.log('✅ Seed data created successfully!');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });