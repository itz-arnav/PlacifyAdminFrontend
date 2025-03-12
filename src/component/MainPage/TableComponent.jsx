import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ClientSideRowModelModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../../styles/MainPage/CustomAlpineDark.css';

const NameRenderer = (params) => {
    const { data } = params;
    return (
        <div className="name-cell">
            <img
                src={data.image}
                alt="Icon"
                className="name-cell__image"
            />
            <span className="name-cell__text">
                {params.value}
            </span>
        </div>
    );
};

const CompanyRenderer = (params) => {
    const { data } = params;
    return (
        <div className="company-cell">
            <span className="company-cell__name">{params.value}</span>
            <a
                href={`https://${data.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="company-cell__link"
            >
                {data.website}
            </a>
        </div>
    );
};

const DefaultRenderer = (params) => {
    return (
        <div className="default-cell">
            {params.value}
        </div>
    );
};

function TableComponent() {
    const columnDefs = useMemo(() => [
        { headerName: 'Name', field: 'name', width: 200, cellRenderer: NameRenderer },
        { headerName: 'Company', field: 'company', flex: 2, cellRenderer: CompanyRenderer },
        { headerName: 'Closing Date', field: 'closingDate', flex: 2, cellRenderer: DefaultRenderer },
        { headerName: 'Type', field: 'type', flex: 2, cellRenderer: DefaultRenderer },
        { headerName: 'CTC', field: 'ctc', flex: 1, cellRenderer: DefaultRenderer },
        { headerName: 'Batch', field: 'batch', flex: 1, cellRenderer: DefaultRenderer },
        { headerName: 'Actions', field: 'actions', flex: 2, cellRenderer: DefaultRenderer }
    ], []);

    const rowData = useMemo(() => [
        {
            name: 'Software Developer 1',
            company: 'Google',
            website: 'google.com',
            closingDate: '2025-03-01',
            type: 'Full-time',
            image: '/image1.png',
            ctc: '30 LPA',
            batch: '2023-2025',
            actions: 'Apply'
        },
        {
            name: 'Software Developer 2 grhffwrtrhyf4tgdvwrfdb',
            company: 'Amazon',
            website: 'amazon.com',
            closingDate: '2025-04-10',
            type: 'Internship',
            image: '/image2.png',
            ctc: '25 LPA',
            batch: '2023-2025',
            actions: 'Apply'
        },
        {
            name: 'Software Developer 3',
            company: 'Microsoft',
            website: 'microsoft.com',
            closingDate: '2025-05-20',
            type: 'Full-time',
            image: '/image1.png',
            ctc: '32 LPA',
            batch: '2023-2025',
            actions: 'View'
        },
        {
            name: 'Software Developer 4',
            company: 'Apple',
            website: 'apple.com',
            closingDate: '2025-06-15',
            type: 'Contract',
            image: '/image1.png',
            ctc: '35 LPA',
            batch: '2023-2025',
            actions: 'Apply'
        },
        {
            name: 'Software Developer 5',
            company: 'Meta',
            website: 'meta.com',
            closingDate: '2025-07-01',
            type: 'Internship',
            image: '/image2.png',
            ctc: '20 LPA',
            batch: '2023-2025',
            actions: 'Apply'
        },
        {
            name: 'Software Developer 6',
            company: 'Netflix',
            website: 'dribbble.com/shots/22815413-Storeshop-Dashboard',
            closingDate: '2025-07-30',
            type: 'Full-time',
            image: '/image1.png',
            ctc: '40 LPA',
            batch: '2023-2025',
            actions: 'View'
        },
        {
            name: 'Software Developer 7',
            company: 'Tesla',
            website: 'tesla.com',
            closingDate: '2025-08-20',
            type: 'Full-time',
            image: '/image2.png',
            ctc: '42 LPA',
            batch: '2023-2025',
            actions: 'Apply'
        },
        {
            name: 'Software Developer 8',
            company: 'IBM',
            website: 'ibm.com',
            closingDate: '2025-09-05',
            type: 'Internship',
            image: '/image1.png',
            ctc: '22 LPA',
            batch: '2023-2025',
            actions: 'Apply'
        },
        {
            name: 'Software Developer 9',
            company: 'Adobe',
            website: 'adobe.com',
            closingDate: '2025-10-10',
            type: 'Full-time',
            image: '/image2.png',
            ctc: '28 LPA',
            batch: '2023-2025',
            actions: 'View'
        },
        {
            name: 'Software Developer 10',
            company: 'Oracle',
            website: 'oracle.com',
            closingDate: '2025-11-15',
            type: 'Contract',
            image: '/image1.png',
            ctc: '31 LPA',
            batch: '2023-2025',
            actions: 'Apply'
        }
    ], []);

    return (
        <div className="ag-theme-alpine-dark table-container">
            <AgGridReact
                modules={[ClientSideRowModelModule]}
                rowModelType="clientSide"
                columnDefs={columnDefs}
                rowData={rowData}
                defaultColDef={{ resizable: true, sortable: true, minWidth: 100 }}
                rowHeight={45}
            />
        </div>
    );
}

export default TableComponent;
