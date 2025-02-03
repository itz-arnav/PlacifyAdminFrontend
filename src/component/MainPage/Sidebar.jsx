import React from 'react';
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { FaEnvelopeOpen, FaChartBar } from "react-icons/fa";
import { LuDatabaseZap } from "react-icons/lu";
import { RiArticleFill, RiAdminFill } from "react-icons/ri";

import css from "../../styles/MainPage/Sidebar.module.css";

const Sidebar = ({
    isOpen,
    selectedItem,
    setSelectedItem,
    toggleSidebar
}) => {

    const sidebarItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <FaEnvelopeOpen className={css.sidebarListIcon} /> },
        { id: 'collections', label: 'Collections', icon: <LuDatabaseZap className={css.sidebarListIcon} /> },
        { id: 'statistics', label: 'Statistics', icon: <FaChartBar className={css.sidebarListIcon} /> },
        { id: 'myPosts', label: 'My Posts', icon: <RiArticleFill className={css.sidebarListIcon} /> },
        { id: 'adminPanel', label: 'Admin Panel', icon: <RiAdminFill className={css.sidebarListIcon} /> },
    ];

    return (
        <div className={`${css.sidebarContainer} ${!isOpen ? css.closed : ""}`}
        >
            <div className={css.sidebarHeader}>
                <div className={css.logoSection}>
                    {isOpen && (
                        <>
                            <img src="./placify.png" alt="Placify Logo" className={css.companyLogo} />
                            <span className={css.companyName}>Placify</span>
                        </>
                    )}
                </div>
                <div className={css.sidebarIcon} onClick={toggleSidebar}>
                    {isOpen ? <GoSidebarExpand /> : <GoSidebarCollapse />}
                </div>
            </div>

            <ul className={css.sidebarTreeList}>
                {sidebarItems.map(item => (
                    <li
                        key={item.id}
                        className={`${css.sidebarTreeItem} ${selectedItem === item.id ? css.active : ""}`}
                        onClick={() => setSelectedItem(item.id)}
                    >
                        {item.icon}
                        {isOpen && <span className={css.listItemLabel}>{item.label}</span>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
