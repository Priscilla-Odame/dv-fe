"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    discount_rate: '',
    stock: '',
    product_photo: null,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const getAuthHeaders = () => {
    const token = sessionStorage.getItem('a_c');
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchProducts = async () => {
    const response = await axios.get('http://localhost:3000/api/products');
    setProducts(response.data);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: any) => {
    setFormData({ ...formData, product_photo: e.target.files[0] });
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      discount_rate: product.discount_rate,
      stock: product.stock,
      product_photo: product.product_photo,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  
    const { product_photo, ...dataToSend } = formData; // Exclude image from request
  
    try {
      if (editingProduct) {
        await axios.put(
          `http://localhost:3000/api/products/${editingProduct._id}`,
          dataToSend,
          getAuthHeaders()
        );
      } else {
        await axios.post(
          "http://localhost:3000/api/products",
          dataToSend,
          getAuthHeaders()
        );
      }
  
      setShowForm(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (error: any) {
      console.error(
        "Error submitting product:",
        error.response?.data || error.message
      );
    }
  };
  
  

//     if (editingProduct) {
//       await axios.put(`http://localhost:3000/api/products/${editingProduct._id}`, formDataObj, getAuthHeaders());
//     } else {
//         console.log("kkkkkkkk>>>>>>", formDataObj)
//       await axios.post('http://localhost:3000/api/products', formDataObj, getAuthHeaders());
//     }
    
//     setShowForm(false);
//     setEditingProduct(null);
//     fetchProducts();
//   };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await axios.delete(`http://localhost:3000/api/products/${id}`, getAuthHeaders());
      fetchProducts();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search products..."
          className="border p-2 w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div>
          <Link href="/admin/dashboard">
            <button className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Back to Dashboard</button>
          </Link>
          <button onClick={() => setShowForm(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {products.filter(p => p?.name?.toLowerCase().includes(search.toLowerCase())).map((product) => (
          <div key={product._id} className="border p-4">
            <img src={product?.product_photo?.url} alt={product.name} className="w-full h-40 object-cover" />
            <h3 className="font-bold mt-2">{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stock}</p>
            <button onClick={() => handleEdit(product)} className="bg-yellow-500 text-white px-2 py-1 mt-2 mr-2 rounded">Update</button>
            <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-1/3">
            <h2 className="text-xl font-bold mb-4">{editingProduct ? 'Update Product' : 'Add Product'}</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} className="border p-2 w-full mb-2" required />
              <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} className="border p-2 w-full mb-2" required />
              <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleInputChange} className="border p-2 w-full mb-2" required />
              <input type="number" name="discount_rate" placeholder="Discount Rate" value={formData.discount_rate} onChange={handleInputChange} className="border p-2 w-full mb-2" required />
              <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleInputChange} className="border p-2 w-full mb-2" required />
              <input type="file" name="product_photo" onChange={handleFileChange} className="border p-2 w-full mb-2" />
              <div className="flex justify-between">
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
                <button type="button" onClick={() => { setShowForm(false); setEditingProduct(null); }} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
