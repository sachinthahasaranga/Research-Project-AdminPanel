import React, { useState } from 'react';
import {
  CCard, CCardBody, CCardHeader, CCol, CRow,
  CForm, CFormInput, CFormSelect, CButton
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../../api';
import Swal from 'sweetalert2';

const AddCategory = () => {
  const [formData, setFormData] = useState({
    categoryName: '',
    callingName: '',
    description: '',
    categoryType: '',
  });

  const [backgroundImageFile, setBackgroundImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input
  const handleFileChange = (e) => {
    setBackgroundImageFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      if (backgroundImageFile) data.append('backgroundImage', backgroundImageFile);

      await apiClient.post('/api/ctgry/', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      Swal.fire({
        icon: 'success',
        title: 'Category Added!',
        text: 'The new category has been added successfully.',
        showConfirmButton: false,
        timer: 2000,
      });

      setTimeout(() => navigate('/categorylist'), 2000);
    } catch (error) {
      console.error('Error adding category:', error);
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
            <CForm onSubmit={handleSubmit} encType="multipart/form-data">

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

              {/* Background Image Upload */}
              <CRow className="mb-3">
                <CCol md={12}>
                  <label htmlFor="backgroundImage" className="form-label">
                    Background Image (Upload)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    id="backgroundImage"
                    name="backgroundImage"
                    onChange={handleFileChange}
                    required
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
                    <option value="listing">Listing</option>
                    <option value="story">Story</option>
                    <option value="reading">Reading</option>
                  </CFormSelect>
                </CCol>
              </CRow>

              {/* Submit and Cancel Buttons */}
              <div className="d-flex justify-content-end">
                <CButton type="submit" color="success" disabled={loading}>
                  {loading ? 'Adding...' : 'Submit'}
                </CButton>
                <CButton type="button" color="secondary" className="ms-2" onClick={() => navigate('/categorylist')}>
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
