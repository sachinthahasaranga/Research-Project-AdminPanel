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

const InnerCoverTable = () => {
  const [covers, setCovers] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchCovers()
  }, [])

  // Fetch inner covers from API
  const fetchCovers = async () => {
    try {
      const response = await apiClient.get('/api/inventory/inner-cover/', { withCredentials: true })
      setCovers(response.data)
    } catch (error) {
      console.error('Error fetching inner covers:', error)
    } finally {
      setLoading(false)
    }
  }

  // Delete cover function
  const handleDelete = async (coverId) => {
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
          await apiClient.delete(`/api/inventory/inner-cover/delete/${coverId}`, { withCredentials: true })
          Swal.fire('Deleted!', 'The inner cover has been deleted.', 'success')
          fetchCovers() // Refresh table after deletion
        } catch (error) {
          console.error('Error deleting inner cover:', error)
          Swal.fire('Error!', 'Failed to delete inner cover.', 'error')
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
              <strong>Inner Cover Inventory</strong> <small>List of Inner Covers</small>
            </div>
            <CButton color="primary" onClick={() => navigate('/add-inner-cover')}>
              + Add New Inner Cover
            </CButton>
          </CCardHeader>
          <CCardBody>
            {loading ? (
              <p>Loading inner covers...</p>
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
                  {covers.map((cover, index) => (
                    <CTableRow key={cover._id}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{cover.model}</CTableDataCell>
                      <CTableDataCell>{cover.specifications}</CTableDataCell>
                      <CTableDataCell>{cover.unit}</CTableDataCell>
                      <CTableDataCell>{cover.inventory_balance}</CTableDataCell>
                      <CTableDataCell>{cover.current_stock}</CTableDataCell>
                      <CTableDataCell>{cover.warehousing}</CTableDataCell>
                      <CTableDataCell>{cover.outbound}</CTableDataCell>
                      <CTableDataCell>{new Date(cover.date).toLocaleDateString()}</CTableDataCell>
                      <CTableDataCell>
                        <FaEdit
                          style={{ cursor: 'pointer', color: 'gray', marginRight: '10px' }}
                          onClick={() => navigate(`/update-inner-cover/${cover._id}`)}
                        />
                        <FaTrash
                          style={{ cursor: 'pointer', color: 'red' }}
                          onClick={() => handleDelete(cover._id)}
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

export default InnerCoverTable
