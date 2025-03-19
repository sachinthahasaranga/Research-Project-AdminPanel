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
import { useNavigate } from "react-router-dom";
import apiClient from "../../../api";
import Swal from "sweetalert2";

const AddPaper = () => {
  const [paper, setPaper] = useState({
    paperTitle: "",
    recommendedAge: "",
    difficultyLevel: "",
    totalTime: "",
    categoryId: "",
  });

  const [questionTitles, setQuestionTitles] = useState([
    { title: "", assignMarks: "", questions: [{ questionText: "", answer: "", nlpRequired: 0 }] },
  ]);

  const [difficultyLevels, setDifficultyLevels] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [categories, setCategory] = useState([]);

  
  useEffect(() => {
    const fetchDifficultyLevels = async () => {
      try {
        const response = await apiClient.get("/api/difficulty-levels/");
        setDifficultyLevels(response.data);
      } catch (error) {
        console.error("Error fetching difficulty levels:", error);
      }
    };

    fetchDifficultyLevels();
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await apiClient.get("/api/ctgry/");
      const filteredCategories = response.data.filter(category => category.categoryType === "paper");
      setCategory(filteredCategories);
    } catch (error) {
      console.error("Error fetching difficulty levels:", error);
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

  const handleNlpChange = (titleIndex, questionIndex, e) => {
    const newTitles = [...questionTitles];
    newTitles[titleIndex].questions[questionIndex].nlpRequired = parseInt(e.target.value, 10);
    setQuestionTitles(newTitles);
  };

  // Handle changes in Questions
  const handleQuestionChange = (titleIndex, questionIndex, e) => {
    const newTitles = [...questionTitles];
    newTitles[titleIndex].questions[questionIndex][e.target.name] = e.target.value;
    setQuestionTitles(newTitles);
  };

  // Add a new Question Title
  const addQuestionTitle = () => {
    setQuestionTitles([...questionTitles, { title: "", assignMarks: "", questions: [{ questionText: "", answer: "", nlpRequired: 0 }] }]);
  };

  // Remove a Question Title
  const removeQuestionTitle = (index) => {
    if (questionTitles.length > 1) {
      setQuestionTitles(questionTitles.filter((_, i) => i !== index));
    }
  };

  // Add a new Question under a Question Title
  const addQuestion = (titleIndex) => {
    const newTitles = [...questionTitles];
    newTitles[titleIndex].questions.push({ questionText: "", answer: "", nlpRequired: 0 });
    setQuestionTitles(newTitles);
  };

  // Remove a Question under a Question Title
  const removeQuestion = (titleIndex, questionIndex) => {
    const newTitles = [...questionTitles];
    if (newTitles[titleIndex].questions.length > 1) {
      newTitles[titleIndex].questions.splice(questionIndex, 1);
      setQuestionTitles(newTitles);
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Step 1: Create Paper
      const paperResponse = await apiClient.post("/api/papers/", paper);
      const paperId = paperResponse.data.newPaper._id;

      // Step 2: Create Question Titles and Questions
      for (const questionTitle of questionTitles) {
        const questionTitleResponse = await apiClient.post("/api/question-titles/", {
          title: questionTitle.title,
          assignMarks: questionTitle.assignMarks,
          paper: paperId,
        });

        const questionTitleId = questionTitleResponse.data.newQuestionTitle._id;

        // Step 3: Create Questions for this Question Title
        for (const question of questionTitle.questions) {
          await apiClient.post("/api/questions/", {
            questionTitle: question.questionText,
            answer: question.answer,
            nlpRequired: question.nlpRequired,
            questionTitleId: questionTitleId,
          });
        }
      }

      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Paper Added!",
        text: "The new question paper has been successfully created.",
        showConfirmButton: false,
        timer: 2000,
      });

      // Redirect after success
      setTimeout(() => navigate("/papers"), 2000);
    } catch (error) {
      console.error("Error adding paper:", error);
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "An error occurred while adding the paper.",
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
            <strong>Add New Question Paper</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              {/* Paper Details */}
              <CFormInput type="text" name="paperTitle" placeholder="Paper Title" value={paper.paperTitle} onChange={handlePaperChange} required label="Paper Title" className="mb-3" />
              <CRow>
                <CCol xs={12} lg={6}>
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
                <CCol xs={12} lg={6}>
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
              <CRow>
                <CCol xs={12} lg={6}>
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
                <CCol xs={12} lg={6}>
                    <CFormInput type="number" 
                    name="totalTime" 
                    placeholder="Total Time (minutes)" 
                    value={paper.totalTime} 
                    onChange={handlePaperChange} 
                    required label="Total Time (minutes)" 
                    className="mb-3" />
                </CCol>
              </CRow>


              {/* Dynamic Question Titles */}
              {questionTitles.map((qt, titleIndex) => (
                <div key={titleIndex} className="border p-3 mb-3">
                  <CFormInput type="text" name="title" placeholder="Question Title" value={qt.title} onChange={(e) => handleQuestionTitleChange(titleIndex, e)} required label="Question Title" />
                  <CFormInput type="number" name="assignMarks" placeholder="Assign Marks" value={qt.assignMarks} onChange={(e) => handleQuestionTitleChange(titleIndex, e)} required label="Assign Marks" className="mb-2" />

                  {/* Dynamic Questions */}
                  {qt.questions.map((q, questionIndex) => (
                    <div key={questionIndex} className="border p-2 mb-2">
                      <CFormInput type="text" name="questionText" placeholder="Question" value={q.questionText} onChange={(e) => handleQuestionChange(titleIndex, questionIndex, e)} required label="Question" />
                      
                      <CFormInput type="text" name="answer" placeholder="Answer" value={q.answer} onChange={(e) => handleQuestionChange(titleIndex, questionIndex, e)} required label="Answer" />
                      
                      <CFormSelect name="nlpRequired" value={q.nlpRequired} onChange={(e) => handleNlpChange(titleIndex, questionIndex, e)} required label="NLP Required">
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </CFormSelect>
                      
                      <CButton color="danger" className="mt-2" onClick={() => removeQuestion(titleIndex, questionIndex)}>Remove Question</CButton>
                    </div>
                  ))}

                  <CButton color="primary" onClick={() => addQuestion(titleIndex)}>Add Question</CButton>
                  <CButton color="danger" className="ms-2" onClick={() => removeQuestionTitle(titleIndex)}>Remove Question Title</CButton>
                </div>
              ))}
            <CRow>
                <CCol>
                    <CButton color="success" onClick={addQuestionTitle}>Add Question Title</CButton>
                </CCol>
            </CRow>
            <CRow>
                <CCol>
                    <CButton type="submit" color="success" disabled={loading} className="mt-3">{loading ? "Saving..." : "Submit"}</CButton>
                </CCol>
            </CRow>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default AddPaper;
