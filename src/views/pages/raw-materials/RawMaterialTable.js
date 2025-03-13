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

const RawMaterialTable = () => {
  const [materials, setMaterials] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchMaterials()
  }, [])

  // Fetch raw materials from API
  const fetchMaterials = async () => {
    try {
      const response = await apiClient.get('/api/inventory/raw-material/', { withCredentials: true })
      setMaterials(response.data)
    } catch (error) {
      console.error('Error fetching raw materials:', error)
    } finally {
      setLoading(false)
    }
  }

  // Delete material function
  const handleDelete = async (materialId) => {
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
          await apiClient.delete(`/api/inventory/raw-material/delete/${materialId}`, { withCredentials: true })
          Swal.fire('Deleted!', 'The raw material has been deleted.', 'success')
          fetchMaterials() // Refresh table after deletion
        } catch (error) {
          console.error('Error deleting raw material:', error)
          Swal.fire('Error!', 'Failed to delete raw material.', 'error')
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
              <strong>Raw Material Inventory</strong> <small>List of Raw Materials</small>
            </div>
            <CButton color="primary" onClick={() => navigate('/add-raw-material')}>
              + Add New Raw Material
            </CButton>
          </CCardHeader>
          <CCardBody>
            {loading ? (
              <p>Loading raw materials...</p>
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
                  {materials.map((material, index) => (
                    <CTableRow key={material._id}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{material.model}</CTableDataCell>
                      <CTableDataCell>{material.specifications}</CTableDataCell>
                      <CTableDataCell>{material.unit}</CTableDataCell>
                      <CTableDataCell>{material.inventory_balance}</CTableDataCell>
                      <CTableDataCell>{material.current_stock}</CTableDataCell>
                      <CTableDataCell>{material.warehousing}</CTableDataCell>
                      <CTableDataCell>{material.outbound}</CTableDataCell>
                      <CTableDataCell>{new Date(material.date).toLocaleDateString()}</CTableDataCell>
                      <CTableDataCell>
                        <FaEdit
                          style={{ cursor: 'pointer', color: 'gray', marginRight: '10px' }}
                          onClick={() => navigate(`/update-raw-material/${material._id}`)}
                        />
                        <FaTrash
                          style={{ cursor: 'pointer', color: 'red' }}
                          onClick={() => handleDelete(material._id)}
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

export default RawMaterialTable
