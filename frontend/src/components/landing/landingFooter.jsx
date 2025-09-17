import { FaShieldHalved } from "react-icons/fa6";

export const LandingFooter = () => {
    return (

        <div className="flex justify-between p-10 px-20 border-t border-black/30 bg-[#f1f1f1]">
            <div className="flex gap-5 cursor-pointer">
                <FaShieldHalved className="text-white text-5xl bg-blue-600 p-2 rounded-lg" />
                <div>
                    <p className="font-bold text-2xl">EduAuth</p>
                    <p className="text-sm text-black/70">Government of India</p>
                </div>
            </div>

            <div className="text-black/70">
                <p className="font-semibold">Legal</p>
                <p>Privacy Policy</p>
                <p>Terms of service</p>
                <p>Accessibility</p>
            </div>

            <div className="text-black/70">
                <p className="font-semibold">Support</p>
                <p>Contact Us</p>
                <p>Help Center</p>
                <p>Technical Support</p>
            </div>
        </div>

    )
}