"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { FiEdit, FiTrash2, FiPlus, FiSearch } from "react-icons/fi";
import AdminLayout from "@/app/components/page_components/AdminLayout";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingProductImage, setEditingProductImage] = useState(null);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    discount_rate: "",
    stock: "",
    product_photo: null,
  });
  const [editFormData, setEditFormData] = useState({
    name: "",
    price: "",
    category: "",
    discount_rate: "",
    stock: "",
  });
  const [editFormImageData, setEditFormImageData] = useState({
    product_photo: null,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const getAuthHeaders = () => {
    const token = sessionStorage.getItem("a_c");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, product_photo: e.target.files[0] });
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setEditFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      discount_rate: product.discount_rate,
      stock: product.stock
    });
    setShowForm(true);
  };

  const handleEditImage = (product) => {
    setEditingProductImage(product);
    setEditFormImageData({
      product_photo: product.product_photo,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { product_photo, ...dataToSend } = formData;
    try {
      if (editingProduct) {
        await axios.put(
          `http://localhost:3000/api/products/${editingProduct._id}`,
          dataToSend,
          getAuthHeaders()
        );
      } else if (editingProductImage) {
        await axios.post(
          `http://localhost:3000/api/products/update/product/image/${editingProduct._id}`,
          dataToSend,
          getAuthHeaders()
        );
      }
      else {
        await axios.post(
          "http://localhost:3000/api/products",
          dataToSend,
          getAuthHeaders()
        );
      }
      setShowForm(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await axios.delete(
        `http://localhost:3000/api/products/${id}`,
        getAuthHeaders()
      );
      fetchProducts();
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-white text-gray-900 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center border rounded-md p-2 w-1/2">
            <FiSearch className="text-gray-600 mr-2" />
            <input
              type="text"
              placeholder="Search products..."
              className="outline-none w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
          >
            <FiPlus className="mr-2" /> Add Product
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products
            .filter((p) => p?.name?.toLowerCase().includes(search.toLowerCase()))
            .map((product) => (
              <div key={product._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                <img
                  src={product?.product_photo?.url || "/placeholder.jpg"}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h3 className="font-bold mt-2 text-gray-800">{product.name}</h3>
                <p className="text-green-600 font-semibold">${product.price}</p>
                <p className="text-gray-600">Stock: {product.stock}</p>
                <div className="flex justify-between mt-3">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded flex items-center"
                  >
                    <FiEdit className="mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded flex items-center"
                  >
                    <FiTrash2 className="mr-1" /> Delete
                  </button>
                </div>
              </div>
            ))}
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded w-1/3">
              <h2 className="text-xl font-bold mb-4">{editingProduct ? "Update Product" : "Add Product"}</h2>
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
    </AdminLayout>
  );
}
