'use client'
import React, { useState, useEffect } from "react";
import Navbar from "../components/page_components/NavBar";
import ProductForm from "../components/page_components/ProductForm";
import ProductList from "../components/page_components/ProductList";
import { Product } from "../models/Product";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Fetch products from an API or mock data
    const fetchedProducts = [
      { id: "1", name: "Product 1", price: 20, category: "Category A", discountRate: 10, stock: 100, imageUrl: "/image1.jpg" },
      { id: "2", name: "Product 2", price: 30, category: "Category B", discountRate: 5, stock: 50, imageUrl: "/image2.jpg" },
    ];
    setProducts(fetchedProducts);
  }, []);

  const handleAddProductClick = () => {
    setIsAdding(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddProductSubmit = (product: Product) => {
    setProducts([...products, product]);
    setIsAdding(false);
  };

  const handleUpdateProductSubmit = (product: Product) => {
    setProducts(products.map((p) => (p.id === product.id ? product : p)));
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  const handleCancelForm = () => {
    setIsAdding(false);
    setEditingProduct(null);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar onAddProductClick={handleAddProductClick} onSearchChange={handleSearchChange} />
      {isAdding || editingProduct ? (
        <ProductForm
          initialProduct={editingProduct || undefined}
          onSubmit={editingProduct ? handleUpdateProductSubmit : handleAddProductSubmit}
          onCancel={handleCancelForm}
        />
      ) : (
        <ProductList
          products={filteredProducts}
          onUpdateClick={(product) => setEditingProduct(product)}
          onDeleteClick={handleDeleteProduct}
        />
      )}
    </div>
  );
};

export default ProductsPage;
