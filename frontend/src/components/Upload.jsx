import React, { useState, useRef } from 'react';
import Card_upload from './Card_upload';
import '../css/Upload.css';
import '../css/Dashboard.css'
import { FileUp } from 'lucide-react';
import { CircleAlert } from 'lucide-react';

const Upload = ({ sidebarOpen, isMobile }) => {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // Extended predefined data with unique information for each file
  const predefinedData = [
    {
      name: "John Alexander Smith",
      rollNo: "2021CSE001",
      cgpa: "8.5",
      certificateId: "CERT2024001",
      issueDate: "2024-05-15"
    },
    {
      name: "Emily Rose Johnson",
      rollNo: "2021EEE002", 
      cgpa: "8.2",
      certificateId: "CERT2024002",
      issueDate: "2024-04-22"
    },
    {
      name: "Michael David Brown",
      rollNo: "2021MECH003",
      cgpa: "9.1", 
      certificateId: "CERT2024003",
      issueDate: "2024-03-18"
    },
    {
      name: "Sarah Elizabeth Davis",
      rollNo: "2021CIVIL004",
      cgpa: "8.7",
      certificateId: "CERT2024004",
      issueDate: "2024-06-10"
    }
  ];

  // Handle file selection
  const handleFileSelect = (selectedFiles) => {
    const fileArray = Array.from(selectedFiles);
    
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress (5 seconds)
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setIsUploading(false);
            
            // Add files with unique predefined data
            const newFiles = fileArray.map((file, index) => ({
              id: Date.now() + index,
              file: file,
              preview: URL.createObjectURL(file),
              data: predefinedData[index % predefinedData.length],
              uploadedAt: new Date()
            }));
            
            setFiles(prevFiles => [...prevFiles, ...newFiles]);
            setUploadProgress(0);
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 100); // 100ms * 50 steps = 5000ms (5 seconds)
  };

  // Handle drag events (disabled on mobile for better touch experience)
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

  // Handle drop event
  const handleDrop = (e) => {
    if (isMobile) return;
    
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  // Handle button click
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Handle input change
  const handleInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files);
    }
  };

  // Remove file
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
      <nav className={`dashboard-navbar ${sidebarOpen ? 'with-sidebar' : 'without-sidebar'} ${isMobile ? 'mobile' : 'desktop'}`}>
        <div className="navbar-content">
          {/* Left side - Brand/Logo */}
          <div className="navbar-brand">
            <h1>EduAuth</h1>
          </div>
        </div>
      </nav>

      <div className="upload-content-wrapper">
        <div className="upload-content">
          {/* Upload Area */}
          <div 
            className={`upload-area ${dragActive && !isMobile ? 'drag-active' : ''} ${isUploading ? 'uploading' : ''} ${isMobile ? 'mobile-upload' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="upload-area-content">
              <div className="upload-icon">
                <FileUp size={isMobile ? 60 : 80} color="#667eea" strokeWidth={1.5} />
              </div>
              <h3>{isMobile ? 'Tap to upload documents' : 'Drop documents here or click to upload'}</h3>
              <p>Support for PDF, JPG, PNG files up to 10MB each</p>
              
              <button 
                className={`upload-button ${isMobile ? 'mobile-button' : ''}`}
                onClick={handleButtonClick}
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

            {/* Centered Progress Bar */}
            {isUploading && (
              <div className="upload-progress-overlay">
                <div className="progress-container-centered">
                  <div className="progress-header">
                    <span className="progress-title">Uploading Files...</span>
                    <span className="progress-percentage">{uploadProgress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Uploaded Files Grid - Shows exactly the number of uploaded files using Card_upload */}
          {files.length > 0 && (
            <div className="uploaded-files">
              <h3>Uploaded Documents ({files.length})</h3>
              
              <div className={`files-grid ${isMobile ? 'mobile-grid' : ''} files-${files.length}`}>
                {files.map((fileItem, index) => (
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

          {/* Empty state when no files */}
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
  );
};

export default Upload;