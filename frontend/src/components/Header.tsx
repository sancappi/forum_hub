import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import MenuToggle from "./MenuToggle";
import Aside from "./Aside";
import Logout from "./Logout";

const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="sticky top-0 z-10 bg-blue-900 text-white w-full md:min-h-14">
            <div className="flex flex-row justify-between md:items-end px-5 md:px-10 py-2">
                <MenuToggle toggleMenu={toggleMenu} />
            </div>

            <div className="hidden md:flex justify-between px-5 max-">
                <NavLink className="" to="/">
                    Home
                </NavLink>

                <div>
                    <Logout />
                </div>
            </div>
            {menuOpen && <Aside menuOpen={menuOpen} toggleMenu={toggleMenu} />}
        </header>
    );
};

export default Header;

