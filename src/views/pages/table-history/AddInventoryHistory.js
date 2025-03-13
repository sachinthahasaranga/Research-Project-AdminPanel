import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CButton,
  CFormSelect
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import apiClient from '../../../api'
import Swal from 'sweetalert2'

const tableTypeEndpoints = {
  'RawMaterial': 'raw-material',
  'PEInventory': 'pe',
  'OuterCover': 'outer-cover',
  'OtherInventory': 'other',
  'InnerCover': 'inner-cover',
  'FinishedProduct': 'finished-product',
  'CartonInventory': 'carton'
}

const AddInventoryHistory = () => {
  const [formData, setFormData] = useState({
    tabletype: '',
    productId: '',
    inbound: '',
    outbound: '',
    date: ''
  })
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleTableTypeChange = async (e) => {
    const selectedTableType = e.target.value
    setFormData({ ...formData, tabletype: selectedTableType, productId: '' })
    setProducts([]) 

    if (selectedTableType) {
      const endpoint = tableTypeEndpoints[selectedTableType] 
      if (!endpoint) return

      try {
        const response = await apiClient.get(`/api/inventory/${endpoint}/`, { withCredentials: true })
        setProducts(response.data) 
      } catch (error) {
        console.error('Error fetching product list:', error)
        setProducts([])
      }
    }
  }

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      await apiClient.post('/api/inventory/inventory-history/add', formData, { withCredentials: true })

      // Show success alert
      Swal.fire({
        icon: 'success',
        title: 'Inventory History Added!',
        text: 'The new inventory history has been successfully added.',
        showConfirmButton: false,
        timer: 2000
      })

      // Redirect after success
      setTimeout(() => navigate('/inventory-history'), 2000)

    } catch (error) {
      console.error('Error adding inventory history:', error)

      // Show error alert
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: 'An error occurred while adding the inventory history.',
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
            <strong>Add Inventory History</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>

              {/* Table Type Dropdown */}
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormSelect
                    name="tabletype"
                    value={formData.tabletype}
                    onChange={handleTableTypeChange}
                    required
                  >
                    <option value="">Select Table Type</option>
                    {Object.keys(tableTypeEndpoints).map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </CFormSelect>
                </CCol>
              
                <CCol md={6}>
                  <CFormSelect
                    name="productId"
                    value={formData.productId}
                    onChange={handleChange}
                    required
                    disabled={!formData.tabletype || products.length === 0}
                  >
                    <option value="">Select Product</option>
                    {products.map((product) => (
                      <option key={product._id} value={product._id}>
                        {product.model} ({product._id})
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
              </CRow>

              {/* Inbound & Outbound Inputs */}
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormInput
                    type="number"
                    name="inbound"
                    placeholder="Enter Inbound Quantity"
                    value={formData.inbound}
                    onChange={handleChange}
                    required
                    label="Inbound"
                  />
                </CCol>
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
              </CRow>

              {/* Date Input */}
              <CRow className="mb-3">
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

              {/* Buttons */}
              <div className="d-flex justify-content-end">
                <CButton type="submit" color="success" disabled={loading || !formData.productId}>
                  {loading ? 'Adding...' : 'Submit'}
                </CButton>
                <CButton type="button" color="secondary" className="ms-2" onClick={() => navigate('/inventory-history')}>
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

export default AddInventoryHistory
