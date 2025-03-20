import React from 'react';
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { FaEnvelopeOpen, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import { LuDatabaseZap } from "react-icons/lu";
import { RiArticleFill, RiAdminFill } from "react-icons/ri";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import css from "../../styles/MainPage/Sidebar.module.css";

const Sidebar = ({
    isOpen,
    selectedItem,
    setSelectedItem,
    toggleSidebar
}) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const sidebarItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <FaEnvelopeOpen className={css.sidebarListIcon} /> },
        { id: 'collections', label: 'Collections', icon: <LuDatabaseZap className={css.sidebarListIcon} /> },
        { id: 'statistics', label: 'Statistics', icon: <FaChartBar className={css.sidebarListIcon} /> },
        { id: 'myPosts', label: 'My Posts', icon: <RiArticleFill className={css.sidebarListIcon} /> },
        { id: 'adminPanel', label: 'Admin Panel', icon: <RiAdminFill className={css.sidebarListIcon} /> },
    ];

    const handleKeyPress = (e, itemId) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setSelectedItem(itemId);
        }
    };

    return (
        <nav 
            className={`${css.sidebarContainer} ${!isOpen ? css.closed : ""}`}
            role="navigation"
            aria-label="Main navigation"
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
                <button 
                    className={css.sidebarIcon} 
                    onClick={toggleSidebar}
                    aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
                >
                    {isOpen ? <GoSidebarExpand /> : <GoSidebarCollapse />}
                </button>
            </div>

            <ul className={css.sidebarTreeList} role="menu">
                {sidebarItems.map(item => (
                    <li
                        key={item.id}
                        className={`${css.sidebarTreeItem} ${selectedItem === item.id ? css.active : ""}`}
                        role="menuitem"
                        tabIndex={0}
                        onClick={() => setSelectedItem(item.id)}
                        onKeyPress={(e) => handleKeyPress(e, item.id)}
                        aria-current={selectedItem === item.id ? "page" : undefined}
                    >
                        {item.icon}
                        {isOpen && <span className={css.listItemLabel}>{item.label}</span>}
                        {!isOpen && (
                            <div className={css.tooltip} role="tooltip">
                                {item.label}
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            <div className={css.sidebarFooter}>
                <button 
                    className={css.logoutButton}
                    aria-label="Logout"
                    onClick={() => {
                        logout();
                        navigate("/login");
                    }}
                >
                    <FaSignOutAlt className={css.sidebarListIcon} />
                    {isOpen && <span className={css.listItemLabel}>Logout</span>}
                    {!isOpen && (
                        <div className={css.tooltip} role="tooltip">
                            Logout
                        </div>
                    )}
                </button>
            </div>
        </nav>
    );
};

export default Sidebar;
