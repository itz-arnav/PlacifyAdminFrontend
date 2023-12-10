import React, { useState, useRef } from 'react';
import css from "../styles/AddItemData.module.css";
import { FaPlus, FaTimes } from 'react-icons/fa';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "../styles/BasicDatePicker.css";
import { BiCloudUpload } from "react-icons/bi";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AddItemData = ({ fetchData }) => {
    const navigate = useNavigate();
    const formRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState({ value: 'job', label: 'Jobs' });
    const [ctc, setCTC] = useState('');
    const [eligibleBatch, setEligibleBatch] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [uploadedImage, setUploadedImage] = useState(null);
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

    const [startDate, setStartDate] = useState(new Date());
    const today = new Date();

    const handleSelectChange = option => {
        setSelectedOption(option);
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    const fetchImage = (resource_id) => {
        if (resource_id == 93) {
            return "data:image/jpeg;base64,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"
        } else if (resource_id == 1) {
            return "data:image/jpeg;base64,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"
        } else if (resource_id == 2) {
            return "data:image/jpeg;base64,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"
        } else if (resource_id == 102) {
            return "data:image/jpeg;base64,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"
        } else {
            return "data:image/jpeg;base64,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"
        }
    }

    // Function to format contest data to formData
    const formatContestData = (contests) => {
        let formData = [];
        // return formData;
        for (let contest of contests) {
            let formItem = {
                "name": contest.event,
                "website": contest.href,
                "closingDate": new Date(contest.start),
                "type": 'contest',
                "ctc": null,
                "batchEligible": null,
                "company": contest.host,
                "imageIcon": fetchImage(contest.resource_id),
            }
            formData.push(formItem)
        }
        return formData
    };

    const fetchAndUploadAllContests = async () => {
        try {
            const response = await fetch('https://placify-backend.vercel.app/api/posts/contests', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {

                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const formData = formatContestData(data);

            const token = localStorage.getItem('jwt');

            try {
                const response = await fetch('https://placify-backend.vercel.app/api/posts/multi', {
                    method: 'POST',
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
                    toast.success('Items added successfully!', {
                        position: toast.POSITION.TOP_CENTER
                    });
                    fetchData();

                }
            } catch (error) {
                console.log("Error :", error);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem('jwt');
        if (!token) {
            toast.error('Please authenticate.', {
                position: toast.POSITION.TOP_CENTER
            });
            navigate('/login');
            return;
        }

        // Collect all form values
        const itemType = selectedOption.value;
        const itemName = formRef.current.elements.itemName.value;
        const itemWebsite = formRef.current.elements.itemWebsite.value;


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
                name: itemName,
                website: itemWebsite,
                closingDate: startDate,
                type: itemType,
                imageIcon: uploadedImage,
                ctc: ctc,
                batchEligible: eligibleBatch,
                company: companyName
            };
        } else {
            formData = {
                name: itemName,
                website: itemWebsite,
                closingDate: startDate,
                type: itemType,
                imageIcon: uploadedImage,
                ctc: null,
                batchEligible: null,
                company: companyName
            };
        }

        try {
            // https://placify-backend.vercel.app/api/posts/
            const response = await fetch('https://placify-backend.vercel.app/api/posts/', {
                method: 'POST',
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
                toast.success('Item added successfully!', {
                    position: toast.POSITION.TOP_CENTER
                });
                // Clear all useState variables here
                setIsModalOpen(false);
                setSelectedOption({ value: 'job', label: 'Jobs' });
                setCTC('');
                setEligibleBatch('');
                setUploadedImage(null);
                setStartDate(new Date());
                setIsModalOpen(false);
                setCompanyName('');
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
                };
            };

            reader.readAsDataURL(file);
        }
    }


    const triggerFileInput = () => {
        fileInputRef.current.click();
    }

    return (
        <div className={css.addItemContainer}>

            <div className={css.buttonContainer}>
                <button className={css.addItemButton} onClick={() => setIsModalOpen(true)}><FaPlus /> Add Item</button>
                <button className={css.fetchItemButton} onClick={() => fetchAndUploadAllContests()}>Fetch Contests</button>
            </div>

            {isModalOpen && (
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
                                    <input type='text' name='itemName' className={css.itemInputBox}></input>
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
                                    {/* <input type='text' name='itemWebsite' className={css.itemInputBox}></input> */}
                                </div>
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
                            <div className={css.oneSection}>
                                <div className={css.oneSectionItem}>
                                    <div className={css.itemLabel}>Item Website</div>
                                    <input type='text' name='itemWebsite' className={css.itemInputBox}></input>
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

                            <div className={css.buttonContainer}>
                                <button type="submit" onClick={handleSubmit} className={css.submitAddItemButton}>Submit</button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AddItemData
