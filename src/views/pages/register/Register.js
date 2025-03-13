import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  
} from '@coreui/react'
import { FaBuilding } from "react-icons/fa";
import { MdBusiness } from "react-icons/md";
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [company, setCompany] = useState('')
    const [modalVisible, setModalVisible] = useState(false)

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log(username)
      console.log(password)
      try{
  
        const result = await register({ username, password, firstName, lastName, company})

        if(result === 201){
          console.log("Success")
          setModalVisible(true)
        }
        
  
  
      }catch(error){
        console.error(error)
      }
    }

    const closeModal = () => {
      setModalVisible(false)
      
      navigate("/login")
    }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      {/* <CIcon icon={cilUser} /> */}
                    </CInputGroupText>
                    <CFormInput placeholder="Username" autoComplete="username" value={username}
                        onChange={(e) => setUsername(e.target.value)}/>
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      {/* <CIcon icon={cilUser} /> */}
                    </CInputGroupText>
                    <CFormInput placeholder="First Name" autoComplete="First Name" value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}/>
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      {/* <CIcon icon={cilUser} /> */}
                    </CInputGroupText>
                    <CFormInput placeholder="Last Name" autoComplete="Last Name" value={lastName}
                        onChange={(e) => setLastName(e.target.value)}/>
                  </CInputGroup>


                  
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      {/* <CIcon icon={cilLockLocked} /> */}
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      {/* <CIcon icon={MdBusiness} /> */}
                    </CInputGroupText>
                    <CFormInput
                      type="company"
                      placeholder="Company"
                      autoComplete="company"
                      value={company}
                        onChange={(e) => setCompany(e.target.value)}
                    />
                  </CInputGroup>
                  {/*<CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>*/}
                  <div className="d-grid">
                    <CButton color="success" onClick={handleSubmit}>Create Account</CButton>
                  </div>

                  <CRow>
                    
                    <CCol xs={6} className="text-right">
                      <CButton color="link" className="px-0" onClick={()=> navigate('/login')}>
                        Already have an account? Sign-In
                      </CButton>
                      
                    </CCol>
                  </CRow>

                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>

      <CModal visible={modalVisible} onClose={closeModal}>
        <CModalHeader onClose={closeModal}>
          <CModalTitle>Registration Successful</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Your registration has been placed successfully. An admin will review your account.
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={closeModal}>OK</CButton>
        </CModalFooter>
      </CModal>


    </div>
  )
}

export default Register
