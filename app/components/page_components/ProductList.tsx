import React from "react";
import { Product } from "../../models/Product";

type ProductListProps = {
  products: Product[];
  onUpdateClick: (product: Product) => void;
  onDeleteClick: (productId: string) => void;
};

const ProductList: React.FC<ProductListProps> = ({ products, onUpdateClick, onDeleteClick }) => {
  return (
    <div>
      {products.map((product) => (
        <div key={product.id} style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
          <img src={product.imageUrl} alt={product.name} style={{ width: "100px", height: "100px" }} />
          <h3>{product.name}</h3>
          <p>{product.category}</p>
          <p>${product.price}</p>
          <p>Stock: {product.stock}</p>
          <p>Discount: {product.discountRate}%</p>
          <button onClick={() => onUpdateClick(product)}>Update</button>
          <button onClick={() => onDeleteClick(product.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
