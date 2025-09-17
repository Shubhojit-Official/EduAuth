import { FaFileCircleCheck } from "react-icons/fa6";
import { TbUsers } from "react-icons/tb";
import { BsGraphUp } from "react-icons/bs";
import { FaExternalLinkAlt } from "react-icons/fa";

export const HowWorks = () => {
    return (
        <div className="px-20 py-40 flex flex-col gap-20">
            <div className="text-center flex flex-col gap-5">
                <p className="text-3xl font-semibold">How Our Verification System Works</p>
                <p className="text-black/70 text-xl">Simple, secure, and transparent process for all stakeholders</p>
            </div>

            <div className="flex justify-between gap-20">
                <div className="flex flex-col gap-5 border px-8 py-8 rounded-2xl border-black/30 w-[30vw] shadow-[0px_3px_10px_0px_#a0aec0]">
                    <div className="flex justify-center">
                        <div className = "bg-blue-100 p-5 rounded-full flex justify-center items-center">
                            <FaFileCircleCheck className="text-blue-600 text-2xl" />
                        </div>
                    </div>

                    <div className="text-center flex flex-col items-center gap-5">
                        <p className="text-xl font-semibold">How it Works</p>
                        <p className="text-black/70">Enter certificate details or upload document. Our system instantly verifies against official records from recognized institutions nationwide.</p>
                        <a className="flex items-center gap-1 text-blue-600 font-semibold" href="">View Sample Result <FaExternalLinkAlt /></a>
                    </div>
                </div>

                <div className="flex flex-col gap-5 border px-8 py-8 rounded-2xl border-black/30 w-[30vw] shadow-[0px_3px_10px_0px_#a0aec0]">
                    <div className="flex justify-center">
                        <div className = "bg-blue-100 p-5 rounded-full flex justify-center items-center">
                            <TbUsers className="text-blue-600 text-2xl" />
                        </div>
                    </div>

                    <div className="text-center flex flex-col items-center gap-5">
                        <p className="text-xl font-semibold">Who Can Use</p>
                        <p className="text-black/70">Employers, students, government agencies, and international organizations can verify academic credentials issued by accredited institutions.</p>
                        <a className="flex items-center gap-1 text-blue-600 font-semibold" href="">View eligibility <FaExternalLinkAlt /></a>
                    </div>
                </div>

                <div className="flex flex-col gap-5 border px-8 py-8 rounded-2xl border-black/30 w-[30vw] shadow-[0px_3px_10px_0px_#a0aec0]">
                    <div className="flex justify-center">
                        <div className = "bg-blue-100 p-5 rounded-full flex justify-center items-center">
                            <BsGraphUp className="text-blue-600 text-2xl" />
                        </div>
                    </div>

                    <div className="text-center flex flex-col items-center gap-5">
                        <p className="text-xl font-semibold">Reporting</p>
                        <p className="text-black/70">Report suspicious certificates or fraudulent documents. Help maintain the integrity of our verification system.</p>
                        <a className="flex items-center gap-1 text-blue-600 font-semibold" href="">Report issue <FaExternalLinkAlt /></a>
                    </div>
                </div>
            </div>
        </div>
    )
} 