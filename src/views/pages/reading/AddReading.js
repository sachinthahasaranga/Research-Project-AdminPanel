import React, { useEffect, useState } from 'react';
import {
  CCard, CCardBody, CCardHeader, CCol, CRow,
  CForm, CFormInput, CFormSelect, CButton, CFormTextarea
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../../api';
import Swal from 'sweetalert2';

const AddReading = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    content: '',
    difficultyLevel: '', // Will be "1", "1.2" or "1.5"
    category: ''
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await apiClient.get('/api/ctgry/');
        // Only include categories where categoryType is 'reading'
        setCategories(res.data.filter(cat => cat.categoryType === 'reading'));
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Could not fetch categories.',
        });
      }
    };
    fetchCategories();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Basic validation
    if (!formData.name || !formData.content || !formData.category || !formData.difficultyLevel) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please fill all required fields.',
      });
      setLoading(false);
      return;
    }

    try {
      await apiClient.post('/api/readings/', {
        ...formData,
        difficultyLevel: parseFloat(formData.difficultyLevel), // Send as number
      });

      Swal.fire({
        icon: 'success',
        title: 'Reading Added!',
        text: 'The new reading has been added successfully.',
        showConfirmButton: false,
        timer: 2000,
      });

      setTimeout(() => navigate('/reading-list'), 2000);
    } catch (error) {
      console.error('Error adding reading:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: 'Error occurred while adding the reading.',
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
            <strong>Add New Reading</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              {/* Name */}
              <CRow className="mb-3">
                <CCol md={12}>
                  <CFormInput
                    type="text"
                    name="name"
                    placeholder="Enter Reading Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    label="Reading Name"
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
                    label="Description"
                  />
                </CCol>
              </CRow>

              {/* Content */}
              <CRow className="mb-3">
                <CCol md={12}>
                  <CFormTextarea
                    name="content"
                    placeholder="Enter Reading Content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                    rows={6}
                    label="Content"
                  />
                </CCol>
              </CRow>

              {/* Difficulty Level */}
              <CRow className="mb-3">
                <CCol md={12}>
                  <CFormSelect
                    name="difficultyLevel"
                    value={formData.difficultyLevel}
                    onChange={handleChange}
                    required
                    label="Difficulty Level"
                  >
                    <option value="">-- Select Difficulty --</option>
                    <option value="1">Easy</option>
                    <option value="1.2">Medium</option>
                    <option value="1.5">Hard</option>
                  </CFormSelect>
                </CCol>
              </CRow>

              {/* Category Dropdown */}
              <CRow className="mb-3">
                <CCol md={12}>
                  <CFormSelect
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    label="Select Category"
                  >
                    <option value="">-- Select Category --</option>
                    {categories.map((cat) => (
                      <option value={cat._id} key={cat._id}>
                        {cat.callingName} ({cat.categoryName})
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
              </CRow>

              {/* Submit and Cancel Buttons */}
              <div className="d-flex justify-content-end">
                <CButton type="submit" color="success" disabled={loading}>
                  {loading ? 'Adding...' : 'Submit'}
                </CButton>
                <CButton type="button" color="secondary" className="ms-2" onClick={() => navigate('/reading-list')}>
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

export default AddReading;
