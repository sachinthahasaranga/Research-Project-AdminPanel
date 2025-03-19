import React, { useState } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CForm, CFormInput, CFormSelect, CButton } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../../api';
import Swal from 'sweetalert2'; // Import SweetAlert2

const AddCategory = () => {
  const [formData, setFormData] = useState({
    categoryName: '',
    callingName: '',
    description: '',
    backgroundImage: '',
    categoryType: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await apiClient.post('/api/ctgry/', formData);

      // Show success alert
      Swal.fire({
        icon: 'success',
        title: 'Category Added!',
        text: 'The new category has been added successfully.',
        showConfirmButton: false,
        timer: 2000, // Auto-close after 2 seconds
      });

      // Redirect after delay
      setTimeout(() => navigate('/category-management'), 2000);
    } catch (error) {
      console.error('Error adding category:', error);

      // Show error alert
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: 'Error occurred while adding the category.',
        confirmButtonColor: '#d33',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <CRow>
      <CCol xs={12} md={10} lg={8} className="mx-auto">
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add New Category</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>

              {/* Category Name */}
              <CRow className="mb-3">
                <CCol md={12}>
                  <CFormInput
                    type="text"
                    name="categoryName"
                    placeholder="Enter Category Name"
                    value={formData.categoryName}
                    onChange={handleChange}
                    required
                    label="Category Name"
                  />
                </CCol>
              </CRow>

              {/* Calling Name */}
              <CRow className="mb-3">
                <CCol md={12}>
                  <CFormInput
                    type="text"
                    name="callingName"
                    placeholder="Enter Calling Name"
                    value={formData.callingName}
                    onChange={handleChange}
                    required
                    label="Calling Name"
                  />
                </CCol>
              </CRow>

              {/* Description */}
              <CRow className="mb-3">
                <CCol md={12}>
                  <CFormInput
                    type="text"
                    name="description"
                    placeholder="Enter Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    label="Description"
                  />
                </CCol>
              </CRow>

              {/* Background Image URL */}
              <CRow className="mb-3">
                <CCol md={12}>
                  <CFormInput
                    type="text"
                    name="backgroundImage"
                    placeholder="Enter Background Image URL"
                    value={formData.backgroundImage}
                    onChange={handleChange}
                    required
                    label="Background Image URL"
                  />
                </CCol>
              </CRow>

              {/* Category Type Dropdown */}
              <CRow className="mb-3">
                <CCol md={12}>
                  <CFormSelect
                    name="categoryType"
                    value={formData.categoryType}
                    onChange={handleChange}
                    required
                    label="Select Category Type"
                  >
                    <option value="">-- Select Category Type --</option>
                    <option value="lecture">Lecture</option>
                    <option value="paper">Paper</option>
                    <option value="voice">Voice</option>
                    <option value="story">Story</option>
                  </CFormSelect>
                </CCol>
              </CRow>

              {/* Submit and Cancel Buttons */}
              <div className="d-flex justify-content-end">
                <CButton type="submit" color="success" disabled={loading}>
                  {loading ? 'Adding...' : 'Submit'}
                </CButton>
                <CButton type="button" color="secondary" className="ms-2" onClick={() => navigate('/category-management')}>
                  Cancel
                </CButton>
              </div>

            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default AddCategory;
