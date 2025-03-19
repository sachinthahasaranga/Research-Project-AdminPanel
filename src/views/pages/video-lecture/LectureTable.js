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

const LectureTable = () => {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLectures();
  }, []);

  // Fetch lectures from API
  const fetchLectures = async () => {
    try {
      const response = await apiClient.get('/api/video-lectures/');
      setLectures(response.data);
    } catch (error) {
      console.error('Error fetching lectures:', error);
    } finally {
      setLoading(false);
    }
  };

  // Delete lecture function
  const handleDelete = async (lectureId) => {
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
          await apiClient.delete(`/api/video-lectures/${lectureId}`);
          Swal.fire('Deleted!', 'The lecture has been successfully deleted.', 'success');
          fetchLectures(); // Refresh table after deletion
        } catch (error) {
          console.error('Error deleting lecture:', error);
          Swal.fire('Error!', 'Failed to delete lecture.', 'error');
        }
      }
    });
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <div>
              <strong>Lecture Management</strong> <small>List of Video Lectures</small>
            </div>
            <CButton color="primary" onClick={() => navigate('/add-video-lecture')}>
              + Add New Lecture
            </CButton>
          </CCardHeader>
          <CCardBody>
            {loading ? (
              <p>Loading lectures...</p>
            ) : (
              <CTable striped hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Lecture Title</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Thumbnail</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Difficulty</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Created By</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Total Time (min)</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {lectures.map((lecture, index) => (
                    <CTableRow key={lecture._id}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{lecture.lectureTitle}</CTableDataCell>
                      <CTableDataCell>
                        <img src={lecture.imgUrl} alt="Thumbnail" width="50" height="50" />
                      </CTableDataCell>
                      <CTableDataCell>{lecture.categoryId?.categoryName || 'N/A'}</CTableDataCell>
                      <CTableDataCell>{lecture.difficultyLevel?.difficultyName || 'N/A'}</CTableDataCell>
                      <CTableDataCell>{lecture.createdBy?.username || 'N/A'}</CTableDataCell>
                      <CTableDataCell>{lecture.totalTime}</CTableDataCell>
                      <CTableDataCell>
                        <FaEdit
                          style={{ cursor: 'pointer', color: 'gray', marginRight: '10px' }}
                          onClick={() => navigate(`/update-lecture/${lecture._id}`)}
                        />
                        <FaTrash
                          style={{ cursor: 'pointer', color: 'red' }}
                          onClick={() => handleDelete(lecture._id)}
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

export default LectureTable;
