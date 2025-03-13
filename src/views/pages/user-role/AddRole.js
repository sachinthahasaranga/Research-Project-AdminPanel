import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CForm, CFormInput, CButton } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import apiClient from '../../../api'
import Swal from 'sweetalert2' // Import SweetAlert2

const AddRole = () => {
  const [roleName, setRoleName] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      await apiClient.post('/api/roles/add', { rolename: roleName } , {withCredentials: true})
      
      // Show success alert
      Swal.fire({
        icon: 'success',
        title: 'Role Added!',
        text: 'The new role has been added successfully.',
        showConfirmButton: false,
        timer: 2000 // Auto-close after 2 seconds
      })

      // Redirect after delay
      setTimeout(() => navigate('/user-role-management'), 2000)

    } catch (error) {
      console.error('Error adding role:', error)
      
      // Show error alert
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: 'Error occurred while adding the role.',
        confirmButtonColor: '#d33'
      })
      
    } finally {
      setLoading(false)
    }
  }

  return (
    <CRow>
      <CCol xs={12} md={12} className="mx-auto">
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add New Role</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CFormInput
                type="text"
                placeholder="Enter Role Name"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                required
                className="mb-3"
              />
              {/* Button container - Align buttons to the right */}
              <div className="d-flex justify-content-end">
                <CButton type="submit" color="success" disabled={loading}>
                  {loading ? 'Adding...' : 'Submit'}
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

export default AddRole
