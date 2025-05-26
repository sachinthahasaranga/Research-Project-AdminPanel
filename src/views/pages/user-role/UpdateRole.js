import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CForm, CFormInput, CButton, CFormSelect } from '@coreui/react'
import { useNavigate, useParams } from 'react-router-dom'
import apiClient from '../../../api'
import Swal from 'sweetalert2' // Import SweetAlert2

const UpdateRole = () => {
  const { id } = useParams() // Get role ID from URL
  const [roleName, setRoleName] = useState('')
  const [status, setStatus] = useState(1) // Default to Active
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Fetch existing role data using new endpoint
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await apiClient.get(`/api/user-roles/${id}`)
        setRoleName(response.data.name)
        setStatus(response.data.status)
      } catch (error) {
        console.error('Error fetching role:', error)
      }
    }

    fetchRole()
  }, [id])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      // Update role using new API endpoint and payload structure
      await apiClient.put(`/api/user-roles/${id}`, { name: roleName, status: Number(status) })

      // Show success alert
      Swal.fire({
        icon: 'success',
        title: 'Role Updated!',
        text: 'The role has been updated successfully.',
        showConfirmButton: false,
        timer: 2000 // Auto-close after 2 seconds
      })

      // Redirect after delay
      setTimeout(() => navigate('/user-role-management'), 2000)

    } catch (error) {
      console.error('Error updating role:', error)
      
      // Show error alert
      Swal.fire({
        icon: 'error',
        title: 'Update Failed!',
        text: 'Error occurred while updating the role.',
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
            <strong>Update Role</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              {/* Row for Role Name and Status */}
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    placeholder="Enter Role Name"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    required
                    label="Role Name"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormSelect
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
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
                <CButton type="button" color="secondary" className="ms-2" onClick={() => navigate('/user-role-management')}>
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

export default UpdateRole
