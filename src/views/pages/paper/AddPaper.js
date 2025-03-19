import React, { useState, useEffect } from "react";
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
} from "@coreui/react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../../../api";
import Swal from "sweetalert2";

const UpdatePaper = () => {
  const { id } = useParams(); // Get paper ID from URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paper, setPaper] = useState({
    paperTitle: "",
    recommendedAge: "",
    difficultyLevel: "",
    totalTime: "",
    categoryId: "",
  });

  const [questionTitles, setQuestionTitles] = useState([]);
  const [difficultyLevels, setDifficultyLevels] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch paper details
  useEffect(() => {
    const fetchPaper = async () => {
      try {
        const response = await apiClient.get(`/api/papers/${id}`, { withCredentials: true });
        setPaper(response.data);
        setQuestionTitles(response.data.questionTitles || []);
      } catch (error) {
        console.error("Error fetching paper:", error);
      }
    };

    fetchPaper();
    fetchDifficultyLevels();
    fetchCategories();
  }, [id]);

  // Fetch difficulty levels
  const fetchDifficultyLevels = async () => {
    try {
      const response = await apiClient.get("/api/difficulty-levels/", { withCredentials: true });
      setDifficultyLevels(response.data);
    } catch (error) {
      console.error("Error fetching difficulty levels:", error);
    }
  };

  // Fetch categories (only "paper" type)
  const fetchCategories = async () => {
    try {
      const response = await apiClient.get("/api/ctgry/", { withCredentials: true });
      const filteredCategories = response.data.filter((category) => category.categoryType === "paper");
      setCategories(filteredCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Handle input changes for paper details
  const handlePaperChange = (e) => {
    setPaper({ ...paper, [e.target.name]: e.target.value });
  };

  // Handle changes in Question Titles
  const handleQuestionTitleChange = (index, e) => {
    const newTitles = [...questionTitles];
    newTitles[index][e.target.name] = e.target.value;
    setQuestionTitles(newTitles);
  };

  // Handle changes in Questions
  const handleQuestionChange = (titleIndex, questionIndex, e) => {
    const newTitles = [...questionTitles];
    newTitles[titleIndex].questions[questionIndex][e.target.name] = e.target.value;
    setQuestionTitles(newTitles);
  };

  // Handle NLP change
  const handleNlpChange = (titleIndex, questionIndex, e) => {
    const newTitles = [...questionTitles];
    newTitles[titleIndex].questions[questionIndex].nlpRequired = parseInt(e.target.value, 10);
    setQuestionTitles(newTitles);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Step 1: Update Paper
      await apiClient.put(`/api/papers/${id}`, paper, { withCredentials: true });

      // Step 2: Update Question Titles & Questions
      for (const questionTitle of questionTitles) {
        await apiClient.put(`/api/question-titles/${questionTitle._id}`, questionTitle, { withCredentials: true });

        // Step 3: Update Questions
        for (const question of questionTitle.questions) {
          await apiClient.put(`/api/questions/${question._id}`, question, { withCredentials: true });
        }
      }

      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Paper Updated!",
        text: "The question paper has been successfully updated.",
        showConfirmButton: false,
        timer: 2000,
      });

      // Redirect after success
      setTimeout(() => navigate("/papers"), 2000);
    } catch (error) {
      console.error("Error updating paper:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed!",
        text: "An error occurred while updating the paper.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <CRow>
      <CCol xs={12} md={12} lg={10} className="mx-auto">
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Update Question Paper</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              {/* Paper Details */}
              <CFormInput type="text" name="paperTitle" placeholder="Paper Title" value={paper.paperTitle} onChange={handlePaperChange} required label="Paper Title" className="mb-3" />
              <CRow>
                <CCol xs={6}>
                  <CFormInput type="number" name="recommendedAge" placeholder="Recommended Age" value={paper.recommendedAge} onChange={handlePaperChange} required label="Recommended Age" className="mb-3" />
                </CCol>
                <CCol xs={6}>
                  <CFormSelect name="difficultyLevel" value={paper.difficultyLevel} onChange={handlePaperChange} required label="Difficulty Level" className="mb-3">
                    <option value="">Select Difficulty Level</option>
                    {difficultyLevels.map((level) => (
                      <option key={level._id} value={level._id}>
                        {level.difficultyName}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs={6}>
                  <CFormSelect name="categoryId" value={paper.categoryId} onChange={handlePaperChange} required label="Category" className="mb-3">
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.categoryName}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol xs={6}>
                  <CFormInput type="number" name="totalTime" placeholder="Total Time (minutes)" value={paper.totalTime} onChange={handlePaperChange} required label="Total Time (minutes)" className="mb-3" />
                </CCol>
              </CRow>

              {/* Update Questions */}
              {questionTitles.map((qt, titleIndex) => (
                <div key={titleIndex} className="border p-3 mb-3">
                  <CFormInput type="text" name="title" placeholder="Question Title" value={qt.title} onChange={(e) => handleQuestionTitleChange(titleIndex, e)} required label="Question Title" className="mb-2" />
                  {qt.questions.map((q, questionIndex) => (
                    <div key={questionIndex} className="border p-2 mb-2">
                      <CFormInput type="text" name="questionText" placeholder="Question" value={q.questionText} onChange={(e) => handleQuestionChange(titleIndex, questionIndex, e)} required label="Question" />
                      <CFormInput type="text" name="answer" placeholder="Answer" value={q.answer} onChange={(e) => handleQuestionChange(titleIndex, questionIndex, e)} required label="Answer" />
                      <CFormSelect name="nlpRequired" value={q.nlpRequired} onChange={(e) => handleNlpChange(titleIndex, questionIndex, e)} required label="NLP Required">
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </CFormSelect>
                    </div>
                  ))}
                </div>
              ))}
              <CButton type="submit" color="success" disabled={loading} className="mt-3">
                {loading ? "Updating..." : "Update Paper"}
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default UpdatePaper;
