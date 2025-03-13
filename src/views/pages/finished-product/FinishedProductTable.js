import React, { useEffect, useState } from 'react'
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
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { FaEdit, FaTrash } from 'react-icons/fa'
import apiClient from '../../../api'
import Swal from 'sweetalert2'

const FinishedProductTable = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchProducts()
  }, [])

  // Fetch finished products from API
  const fetchProducts = async () => {
    try {
      const response = await apiClient.get('/api/inventory/finished-product/', { withCredentials: true })
      setProducts(response.data)
    } catch (error) {
      console.error('Error fetching finished products:', error)
    } finally {
      setLoading(false)
    }
  }

  // Delete finished product function
  const handleDelete = async (productId) => {
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
          await apiClient.delete(`/api/inventory/finished-product/delete/${productId}`, { withCredentials: true })
          Swal.fire('Deleted!', 'The finished product has been deleted.', 'success')
          fetchProducts() // Refresh table after deletion
        } catch (error) {
          console.error('Error deleting finished product:', error)
          Swal.fire('Error!', 'Failed to delete finished product.', 'error')
        }
      }
    })
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <div>
              <strong>Finished Product Inventory</strong> <small>List of Finished Products</small>
            </div>
            <CButton color="primary" onClick={() => navigate('/add-finished-product')}>
              + Add New Finished Product
            </CButton>
          </CCardHeader>
          <CCardBody>
            {loading ? (
              <p>Loading finished products...</p>
            ) : (
              <CTable striped hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Model</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Specifications</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Unit</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Stock Balance</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Current Stock</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Warehousing</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Outbound</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {products.map((product, index) => (
                    <CTableRow key={product._id}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{product.model}</CTableDataCell>
                      <CTableDataCell>{product.specifications}</CTableDataCell>
                      <CTableDataCell>{product.unit}</CTableDataCell>
                      <CTableDataCell>{product.inventory_balance}</CTableDataCell>
                      <CTableDataCell>{product.current_stock}</CTableDataCell>
                      <CTableDataCell>{product.warehousing}</CTableDataCell>
                      <CTableDataCell>{product.outbound}</CTableDataCell>
                      <CTableDataCell>{new Date(product.date).toLocaleDateString()}</CTableDataCell>
                      <CTableDataCell>
                        <FaEdit
                          style={{ cursor: 'pointer', color: 'gray', marginRight: '10px' }}
                          onClick={() => navigate(`/update-finished-product/${product._id}`)}
                        />
                        <FaTrash
                          style={{ cursor: 'pointer', color: 'red' }}
                          onClick={() => handleDelete(product._id)}
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
  )
}

export default FinishedProductTable
