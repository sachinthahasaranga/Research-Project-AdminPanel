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
import '../../css/Usertable.css'

const UserTable = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchUsers()
  }, [])

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const response = await apiClient.get('/api/users/', { withCredentials: true })
      setUsers(response.data)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)

    }
  }

  // Delete user function
  const handleDelete = async (userId) => {
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
          await apiClient.delete(`/api/users/delete/${userId}`, { withCredentials: true })
          Swal.fire('Deleted!', 'The user has been deleted.', 'success')
          fetchUsers() // Refresh table after deletion
        } catch (error) {
          console.error('Error deleting user:', error)
          Swal.fire('Error!', 'Failed to delete user.', 'error')
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
              <strong>User Management</strong> <small>List of Users</small>
            </div>
            <CButton color="primary" onClick={() => navigate('/add-user')}>
              + Add New User
            </CButton>
          </CCardHeader>
          <CCardBody>
            {loading ? (
              <p>Loading users...</p>
            ) : (
              <CTable striped hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Username</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Full Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Company</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Role</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Created At</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {users.map((user, index) => (
                    <CTableRow key={user._id}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{user.username}</CTableDataCell>
                      <CTableDataCell>{user.firstName} {user.lastName}</CTableDataCell>
                      <CTableDataCell>{user.companyName}</CTableDataCell>
                      <CTableDataCell>{user.roleId?.rolename || 'N/A'}</CTableDataCell>
                      <CTableDataCell>
                        <span className={user.status === 1 ? 'role-active' : 'role-inactive'}>
                          {user.status === 1 ? 'Active' : 'Inactive'}
                        </span>
                      </CTableDataCell>
                      <CTableDataCell>{new Date(user.createdAt).toLocaleDateString()}</CTableDataCell>
                      <CTableDataCell>
                        <FaEdit
                          style={{ cursor: 'pointer', color: 'gray', marginRight: '10px' }}
                          onClick={() => navigate(`/update-user/${user._id}`)}
                        />
                        <FaTrash
                          style={{ cursor: 'pointer', color: 'red' }}
                          onClick={() => handleDelete(user._id)}
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

export default UserTable
