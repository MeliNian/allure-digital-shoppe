
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductFilters } from '@/components/filters/ProductFilters';
import { Filter, Grid, List, ChevronDown } from 'lucide-react';

const products = [
  {
    id: '1',
    name: 'Premium Leather Jacket',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop',
    rating: 4.8,
    reviewCount: 124,
    badge: 'Sale',
    colors: ['#000000', '#8B4513', '#654321']
  },
  {
    id: '2',
    name: 'Designer Silk Dress',
    price: 199,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop',
    rating: 4.9,
    reviewCount: 89,
    badge: 'New',
    colors: ['#FF69B4', '#000000', '#FFFFFF']
  },
  {
    id: '3',
    name: 'Luxury Watch Collection',
    price: 599,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop',
    rating: 4.7,
    reviewCount: 203,
    colors: ['#C0C0C0', '#FFD700', '#000000']
  },
  {
    id: '4',
    name: 'Artisan Handbag',
    price: 249,
    originalPrice: 299,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop',
    rating: 4.6,
    reviewCount: 156,
    badge: 'Best Seller',
    colors: ['#8B4513', '#000000', '#FFFFFF']
  },
  {
    id: '5',
    name: 'Premium Sneakers',
    price: 159,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop',
    rating: 4.5,
    reviewCount: 267,
    colors: ['#FFFFFF', '#000000', '#FF0000']
  },
  {
    id: '6',
    name: 'Cashmere Scarf',
    price: 89,
    originalPrice: 120,
    image: 'https://images.unsplash.com/photo-1601924287784-22d96e9c2b1d?w=400&h=500&fit=crop',
    rating: 4.8,
    reviewCount: 94,
    badge: 'Sale',
    colors: ['#DDA0DD', '#000000', '#FFFFFF']
  }
];

const ProductsPage: React.FC = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest' },
    { value: 'rating', label: 'Customer Rating' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
              <p className="text-gray-600">Discover our premium collection</p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* View Toggle */}
              <div className="hidden md:flex items-center border border-gray-200 rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-8 px-3"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="h-8 px-3"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden fixed bottom-6 right-6 z-30">
            <Button
              onClick={() => setFiltersOpen(true)}
              className="bg-gray-900 hover:bg-gray-800 text-white rounded-full shadow-lg px-6 py-3"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </Button>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <ProductFilters
                isOpen={true}
                onClose={() => {}}
                onFiltersChange={() => {}}
              />
            </div>
          </div>

          {/* Mobile Filters */}
          <ProductFilters
            isOpen={filtersOpen}
            onClose={() => setFiltersOpen(false)}
            onFiltersChange={() => {}}
          />

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {products.length} products
              </p>
            </div>

            <div className={`grid gap-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={(id) => console.log('Add to cart:', id)}
                  onToggleWishlist={(id) => console.log('Toggle wishlist:', id)}
                />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button
                variant="outline"
                size="lg"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 rounded-full"
              >
                Load More Products
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
