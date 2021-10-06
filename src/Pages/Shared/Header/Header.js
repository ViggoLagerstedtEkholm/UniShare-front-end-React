import '../../../css/header.css';
import React from "react";
import TopNavigation from "./TopNavigation";
import {MiddleNavigation} from "./MiddleNavigation";
import {AdminNavigation} from "./AdminNavigation";

function Header() {
    return (
        <div>
            <TopNavigation/>
            <MiddleNavigation/>
            <AdminNavigation/>
        </div>
    );
}

export default Header;
