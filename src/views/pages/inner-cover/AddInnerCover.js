import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CButton,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import apiClient from '../../../api'
import Swal from 'sweetalert2' // Import SweetAlert2

const AddInnerCover = () => {
  const [formData, setFormData] = useState({
    model: '',
    specifications: '',
    unit: '',
    inventory_balance: '',
    current_stock: '',
    date: '',
    warehousing: '',
    outbound: '',
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      await apiClient.post('/api/inventory/inner-cover/add', formData, { withCredentials: true })

      // Show success alert
      Swal.fire({
        icon: 'success',
        title: 'Inner Cover Added!',
        text: 'The new inner cover has been successfully added.',
        showConfirmButton: false,
        timer: 2000 // Auto-close after 2 seconds
      })

      // Redirect after success
      setTimeout(() => navigate('/inner-cover-inventory'), 2000)

    } catch (error) {
      console.error('Error adding inner cover:', error)

      // Show error alert
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: 'An error occurred while adding the inner cover.',
        confirmButtonColor: '#d33'
      })

    } finally {
      setLoading(false)
    }
  }

  return (
    <CRow>
      <CCol xs={12} md={12} lg={12} className="mx-auto">
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add New Inner Cover</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              {/* Model & Specifications */}
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    name="model"
                    placeholder="Enter Model"
                    value={formData.model}
                    onChange={handleChange}
                    required
                    label="Model"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    name="specifications"
                    placeholder="Enter Specifications"
                    value={formData.specifications}
                    onChange={handleChange}
                    required
                    label="Specifications"
                  />
                </CCol>
              </CRow>

              {/* Unit & Inventory Balance */}
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    name="unit"
                    placeholder="Enter Unit (e.g., Kg, L)"
                    value={formData.unit}
                    onChange={handleChange}
                    required
                    label="Unit"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="number"
                    name="inventory_balance"
                    placeholder="Enter Inventory Balance"
                    value={formData.inventory_balance}
                    onChange={handleChange}
                    required
                    label="Inventory Balance"
                  />
                </CCol>
              </CRow>

              {/* Current Stock & Warehousing */}
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormInput
                    type="number"
                    name="current_stock"
                    placeholder="Enter Current Stock"
                    value={formData.current_stock}
                    onChange={handleChange}
                    required
                    label="Current Stock"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="number"
                    name="warehousing"
                    placeholder="Enter Warehousing Amount"
                    value={formData.warehousing}
                    onChange={handleChange}
                    required
                    label="Warehousing"
                  />
                </CCol>
              </CRow>

              {/* Outbound & Date */}
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormInput
                    type="number"
                    name="outbound"
                    placeholder="Enter Outbound Quantity"
                    value={formData.outbound}
                    onChange={handleChange}
                    required
                    label="Outbound"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    label="Date"
                  />
                </CCol>
              </CRow>

              {/* Button container - Align buttons to the right */}
              <div className="d-flex justify-content-end">
                <CButton type="submit" color="success" disabled={loading}>
                  {loading ? 'Adding...' : 'Submit'}
                </CButton>
                <CButton type="button" color="secondary" className="ms-2" onClick={() => navigate('/inner-cover-inventory')}>
                  Cancel
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddInnerCover
