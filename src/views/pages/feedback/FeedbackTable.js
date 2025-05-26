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

const FeedbackTable = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeedbacks();
    // eslint-disable-next-line
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await apiClient.get('/api/feedbacks/');
      setFeedbacks(response.data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (feedbackId) => {
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
          await apiClient.delete(`/api/feedbacks/${feedbackId}`);
          Swal.fire('Deleted!', 'The feedback has been successfully deleted.', 'success');
          fetchFeedbacks();
        } catch (error) {
          console.error('Error deleting feedback:', error);
          Swal.fire('Error!', 'Failed to delete feedback.', 'error');
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
              <strong>Feedback Management</strong> <small>List of Feedbacks</small>
            </div>
            
          </CCardHeader>
          <CCardBody>
            {loading ? (
              <p>Loading feedbacks...</p>
            ) : (
              <CTable striped hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">User</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Lecture Title</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Feedback</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Rating</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Created At</CTableHeaderCell>
                    
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {feedbacks.map((feedback, index) => (
                    <CTableRow key={feedback._id}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{feedback.userId?.username || 'Unknown'}</CTableDataCell>
                      <CTableDataCell>{feedback.videoLectureId?.lectureTitle || 'Unknown'}</CTableDataCell>
                      <CTableDataCell style={{ maxWidth: 300, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                        {feedback.feedback}
                      </CTableDataCell>
                      <CTableDataCell>{feedback.rating}</CTableDataCell>
                      <CTableDataCell>{new Date(feedback.createdAt).toLocaleDateString()}</CTableDataCell>
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

export default FeedbackTable;
