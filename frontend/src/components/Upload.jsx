import React, { useState, useRef } from 'react';
import '../css/Upload.css';
//import '../css/Dashboard.css';
import { FileUp, CircleAlert } from 'lucide-react';
import Navbar_upload from './Navbar_upload';

const Upload = ({ sidebarOpen, isMobile }) => {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const fileInputRef = useRef(null);

  const predefinedData = [
    { name: "John Alexander Smith", rollNo: "2021CSE001", cgpa: "8.5", certificateId: "CERT2024001", issueDate: "2024-05-15", degree: "B.Tech Computer Science", year: "2024" },
    { name: "Emily Rose Johnson", rollNo: "2021EEE002", cgpa: "8.2", certificateId: "CERT2024002", issueDate: "2024-04-22", degree: "B.Tech Electrical", year: "2024" },
    { name: "Michael David Brown", rollNo: "2021MECH003", cgpa: "9.1", certificateId: "CERT2024003", issueDate: "2024-03-18", degree: "B.Tech Mechanical", year: "2024" },
    { name: "Sarah Elizabeth Davis", rollNo: "2021CIVIL004", cgpa: "8.7", certificateId: "CERT2024004", issueDate: "2024-06-10", degree: "B.Tech Civil", year: "2024" }
  ];

  const handleFileSelect = (selectedFiles) => {
    const fileArray = Array.from(selectedFiles);
    setIsUploading(true);
    setUploadProgress(0);

    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(progressInterval);
        setTimeout(() => {
          const newFiles = fileArray.map((file,index) => ({
            id: crypto.randomUUID(),
            file: file,
            preview: URL.createObjectURL(file),
            data: predefinedData[(files.length+index) % predefinedData.length],
            uploadedAt: new Date()
          }));
          setFiles(prevFiles => [...prevFiles, ...newFiles]);
          setIsUploading(false);
          setUploadProgress(0);
        }, 500);
      }
      setUploadProgress(progress);
    }, 250);
  };

  const handleDrag = (e) => {
    if (isMobile) return;
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    if (isMobile) return;
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files);
    }
  };

  const removeFile = (fileId) => {
    setFiles(prevFiles => {
      const updatedFiles = prevFiles.filter(f => f.id !== fileId);
      const fileToRemove = prevFiles.find(f => f.id === fileId);
      if (fileToRemove && fileToRemove.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return updatedFiles;
    });
    setEditingId(null);
  };

  const toggleEdit = (fileItem) => {
    if (editingId === fileItem.id) {
      setEditingId(null);
    } else {
      setEditingId(fileItem.id);
      setEditForm({ ...fileItem.data });
    }
  };

  const handleEditFormChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const saveChanges = (fileId) => {
    setFiles(prevFiles =>
      prevFiles.map(file =>
        file.id === fileId
          ? { ...file, data: { ...editForm } }
          : file
      )
    );
    setEditingId(null);
  };

  return (
    <div className={`upload-container ${isMobile ? 'mobile' : 'desktop'}`}>
      <div className="upload-wrapper">
        <Navbar_upload sidebarOpen={sidebarOpen} isMobile={isMobile} />
        <div className={`upload-content-wrapper ${sidebarOpen ? 'with-sidebar' : 'without-sidebar'} ${isMobile ? 'mobile' : 'desktop'}`}>
          <div className="upload-content">
            <div 
              className={`upload-area ${dragActive && !isMobile ? 'drag-active' : ''} ${isUploading ? 'uploading' : ''} ${isMobile ? 'mobile-upload' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={handleButtonClick}
            >
              <div className="upload-area-content">
                <div className="upload-icon">
                  <FileUp size={isMobile ? 60 : 80} color="#667eea" strokeWidth={1.5} />
                </div>
                <h3>{isMobile ? 'Tap to upload documents' : 'Drop documents here or click to upload'}</h3>
                <p>Support for PDF, JPG, PNG files up to 10MB each</p>
                <button 
                  className={`upload-button ${isMobile ? 'mobile-button' : ''}`}
                  disabled={isUploading}
                >
                  {isUploading ? 'Uploading...' : 'Choose Files'}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleInputChange}
                  style={{ display: 'none' }}
                />
              </div>
              {isUploading && (
                <div className="upload-progress-overlay">
                  <div className="progress-container-centered">
                    <div className="progress-header">
                      <span className="progress-title">Uploading Files...</span>
                      <span className="progress-percentage">{uploadProgress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {files.length > 0 && (
              <div className="upload-list">
                {files.map((fileItem) => (
                  <div key={fileItem.id} className="upload-item">
                    <div className="file-info">
                      <div>
                        <strong>{fileItem.data.name}</strong>
                        <div className="cert-id">{fileItem.data.certificateId}</div>
                      </div>
                      <div>{fileItem.data.degree}</div>
                      <div>{fileItem.data.year}</div>
                      <div>
                        <span className="status pending">Pending</span>
                      </div>
                      <div>
                        <button className="action-btn view" onClick={() => toggleEdit(fileItem)}>
                          {editingId === fileItem.id ? "Close" : "View"}
                        </button>
                      </div>
                    </div>

                    {editingId === fileItem.id && (
                      <div className="edit-section">
                        <div className="edit-form">
                          <label>Name:
                            <input type="text" value={editForm.name} onChange={(e) => handleEditFormChange('name', e.target.value)} />
                          </label>
                          <label>Degree:
                            <input type="text" value={editForm.degree} onChange={(e) => handleEditFormChange('degree', e.target.value)} />
                          </label>
                          <label>Year:
                            <input type="text" value={editForm.year} onChange={(e) => handleEditFormChange('year', e.target.value)} />
                          </label>
                          <label>Certificate ID:
                            <input type="text" value={editForm.certificateId} onChange={(e) => handleEditFormChange('certificateId', e.target.value)} />
                          </label>
                          <label>CGPA:
                            <input type="text" value={editForm.cgpa} onChange={(e) => handleEditFormChange('cgpa', e.target.value)} />
                          </label>
                        </div>
                        <div className="edit-buttons">
                          <button className="btn save-btn" onClick={() => saveChanges(fileItem.id)}>Save</button>
                          <button className="btn remove-btn" onClick={() => removeFile(fileItem.id)}>Remove</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {files.length === 0 && !isUploading && (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <CircleAlert size={isMobile ? 60 : 80} color="#9ca3af" strokeWidth={1.5} />
                </div>
                <h3>No documents uploaded yet</h3>
                <p>Upload your first document to get started with verification</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
