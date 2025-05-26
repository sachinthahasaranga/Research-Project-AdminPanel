import React, { useState, useEffect } from 'react';
import {
  CCard, CCardBody, CCardHeader, CCol, CRow,
  CForm, CFormInput, CFormSelect, CButton
} from '@coreui/react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../../../api';
import Swal from 'sweetalert2';

const UpdateCategory = () => {
  const [formData, setFormData] = useState({
    categoryName: '',
    callingName: '',
    description: '',
    categoryType: '',
  });

  const [backgroundImageFile, setBackgroundImageFile] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // expects your route to be like /update-category/:id

  // Fetch current category details
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await apiClient.get(`/api/ctgry/${id}`);
        setFormData({
          categoryName: res.data.categoryName || '',
          callingName: res.data.callingName || '',
          description: res.data.description || '',
          categoryType: res.data.categoryType || '',
        });
        setExistingImageUrl(res.data.backgroundImage || '');
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Not Found',
          text: 'Unable to load category data.',
        });
        navigate('/categorylist');
      }
    };
    fetchCategory();
    // eslint-disable-next-line
  }, [id]);

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

      await apiClient.put(`/api/ctgry/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      Swal.fire({
        icon: 'success',
        title: 'Category Updated!',
        text: 'The category has been updated successfully.',
        showConfirmButton: false,
        timer: 2000,
      });

      setTimeout(() => navigate('/categorylist'), 2000);
    } catch (error) {
      console.error('Error updating category:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: 'Error occurred while updating the category.',
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
            <strong>Update Category</strong>
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

              {/* Existing Image Preview */}
              {existingImageUrl && (
                <CRow className="mb-3">
                  <CCol md={12}>
                    <label className="form-label">Current Background Image:</label>
                    <div>
                      <img src={existingImageUrl} alt="Current Background" style={{ maxHeight: 100, borderRadius: 8, marginBottom: 10 }} />
                    </div>
                  </CCol>
                </CRow>
              )}

              {/* Background Image Upload */}
              <CRow className="mb-3">
                <CCol md={12}>
                  <label htmlFor="backgroundImage" className="form-label">
                    {existingImageUrl ? "Change Background Image (Optional)" : "Background Image (Upload)"}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    id="backgroundImage"
                    name="backgroundImage"
                    onChange={handleFileChange}
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
                  {loading ? 'Updating...' : 'Update'}
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

export default UpdateCategory;
