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

const CartonInventoryTable = () => {
  const [cartons, setCartons] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchCartons()
  }, [])

  // Fetch carton inventory from API
  const fetchCartons = async () => {
    try {
      const response = await apiClient.get('/api/inventory/carton/', { withCredentials: true })
      setCartons(response.data)
    } catch (error) {
      console.error('Error fetching carton inventory:', error)
    } finally {
      setLoading(false)
    }
  }

  // Delete carton function
  const handleDelete = async (cartonId) => {
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
          await apiClient.delete(`/api/inventory/carton/delete/${cartonId}`, { withCredentials: true })
          Swal.fire('Deleted!', 'The carton inventory has been deleted.', 'success')
          fetchCartons() // Refresh table after deletion
        } catch (error) {
          console.error('Error deleting carton inventory:', error)
          Swal.fire('Error!', 'Failed to delete carton inventory.', 'error')
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
              <strong>Carton Inventory</strong> <small>List of Carton Inventory</small>
            </div>
            <CButton color="primary" onClick={() => navigate('/add-carton')}>
              + Add New Carton
            </CButton>
          </CCardHeader>
          <CCardBody>
            {loading ? (
              <p>Loading carton inventory...</p>
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
                  {cartons.map((carton, index) => (
                    <CTableRow key={carton._id}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{carton.model}</CTableDataCell>
                      <CTableDataCell>{carton.specifications}</CTableDataCell>
                      <CTableDataCell>{carton.unit}</CTableDataCell>
                      <CTableDataCell>{carton.inventory_balance}</CTableDataCell>
                      <CTableDataCell>{carton.current_stock}</CTableDataCell>
                      <CTableDataCell>{carton.warehousing}</CTableDataCell>
                      <CTableDataCell>{carton.outbound}</CTableDataCell>
                      <CTableDataCell>{new Date(carton.date).toLocaleDateString()}</CTableDataCell>
                      <CTableDataCell>
                        <FaEdit
                          style={{ cursor: 'pointer', color: 'gray', marginRight: '10px' }}
                          onClick={() => navigate(`/update-carton/${carton._id}`)}
                        />
                        <FaTrash
                          style={{ cursor: 'pointer', color: 'red' }}
                          onClick={() => handleDelete(carton._id)}
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

export default CartonInventoryTable
