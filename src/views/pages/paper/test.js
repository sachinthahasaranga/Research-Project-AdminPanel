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
import { FaTrash } from "react-icons/fa"; // 🗑️ Import delete icon

const UpdatePaper = () => {
  const { id } = useParams();
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

  useEffect(() => {
    const fetchPaper = async () => {
      try {
        const response = await apiClient.get(`/api/papers/${id}`);
        const paperData = response.data;
        setPaper({
          paperTitle: paperData.paperTitle,
          recommendedAge: paperData.recommendedAge,
          difficultyLevel: paperData.difficultyLevel._id,
          totalTime: paperData.totalTime,
          categoryId: paperData.categoryId._id,
        });
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

  const fetchDifficultyLevels = async () => {
    try {
      const response = await apiClient.get("/api/difficulty-levels/");
      setDifficultyLevels(response.data);
    } catch (error) {
      console.error("Error fetching difficulty levels:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await apiClient.get("/api/ctgry/");
      const filteredCategories = response.data.filter((category) => category.categoryType === "paper");
      setCategories(filteredCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handlePaperChange = (e) => {
    setPaper({ ...paper, [e.target.name]: e.target.value });
  };

  const handleQuestionTitleChange = (index, e) => {
    const updatedTitles = [...questionTitles];
    updatedTitles[index][e.target.name] = e.target.value;
    setQuestionTitles(updatedTitles);
  };

  const handleQuestionChange = (titleIndex, questionIndex, e) => {
    const updatedTitles = [...questionTitles];
    updatedTitles[titleIndex].questions[questionIndex][e.target.name] = e.target.value;
    setQuestionTitles(updatedTitles);
  };

  const deleteQuestionTitle = async (titleId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the question title and its questions!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiClient.delete(`/api/question-titles/${titleId}`);
          setQuestionTitles(questionTitles.filter((title) => title._id !== titleId));
          Swal.fire("Deleted!", "The question title has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting question title:", error);
          Swal.fire("Error!", "Failed to delete question title.", "error");
        }
      }
    });
  };

  // 🔴 DELETE QUESTION
  const deleteQuestion = async (titleIndex, questionId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the question permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiClient.delete(`/api/questions/${questionId}`);
          const updatedTitles = [...questionTitles];
          updatedTitles[titleIndex].questions = updatedTitles[titleIndex].questions.filter((q) => q._id !== questionId);
          setQuestionTitles(updatedTitles);
          Swal.fire("Deleted!", "The question has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting question:", error);
          Swal.fire("Error!", "Failed to delete question.", "error");
        }
      }
    });
  };

  return (
    <CRow>
      <CCol xs={12} md={12} lg={10} className="mx-auto">
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Update Question Paper</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <CFormInput type="text" name="paperTitle" placeholder="Paper Title" value={paper.paperTitle} onChange={handlePaperChange} required label="Paper Title" className="mb-3" />

              {/* Question Titles & Questions */}
              {questionTitles.map((qt, titleIndex) => (
                <div key={qt._id} className="border p-3 mb-3 position-relative">
                  <div className="d-flex justify-content-between align-items-center">
                    <CFormInput type="text" name="title" placeholder="Question Title" value={qt.title} onChange={(e) => handleQuestionTitleChange(titleIndex, e)} required label="Title" className="mb-2" />
                    <FaTrash
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => deleteQuestionTitle(qt._id)} // Delete Question Title
                    />
                  </div>

                  {qt.questions.map((q, questionIndex) => (
                    <div key={q._id} className="border p-2 mb-2 position-relative">
                      <div className="d-flex justify-content-between align-items-center">
                        <CFormInput type="text" name="questionTitle" placeholder="Question" value={q.questionTitle} onChange={(e) => handleQuestionChange(titleIndex, questionIndex, e)} required label="Question" />
                        <FaTrash
                          style={{ color: "red", cursor: "pointer" }}
                          onClick={() => deleteQuestion(titleIndex, q._id)} // Delete Question
                        />
                      </div>
                      <CFormInput type="text" name="answer" placeholder="Answer" value={q.answer} onChange={(e) => handleQuestionChange(titleIndex, questionIndex, e)} required label="Answer" />
                    </div>
                  ))}
                </div>
              ))}
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default UpdatePaper;
