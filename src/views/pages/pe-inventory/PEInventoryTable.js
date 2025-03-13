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

const PEInventoryTable = () => {
  const [peInventory, setPEInventory] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchPEInventory()
  }, [])

  // Fetch PE inventory from API
  const fetchPEInventory = async () => {
    try {
      const response = await apiClient.get('/api/inventory/pe/', { withCredentials: true })
      setPEInventory(response.data)
    } catch (error) {
      console.error('Error fetching PE inventory:', error)
    } finally {
      setLoading(false)
    }
  }

  // Delete PE item function
  const handleDelete = async (peId) => {
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
          await apiClient.delete(`/api/inventory/pe/delete/${peId}`, { withCredentials: true })
          Swal.fire('Deleted!', 'The PE inventory item has been deleted.', 'success')
          fetchPEInventory() // Refresh table after deletion
        } catch (error) {
          console.error('Error deleting PE inventory item:', error)
          Swal.fire('Error!', 'Failed to delete the PE inventory item.', 'error')
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
              <strong>PE Inventory</strong> <small>List of PE Inventory Items</small>
            </div>
            <CButton color="primary" onClick={() => navigate('/add-pe')}>
              + Add New PE
            </CButton>
          </CCardHeader>
          <CCardBody>
            {loading ? (
              <p>Loading PE inventory...</p>
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
                  {peInventory.map((item, index) => (
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
                          onClick={() => navigate(`/update-pe/${item._id}`)}
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

export default PEInventoryTable
