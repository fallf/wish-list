import { create } from "zustand";

const API_BASE = import.meta.env.VITE_API_BASE;

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set(() => ({ products })),

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields" };
    }

    try {
      const res = await fetch(`${API_BASE}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();

      set((state) => ({ products: [...state.products, data.data] }));

      return { success: true, message: "Product created successfully" };
    } catch (error) {
      return { success: false, message: "Error creating product" };
    }
  },

  fetchProducts: async () => {
    const res = await fetch(`${API_BASE}/api/products`);
    const data = await res.json();
    set({ products: data.data });
  },

  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`${API_BASE}/api/products/${pid}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!data.success) return { success: false, message: data.message };

      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: "Error deleting product" };
    }
  },

  updateProduct: async (pid, updateProduct) => {
    const res = await fetch(`${API_BASE}/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateProduct),
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };
    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? data.data : product
      ),
    }));
    return { success: true, message: data.message };
  },
}));
