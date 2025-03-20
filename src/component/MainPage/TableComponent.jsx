import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ClientSideRowModelModule, themeQuartz } from 'ag-grid-community';
import "../../styles/MainPage/CustomAlpineDark.css"

export const myDarkTheme = themeQuartz.withParams({
    backgroundColor: '#101010',
    browserColorScheme: 'dark',
    foregroundColor: '#FFFFFF',
    borderColor: '#363636',
    rowHoverColor: '#404040',
    headerFontSize: 14,
    chromeBackgroundColor: {
        ref: 'foregroundColor',
        mix: 0.07,
        onto: 'backgroundColor',
    },
});

const NameRenderer = (params) => {
    const { data } = params;
    return (
        <div
            className="name-cell"
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start', // Align left horizontally
                alignItems: 'center',           // Center vertically
                gap: '0.25rem',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
            }}
        >
            <img
                src={data.image}
                alt="Icon"
                className="name-cell__image"
                style={{
                    width: '40px',
                    height: '40px',
                    objectFit: 'cover',
                }}
            />
            <span
                className="name-cell__text"
                style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '90%',
                }}
            >
                {params.value}
            </span>
        </div>
    );
};

const CompanyRenderer = (params) => {
    const { data } = params;
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                width: '100%',
            }}
        >
            <div
                className="company-cell"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 0,
                    width: '100%',
                }}
            >
                <div
                    className="company-cell__name"
                    style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '90%',
                        lineHeight: '1.4',
                    }}
                    title={data.company}
                >
                    {data.company}
                </div>
                <div
                    className="company-cell__website"
                    onClick={() => window.open(`https://${data.website}`, '_blank')}
                    style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '90%',
                        lineHeight: '1.5',
                    }}
                >
                    {data.website}
                </div>
            </div>
        </div>
    );
};

const DefaultRenderer = (params) => {
    return (
        <div
            className="default-cell"
            style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'flex-start', // Align left horizontally
                alignItems: 'center',           // Center vertically
            }}
        >
            {params.value}
        </div>
    );
};

function TableComponent() {
    const columnDefs = useMemo(() => [
        {
            headerName: 'Name',
            field: 'name',
            width: 300,
            cellRenderer: NameRenderer
        },
        {
            headerName: 'Company',
            field: 'company',
            flex: 3,
            cellRenderer: CompanyRenderer
        },
        {
            headerName: 'Closing Date',
            field: 'closingDate',
            flex: 2,
            cellRenderer: DefaultRenderer
        },
        {
            headerName: 'Type',
            field: 'type',
            flex: 2,
            cellRenderer: DefaultRenderer
        },
        {
            headerName: 'CTC',
            field: 'ctc',
            flex: 1,
            cellRenderer: DefaultRenderer
        },
        {
            headerName: 'Batch',
            field: 'batch',
            flex: 2,
            cellRenderer: DefaultRenderer
        },
        {
            headerName: 'Actions',
            field: 'actions',
            flex: 2,
            cellRenderer: DefaultRenderer
        }
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
        <div className="tableSection" style={{ height: '100%', width: '100%' }} data-ag-theme-mode="dark">
            <AgGridReact
                modules={[ClientSideRowModelModule]}
                theme={myDarkTheme}
                rowModelType="clientSide"
                columnDefs={columnDefs}
                rowData={rowData}
                defaultColDef={{
                    resizable: true,
                    sortable: true,
                    minWidth: 150,
                    cellStyle: {
                        paddingTop: '4px',
                        paddingBottom: '4px',
                        textAlign: 'left' // For cells without custom renderers
                    }
                }}
                rowHeight={65}
                headerHeight={65}
            />
        </div>
    );
}

export default TableComponent;
