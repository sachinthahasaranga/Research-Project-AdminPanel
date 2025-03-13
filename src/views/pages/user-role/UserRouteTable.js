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
import Swal from 'sweetalert2' // Import SweetAlert2
import '../../css/Usertable.css'

const UserRoleTable = () => {
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchRoles()
  }, [])

  // Fetch roles from API
  const fetchRoles = async () => {
    try {
      const response = await apiClient.get('/api/roles/', {withCredentials: true})
      setRoles(response.data)
    } catch (error) {
      console.error('Error fetching roles:', error)
    } finally {
      setLoading(false)
    }
  }

  // Delete role function
  const handleDelete = async (roleId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiClient.delete(`/api/roles/delete/${roleId}`,{withCredentials: true})
          Swal.fire('Deleted!', 'The role has been deleted.', 'success')
          fetchRoles() // Refresh table after deletion
        } catch (error) {
          console.error('Error deleting role:', error)
          Swal.fire('Error!', 'Failed to delete role.', 'error')
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
              <strong>Role Management</strong> <small>List of User Roles</small>
            </div>
            <CButton color="primary" onClick={() => navigate('/add-role')}>
              + Add New Role
            </CButton>
          </CCardHeader>
          <CCardBody>
            {loading ? (
              <p>Loading roles...</p>
            ) : (
              <CTable striped hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ display: 'none' }}>ID</CTableHeaderCell> {/* Hidden Column */}
                    <CTableHeaderCell scope="col">Role Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Created At</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {roles.map((role, index) => (
                    <CTableRow key={role._id}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell style={{ display: 'none' }}>{role._id}</CTableDataCell> {/* Hidden Column */}
                      <CTableDataCell>{role.rolename}</CTableDataCell>
                      <CTableDataCell>
                        <span className={role.status === 1 ? 'role-active' : 'role-inactive'}>
                          {role.status === 1 ? 'Active' : 'Inactive'}
                        </span>
                      </CTableDataCell>
                      <CTableDataCell>{new Date(role.createdAt).toLocaleDateString()}</CTableDataCell>
                      <CTableDataCell>
                        <FaEdit
                          style={{ cursor: 'pointer', color: 'gray', marginRight: '10px' }}
                          onClick={() => navigate(`/update-role/${role._id}`)} // Navigate to update page
                        />
                        <FaTrash
                          style={{ cursor: 'pointer', color: 'red' }}
                          onClick={() => handleDelete(role._id)} // Delete function
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

export default UserRoleTable
