import React, { useState, useEffect } from "react";
import { Product } from "../../models/Product";
  

type ProductFormProps = {
  initialProduct?: Product;
  onSubmit: (product: Product) => void;
  onCancel: () => void;
};

const ProductForm: React.FC<ProductFormProps> = ({ initialProduct, onSubmit, onCancel }) => {
  const [name, setName] = useState<string>(initialProduct?.name || "");
  const [price, setPrice] = useState<number>(initialProduct?.price || 0);
  const [category, setCategory] = useState<string>(initialProduct?.category || "");
  const [discountRate, setDiscountRate] = useState<number>(initialProduct?.discountRate || 0);
  const [stock, setStock] = useState<number>(initialProduct?.stock || 0);
  const [imageUrl, setImageUrl] = useState<string>(initialProduct?.imageUrl || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const product = {
      id: initialProduct?.id || Math.random().toString(36).substr(2, 9),
      name,
      price,
      category,
      discountRate,
      stock,
      imageUrl,
    };
    onSubmit(product);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
      </div>
      <div>
        <label>Category:</label>
        <input value={category} onChange={(e) => setCategory(e.target.value)} required />
      </div>
      <div>
        <label>Discount Rate:</label>
        <input type="number" value={discountRate} onChange={(e) => setDiscountRate(Number(e.target.value))} />
      </div>
      <div>
        <label>Stock:</label>
        <input type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} required />
      </div>
      <div>
        <label>Image URL:</label>
        <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      </div>
      <button type="submit">Submit</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default ProductForm;
