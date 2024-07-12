import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Logout from "./Logout";

interface AsideProps {
    menuOpen: boolean;
    toggleMenu: () => void;
}

const Aside: React.FC<AsideProps> = ({ menuOpen, toggleMenu }) => {
    return (
        <aside className="absolute top-0 z-50 bg-purple-200 text-red-800 md:hidden min-h-screen min-w-[60%] overflow-y-hidden">
            <button className="md:hidden p-4 text-blue-900 text-xl" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faClose} />
            </button>

            <div className="flex flex-col py-10 px-5">
                <div className="flex flex-col gap-y-6 m-10">
                    <NavLink className="mb-4 rounded-lg w-full sm:w-40 px-4 py-2 text-center bg-blue-900 focus:ring-blue-100 text-white" to="/" onClick={toggleMenu}>
                        Home
                    </NavLink>

                    <Logout />

                </div>
            </div>
        </aside>
    );
};

export default Aside;
