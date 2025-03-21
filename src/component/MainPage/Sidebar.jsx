import React, { useState, useRef } from 'react';
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { FaEnvelopeOpen, FaChartBar, FaSignOutAlt, FaPlus, FaTimes } from "react-icons/fa";
import { LuDatabaseZap } from "react-icons/lu";
import { RiArticleFill, RiAdminFill } from "react-icons/ri";
import { BiCloudUpload } from "react-icons/bi";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "../../styles/BasicDatePicker.css";
import { toast } from 'react-toastify';

import css from "../../styles/MainPage/Sidebar.module.css";

const Sidebar = ({
    isOpen,
    selectedItem,
    setSelectedItem,
    toggleSidebar,
    isEditing = false,
    editData = null,
    onClose
}) => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const formRef = useRef(null);
    const fileInputRef = useRef(null);

    const options = [
        { value: 'job', label: 'Job' },
        { value: 'internship', label: 'Internship' },
        { value: 'hackathon', label: 'Hackathon' },
        { value: 'contest', label: 'Contest' }
    ];

    // Add Item Modal States
    const [isModalOpen, setIsModalOpen] = useState(isEditing);
    const [selectedOption, setSelectedOption] = useState(() => {
        if (editData) {
            const type = editData.type.toLowerCase();
            const option = options.find(opt => opt.value === type);
            return option || options[0];
        }
        return options[0];
    });
    const [ctc, setCTC] = useState(editData?.ctc || '');
    const [eligibleBatch, setEligibleBatch] = useState(editData?.batchEligible || '');
    const [companyName, setCompanyName] = useState(editData?.company || '');
    const [uploadedImage, setUploadedImage] = useState(editData?.imageIcon || null);
    const [startDate, setStartDate] = useState(
        editData 
            ? new Date(editData.closingDate) 
            : new Date(new Date().setDate(new Date().getDate() + 3))
    );
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fileName, setFileName] = useState(null);

    const customSelectStyles = {
        control: (provided) => ({
            ...provided,
            cursor: 'pointer',
            boxShadow: 'none',
            backgroundColor: '#2b2b2b',
            borderColor: '#333',
            '&:hover': {
                borderColor: '#5641f4'
            }
        }),
        option: (provided, state) => ({
            ...provided,
            color: 'white',
            backgroundColor: state.isSelected ? '#5641f4' : state.isFocused ? '#6d59f9' : '#2b2b2b',
            cursor: 'pointer',
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'white'
        }),
        input: (provided) => ({
            ...provided,
            color: 'white'
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: '#2b2b2b'
        })
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setSelectedOption({ value: 'job', label: 'Jobs' });
        setCTC('');
        setEligibleBatch('');
        setUploadedImage(null);
        setFileName(null);
        setStartDate(new Date(new Date().setDate(new Date().getDate() + 3)));
        setCompanyName('');
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            if (file.size > 500 * 1024) {
                toast.error("File size is larger than 500kb.", {
                    position: toast.POSITION.TOP_CENTER
                });
                return;
            }

            setFileName(file.name);

            const reader = new FileReader();
            reader.onloadend = (e) => {
                const img = new Image();
                img.src = e.target.result;

                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const MAX_WIDTH = 52;
                    const MAX_HEIGHT = 52;

                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);

                    const newDataURL = canvas.toDataURL(file.type);
                    setUploadedImage(newDataURL);
                }
            }

            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        const token = localStorage.getItem('jwt');
        if (!token) {
            toast.error('Please authenticate.', {});
            navigate('/login');
            setIsSubmitting(false);
            return;
        }

        const itemType = selectedOption.value;
        const itemName = formRef.current.elements.itemName.value;
        const itemWebsite = formRef.current.elements.itemWebsite.value;

        if (!itemName || !itemWebsite || !uploadedImage) {
            toast.error('Please fill all mandatory fields.', {});
            setIsSubmitting(false);
            return;
        }

        let formData;
        if (itemType === 'job' || itemType === 'internship') {
            if (!ctc || !eligibleBatch) {
                toast.error('CTC and Eligible Batch are mandatory for Jobs and Internships.', {
                    position: toast.POSITION.TOP_CENTER
                });
                setIsSubmitting(false);
                return;
            }
            formData = {
                name: itemName,
                website: itemWebsite,
                closingDate: startDate,
                type: itemType,
                imageIcon: uploadedImage,
                ctc: ctc,
                batchEligible: eligibleBatch,
                company: companyName,
                id: editData?.id
            }
        } else {
            formData = {
                name: itemName,
                website: itemWebsite,
                closingDate: startDate,
                type: itemType,
                imageIcon: uploadedImage,
                ctc: null,
                batchEligible: null,
                company: companyName,
                id: editData?.id
            }
        }

        const url = isEditing 
            ? `https://placify-backend.vercel.app/api/posts/${editData.id}`
            : 'https://placify-backend.vercel.app/api/posts/';

        try {
            const response = await fetch(url, {
                method: isEditing ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok && response.status === 401) {
                toast.error('Unauthorized. Please login again.', {
                    position: toast.POSITION.TOP_CENTER
                });
                navigate('/login');
                setIsSubmitting(false);
                return;
            }

            const responseData = await response.json();

            if (response.ok) {
                toast.success(`Item ${isEditing ? 'updated' : 'added'} successfully!`, {
                    position: toast.POSITION.TOP_CENTER
                });
                if (isEditing && onClose) {
                    onClose();
                } else {
                    handleClose();
                }
            } else {
                toast.error(`Error: ${responseData.message}`, {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        } catch (error) {
            toast.error(`Error: ${error.message}`, {
                position: toast.POSITION.TOP_CENTER
            });
        }
        setIsSubmitting(false);
    };

    const sidebarItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <FaEnvelopeOpen className={css.sidebarListIcon} /> },
        { id: 'collections', label: 'Collections', icon: <LuDatabaseZap className={css.sidebarListIcon} /> },
        { id: 'statistics', label: 'Statistics', icon: <FaChartBar className={css.sidebarListIcon} /> },
        { id: 'myPosts', label: 'My Posts', icon: <RiArticleFill className={css.sidebarListIcon} /> },
        { id: 'adminPanel', label: 'Admin Panel', icon: <RiAdminFill className={css.sidebarListIcon} /> },
        { 
            id: 'addItem', 
            label: 'Add Item', 
            icon: <FaPlus className={css.sidebarListIcon} />,
            onClick: () => setIsModalOpen(true),
            customClass: css.addItemButton
        },
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
                        className={`${css.sidebarTreeItem} ${selectedItem === item.id ? css.active : ""} ${item.customClass || ''}`}
                        role="menuitem"
                        tabIndex={0}
                        onClick={() => {
                            if (item.onClick) {
                                item.onClick();
                            } else {
                                setSelectedItem(item.id);
                            }
                        }}
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

            {/* Add/Edit Item Modal */}
            {isModalOpen && (
                <div className={css.modal}>
                    <div className={css.modalContent}>
                        <button className={css.closeButton} onClick={isEditing ? onClose : handleClose}>
                            <FaTimes />
                        </button>

                        <form ref={formRef} className={css.formSection}>
                            <div className={css.oneSection}>
                                <div className={css.oneSectionItem}>
                                    <div className={css.itemLabel}>Item Type</div>
                                    <Select
                                        className={css.selectOption}
                                        value={selectedOption}
                                        onChange={(option) => setSelectedOption(option)}
                                        options={options}
                                        styles={customSelectStyles}
                                    />
                                </div>
                                <div className={css.oneSectionItem}>
                                    <div className={css.itemLabel}>Item Name</div>
                                    <input 
                                        type='text' 
                                        name='itemName' 
                                        className={css.itemInputBox}
                                        defaultValue={editData?.name || ''}
                                    />
                                </div>
                            </div>

                            <div className={css.oneSection}>
                                <div className={css.oneSectionItem}>
                                    <div className={css.itemLabel}>Company Name</div>
                                    <input
                                        type='text'
                                        className={css.itemInputBox}
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                    />
                                </div>
                                <div className={css.oneSectionItem}>
                                    <div className={css.itemLabel}>Ending Date</div>
                                    <DatePicker
                                        className={css.itemInputBox}
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        minDate={new Date()}
                                        showTimeSelect
                                        dateFormat="Pp"
                                        customInput={<input style={{ textAlign: 'center', color: '#5641f4', fontWeight: "bold" }} />}
                                        popperPlacement="bottom-end"
                                        popperModifiers={[
                                            {
                                            name: 'flip',
                                            enabled: false, // prevents it from flipping to top
                                            },
                                            {
                                            name: 'preventOverflow',
                                            options: { boundary: 'viewport' },
                                            },
                                            {
                                            name: 'offset',
                                            options: { offset: [0, 8] },
                                            },
                                        ]}
                                    />
                                </div>
                            </div>

                            <div className={css.oneSection}>
                                <div className={css.oneSectionItem}>
                                    <div className={css.itemLabel}>CTC</div>
                                    <input
                                        type='text'
                                        className={css.itemInputBox}
                                        value={ctc}
                                        onChange={(e) => setCTC(e.target.value)}
                                        disabled={selectedOption.value !== 'job' && selectedOption.value !== 'internship'}
                                        placeholder={selectedOption.value === 'job' || selectedOption.value === 'internship' ? 'Enter CTC' : 'Not Applicable'}
                                    />
                                </div>
                                <div className={css.oneSectionItem}>
                                    <div className={css.itemLabel}>Eligible Batch</div>
                                    <input
                                        type='text'
                                        className={css.itemInputBox}
                                        value={eligibleBatch}
                                        onChange={(e) => setEligibleBatch(e.target.value)}
                                        disabled={selectedOption.value !== 'job' && selectedOption.value !== 'internship'}
                                        placeholder={selectedOption.value === 'job' || selectedOption.value === 'internship' ? 'Enter Batch Year' : 'Not Applicable'}
                                    />
                                </div>
                            </div>

                            <div className={css.oneSection}>
                                <div className={css.oneSectionItem}>
                                    <div className={css.itemLabel}>Item Website</div>
                                    <input 
                                        type='text' 
                                        name='itemWebsite' 
                                        className={css.itemInputBox}
                                        defaultValue={editData?.website || ''}
                                    />
                                </div>
                            </div>

                            <div className={css.oneImageSection}>
                                {uploadedImage ? (
                                    <div className={css.uploadedImageContainer}>
                                        <img src={uploadedImage} alt="Uploaded Preview" className={css.uploadedImagePreview} />
                                        <div className={css.uploadedImageInfo}>
                                            <button 
                                                type="button"
                                                className={css.uploadedImageRemove} 
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setUploadedImage(null);
                                                    setFileName(null);
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={css.imageButtonContainer} onClick={() => fileInputRef.current.click()}>
                                        <input
                                            type="file"
                                            style={{ display: 'none' }}
                                            ref={fileInputRef}
                                            onChange={handleImageChange}
                                            accept="image/*"
                                        />
                                        <div className={css.uploadIconContainer}>
                                            <BiCloudUpload className={css.uploadIconImage} />
                                            <div className={css.uploadImageText}>Upload Website Icon</div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className={css.buttonContainer}>
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className={css.submitAddItemButton}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Submitting...' : isEditing ? 'Update Item' : 'Add Item'}
                                    {isSubmitting && <span className={css.spinner}></span>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Sidebar;
