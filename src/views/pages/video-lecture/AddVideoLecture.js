import React, { useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CButton,
} from "@coreui/react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../api";
import Swal from "sweetalert2"; // Import SweetAlert2

const AddVideoLecture = () => {
  const [formData, setFormData] = useState({
    lectureTitle: "",
    lectureDescription: "",
    categoryId: "",
    totalTime: "",
    difficultyLevel: "",
  });
  const [videoFile, setVideoFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

    // Create FormData to handle file uploads
    const data = new FormData();
    data.append("lectureTitle", formData.lectureTitle);
    data.append("lectureDescription", formData.lectureDescription);
    data.append("categoryId", formData.categoryId);
    data.append("totalTime", formData.totalTime);
    data.append("difficultyLevel", formData.difficultyLevel);
    if (videoFile) data.append("video", videoFile);
    if (imageFile) data.append("image", imageFile);

    try {
      await apiClient.post("/api/video-lectures/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2M3ZGU2MDMyZTFjMjA1MGQ4YWExNWIiLCJpYXQiOjE3NDE4NDg4MTgsImV4cCI6MTc0MjQ1MzYxOH0.bSvfcBAeTSMkyFsPXLSCGGgMBD3ygbBwH-FY2W7BvQo"
        },
      });

      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Video Lecture Added!",
        text: "The new lecture has been successfully uploaded.",
        showConfirmButton: false,
        timer: 2000,
      });

      // Redirect after success
      setTimeout(() => navigate("/video-lectures"), 2000);
    } catch (error) {
      console.error("Error adding video lecture:", error);

      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "An error occurred while adding the lecture.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <CRow>
      <CCol xs={12} md={10} lg={8} className="mx-auto">
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add New Video Lecture</strong>
          </CCardHeader>
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
                <CCol md={12}>
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
              </CRow>

              {/* Category & Difficulty Level */}
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    name="categoryId"
                    placeholder="Enter Category ID"
                    value={formData.categoryId}
                    onChange={handleChange}
                    required
                    label="Category ID"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    name="difficultyLevel"
                    placeholder="Enter Difficulty Level ID"
                    value={formData.difficultyLevel}
                    onChange={handleChange}
                    required
                    label="Difficulty Level ID"
                  />
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
                    required
                    label="Upload Video"
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
                    required
                    label="Upload Thumbnail Image"
                  />
                </CCol>
              </CRow>

              {/* Submit Button */}
              <div className="d-flex justify-content-end">
                <CButton type="submit" color="success" disabled={loading}>
                  {loading ? "Uploading..." : "Submit"}
                </CButton>
                <CButton type="button" color="secondary" className="ms-2" onClick={() => navigate("/video-lectures")}>
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

export default AddVideoLecture;
