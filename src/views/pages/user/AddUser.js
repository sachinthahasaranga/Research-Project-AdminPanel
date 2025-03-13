import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CButton,
  CFormSelect,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import apiClient from '../../../api'
import Swal from 'sweetalert2' // Import SweetAlert2

const AddUser = () => {
  const [roles, setRoles] = useState([]) // Store roles for dropdown
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    companyName: '',
    roleId: '',
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Fetch available roles from API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await apiClient.get('/api/roles/', { withCredentials: true })
        setRoles(response.data) // Store roles
      } catch (error) {
        console.error('Error fetching roles:', error)
      }
    }
    fetchRoles()
  }, [])

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      await apiClient.post('/api/users/register', formData, { withCredentials: true })

      // Show success alert
      Swal.fire({
        icon: 'success',
        title: 'User Added!',
        text: 'The new user has been successfully registered.',
        showConfirmButton: false,
        timer: 2000 // Auto-close after 2 seconds
      })

      // Redirect after success
      setTimeout(() => navigate('/user-management'), 2000)

    } catch (error) {
      console.error('Error adding user:', error)

      // Show error alert
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed!',
        text: 'An error occurred while registering the user.',
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
            <strong>Add New User</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              {/* Username & Password */}
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    name="username"
                    placeholder="Enter Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    label="Username"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    label="Password"
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

              {/* Button container - Align buttons to the right */}
              <div className="d-flex justify-content-end">
                <CButton type="submit" color="success" disabled={loading}>
                  {loading ? 'Adding...' : 'Submit'}
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

export default AddUser
