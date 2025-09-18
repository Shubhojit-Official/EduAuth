import React, { useState } from "react";
import Navbar_upload from "./Navbar_Upload";

export default function AppealSection({ sidebarOpen, isMobile }) {
  const [appeals] = useState([ //setAppeals
    { id: "CERT-1023", name: "Priya Verma", course: "CSE", issue: "Name mismatch", status: "Needs attention" },
    { id: "CERT-1045", name: "Rahul Mehta", course: "ECE", issue: "Missing stamp", status: "Needs attention" },
    { id: "CERT-1072", name: "Sara Ali", course: "BCA", issue: "Incorrect date", status: "Needs attention" },
  ]);

  const [form, setForm] = useState({
    certificateId: "",
    email: "",
    message: "",
  });

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    // Submit to API here
    console.log("Appeal submitted:", form);
    setForm({ certificateId: "", email: "", message: "" });
    alert("Appeal submitted. We will review and get back shortly.");
  };

  return (
  <div className={`pt-6 w-screen h-screen bg-slate-100 ${sidebarOpen && !isMobile ? 'left-[250px] w-[calc(100vw-249px)]' : !isMobile ? 'left-[70px] w-[calc(100vw-69px)]' : 'left-0 w-full'}`}>
      <nav className={`fixed top-0 right-0 h-[70px] bg-white border-b border-gray-200 shadow z-50 transition-all duration-300 ease-in-out
        ${sidebarOpen && !isMobile ? 'left-[250px] w-[calc(100vw-250px)]' : !isMobile ? 'left-[70px]' : 'left-0 w-full'}`}>
        <div className="flex items-center justify-between h-full px-6 sm:px-8">
          <div>
            <h1 className="text-xl font-bold text-blue-900 ml-12 sm:ml-0">EduAuth</h1>
          </div>
          
        </div>
      </nav>
      {/* Banner / Callout */}
      <div className="bg-amber-50 mt-3 m-6 border border-amber-200 text-amber-900 rounded-lg p-4 sm:p-5 shadow">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
            !
          </span>
          <div className="flex-1">
            <h2 className="text-lg font-semibold">Certificates need attention</h2>
            <p className="mt-1 text-sm">
              Some submissions require additional verification or corrections. Review items below and file an appeal if details are accurate.
            </p>
          </div>
        </div>
      </div>

      {/* Cards: Needs Attention */}
      <div className="m-6 bg-white rounded-lg shadow p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Needs Attention</h3>
          <span className="text-sm text-gray-500">{appeals.length} items</span>
        </div>

        <div className="space-y-3">
          {appeals.map((a) => (
            <div
              key={a.id}
              className="flex items-center justify-between bg-gray-50 rounded p-3 hover:bg-gray-100 transition-colors"
            >
              <div>
                <p className="font-medium text-gray-700">{a.name} · {a.course}</p>
                <p className="text-sm text-gray-500">ID: {a.id} · Issue: {a.issue}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                {a.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Appeal Form */}
      <div className="m-6 bg-white rounded-lg shadow p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Submit an Appeal</h3>
        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Certificate ID</label>
            <input
              type="text"
              name="certificateId"
              value={form.certificateId}
              onChange={onChange}
              placeholder="e.g., CERT-1023"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              required
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="name@example.com"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              required
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={onChange}
              rows={4}
              placeholder="Describe the issue and provide any supporting details (e.g., correct spelling, correct date, issuing authority contact)."
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              required
            />
          </div>
          <div className="col-span-1 md:col-span-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setForm({ certificateId: "", email: "", message: "" })}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Clear
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-900 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 transition-colors"
            >
              Submit Appeal
            </button>
          </div>
        </form>
      </div>
      </div>
      
  );
}
