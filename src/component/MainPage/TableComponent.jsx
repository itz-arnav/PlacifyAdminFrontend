import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ClientSideRowModelModule } from 'ag-grid-community';

// 1) Legacy CSS for grid + Alpine theme
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// 2) Your dark overrides file (ensures .ag-theme-alpine-dark is truly dark)
import '../../styles/MainPage/CustomAlphineDark.css';

// Custom cell renderer for images (from public folder)
const ImageCellRenderer = (params) => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
            }}
        >
            <img
                src={params.value}
                alt="Placeholder"
                style={{ maxWidth: '24px', maxHeight: '24px' }}
            />
        </div>
    );
};

function TableComponent() {
    const columnDefs = useMemo(() => [
        {
            headerName: 'Name',
            field: 'name',
            width: 200,
        },
        { headerName: 'Company', field: 'company', flex: 2 },
        { headerName: 'Website', field: 'website', flex: 2 },
        { headerName: 'Closing Date', field: 'closingDate', flex: 2 },
        { headerName: 'Type', field: 'type', flex: 2 },
        {
            headerName: 'Image',
            field: 'image',
            flex: 2,
            cellRenderer: ImageCellRenderer,
        },
        { headerName: 'CTC', field: 'ctc', flex: 1 },
        { headerName: 'Batch', field: 'batch', flex: 1 },
        { headerName: 'Actions', field: 'actions', flex: 2 },
    ], []);

    // 10 data rows
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
            actions: 'Apply',
        },
        {
            name: 'Software Developer 2',
            company: 'Amazon',
            website: 'amazon.com',
            closingDate: '2025-04-10',
            type: 'Internship',
            image: '/image2.png',
            ctc: '25 LPA',
            batch: '2023-2025',
            actions: 'Apply',
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
            actions: 'View',
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
            actions: 'Apply',
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
            actions: 'Apply',
        },
        {
            name: 'Software Developer 6',
            company: 'Netflix',
            website: 'netflix.com',
            closingDate: '2025-07-30',
            type: 'Full-time',
            image: '/image1.png',
            ctc: '40 LPA',
            batch: '2023-2025',
            actions: 'View',
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
            actions: 'Apply',
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
            actions: 'Apply',
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
            actions: 'View',
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
            actions: 'Apply',
        },
    ], []);

    return (
        <div
            className="ag-theme-alpine-dark tableContainer"
            style={{
                height: '100%',
                width: '100%',
                overflowX: 'auto', // horizontal scroll if needed
            }}
        >
            <AgGridReact
                modules={[ClientSideRowModelModule]}
                rowModelType="clientSide"
                columnDefs={columnDefs}
                rowData={rowData}
                theme="legacy"
                defaultColDef={{
                    resizable: true,
                    sortable: true,
                    minWidth: 100,
                }}
            />
        </div>
    );
}

export default TableComponent;
