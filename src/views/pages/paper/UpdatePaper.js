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

  const [questionTitles, setQuestionTitles] = useState([]); // Store question titles
  const [difficultyLevels, setDifficultyLevels] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch paper details
  useEffect(() => {
    const fetchPaper = async () => {
      try {
        const response = await apiClient.get(`/api/papers/${id}`);
        const paperData = response.data;

        // Set paper details
        setPaper({
          paperTitle: paperData.paperTitle,
          recommendedAge: paperData.recommendedAge,
          difficultyLevel: paperData.difficultyLevel._id,
          totalTime: paperData.totalTime,
          categoryId: paperData.categoryId._id,
        });

        // Fetch question titles for this paper
        fetchQuestionTitles(paperData._id);
      } catch (error) {
        console.error("Error fetching paper:", error);
      }
    };

    fetchPaper();
    fetchDifficultyLevels();
    fetchCategories();
  }, [id]);


  const fetchQuestionTitles = async (paperId) => {
    try {
      const response = await apiClient.get(`/api/question-titles/paper/${paperId}`);
      const questionTitlesData = response.data;

      // Fetch questions for each question title
      const questionTitlesWithQuestions = await Promise.all(
        questionTitlesData.map(async (questionTitle) => {
          const questionRes = await apiClient.get(`/api/questions/question-title/${questionTitle._id}`);
          return { ...questionTitle, questions: questionRes.data };
        })
      );

      setQuestionTitles(questionTitlesWithQuestions);
    } catch (error) {
      console.error("Error fetching question titles and questions:", error);
    }
  };

  // Fetch difficulty levels
  const fetchDifficultyLevels = async () => {
    try {
      const response = await apiClient.get("/api/difficulty-levels/");
      setDifficultyLevels(response.data);
    } catch (error) {
      console.error("Error fetching difficulty levels:", error);
    }
  };

  // Fetch categories (only "paper" type)
  const fetchCategories = async () => {
    try {
      const response = await apiClient.get("/api/ctgry/");
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
    const updatedTitles = [...questionTitles];
    updatedTitles[index][e.target.name] = e.target.value;
    setQuestionTitles(updatedTitles);
  };

  // Handle changes in Questions
  const handleQuestionChange = (titleIndex, questionIndex, e) => {
    const updatedTitles = [...questionTitles];
    updatedTitles[titleIndex].questions[questionIndex][e.target.name] = e.target.value;
    setQuestionTitles(updatedTitles);
  };

  // Handle NLP Required change
  const handleNlpChange = (titleIndex, questionIndex, e) => {
    const updatedTitles = [...questionTitles];
    updatedTitles[titleIndex].questions[questionIndex].nlpRequired = parseInt(e.target.value, 10);
    setQuestionTitles(updatedTitles);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Step 1: Update Paper
      await apiClient.put(`/api/papers/${id}`, paper);

      // Step 2: Update Question Titles
      for (const questionTitle of questionTitles) {
        await apiClient.put(`/api/question-titles/${questionTitle._id}`, {
          title: questionTitle.title,
          assignMarks: questionTitle.assignMarks,
        });

        // Step 3: Update Questions
        for (const question of questionTitle.questions) {
          await apiClient.put(`/api/questions/${question._id}`, {
              questionTitle: question.questionTitle,
              answer: question.answer,
              nlpRequired: question.nlpRequired,
          });
        }
      }

      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Paper Updated!",
        text: "The question paper and its titles have been successfully updated.",
        showConfirmButton: false,
        timer: 2000,
      });

      // Redirect after success
      setTimeout(() => navigate("/paperlist"), 2000);
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
              {/* Paper Title */}
              <CFormInput
                type="text"
                name="paperTitle"
                placeholder="Paper Title"
                value={paper.paperTitle}
                onChange={handlePaperChange}
                required
                label="Paper Title"
                className="mb-3"
              />

              {/* Recommended Age & Difficulty Level */}
              <CRow>
                <CCol xs={6}>
                  <CFormInput
                    type="number"
                    name="recommendedAge"
                    placeholder="Recommended Age"
                    value={paper.recommendedAge}
                    onChange={handlePaperChange}
                    required
                    label="Recommended Age"
                    className="mb-3"
                  />
                </CCol>
                <CCol xs={6}>
                  <CFormSelect
                    name="difficultyLevel"
                    value={paper.difficultyLevel}
                    onChange={handlePaperChange}
                    required
                    label="Difficulty Level"
                    className="mb-3"
                  >
                    <option value="">Select Difficulty Level</option>
                    {difficultyLevels.map((level) => (
                      <option key={level._id} value={level._id}>
                        {level.difficultyName}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
              </CRow>

              {/* Category & Total Time */}
              <CRow>
                <CCol xs={6}>
                  <CFormSelect
                    name="categoryId"
                    value={paper.categoryId}
                    onChange={handlePaperChange}
                    required
                    label="Category"
                    className="mb-3"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.categoryName}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol xs={6}>
                  <CFormInput
                    type="number"
                    name="totalTime"
                    placeholder="Total Time (minutes)"
                    value={paper.totalTime}
                    onChange={handlePaperChange}
                    required
                    label="Total Time (minutes)"
                    className="mb-3"
                  />
                </CCol>
              </CRow>

              {/* Question Titles & Questions */}
              {questionTitles.map((qt, titleIndex) => (
                <div key={qt._id} className="border p-3 mb-3">
                  <CFormInput 
                  type="text" 
                  name="title" 
                  placeholder="Question Title" 
                  value={qt.title} 
                  onChange={(e) => handleQuestionTitleChange(titleIndex, e)} 
                  required label="Title" 
                  className="mb-2" />
                  {qt.questions.map((q, questionIndex) => (
                    <div key={q._id} className="border p-2 mb-2">
                      <CFormInput type="text" 
                      name="questionTitle" 
                      placeholder="Question" 
                      value={q.questionTitle} 
                      onChange={(e) => handleQuestionChange(titleIndex, questionIndex, e)} 
                      required label="Question" />
                      <CFormInput type="text" 
                      name="answer" 
                      placeholder="Answer" 
                      value={q.answer} 
                      onChange={(e) => handleQuestionChange(titleIndex, questionIndex, e)} 
                      required 
                      label="Answer" />
                    </div>
                  ))}
                </div>
              ))}

              {/* Submit Button */}
              <CButton type="submit" color="success" disabled={loading} className="mt-3">
                {loading ? "Updating..." : "Update Paper & Questions"}
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default UpdatePaper;
