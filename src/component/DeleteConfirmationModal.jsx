import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from "../styles/DeleteConfirmationModal.module.css"; 
import ReactDOM from 'react-dom';
import {FaTimes} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const DeleteConfirmationModal = ({ isOpen, onClose, item, fetchData }) => {
    if (!isOpen) return null;
    const navigate = useNavigate();

    const handleConfirmDelete = async () => {
        const token = localStorage.getItem('jwt');
        if (!token) {
            toast.error('Please authenticate.', {
                position: toast.POSITION.TOP_CENTER
            });
            navigate('/login');
            return;
        }

        try {
            const response = await fetch(`https://placify-backend-m4tnx14ua-itz-arnav.vercel.app/api/posts/${item._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
    
            if (response.ok) {
                toast.success('Item deleted successfully');
                fetchData();
            } else {
                if (response.status === 401) {
                    toast.error('Unauthorized. Please login again.', {
                        position: toast.POSITION.TOP_CENTER
                    });
                    navigate('/login');
                    return;
                }
    
                toast.error('Failed to delete item');
            }
        } catch (error) {
            toast.error('Error during deletion');
            navigate('/login'); 
        } finally {
            onClose();
        }
    };

    return ReactDOM.createPortal(
        (
            <div className={css.modal}>
                <div className={css.modalContent}>
                    <button className={css.closeButton} onClick={onClose}><FaTimes /></button>
                    <p className={css.deleteHeading}>Are you sure you want to delete this item?</p>
                    <div className={css.itemContent}>
                        <img src={item.imageIcon} alt={item.name} width="50" height="50" />
                        <p><strong>Name:</strong> {item.name}</p>
                        <p><strong>Website:</strong> <a href={`https://${item.website}`} target="_blank" rel="noopener noreferrer">{item.website}</a></p>
                        <p><strong>Closing Date:</strong> {new Date(item.closingDate).toLocaleDateString()}</p>
                        <p><strong>Type:</strong> {item.type}</p>
                        <p><strong>CTC:</strong> {item.ctc}</p>
                        <p><strong>Batch Eligible:</strong> {item.batchEligible}</p>
                    </div>
                    <div className={css.buttonSection}>
                        <button className={css.cancelButton} onClick={onClose}>Cancel</button>
                        <button className={css.deleteButton} onClick={handleConfirmDelete}>Delete</button> {/* Fixed this line */}
                    </div>
                </div>
            </div>
        ),
        document.body
    );
}

export default DeleteConfirmationModal;
