import React, { useState } from 'react';

import css from "../../styles/MainPage/MainPage.module.css";
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Collection from './Collection';
import Statistics from './Statistics';
import MyPosts from './MyPosts';
import AdminPanel from './AdminPanel';

const MainPage = () => {
    // State to track sidebar open/closed state
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    // State to track the selected sidebar item, defaulting to 'dashboard'
    const [selectedItem, setSelectedItem] = useState('dashboard');

    // Toggle function for sidebar state
    const toggleSidebar = () => {
        setIsSidebarOpen(prevState => !prevState);
    };

    // Render content based on selected sidebar item
    const renderContent = () => {
        switch (selectedItem) {
            case 'dashboard':
                return <Dashboard />;
            case 'collections':
                return <Collection />;
            case 'statistics':
                return <Statistics />;
            case 'myPosts':
                return <MyPosts />;
            case 'adminPanel':
                return <AdminPanel />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className={css.mainPageContainer}>
            <Sidebar
                isOpen={isSidebarOpen}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                toggleSidebar={toggleSidebar}
            />

            <div className={css.contentContainer}>
                {renderContent()}
            </div>
        </div>
    );
};

export default MainPage;
