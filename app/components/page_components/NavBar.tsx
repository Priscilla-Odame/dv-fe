import React from "react";

type NavbarProps = {
  onAddProductClick: () => void;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Navbar: React.FC<NavbarProps> = ({ onAddProductClick, onSearchChange }) => {
  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "10px", backgroundColor: "#333", color: "white" }}>
      <button onClick={onAddProductClick} style={{ padding: "5px 15px", backgroundColor: "green", color: "white" }}>
        Add Product
      </button>
      <input type="text" onChange={onSearchChange} placeholder="Search Products..." style={{ padding: "5px", width: "300px" }} />
    </nav>
  );
};

export default Navbar;
