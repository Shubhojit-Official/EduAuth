import React, { useState, useRef } from 'react';
import Card_upload from './Card_upload';
import '../css/Upload.css';
import '../css/Dashboard.css';
import { FileUp, CircleAlert } from 'lucide-react';
import Navbar_upload from './Navbar_upload';

const Upload = ({ sidebarOpen, isMobile }) => {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const predefinedData = [
    { name: "John Alexander Smith", rollNo: "2021CSE001", cgpa: "8.5", certificateId: "CERT2024001", issueDate: "2024-05-15" },
    { name: "Emily Rose Johnson", rollNo: "2021EEE002", cgpa: "8.2", certificateId: "CERT2024002", issueDate: "2024-04-22" },
    { name: "Michael David Brown", rollNo: "2021MECH003", cgpa: "9.1", certificateId: "CERT2024003", issueDate: "2024-03-18" },
    { name: "Sarah Elizabeth Davis", rollNo: "2021CIVIL004", cgpa: "8.7", certificateId: "CERT2024004", issueDate: "2024-06-10" }
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
    }, 250); // increments every 250ms to reach 100 in ~5 seconds
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
              <div className="uploaded-files">
                <h3>Uploaded Documents ({files.length})</h3>
                <div className={`files-grid ${isMobile ? 'mobile-grid' : ''} files-${files.length}`}>
                  {files.map((fileItem) => (
                    <Card_upload
                      key={fileItem.id}
                      fileItem={fileItem}
                      isMobile={isMobile}
                      onRemove={removeFile}
                    />
                  ))}
                </div>
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
