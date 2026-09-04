import React from 'react';
import { CategoryListingView } from '../../../components/category/CategoryListingView';

interface CategoryPageProps {
  params: Promise<{
    locale: string;
    category: string;
  }>;
}

export function generateStaticParams() {
  const locales = ['en', 'ar'];
  const categories = [
    'adventures',
    'nightlife',
    'corporate',
    'events',
    'voyages',
    'real-estate',
    'memberships',
  ];
  const params: { locale: string; category: string }[] = [];

  locales.forEach((locale) => {
    categories.forEach((category) => {
      params.push({ locale, category });
    });
  });

  return params;
}

export default async function DynamicCategoryPage({ params }: CategoryPageProps) {
  const { locale, category } = await params;
  const allowedCategories = [
    'adventures',
    'nightlife',
    'corporate',
    'events',
    'voyages',
    'real-estate',
    'memberships',
  ];

  const validCategory = allowedCategories.includes(category) ? category : 'adventures';

  return <CategoryListingView locale={locale} category={validCategory as any} />;
}
