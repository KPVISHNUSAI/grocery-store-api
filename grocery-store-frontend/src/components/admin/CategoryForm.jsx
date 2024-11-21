// src/components/admin/CategoryForm.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCategory, updateCategory } from '../../features/products/productSlice';

const CategoryForm = ({ category = null, onClose }) => {
  const [formData, setFormData] = useState({
    name: category?.name || '',
    description: category?.description || ''
  });

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (category) {
        await dispatch(updateCategory({ id: category.id, ...formData })).unwrap();
      } else {
        await dispatch(createCategory(formData)).unwrap();
      }
      onClose();
    } catch (err) {
      console.error('Failed to save category:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows="3"
        />
      </div>
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {category ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;