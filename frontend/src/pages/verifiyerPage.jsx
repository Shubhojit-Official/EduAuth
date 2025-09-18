import Stepper, { Step } from "../components/ui/Stepper"
import { Navbar } from "../components/Navbar";
import { useState, useEffect } from "react";

export const VerifierPage = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);

            if (selectedFile.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(reader.result);
                };
                reader.readAsDataURL(selectedFile);
            } else {
                setPreview(null);
            }
        }
    };

    return (
        <div>
            <Navbar />

            <div className="h-[90vh] flex overflow-hidden">
                <Stepper
                    initialStep={1}
                    onStepChange={(step) => {
                        console.log("Step changed:", step);
                    }}
                    onFinalStepCompleted={() => console.log("All steps completed!")}
                    backButtonText="Previous"
                    nextButtonText="Next"
                >
                    {/* Step 1 - Upload */}
                    <Step>
                        <div className="py-2">
                            <p className="text-xl">Upload Document</p>
                            <p className="text-md text-black/40">
                                Be Sure the document is well aligned and scanned properly, Max doc size 1mb.
                            </p>
                        </div>

                        <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-blue-300 rounded-lg bg-blue-50 hover:bg-gray-100 transition cursor-pointer">
                            {!preview ? (
                                <label
                                    htmlFor="file-upload"
                                    className="flex flex-col items-center justify-center w-full h-full text-blue-500"
                                >
                                    <svg
                                        className="w-10 h-10 mb-3 text-blue-300"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M7 16V8a4 4 0 118 0v8m-4 4h.01M5 20h14a2 2 0 002-2V10a2 2 0 00-2-2h-3.28a2 2 0 01-1.44-.59L12 4l-2.28 3.41A2 2 0 018.28 8H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <p className="text-sm">
                                        <span className="font-semibold">Click to upload</span> or drag and
                                        drop
                                    </p>
                                    <p className="text-xs text-blue-500 mt-1">PNG, JPG, PDF up to 10MB</p>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </label>
                            ) : (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full h-full object-contain rounded-lg"
                                />
                            )}
                        </div>
                    </Step>

                    <Step>
                        <div className="flex flex-col gap-5">
                            <div>
                                <p className="text-xl">Fill Up The Form</p>
                                <p className="text-md text-black/40">Enter the certificate details careflly</p>
                            </div>
                            <div className="flex gap-5 justify-center">
                                <div>
                                    <div className="py-2">
                                        <p className="font-semibold text-sm">Student Name *</p>
                                        <input className="border p-1 rounded-md border-black/30" placeholder="Enter Full Name" type="text" />
                                    </div>
                                    <div className="pb-2">
                                        <p className="font-semibold text-sm">Certificate ID *</p>
                                        <input className="border p-1 rounded-md border-black/30" placeholder="Enter Certificate Id" type="text" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm">Degree *</p>
                                        <input className="border p-1 rounded-md border-black/30" placeholder="e.g, B.Tech CSE" type="text" />
                                    </div>
                                </div>
                                <div>
                                    <div className="py-2">
                                        <p className="font-semibold text-sm">Institution *</p>
                                        <input className="border p-1 rounded-md border-black/30" placeholder="Enter Institution Name" type="text" />
                                    </div>
                                    <div className="pb-2">
                                        <p className="font-semibold text-sm">Graduation Year *</p>
                                        <input className="border p-1 rounded-md border-black/30" placeholder="e.g, 2023-27" type="text" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm">Grade/GPA</p>
                                        <input className="border p-1 rounded-md border-black/30" placeholder="Enter Your Grades Name" type="text" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Step>

                    {/* Step 2 - Loader */}
                    <Step>
                        <LoaderStep />
                    </Step>

                    {/* Step 3 - Final Verification Done */}
                    <Step>
                        <div className="flex flex-col items-center justify-center h-60 gap-4">
                            <p className="text-green-600 text-xl font-semibold">Certificate Verified</p>
                            <p>
                                Verification completed on 20/09/2025
                            </p>
                            <p>
                                Confident Score 92%
                            </p>
                        </div>
                    </Step>
                </Stepper>
            </div>
        </div>
    )
}

// Loader component for Step 2
function LoaderStep() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 5000); // 5 sec
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-60 gap-4">
            {loading ? (
                <>
                    <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    <p className="text-gray-700 font-medium">Verifying...</p>
                </>
            ) : (
                <p className="text-blue-600 font-medium">✔ Redirecting to results...</p>
            )}
        </div>
    );
}
