import { Building, Mail, Phone, Globe } from "lucide-react";
import React from "react";

const Footer: React.FC = () => {
    return (
        <>

            <footer className="bg-[#005461]  mt-10">



                {/* Bottom Bar */}
                <div className="text-center py-4 text-md text-white">
                    © {new Date().getFullYear()} ServiceHub. All rights reserved
                </div>
            </footer>
        </>
    );
};


export default Footer;
