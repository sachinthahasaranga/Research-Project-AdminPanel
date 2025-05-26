import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';  // Import SweetAlert2
import {
  CButton, CCard, CCardBody, CCardGroup, CCol, CContainer,
  CForm, CFormInput, CInputGroup, CInputGroupText, CRow
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import { useAuth } from '../../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const role = await login({ email, password });

        if (!role) {
            Swal.fire({
                title: "Login Failed",
                text: "Unable to fetch user role. Please contact support.",
                icon: "error",
                confirmButtonText: "OK"
            });
            return;
        }

        if (role !== "Admin") {
            Swal.fire({
                title: "Access Denied",
                text: "You do not have permission to log in. Only Admins are allowed.",
                icon: "error",
                confirmButtonText: "OK"
            });
            return;
        }

        // Show success message and redirect Admins
        Swal.fire({
            title: `Welcome, Admin!`,
            text: `You have logged in successfully.`,
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            navigate("/dashboard");
        });

    } catch (error) {
        setErrorMessage(error.response?.data?.message || "Login failed. Please check your credentials.");
        Swal.fire({
            title: "Login Failed",
            text: error.response?.data?.message || "Invalid email or password.",
            icon: "error",
            confirmButtonText: "Try Again"
        });
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign in to your account</p>

                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </CInputGroup>

                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0" onClick={() => navigate('/register')}>
                          Don't have an account? Sign-Up
                        </CButton>
                      </CCol>
                    </CRow>

                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
