import React, { useState, useRef } from 'react';
import css from "../styles/AddItemData.module.css";
import { FaTimes } from 'react-icons/fa';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { BiCloudUpload } from "react-icons/bi";

const UpdateItemModal = ({ isOpen, onClose, item, fetchData }) => {
    if (!isOpen || !item) return null;
    const navigate = useNavigate();
    const formRef = useRef(null);
    const [selectedOption, setSelectedOption] = useState({ value: item.type, label: item.type.charAt(0).toUpperCase() + item.type.slice(1) });
    const [ctc, setCTC] = useState(item.ctc || '');
    const [eligibleBatch, setEligibleBatch] = useState(item.batchEligible || '');
    const [uploadedImage, setUploadedImage] = useState(item.imageIcon || null);
    const [startDate, setStartDate] = useState(new Date(item.closingDate) || new Date());
    const [itemName, setItemName] = useState(item ? item.name : '');
    const [itemWebsite, setItemWebsite] = useState(item ? item.website : '');
    const [companyName, setCompanyName] = useState(item ? item.company : '');
    const fileInputRef = useRef(null);

    const options = [
        { value: 'job', label: 'Jobs' },
        { value: 'internship', label: 'Internships' },
        { value: 'hackathon', label: 'Hackathons' },
        { value: 'contest', label: 'Contests' }
    ];

    const customSelectStyles = {
        control: (provided) => ({
            ...provided,
            cursor: 'pointer',
            boxShadow: 'none',
        }),
        option: (provided, state) => ({
            ...provided,
            color: state.isSelected || state.isFocused ? 'white' : 'black',
            backgroundColor: state.isSelected ? '#43B97F' : state.isFocused ? '#43B97F' : null,
            cursor: 'pointer',
        }),
    };

    const today = new Date();

    const handleSelectChange = option => {
        setSelectedOption(option);
    };

    const handleClose = () => {
        onClose();
    };

    const handleUpdate = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem('jwt');
        if (!token) {
            toast.error('Please authenticate.', {
                position: toast.POSITION.TOP_CENTER
            });
            navigate('/login');
            return;
        }

        const itemType = selectedOption.value;
        const itemname = itemName;  // Using the state directly as it’s now controlled
        const itemwebsite = itemWebsite;  // Using the state directly as it’s now controlled

        if (!itemName || !itemWebsite || !uploadedImage) {
            toast.error('Please fill all mandatory fields.', {
                position: toast.POSITION.TOP_CENTER
            });
            return;
        }

        let formData;
        if (itemType === 'job' || itemType === 'internship') {
            if (!ctc || !eligibleBatch) {
                toast.error('CTC and Eligible Batch are mandatory for Jobs and Internships.', {
                    position: toast.POSITION.TOP_CENTER
                });
                return;
            }
            formData = {
                name: itemname,
                website: itemwebsite,
                closingDate: startDate,
                type: itemType,
                imageIcon: uploadedImage,
                ctc: ctc,
                batchEligible: eligibleBatch,
                company: companyName
            };
        } else {
            formData = {
                name: itemname,
                website: itemwebsite,
                closingDate: startDate,
                type: itemType,
                imageIcon: uploadedImage,
                ctc: null,
                batchEligible: null,
                company: companyName
            };
        }

        try {
            const response = await fetch(`https://placify-backend.vercel.app/api/posts/${item._id}`, {
                method: 'PUT',
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
                return;
            }

            const responseData = await response.json();

            if (response.ok) {
                toast.success('Item updated successfully!', {
                    position: toast.POSITION.TOP_CENTER
                });
                // You can also clear or update state variables if needed
                // For instance, you may want to close the modal and refresh the data
                onClose();
                fetchData();
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
    };


    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            // Check for file size
            if (file.size > 500 * 1024) { // 500kb
                // Send toast error
                toast.error("File size is larger than 500kb.", {
                    position: toast.POSITION.TOP_CENTER
                });
                return;
            }

            const reader = new FileReader();
            reader.onloadend = (e) => {
                const img = new Image();
                img.src = e.target.result;

                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const MAX_WIDTH = 70;
                    const MAX_HEIGHT = 60;

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
                };
            };

            reader.readAsDataURL(file);
        }
    }


    const triggerFileInput = () => {
        fileInputRef.current.click();
    }

    return (
        <div className={css.modal}>
            <div className={css.modalContent}>
                <button className={css.closeButton} onClick={handleClose}><FaTimes /></button>

                <form ref={formRef} className={css.formSection}>

                    <div className={css.oneSection}>
                        <div className={css.oneSectionItem}>
                            <div className={css.itemLabel}>Item Type</div>
                            <Select
                                className={css.selectOption}
                                value={selectedOption}
                                onChange={handleSelectChange}
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
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)} // Added an onChange handler to update the state when the input changes
                            /></div>
                    </div>

                    <div className={css.oneSection}>
                        <div className={css.oneSectionItem}>
                            <div className={css.itemLabel}>Company Name</div>
                            <input
                                type='text'
                                name='companyName'
                                className={css.itemInputBox}
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)} // Added an onChange handler to update the state when the input changes
                            /></div>
                        <div className={css.oneSectionItem}>
                            <div className={css.itemLabel}>Ending Date</div>
                            <DatePicker
                                className={css.itemInputBox}
                                selected={startDate}
                                onChange={(date) => {
                                    setStartDate(date)
                                }}
                                minDate={today}
                                showTimeSelect
                                dateFormat="Pp"
                                customInput={<input style={{ textAlign: 'center', color: '#ef3f5f', fontWeight: "bold" }} />}
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
                            />
                        </div>
                    </div>

                    <div className={css.oneImageSection}>
                        {uploadedImage ? (
                            <div className={css.uploadedImageContainer}>
                                <img src={uploadedImage} alt="Uploaded Preview" className={css.uploadedImagePreview} />
                                <div className={css.uploadedImageInfo}>
                                    <span className={css.uploadedImageRemove} onClick={() => setUploadedImage(null)}>Remove</span>
                                </div>
                            </div>
                        ) : (
                            <div className={css.imageButtonContainer} onClick={triggerFileInput}>
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
                    <div className={css.oneSection}>
                        <div className={css.oneSectionItem}>
                            <div className={css.itemLabel}>Item Website</div>
                            <input
                                type='text'
                                className={css.itemInputBox}
                                value={itemWebsite}
                                onChange={(e) => setItemWebsite(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={css.buttonContainer}>
                        <button type="submit" onClick={handleUpdate} className={css.submitAddItemButton}>Update</button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default UpdateItemModal;
