import { FaShieldHalved } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <div className="px-10 py-2 flex justify-between border-b border-black/20">
            <div className="flex gap-5 cursor-pointer">
                <div className="bg-blue-600 p-2 rounded-lg">
                    <FaShieldHalved className="text-white text-4xl" />
                </div>
                <div>
                    <p className="font-bold text-2xl">EduAuth</p>
                    <p className="text-sm text-black/70">Government of India</p>
                </div>
            </div>

            <div className="font-semibold text-black/80 flex items-center gap-10">
                <p className="cursor-pointer">Help</p>
                <p className="cursor-pointer">Support</p>
                <Link to="/auth">
                    <button className="flex items-center gap-1 border border-black/40 px-2 py-1 rounded-lg cursor-pointer">
                        <IoSettingsOutline />
                        Admin Portal
                    </button>
                </Link>
            </div>
        </div>
    )
}