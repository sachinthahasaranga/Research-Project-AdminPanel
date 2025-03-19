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
import { FaTrash } from "react-icons/fa";

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
      let questionTitlesData = response.data;
      console.log(response.data)
  
      // ✅ Ensure every question title has a "questions" array
      const questionTitlesWithQuestions = await Promise.all(
        questionTitlesData.map(async (questionTitle) => {
          const questionRes = await apiClient.get(`/api/questions/question-title/${questionTitle._id}`);
          return { ...questionTitle, questions: questionRes.data || [] }; // ✅ Default to empty array
        })
      );
  
      // ✅ If there are no question titles, add a default empty one
      if (questionTitlesWithQuestions.length === 0) {
        questionTitlesWithQuestions.push({
          title: "",
          assignMarks: "",
          questions: [{ questionTitle: "", answer: "", nlpRequired: 0 }],
        });
      }
  
      setQuestionTitles(questionTitlesWithQuestions);
    } catch (error) {
      console.error("Error fetching question titles and questions:", error);
      setQuestionTitles([{
        title: "",
        assignMarks: "",
        questions: [{ questionTitle: "", answer: "", nlpRequired: 0 }],
      }]); // ✅ Add default empty title to prevent crashes
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

  // Handle input changes
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

  const handleNlpChange = (titleIndex, questionIndex, e) => {
    const updatedTitles = [...questionTitles];
    updatedTitles[titleIndex].questions[questionIndex].nlpRequired = parseInt(e.target.value, 10);
    setQuestionTitles(updatedTitles);
  };

  // Add new Question Title
  const addQuestionTitle = () => {
    setQuestionTitles([...questionTitles, { title: "", assignMarks: "", questions: [{ questionTitle: "", answer: "", nlpRequired: 0 }] }]);
  };

  // Add new Question to a specific title
  const addQuestion = (titleIndex) => {
    const updatedTitles = [...questionTitles];
    updatedTitles[titleIndex].questions.push({ questionTitle: "", answer: "", nlpRequired: 0 });
    setQuestionTitles(updatedTitles);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await apiClient.put(`/api/papers/${id}`, paper);

      for (const questionTitle of questionTitles) {
        if (questionTitle._id) {
          await apiClient.put(`/api/question-titles/${questionTitle._id}`, {
            title: questionTitle.title,
            assignMarks: questionTitle.assignMarks,
          });

          for (const question of questionTitle.questions) {
            if (question._id) {
              await apiClient.put(`/api/questions/${question._id}`, {
                questionTitle: question.questionTitle,
                answer: question.answer,
                nlpRequired: question.nlpRequired,
              });
            } else {
              await apiClient.post(`/api/questions/`, {
                questionTitle: question.questionTitle,
                answer: question.answer,
                nlpRequired: question.nlpRequired,
                questionTitleId: questionTitle._id,
              });
            }
          }
        } else {
          const response = await apiClient.post(`/api/question-titles/`, {
            title: questionTitle.title,
            assignMarks: questionTitle.assignMarks,
            paper: id,
          });

          for (const question of questionTitle.questions) {
            await apiClient.post(`/api/questions/`, {
              questionTitle: question.questionTitle,
              answer: question.answer,
              nlpRequired: question.nlpRequired,
              questionTitleId: response.data.newQuestionTitle._id,
            });
          }
        }
      }

      Swal.fire("Updated!", "The paper has been updated.", "success");
      setTimeout(() => navigate("/paperlist"), 2000);
    } catch (error) {
      console.error("Error updating paper:", error);
      Swal.fire("Error!", "Failed to update paper.", "error");
    } finally {
      setLoading(false);
    }
  };

  //delete title
  const deleteQuestionTitle = async (titleId, titleIndex) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the question title and all its questions!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const updatedTitles = [...questionTitles];
  
          // ✅ Ensure titleIndex is valid before accessing "questions"
          if (titleIndex !== undefined && titleIndex < updatedTitles.length) {
            const titleToDelete = updatedTitles[titleIndex];
  
            // ✅ Delete all questions for this question title (if they exist in DB)
            if (titleToDelete.questions && titleToDelete.questions.length > 0) {
              await Promise.all(
                titleToDelete.questions.map(async (q) => {
                  if (q._id) {
                    await apiClient.delete(`/api/questions/${q._id}`);
                  }
                })
              );
            }
          }
  
          // ✅ Now delete the question title itself (only if it exists in DB)
          if (titleId) {
            await apiClient.delete(`/api/question-titles/${titleId}`);
          }
  
          // ✅ Remove from UI state
          setQuestionTitles((prev) => prev.filter((_, index) => index !== titleIndex));
  
          Swal.fire("Deleted!", "The question title and all associated questions have been deleted.", "success");
        } catch (error) {
          console.error("Error deleting question title and its questions:", error);
          Swal.fire("Error!", "Failed to delete question title and its questions.", "error");
        }
      }
    });
  };
  

  //  DELETE QUESTION
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
        <CCol xs={12} md={12} lg={11} className="mx-auto">
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

                {/* Add New Question Title Button
                <CButton color="primary" className="mb-3" onClick={addQuestionTitle}>
                    + Add Question Title
                </CButton> */}

                {/* Question Titles & Questions */}
                {questionTitles.map((qt, titleIndex) => (
                    <div key={qt._id || titleIndex} className="border p-3 mb-3">
                    {/* Delete Question Title Button */}
                    <CRow>
                        <CCol className="d-flex justify-content-end">
                        <FaTrash
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() => deleteQuestionTitle(qt._id)}
                        />
                        </CCol>
                    </CRow>

                    {/* Question Title Input */}
                    <CFormInput
                        type="text"
                        name="title"
                        placeholder="Question Title"
                        value={qt.title}
                        onChange={(e) => handleQuestionTitleChange(titleIndex, e)}
                        required
                        label="Title"
                        className="mb-2"
                    />

                    {/* Assign Marks Input */}
                    <CFormInput
                        type="number"
                        name="assignMarks"
                        placeholder="Assign Marks"
                        value={qt.assignMarks}
                        onChange={(e) => handleQuestionTitleChange(titleIndex, e)}
                        required
                        label="Assign Marks"
                        className="mb-2"
                    />

                    {/* Add New Question Button */}
                    

                    {/* Questions List */}
                    {qt.questions.map((q, questionIndex) => (
                        <div key={q._id || questionIndex} className="border p-2 mb-2">
                        {/* Delete Question Button */}
                        <CRow>
                            <CCol className="d-flex justify-content-end">
                            <FaTrash
                                style={{ color: "red", cursor: "pointer" }}
                                onClick={() => deleteQuestion(titleIndex, q._id)}
                            />
                            </CCol>
                        </CRow>

                        {/* Question Input */}
                        <CFormInput
                            type="text"
                            name="questionTitle"
                            placeholder="Question"
                            value={q.questionTitle}
                            onChange={(e) => handleQuestionChange(titleIndex, questionIndex, e)}
                            required
                            label="Question"
                            className="mb-2"
                        />

                        {/* Answer Input */}
                        <CFormInput
                            type="text"
                            name="answer"
                            placeholder="Answer"
                            value={q.answer}
                            onChange={(e) => handleQuestionChange(titleIndex, questionIndex, e)}
                            required
                            label="Answer"
                            className="mb-2"
                        />

                        {/* NLP Required Dropdown */}
                        <CFormSelect
                            name="nlpRequired"
                            value={q.nlpRequired}
                            onChange={(e) => handleNlpChange(titleIndex, questionIndex, e)}
                            required
                            label="NLP Required"
                            className="mb-2"
                        >
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </CFormSelect>
                        </div>
                    ))}
                    <CButton
                        color="success"
                        className="mb-2"
                        onClick={() => addQuestion(titleIndex)}
                    >
                        + Add Question
                    </CButton>
                    </div>
                ))}
                <CRow>
                    <CCol>
                        <CButton color="primary" className="mb-3" onClick={addQuestionTitle}>+ Add Question Title</CButton>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol>
                        <CButton type="submit" color="success" disabled={loading} className="mt-3">{loading ? "Updating..." : "Update Paper & Questions"}</CButton>
                    </CCol>
                </CRow>
                
                </CForm>
            </CCardBody>
            </CCard>
        </CCol>
    </CRow>

  );
};

export default UpdatePaper;
