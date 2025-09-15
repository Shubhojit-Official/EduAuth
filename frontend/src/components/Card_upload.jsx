
const Card_upload = ({ fileItem, isMobile, onRemove }) => {
  const handleRemove = () => {
    if (onRemove) {
      onRemove(fileItem.id);
    }
  };

  return (
    <div className={`card ${isMobile ? 'mobile-card' : ''}`} style={{ width: '18rem' }}>      
      {/* Card Image/Preview */}
      {fileItem.file.type.startsWith('image/') ? (
        <img 
          src={fileItem.preview} 
          className="card-img-top" 
          alt="Document preview"
          style={{ height: '200px', objectFit: 'cover' }}
        />
      ) : (
        <div className="card-img-top file-icon-container">
          <div className="file-icon">
            <span>📄</span>
            <p>{fileItem.file.name.split('.').pop().toUpperCase()}</p>
          </div>
        </div>
      )}

      {/* Card Body */}
      <div className="card-body" style={{height:"60px"}}>
        <h5 className="card-title">{fileItem.file.name}</h5>
      </div>

      {/* Student Information List */}
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <strong>Roll Number:</strong> {fileItem.data.rollNo}
        </li>
        <li className="list-group-item">
           <strong>CGPA:</strong> {fileItem.data.cgpa}/10
        </li>
        <li className="list-group-item">
          <strong>Certificate ID:</strong> {fileItem.data.certificateId}
        </li>
        <li className="list-group-item">
          <strong>Issue Date:</strong> {fileItem.data.issueDate}
        </li>
        <li className="list-group-item file-status-item">
          <span style={{backgroundColor:"rgb(0, 204, 0)",padding:"8px", borderRadius:"20px",margin:"1px"}} className="status-badge verified">✓ Verified</span><br />
          <small className="upload-time" >
            Uploaded: {fileItem.uploadedAt.toLocaleString()}
          </small>
        </li>
      </ul>
      <button 
        className="btn btn-secondary"
        onClick={handleRemove}
        title="Remove file"
        aria-label={`Remove ${fileItem.file.name}`}
      >
        Remove
      </button>

    </div>
  );
};

export default Card_upload;
