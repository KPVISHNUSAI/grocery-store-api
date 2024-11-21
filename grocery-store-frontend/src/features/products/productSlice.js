// src/features/products/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from '../../services/productService';

// Category Thunks
export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      return await productService.getAllCategories();
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchCategoryById = createAsyncThunk(
  'products/fetchCategoryById',
  async (id, { rejectWithValue }) => {
    try {
      return await productService.getCategoryById(id);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const createCategory = createAsyncThunk(
  'products/createCategory',
  async (categoryData, { rejectWithValue }) => {
    try {
      return await productService.createCategory(categoryData);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateCategory = createAsyncThunk(
  'products/updateCategory',
  async ({ id, ...categoryData }, { rejectWithValue }) => {
    try {
      return await productService.updateCategory(id, categoryData);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'products/deleteCategory',
  async (id, { rejectWithValue }) => {
    try {
      await productService.deleteCategory(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// Product Thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      return await productService.getAllProducts();
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      return await productService.getProductById(id);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const createProduct = createAsyncThunk(
    'products/createProduct',
    async (productData, { rejectWithValue }) => {
      try {
        const response = await productService.createProduct(productData);
        return response;
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || 'Failed to create product'
        );
      }
    }
  );
  
  export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async ({ id, ...productData }, { rejectWithValue }) => {
      try {
        const response = await productService.updateProduct(id, productData);
        return response;
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || 'Failed to update product'
        );
      }
    }
  );

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      await productService.deleteProduct(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async (query, { rejectWithValue }) => {
    try {
      return await productService.searchProducts(query);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    categories: [],
    selectedProduct: null,
    selectedCategory: null,
    isLoading: false,
    error: null,
    searchResults: []
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelected: (state) => {
      state.selectedProduct = null;
      state.selectedCategory = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Category cases
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.selectedCategory = action.payload;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(cat => cat.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(cat => cat.id !== action.payload);
      })

      /// Fetch Products
    .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  
      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products.push(action.payload);
        state.error = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  
      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.products.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  
      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = state.products.filter(p => p.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //search
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      });
  }
});

export const { clearError, clearSelected } = productSlice.actions;
export default productSlice.reducer;