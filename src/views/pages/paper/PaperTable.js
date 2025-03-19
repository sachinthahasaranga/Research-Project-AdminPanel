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

const PaperTable = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPapers();
  }, []);

  // Fetch papers from API
  const fetchPapers = async () => {
    try {
      const response = await apiClient.get('/api/papers/');
      setPapers(response.data);
    } catch (error) {
      console.error('Error fetching papers:', error);
    } finally {
      setLoading(false);
    }
  };

  // Delete paper function
  const handleDelete = async (paperId) => {
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
          await apiClient.delete(`/api/papers/${paperId}`);
          Swal.fire('Deleted!', 'The paper has been successfully deleted.', 'success');
          fetchPapers(); // Refresh table after deletion
        } catch (error) {
          console.error('Error deleting paper:', error);
          Swal.fire('Error!', 'Failed to delete paper.', 'error');
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
              <strong>Paper Management</strong> <small>List of Question Papers</small>
            </div>
            <CButton color="primary" onClick={() => navigate('/add-paper')}>
              + Add New Paper
            </CButton>
          </CCardHeader>
          <CCardBody>
            {loading ? (
              <p>Loading papers...</p>
            ) : (
              <CTable striped hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Paper Title</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Recommended Age</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Difficulty Level</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Total Time (min)</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Created At</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {papers.map((paper, index) => (
                    <CTableRow key={paper._id}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{paper.paperTitle}</CTableDataCell>
                      <CTableDataCell>{paper.recommendedAge}</CTableDataCell>
                      <CTableDataCell>{paper.difficultyLevel?.difficultyName || 'N/A'}</CTableDataCell>
                      <CTableDataCell>{paper.categoryId?.categoryName || 'N/A'}</CTableDataCell>
                      <CTableDataCell>{paper.totalTime}</CTableDataCell>
                      <CTableDataCell>{new Date(paper.createdAt).toLocaleDateString()}</CTableDataCell>
                      <CTableDataCell>
                        <FaEdit
                          style={{ cursor: 'pointer', color: 'gray', marginRight: '10px' }}
                          onClick={() => navigate(`/update-paper/${paper._id}`)}
                        />
                        <FaTrash
                          style={{ cursor: 'pointer', color: 'red' }}
                          onClick={() => handleDelete(paper._id)}
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

export default PaperTable;
