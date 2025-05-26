import React, { useEffect, useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CButton,
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import apiClient from '../../../api';
import Swal from 'sweetalert2';

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await apiClient.get('/api/ctgry/');
      setCategories(response.data); 
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (categoryId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiClient.delete(`/api/ctgry/${categoryId}`);
          Swal.fire('Deleted!', 'The category has been successfully deleted.', 'success');
          fetchCategories(); 
        } catch (error) {
          console.error('Error deleting category:', error);
          Swal.fire('Error!', 'Failed to delete category.', 'error');
        }
      }
    });
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <div>
              <strong>Category Management</strong> <small>List of Categories</small>
            </div>
            <CButton color="primary" onClick={() => navigate('/add-category')}>
              + Add New Category
            </CButton>
          </CCardHeader>
          <CCardBody>
            {loading ? (
              <p>Loading categories...</p>
            ) : (
              <CTable striped hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Category Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Calling Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Background Image</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Type</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Created At</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {categories.map((category, index) => (
                    <CTableRow key={category._id}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{category.categoryName}</CTableDataCell>
                      <CTableDataCell>{category.callingName}</CTableDataCell>
                      <CTableDataCell>{category.description}</CTableDataCell>
                      <CTableDataCell>
                        <img src={category.backgroundImage} alt="Background" width="50" height="50" />
                      </CTableDataCell>
                      <CTableDataCell>{category.categoryType}</CTableDataCell>
                      <CTableDataCell>{new Date(category.createdAt).toLocaleDateString()}</CTableDataCell>
                      <CTableDataCell>
                        <FaEdit
                          style={{ cursor: 'pointer', color: 'gray', marginRight: '10px' }}
                          onClick={() => navigate(`/update-category/${category._id}`)}
                        />
                        <FaTrash
                          style={{ cursor: 'pointer', color: 'red' }}
                          onClick={() => handleDelete(category._id)}
                        />
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default CategoryTable;
