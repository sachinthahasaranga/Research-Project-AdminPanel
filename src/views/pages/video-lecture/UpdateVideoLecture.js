import React, { useState, useEffect } from "react";
import {
  CCard, CCardBody, CCardHeader, CCol, CRow, CForm,
  CFormInput, CButton, CFormSelect
} from "@coreui/react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../../../api";
import Swal from "sweetalert2"; // Import SweetAlert2

const UpdateVideoLecture = () => {
  const { id } = useParams(); // Get lecture ID from URL
  const [formData, setFormData] = useState({
    lectureTitle: "",
    lectureDescription: "",
    categoryId: "",
    totalTime: "",
    difficultyLevel: "",
  });

  const [videoFile, setVideoFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [difficultyLevels, setDifficultyLevels] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch existing lecture data
  useEffect(() => {
    const fetchLecture = async () => {
      try {
        const response = await apiClient.get(`/api/video-lectures/${id}`);
        const { lectureTitle, lectureDescription, categoryId, totalTime, difficultyLevel } = response.data;
        setFormData({
          lectureTitle,
          lectureDescription,
          categoryId: categoryId._id, // Extract ID from object
          totalTime,
          difficultyLevel: difficultyLevel._id, // Extract ID from object
        });
      } catch (error) {
        console.error("Error fetching lecture:", error);
      }
    };

    if (id) fetchLecture();
  }, [id]);

  // Fetch categories (filtered by categoryType = "lecture")
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get("/api/ctgry/");
        const filteredCategories = response.data.filter(category => category.categoryType === "lecture");
        setCategories(filteredCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch difficulty levels
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
  }, []);

  // Handle text input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    if (e.target.name === "video") {
      setVideoFile(e.target.files[0]);
    } else if (e.target.name === "image") {
      setImageFile(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("lectureTitle", formData.lectureTitle);
    data.append("lectureDescription", formData.lectureDescription);
    data.append("categoryId", formData.categoryId);
    data.append("totalTime", formData.totalTime);
    data.append("difficultyLevel", formData.difficultyLevel);
    if (videoFile) data.append("video", videoFile);
    if (imageFile) data.append("image", imageFile);

    try {
      await apiClient.put(`/api/video-lectures/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        icon: "success",
        title: "Lecture Updated!",
        text: "The lecture has been successfully updated.",
        showConfirmButton: false,
        timer: 2000,
      });

      setTimeout(() => navigate("/video-lectures"), 2000);
    } catch (error) {
      console.error("Error updating lecture:", error);
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "An error occurred while updating the lecture.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <CRow>
      <CCol xs={12} md={10} lg={11} className="mx-auto">
        <CCard className="mb-4">
          <CCardHeader><strong>Update Video Lecture</strong></CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>

              {/* Lecture Title */}
              <CRow className="mb-3">
                <CCol md={12}>
                  <CFormInput
                    type="text"
                    name="lectureTitle"
                    placeholder="Enter Lecture Title"
                    value={formData.lectureTitle}
                    onChange={handleChange}
                    required
                    label="Lecture Title"
                  />
                </CCol>
              </CRow>

              {/* Lecture Description */}
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    name="lectureDescription"
                    placeholder="Enter Lecture Description"
                    value={formData.lectureDescription}
                    onChange={handleChange}
                    required
                    label="Lecture Description"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormSelect
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    required
                    label="Select Category"
                  >
                    <option value="">-- Select Category --</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.categoryName}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
              </CRow>

              {/* Difficulty Level Dropdown */}
              <CRow className="mb-3">
                <CCol md={12}>
                  <CFormSelect
                    name="difficultyLevel"
                    value={formData.difficultyLevel}
                    onChange={handleChange}
                    required
                    label="Select Difficulty Level"
                  >
                    <option value="">-- Select Difficulty Level --</option>
                    {difficultyLevels.map((level) => (
                      <option key={level._id} value={level._id}>
                        {level.difficultyName}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
              </CRow>

              {/* Total Time */}
              <CRow className="mb-3">
                <CCol md={12}>
                  <CFormInput
                    type="number"
                    name="totalTime"
                    placeholder="Enter Total Time (minutes)"
                    value={formData.totalTime}
                    onChange={handleChange}
                    required
                    label="Total Time (minutes)"
                  />
                </CCol>
              </CRow>

              {/* Upload Video */}
              <CRow className="mb-3">
                <CCol md={12}>
                  <CFormInput
                    type="file"
                    name="video"
                    accept="video/*"
                    onChange={handleFileChange}
                    label="Replace Video (Optional)"
                  />
                </CCol>
              </CRow>

              {/* Upload Thumbnail Image */}
              <CRow className="mb-3">
                <CCol md={12}>
                  <CFormInput
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    label="Replace Thumbnail Image (Optional)"
                  />
                </CCol>
              </CRow>

              {/* Submit Button */}
              <div className="d-flex justify-content-end">
                <CButton type="submit" color="success" disabled={loading}>
                  {loading ? "Updating..." : "Update"}
                </CButton>
                <CButton type="button" color="secondary" className="ms-2" onClick={() => navigate("/lecturelist")}>
                  Cancel
                </CButton>
              </div>

            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default UpdateVideoLecture;
