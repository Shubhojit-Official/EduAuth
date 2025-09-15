import '../css/CardUpload.css'
function CardUpload({ fileItem, isMobile, onRemove }){
  const url="https://img.freepik.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg?semt=ais_incoming&w=740&q=80";
  const handleRemove = () => {
    if (onRemove) {
      onRemove(fileItem.id);
    }
  };
  return (
    <>
<div className="Card-upload-container" >
  <div className="preview" style={{margin:"10px"}}>
  <img 
          src={url}
          className="card-img-top" 
          alt="Document preview"
          
        />  
  </div>
  <div className='text-field-container'>
    <input className="input-fields" type="text" placeholder="Name" value={fileItem.file.name} />
        <input className="input-fields" type="text" placeholder="Roll No." value={fileItem.data.rollNo} />
    <input className="input-fields" type="text" placeholder="Certificate ID"  value={fileItem.data.certificateId}/>
    <input className="input-fields" type="text" placeholder="CGPA" value={fileItem.data.cgpa} />
   <p className="input-fields" >Uploaded: {fileItem.uploadedAt.toLocaleString()}</p>
  </div>
  <div>
    <button onClick={handleRemove}>Remove</button>
  </div>
</div>      
    </>
  )
}
export default CardUpload;
///