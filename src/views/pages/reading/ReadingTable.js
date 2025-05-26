import React, { useEffect, useState } from 'react';
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
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import apiClient from '../../../api';
import Swal from 'sweetalert2';

const ReadingTable = () => {
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReadings();
    // eslint-disable-next-line
  }, []);

  const fetchReadings = async () => {
    try {
      const response = await apiClient.get('/api/readings/');
      setReadings(response.data);
    } catch (error) {
      console.error('Error fetching readings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (readingId) => {
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
          await apiClient.delete(`/api/readings/${readingId}`);
          Swal.fire('Deleted!', 'The reading has been successfully deleted.', 'success');
          fetchReadings();
        } catch (error) {
          console.error('Error deleting reading:', error);
          Swal.fire('Error!', 'Failed to delete reading.', 'error');
        }
      }
    });
  };

  const getDifficultyLabel = (value) => {
    if (value === 1 || value === "1") return "Easy";
    if (value === 1.2 || value === "1.2") return "Medium";
    if (value === 1.5 || value === "1.5") return "Hard";
    return value; // fallback
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <div>
              <strong>Reading Activity Management</strong> <small>List of Readings</small>
            </div>
            <CButton color="primary" onClick={() => navigate('/add-reading')}>
              + Add New Reading
            </CButton>
          </CCardHeader>
          <CCardBody>
            {loading ? (
              <p>Loading readings...</p>
            ) : (
              <CTable striped hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Content</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Difficulty</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Category Image</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Created At</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {readings.map((reading, index) => (
                    <CTableRow key={reading._id}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{reading.name}</CTableDataCell>
                      <CTableDataCell>{reading.description}</CTableDataCell>
                      <CTableDataCell style={{ maxWidth: 250, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                        {reading.content}
                      </CTableDataCell>
                      <CTableDataCell>
                        {getDifficultyLabel(reading.difficultyLevel)}
                      </CTableDataCell>
                      <CTableDataCell>
                        {reading.category
                          ? (
                              <>
                                <div><strong>{reading.category.callingName}</strong></div>
                                <div style={{ fontSize: '0.8em', color: 'gray' }}>{reading.category.description}</div>
                              </>
                            )
                          : <span>No category</span>
                        }
                      </CTableDataCell>
                      <CTableDataCell>
                        {reading.category && reading.category.backgroundImage ? (
                          <img
                            src={reading.category.backgroundImage}
                            alt="Category Background"
                            width="50"
                            height="50"
                            style={{ objectFit: 'cover', borderRadius: 8 }}
                          />
                        ) : (
                          <span style={{ color: '#bbb' }}>No Image</span>
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        {new Date(reading.createdAt).toLocaleDateString()}
                      </CTableDataCell>
                      <CTableDataCell>
                        <FaEdit
                          style={{ cursor: 'pointer', color: 'gray', marginRight: '10px' }}
                          onClick={() => navigate(`/update-reading/${reading._id}`)}
                        />
                        <FaTrash
                          style={{ cursor: 'pointer', color: 'red' }}
                          onClick={() => handleDelete(reading._id)}
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
  );
};

export default ReadingTable;
