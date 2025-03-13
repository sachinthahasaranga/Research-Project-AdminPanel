import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CForm, CFormInput, CButton, CFormSelect } from '@coreui/react'
import { useNavigate, useParams } from 'react-router-dom'
import apiClient from '../../../api'
import Swal from 'sweetalert2' // Import SweetAlert2

const UpdateUser = () => {
  const { id } = useParams() // Get user ID from URL
  const [roles, setRoles] = useState([]) // Store roles for dropdown
  const [formData, setFormData] = useState({
    password: '',
    firstName: '',
    lastName: '',
    companyName: '',
    roleId: '',
    status: 1,
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Fetch user and roles when component loads
  useEffect(() => {
    fetchUser()
    fetchRoles()
  }, [id])

  // Fetch user data
  const fetchUser = async () => {
    try {
      const response = await apiClient.get(`/api/users/${id}`, { withCredentials: true })
      const userData = response.data
      setFormData({
        password: '',
        firstName: userData.firstName,
        lastName: userData.lastName,
        companyName: userData.companyName,
        roleId: userData.roleId?._id || '',
        status: userData.status,
      })
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }

  // Fetch roles for dropdown
  const fetchRoles = async () => {
    try {
      const response = await apiClient.get('/api/roles/', { withCredentials: true })
      setRoles(response.data)
    } catch (error) {
      console.error('Error fetching roles:', error)
    }
  }

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      await apiClient.put(`/api/users/update/${id}`, formData, { withCredentials: true })

      // Show success alert
      Swal.fire({
        icon: 'success',
        title: 'User Updated!',
        text: 'The user details have been updated successfully.',
        showConfirmButton: false,
        timer: 2000 // Auto-close after 2 seconds
      })

      // Redirect after success
      setTimeout(() => navigate('/user-management'), 2000)

    } catch (error) {
      console.error('Error updating user:', error)

      // Show error alert
      Swal.fire({
        icon: 'error',
        title: 'Update Failed!',
        text: 'An error occurred while updating the user.',
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
            <strong>Update User</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              {/* Password Field */}
              <CRow className="mb-3">
                <CCol md={12}>
                  <CFormInput
                    type="password"
                    name="password"
                    placeholder="Enter New Password (Leave empty to keep the same)"
                    value={formData.password}
                    onChange={handleChange}
                    label="New Password"
                  />
                </CCol>
              </CRow>

              {/* First Name & Last Name */}
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    name="firstName"
                    placeholder="Enter First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    label="First Name"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    name="lastName"
                    placeholder="Enter Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    label="Last Name"
                  />
                </CCol>
              </CRow>

              {/* Company Name & Role Selection */}
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    name="companyName"
                    placeholder="Enter Company Name"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    label="Company Name"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormSelect
                    name="roleId"
                    value={formData.roleId}
                    onChange={handleChange}
                    required
                    label="Select Role"
                  >
                    <option value="">-- Select Role --</option>
                    {roles.map((role) => (
                      <option key={role._id} value={role._id}>
                        {role.rolename}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
              </CRow>

              {/* Status Dropdown */}
              <CRow className="mb-3">
                <CCol md={12}>
                  <CFormSelect
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                    label="Status"
                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </CFormSelect>
                </CCol>
              </CRow>

              {/* Button container - Align buttons to the right */}
              <div className="d-flex justify-content-end">
                <CButton type="submit" color="success" disabled={loading}>
                  {loading ? 'Updating...' : 'Update'}
                </CButton>
                <CButton type="button" color="secondary" className="ms-2" onClick={() => navigate('/user-management')}>
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

export default UpdateUser
