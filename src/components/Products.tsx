import React, { useState, memo, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
}

interface CategoryButtonProps {
  category: string;
  isSelected: boolean;
  onCategoryChange: (category: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = memo(({ product }) => (
  <div className={`product-card ${!product.inStock ? 'out-of-stock' : ''}`}>
    <h3>{product.name}</h3>
    <p>Price: ${product.price}</p>
    <p>Category: {product.category}</p>
    <p>Status: {product.inStock ? 'In Stock' : 'Out of Stock'}</p>
  </div>
));

ProductCard.displayName = 'ProductCard';

const CategoryButton: React.FC<CategoryButtonProps> = memo(({ 
  category, 
  isSelected, 
  onCategoryChange 
}) => {
  const handleClick = useCallback((): void => {
    onCategoryChange(category);
  }, [category, onCategoryChange]);

  return (
    <button
      onClick={handleClick}
      className={`category-button ${isSelected ? 'active' : ''}`}
    >
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </button>
  );
});

CategoryButton.displayName = 'CategoryButton';

const Products: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Dummy data for products
  const products: readonly Product[] = [
    { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics', inStock: true },
    { id: 2, name: 'Smartphone', price: 699.99, category: 'Electronics', inStock: true },
    { id: 3, name: 'Headphones', price: 199.99, category: 'Electronics', inStock: false },
    { id: 4, name: 'Coffee Mug', price: 15.99, category: 'Kitchen', inStock: true },
    { id: 5, name: 'Blender', price: 89.99, category: 'Kitchen', inStock: true },
    { id: 6, name: 'T-Shirt', price: 25.99, category: 'Clothing', inStock: true },
    { id: 7, name: 'Jeans', price: 79.99, category: 'Clothing', inStock: false },
    { id: 8, name: 'Sneakers', price: 129.99, category: 'Clothing', inStock: true },
  ];

  const handleNavigateToHome = useCallback((): void => {
    navigate('/');
  }, [navigate]);

  const handleNavigateToAbout = useCallback((): void => {
    navigate('/about');
  }, [navigate]);

  const handleCategoryChange = useCallback((category: string): void => {
    setSelectedCategory(category);
  }, []);

  const categories = useMemo<string[]>(() => 
    ['all', ...Array.from(new Set(products.map(p => p.category)))], 
    [products]
  );

  const filteredProducts = useMemo(() => 
    selectedCategory === 'all' 
      ? products 
      : products.filter(product => product.category === selectedCategory),
    [products, selectedCategory]
  );

  return (
    <div className="products-container">
      <h1>Title - This is Our Products Page</h1>
      <p>Browse our collection of products with dummy data.</p>
      
      <div className="navigation-buttons">
        <button onClick={handleNavigateToHome} className="nav-button">
          Go to Home
        </button>
        <button onClick={handleNavigateToAbout} className="nav-button">
          Go to About
        </button>
      </div>

      <div className="category-filter">
        <h3>Filter by Category:</h3>
        <div className="category-buttons">
          {categories.map((category) => (
            <CategoryButton
              key={category}
              category={category}
              isSelected={selectedCategory === category}
              onCategoryChange={handleCategoryChange}
            />
          ))}
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

Products.displayName = 'Products';

export default memo(Products);
