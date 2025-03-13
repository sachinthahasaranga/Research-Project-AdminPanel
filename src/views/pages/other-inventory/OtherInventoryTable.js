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

const OtherInventoryTable = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchOtherInventory()
  }, [])

  // Fetch other inventory from API
  const fetchOtherInventory = async () => {
    try {
      const response = await apiClient.get('/api/inventory/other/', { withCredentials: true })
      setItems(response.data)
    } catch (error) {
      console.error('Error fetching other inventory:', error)
    } finally {
      setLoading(false)
    }
  }

  // Delete inventory item function
  const handleDelete = async (itemId) => {
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
          await apiClient.delete(`/api/inventory/other/delete/${itemId}`, { withCredentials: true })
          Swal.fire('Deleted!', 'The item has been deleted.', 'success')
          fetchOtherInventory() // Refresh table after deletion
        } catch (error) {
          console.error('Error deleting item:', error)
          Swal.fire('Error!', 'Failed to delete item.', 'error')
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
              <strong>Other Inventory</strong> <small>List of Other Items</small>
            </div>
            <CButton color="primary" onClick={() => navigate('/add-other-inventory')}>
              + Add New Item
            </CButton>
          </CCardHeader>
          <CCardBody>
            {loading ? (
              <p>Loading inventory...</p>
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
                  {items.map((item, index) => (
                    <CTableRow key={item._id}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{item.model}</CTableDataCell>
                      <CTableDataCell>{item.specifications}</CTableDataCell>
                      <CTableDataCell>{item.unit}</CTableDataCell>
                      <CTableDataCell>{item.inventory_balance}</CTableDataCell>
                      <CTableDataCell>{item.current_stock}</CTableDataCell>
                      <CTableDataCell>{item.warehousing}</CTableDataCell>
                      <CTableDataCell>{item.outbound}</CTableDataCell>
                      <CTableDataCell>{new Date(item.date).toLocaleDateString()}</CTableDataCell>
                      <CTableDataCell>
                        <FaEdit
                          style={{ cursor: 'pointer', color: 'gray', marginRight: '10px' }}
                          onClick={() => navigate(`/update-other-inventory/${item._id}`)}
                        />
                        <FaTrash
                          style={{ cursor: 'pointer', color: 'red' }}
                          onClick={() => handleDelete(item._id)}
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

export default OtherInventoryTable
