import React, { useState } from 'react';
import '../css/CardUpload.css';

function CardUpload({ fileItem, onRemove }) {

  const [name, setName] = useState(fileItem.file.name);
  const [rollNo, setRollNo] = useState(fileItem.data.rollNo);
  const [certificateId, setCertificateId] = useState(fileItem.data.certificateId);
  const [cgpa, setCgpa] = useState(fileItem.data.cgpa);

  const handleRemove = () => {
    if (onRemove) {
      onRemove(fileItem.id);
    }
  };

  const isImage = fileItem.file.type.startsWith('image/');

  return (
    <div className="card-upload-container">
      
      <div className="preview">
        {isImage ? (
          <img 
            src={fileItem.preview} 
            className="card-img-top" 
            alt="Document preview"
          />
        ) : (
          <div className="file-icon-container">
            <span className="file-icon">📄</span>
            <p className="file-extension">{fileItem.file.name.split('.').pop().toUpperCase()}</p>
          </div>
        )}
      </div>

      <div className="text-field-container">
        <input 
          className="input-field" 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          className="input-field" 
          type="text" 
          placeholder="Roll No." 
          value={rollNo} 
          onChange={(e) => setRollNo(e.target.value)} 
        />
        <input 
          className="input-field" 
          type="text" 
          placeholder="Certificate ID" 
          value={certificateId} 
          onChange={(e) => setCertificateId(e.target.value)} 
        />
        <input 
          className="input-field" 
          type="text" 
          placeholder="CGPA" 
          value={cgpa} 
          onChange={(e) => setCgpa(e.target.value)} 
        />
        <p className="upload-time">Uploaded: {fileItem.uploadedAt.toLocaleString()}</p>
      </div>

      <div className="button-container">
        <button className="remove-button" onClick={handleRemove} aria-label={`Remove ${fileItem.file.name}`}>
          Remove
        </button>
      </div>

    </div>
  );
}

export default CardUpload;
