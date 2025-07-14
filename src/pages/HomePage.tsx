// src/pages/index.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Layout from '@/components/common/Layout';
import ProductGrid from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Smartphone, Laptop, Headphones, Camera, Tv, Watch } from 'lucide-react';
import { Product } from '@/types';

const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Sample hero slides
  const heroSlides = [
    {
      id: 1,
      title: "Latest Smartphones",
      subtitle: "Discover the newest technology",
      image: "/hero-phone.jpg",
      cta: "Shop Now",
      link: "/products?category=smartphones"
    },
    {
      id: 2,
      title: "Gaming Laptops",
      subtitle: "Power up your gaming experience",
      image: "/hero-laptop.jpg",
      cta: "Explore",
      link: "/products?category=laptops"
    },
    {
      id: 3,
      title: "Audio Excellence",
      subtitle: "Premium headphones & speakers",
      image: "/hero-audio.jpg",
      cta: "Listen Now",
      link: "/products?category=audio"
    }
  ];

  // Sample categories
  const categories = [
    { name: 'Smartphones', icon: Smartphone, link: '/products?category=smartphones', color: 'bg-blue-500' },
    { name: 'Laptops', icon: Laptop, link: '/products?category=laptops', color: 'bg-green-500' },
    { name: 'Audio', icon: Headphones, link: '/products?category=audio', color: 'bg-purple-500' },
    { name: 'Cameras', icon: Camera, link: '/products?category=cameras', color: 'bg-red-500' },
    { name: 'TVs', icon: Tv, link: '/products?category=tvs', color: 'bg-indigo-500' },
    { name: 'Wearables', icon: Watch, link: '/products?category=wearables', color: 'bg-pink-500' },
  ];

  // Sample featured products
  const sampleProducts: Product[] = [
    {
      id: '1',
      name: 'iPhone 15 Pro Max',
      description: 'Latest iPhone with advanced camera system',
      price: 180000,
      originalPrice: 200000,
      category: 'smartphones',
      brand: 'Apple',
      images: ['/products/iphone15.jpg'],
      stock: 10,
      rating: 4.8,
      reviewCount: 256,
      features: ['A17 Pro chip', 'Titanium design', 'Pro camera system'],
      specifications: { 'Storage': '256GB', 'RAM': '8GB' },
      isActive: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '2',
      name: 'MacBook Air M3',
      description: 'Ultra-thin laptop with M3 chip',
      price: 150000,
      category: 'laptops',
      brand: 'Apple',
      images: ['/products/macbook.jpg'],
      stock: 5,
      rating: 4.9,
      reviewCount: 128,
      features: ['M3 chip', '13-inch display', 'All-day battery'],
      specifications: { 'Storage': '256GB SSD', 'RAM': '8GB' },
      isActive: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '3',
      name: 'Sony WH-1000XM5',
      description: 'Premium noise-canceling headphones',
      price: 35000,
      originalPrice: 40000,
      category: 'audio',
      brand: 'Sony',
      images: ['/products/sony-headphones.jpg'],
      stock: 15,
      rating: 4.7,
      reviewCount: 89,
      features: ['Noise canceling', '30-hour battery', 'Quick charge'],
      specifications: { 'Frequency': '4-40kHz', 'Weight': '250g' },
      isActive: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '4',
      name: 'Samsung Galaxy S24 Ultra',
      description: 'Premium Android smartphone',
      price: 160000,
      category: 'smartphones',
      brand: 'Samsung',
      images: ['/products/samsung-s24.jpg'],
      stock: 8,
      rating: 4.6,
      reviewCount: 174,
      features: ['S Pen', '200MP camera', '5000mAh battery'],
      specifications: { 'Storage': '256GB', 'RAM': '12GB' },
      isActive: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    }
  ];

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setFeaturedProducts(sampleProducts);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleAddToCart = (productId: string) => {
    console.log('Add to cart:', productId);
    // TODO: Implement add to cart logic
  };

  const handleToggleWishlist = (productId: string) => {
    console.log('Toggle wishlist:', productId);
    // TODO: Implement wishlist logic
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10" />
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundColor: '#1f2937' // Fallback color
                }}
              />
              <div className="absolute inset-0 z-20 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-lg">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                      {slide.title}
                    </h1>
                    <p className="text-xl text-gray-200 mb-8">
                      {slide.subtitle}
                    </p>
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                      {slide.cta}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
        >
          <ChevronLeft size={24} className="text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
        >
          <ChevronRight size={24} className="text-white" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <a
                  key={category.name}
                  href={category.link}
                  className="group text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className={`w-16 h-16 ${category.color} rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon size={32} className="text-white" />
                  </div>
                  <h3 className="font-medium text-gray-900">{category.name}</h3>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <Button variant="outline">View All</Button>
          </div>

          <ProductGrid
            products={featuredProducts}
            loading={loading}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
          />
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new products, exclusive deals, and special offers.
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-l-md outline-2 outline-grey-500 outline-solid"
            /> <br/>
            <Button className="rounded-l-none bg-blue-600  hover:bg-blue-800">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;