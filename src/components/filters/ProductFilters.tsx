
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Filter, X } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
  count: number;
}

interface FilterSection {
  title: string;
  key: string;
  options: FilterOption[];
}

interface ProductFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  onFiltersChange: (filters: any) => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  isOpen,
  onClose,
  onFiltersChange
}) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  const filterSections: FilterSection[] = [
    {
      title: 'Category',
      key: 'category',
      options: [
        { id: 'women', label: 'Women', count: 245 },
        { id: 'men', label: 'Men', count: 189 },
        { id: 'accessories', label: 'Accessories', count: 156 },
        { id: 'shoes', label: 'Shoes', count: 203 }
      ]
    },
    {
      title: 'Brand',
      key: 'brand',
      options: [
        { id: 'luxury-brand', label: 'Luxury Brand', count: 89 },
        { id: 'premium-co', label: 'Premium Co.', count: 156 },
        { id: 'designer-house', label: 'Designer House', count: 73 },
        { id: 'elite-fashion', label: 'Elite Fashion', count: 124 }
      ]
    },
    {
      title: 'Size',
      key: 'size',
      options: [
        { id: 'xs', label: 'XS', count: 45 },
        { id: 's', label: 'S', count: 89 },
        { id: 'm', label: 'M', count: 156 },
        { id: 'l', label: 'L', count: 134 },
        { id: 'xl', label: 'XL', count: 67 }
      ]
    },
    {
      title: 'Color',
      key: 'color',
      options: [
        { id: 'black', label: 'Black', count: 234 },
        { id: 'white', label: 'White', count: 189 },
        { id: 'gray', label: 'Gray', count: 156 },
        { id: 'blue', label: 'Blue', count: 98 },
        { id: 'red', label: 'Red', count: 67 }
      ]
    }
  ];

  const handleFilterChange = (sectionKey: string, optionId: string, checked: boolean) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      if (!newFilters[sectionKey]) {
        newFilters[sectionKey] = [];
      }
      
      if (checked) {
        newFilters[sectionKey] = [...newFilters[sectionKey], optionId];
      } else {
        newFilters[sectionKey] = newFilters[sectionKey].filter(id => id !== optionId);
      }
      
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
    setPriceRange([0, 1000]);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Filter Sidebar */}
      <div className="fixed left-0 top-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl transform transition-transform duration-300 lg:relative lg:shadow-none lg:z-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 lg:hidden">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Filter Content */}
        <div className="p-6 space-y-8 h-full overflow-y-auto">
          {/* Price Range */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Price Range</h3>
              <span className="text-sm text-gray-600">
                ${priceRange[0]} - ${priceRange[1]}
              </span>
            </div>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={1000}
              step={25}
              className="w-full"
            />
          </div>

          {/* Filter Sections */}
          {filterSections.map((section) => (
            <div key={section.key}>
              <h3 className="font-semibold text-gray-900 mb-4">{section.title}</h3>
              <div className="space-y-3">
                {section.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={`${section.key}-${option.id}`}
                      checked={selectedFilters[section.key]?.includes(option.id) || false}
                      onCheckedChange={(checked) => 
                        handleFilterChange(section.key, option.id, checked as boolean)
                      }
                    />
                    <label
                      htmlFor={`${section.key}-${option.id}`}
                      className="text-sm text-gray-700 flex-1 cursor-pointer"
                    >
                      {option.label}
                    </label>
                    <span className="text-xs text-gray-500">({option.count})</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Clear Filters */}
          <div className="pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={clearAllFilters}
              className="w-full"
            >
              Clear All Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
