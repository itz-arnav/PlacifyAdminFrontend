import React, { useState } from 'react';
import css from "../styles/AddItemData.module.css";
import { FaPlus, FaTimes } from 'react-icons/fa';
import Select from 'react-select';

const AddItemData = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState({ value: 'jobs', label: 'Jobs' });
    const options = [
        { value: 'jobs', label: 'Jobs' },
        { value: 'internships', label: 'Internships' },
        { value: 'hackathons', label: 'Hackathons' },
        { value: 'contests', label: 'Contests' }
    ];

    const customSelectStyles = {
        control: (provided) => ({
            ...provided,
            cursor: 'pointer',
            boxShadow: 'none',
        }),
        option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? 'white' : 'black',
            backgroundColor: state.isSelected ? '#43B97F' : state.isFocused ? '#6fefb1' : null,
            cursor: 'pointer',
        }),
    };

    const handleSelectChange = option => {
        setSelectedOption(option);
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };


    const handleSubmit = () => {
        // Submit form logic here
    };

    return (
        <div className={css.addItemContainer}>
            <button className={css.addItemButton} onClick={() => setIsModalOpen(true)}><FaPlus /> Add Item</button>

            {isModalOpen && (
                <div className={css.modal}>
                    <div className={css.modalContent}>
                        <button className={css.closeButton} onClick={handleClose}><FaTimes /></button>

                        <form className={css.formSection}>

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
                                    <div className={css.itemLabel}>Item Type</div>
                                    <input type='text'></input>
                                </div>
                            </div>

                            <button type="submit" onClick={handleSubmit} className={css.submitAddItemButton}>Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AddItemData
