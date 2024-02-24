import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import css from "../styles/TableData.module.css";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import DeleteConfirmationModal from './DeleteConfirmationModal';
import UpdateItemModal from './UpdateItemModal';
import moment from 'moment-timezone';

function TableRow({ item, fetchData }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const openUpdateModal = () => setIsUpdateModalOpen(true);
  const closeUpdateModal = () => setIsUpdateModalOpen(false);

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);
  return (
    <>

      <tr>
        <td>{item.name}</td>
        <td>{item.company}</td>
        <td className={css.newTabURL}>
          <a href={`${item.website}`} target="_blank" rel="noopener noreferrer">
            {item.website}
          </a>
        </td>
        <td>{moment(item.closingDate).tz('Asia/Kolkata').format('MM/DD/YYYY - h:mm A')}</td>
        <td>
          <button className={`${css.typeButton} ${css['type' + item.type]}`}>
            {item.type}
          </button>
        </td>
        <td><img src={item.imageIcon} alt={item.name} width="50" height="50" /></td>
        <td>{item.ctc}</td>
        <td>{item.batchEligible}</td>
        <td className={css.actionButtonContainer}>
          <button className={css.actionIcon} onClick={openUpdateModal}><AiFillEdit /></button>
          <button className={css.actionIcon2} onClick={openDeleteModal}><AiFillDelete /></button>
        </td>
      </tr>
      <DeleteConfirmationModal 
        isOpen={isDeleteModalOpen} 
        onClose={closeDeleteModal} 
        item={item}
        fetchData={fetchData}
      />
      <UpdateItemModal 
        isOpen={isUpdateModalOpen} 
        onClose={closeUpdateModal} 
        item={item}
        fetchData={fetchData}
      />
    </>
  );
}


const TableData = ({ data, fetchData }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const PER_PAGE = 5;
  const offset = currentPage * PER_PAGE;
  const currentPageData = data && data.items ? data.items.slice(offset, offset + PER_PAGE) : [];
  const pageCount = Math.ceil((data && data.items ? data.items.length : 0) / PER_PAGE);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
  return (
    <div className={css.tableWrapperContainer}>
      <div className={css.tableContainer}>
        <table className={css.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Website</th>
              <th>Closing Date</th>
              <th>Type</th>
              <th>Image</th>
              <th>CTC</th>
              <th>Batch</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData && currentPageData.map((item, index) => (
              <TableRow key={index} item={item} fetchData={fetchData} />
            ))}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={css.pagination}
          previousLinkClassName={css.pagination__link}
          nextLinkClassName={css.pagination__link}
          disabledClassName={css["pagination__link--disabled"]}
          activeClassName={css["pagination__link--active"]}
        />
      </div>
    </div>
  );
}

export default TableData;