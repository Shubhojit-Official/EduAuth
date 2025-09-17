import { FaFileCircleCheck } from "react-icons/fa6";
import { MdLockOutline } from "react-icons/md";

export const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-10 h-[87vh]">
            <div className="text-center flex flex-col items-center gap-14">
                <p className="text-6xl font-bold w-[60vw]">
                    <i className="text-blue-600">Authenticate</i> <i>Your Academic Credentials Instantly</i>
                </p>
                <p className="text-xl w-[42vw] text-black/70">
                    Secure, fast, and reliable verification of academic certificates issued by recognized institutions across the country.
                </p>
            </div>

            <div className="flex gap-5">
                <button className="flex items-center text-white text-lg px-4 py-2 border gap-1 border-blue-600 cursor-pointer rounded-xl font-semibold bg-blue-600">
                    <FaFileCircleCheck />
                    Verify Certificate
                </button>
                <button className="flex items-center border border-black/40 text-black/80 text-lg px-6 py-2 rounded-xl font-semibold cursor-pointer gap-1">
                    <MdLockOutline />
                    Institute Login
                </button>
            </div>
        </div>
    )
}