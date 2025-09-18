import React, { useEffect, useRef, useState } from "react";
import { FileUp, CircleAlert } from "lucide-react";
import Navbar_upload from "./Navbar_Upload";
import PopupTemplate from "./PopupTemplate";

export default function Upload({ sidebarOpen, isMobile, retractToken }) {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => setEditingId(null), [retractToken]);

  // Mock student data
  const predefinedData = [
    { name: "John Alexander Smith", rollNo: "2021CSE001", cgpa: "8.5", certificateId: "CERT2024001", issueDate: "2024-05-15", degree: "B.Tech Computer Science", year: "2024" },
    { name: "Emily Rose Johnson", rollNo: "2021EEE002", cgpa: "8.2", certificateId: "CERT2024002", issueDate: "2024-04-22", degree: "B.Tech Electrical", year: "2024" },
    { name: "Michael David Brown", rollNo: "2021MECH003", cgpa: "9.1", certificateId: "CERT2024003", issueDate: "2024-03-18", degree: "B.Tech Mechanical", year: "2024" },
    { name: "Sarah Elizabeth Davis", rollNo: "2021CIVIL004", cgpa: "8.7", certificateId: "CERT2024004", issueDate: "2024-06-10", degree: "B.Tech Civil", year: "2024" },
  ];

  // File upload simulation
  const handleFileSelect = (selectedFiles) => {
    const fileArray = Array.from(selectedFiles);
    setIsUploading(true);
    setUploadProgress(0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          const newFiles = fileArray.map((file, index) => ({
            id: crypto.randomUUID(),
            file,
            preview: URL.createObjectURL(file),
            data: predefinedData[(files.length + index) % predefinedData.length],
            uploadedAt: new Date(),
          }));
          setFiles((p) => [...p, ...newFiles]);
          setIsUploading(false);
          setUploadProgress(0);
        }, 400);
      } else {
        setUploadProgress(progress);
      }
    }, 200);
  };

  // Drag and Drop
  const handleDrag = (e) => {
    if (isMobile) return;
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    if (isMobile) return;
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.length) handleFileSelect(e.dataTransfer.files);
  };

  // Sidebar responsiveness
  const desktopShift = isMobile ? "" : sidebarOpen ? "md:pl-64" : "md:pl-[70px]";

  // Update file data
  const saveEdits = (id, item) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, data: { ...item.data, ...editForm } } : f))
    );
    setEditingId(null);
  };

  const removeFile = (id) => {
    setFiles((prev) => {
      const target = prev.find((f) => f.id === id);
      if (target?.preview) URL.revokeObjectURL(target.preview);
      return prev.filter((f) => f.id !== id);
    });
    setEditingId(null);
  };

  return (
    <div
      className={`pt-6 overflow-y-auto w-screen h-screen bg-gradient-to-br from-slate-100 to-slate-200 ${
        sidebarOpen && !isMobile
          ? "left-[250px] w-[calc(100vw-249px)]"
          : !isMobile
          ? "left-[70px] w-[calc(100vw-69px)]"
          : "left-0 w-full"
      }`}
    >
      {/* Navbar */}
     
         <nav className={`fixed top-0 right-0 h-[70px] bg-white border-b border-gray-200 shadow z-50 transition-all duration-300 ease-in-out
        ${sidebarOpen && !isMobile ? 'left-[250px] w-[calc(100vw-250px)]' : !isMobile ? 'left-[70px]' : 'left-0 w-full'}`}>
        <div className="flex items-center justify-between h-full px-6 sm:px-8">
          <div>
            <h1 className="text-xl font-bold text-blue-900  sm:ml-0">EduAuth</h1>
          </div>
<button><PopupTemplate/></button>        </div>
      </nav>

      {/* Upload Section - Full Width */}
      <div className={`px-3 sm:px-6 ${desktopShift}`}>
        <section className="w-full">
          {/* Upload area */}
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={[
              "relative w-full max-w-4xl mx-auto cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 bg-white shadow-sm p-10 text-center transition-colors mt-20",
              dragActive ? "border-indigo-500 bg-indigo-50" : "",
              isUploading ? "opacity-70 pointer-events-none" : "",
            ].join(" ")}
          >
            <FileUp className="mx-auto mb-4 h-12 w-12 text-indigo-500" />
            <h3 className="text-lg sm:text-xl font-semibold text-slate-700">Upload documents</h3>
            <p className="mb-5 text-sm text-slate-500">
              Drag & drop files here, or click below to browse <br />
              <span className="text-xs text-slate-400">PDF, JPG, PNG up to 10MB</span>
            </p>
            <button
              type="button"
              className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
            >
              Choose files
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.png,.jpg,.jpeg"
              className="hidden"
              onChange={(e) => e.target.files?.length && handleFileSelect(e.target.files)}
            />

            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/90">
                <div className="w-11/12 sm:w-3/4 max-w-lg">
                  <div className="mb-2 flex items-center justify-between text-sm text-slate-700">
                    <span>Uploading…</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded bg-slate-200">
                    <div
                      className="h-full bg-indigo-500 transition-all"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* File list */}
          <div className="mt-8 space-y-3 max-w-4xl mx-auto">
            {files.length === 0 ? (
              <div className="text-center text-slate-500">
                <CircleAlert className="mx-auto h-10 w-10 text-slate-400" />
                <h3 className="mt-3 text-lg font-medium text-slate-700">
                  Upload the first document
                </h3>
                <p className="text-sm">Start by uploading your first document</p>
              </div>
            ) : (
              files.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-slate-200 bg-white shadow-sm p-4"
                >
                  {/* File Row */}
                  <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-[2fr_1fr_1fr_auto_auto]">
                    <div>
                      <p className="text-sm sm:text-base font-medium text-slate-800">
                        {item.data.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        Roll: {item.data.rollNo}
                      </p>
                      <p className="text-xs text-slate-400">
                        Cert: {item.data.certificateId}
                      </p>
                    </div>
                    <div className="text-sm sm:text-base text-slate-700">
                      CGPA: {item.data.cgpa}
                    </div>
                    <div>
                      <span className="inline-block rounded-full bg-amber-300/60 px-2 py-1 text-xs font-medium text-amber-900">
                        Pending
                      </span>
                    </div>
                    <button
                      className="text-sm font-medium text-blue-600 hover:underline"
                      onClick={() =>
                        setEditingId((id) => (id === item.id ? null : item.id))
                      }
                    >
                      {editingId === item.id ? "Close" : "Edit"}
                    </button>
                    <button
                      className="text-sm font-medium text-red-600 hover:underline"
                      onClick={() => removeFile(item.id)}
                    >
                      Remove
                    </button>
                  </div>

                  {/* Edit Form */}
                  <div></div>
                  {editingId === item.id && (
                    <div className="mt-3 border-t flex flex-col border-slate-200 pt-3">
                      <form className="flex flex-wrap gap-3">
                        {[
                          ["name", "Name"],
                          ["rollNo", "Roll No."],
                          ["cgpa", "CGPA"],
                          ["certificateId", "Certificate ID"],
                          ["issueDate", "Issue Date"],
                          ["degree", "Degree"],
                          ["year", "Year"],
                        ].map(([key, label]) => (
                          <label
                            key={key}
                            className="flex w-[140px] sm:w-[150px] flex-col text-sm"
                          >
                            <span className="mb-1 text-slate-600">{label}</span>
                            <input
                              className="rounded border border-slate-300 px-2 py-1 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                              value={editForm[key] ?? item.data[key] ?? ""}
                              onChange={(e) =>
                                setEditForm((p) => ({ ...p, [key]: e.target.value }))
                              }
                            />
                          </label>
                        ))}
                        
                      </form>
                      <div className="ml-auto flex gap-2">
                          <button
                            type="button"
                            onClick={() => saveEdits(item.id, item)}
                            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
                          >
                            Save
                          </button>
                          
                        </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
