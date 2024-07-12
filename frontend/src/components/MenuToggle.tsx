import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

interface MenuToggleProp {
    toggleMenu: () => void;
}

const MenuToggle: React.FC<MenuToggleProp> = ({ toggleMenu }) => {
    return (
        <button className="md:hidden text-xl" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faBars} />
        </button>
    );
};

export default MenuToggle;
