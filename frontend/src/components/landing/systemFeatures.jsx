import { FaFileCircleCheck } from "react-icons/fa6";
import { TbUsers } from "react-icons/tb";
import { BsGraphUp } from "react-icons/bs";
import { FaShieldAlt } from "react-icons/fa";

export const SystemFeatures = () => {
    return (
        <div>
            <div className="px-20 py-40 flex flex-col gap-20">
                <div className="text-center flex flex-col items-center gap-5">
                    <p className="text-3xl font-semibold">System Features</p>
                    <p className="text-black/70 text-xl">Comprehensive verification and management tools for all stakeholders</p>
                </div>

                <div className="flex justify-between gap-20">
                    <div className="flex flex-col gap-5 border px-8 py-8 rounded-2xl border-black/30 w-[30vw] shadow-[0px_3px_10px_0px_#a0aec0]">
                        <div className="flex justify-center">
                            <div className="bg-blue-100 p-5 rounded-full flex justify-center items-center">
                                <FaShieldAlt className="text-blue-600 text-2xl" />
                            </div>
                        </div>

                        <div className="text-center flex flex-col items-center gap-3">
                            <p className="text-xl font-semibold">Secure Verification</p>
                            <p className="text-black/70">End-to-end encryption and blockchain proof for all verifications</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 border px-8 py-8 rounded-2xl border-black/30 w-[30vw] shadow-[0px_3px_10px_0px_#a0aec0]">
                        <div className="flex justify-center">
                            <div className="bg-blue-100 p-5 rounded-full flex justify-center items-center">
                                <FaFileCircleCheck className="text-blue-600 text-2xl" />
                            </div>
                        </div>

                        <div className="text-center flex flex-col items-center gap-3">
                            <p className="text-xl font-semibold">Multiple Formats</p>
                            <p className="text-black/70">Support for PDF, images, QR codes, and manual entry</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 border px-8 py-8 rounded-2xl border-black/30 w-[30vw] shadow-[0px_3px_10px_0px_#a0aec0]">
                        <div className="flex justify-center">
                            <div className="bg-blue-100 p-5 rounded-full flex justify-center items-center">
                                <TbUsers className="text-blue-600 text-2xl" />
                            </div>
                        </div>

                        <div className="text-center flex flex-col items-center gap-3">
                            <p className="text-xl font-semibold">Multi-User Access</p>
                            <p className="text-black/70">Separate portals for institutions and verifiers</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 border px-8 py-8 rounded-2xl border-black/30 w-[30vw] shadow-[0px_3px_10px_0px_#a0aec0]">
                        <div className="flex justify-center">
                            <div className="bg-blue-100 p-5 rounded-full flex justify-center items-center">
                                <BsGraphUp className="text-blue-600 text-2xl" />
                            </div>
                        </div>

                        <div className="text-center flex flex-col items-center gap-3">
                            <p className="text-xl font-semibold">Analytics Dashboard</p>
                            <p className="text-black/70">Real-time monitoring and fraud detection capabilities</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}