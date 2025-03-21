import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ClientSideRowModelModule, themeQuartz } from 'ag-grid-community';
import { FaEdit, FaTrash } from 'react-icons/fa';
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

const NameRenderer = ({ data }) => (
    <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px',
        height: '100%',
        width: '100%'
    }}>
        <img
            src={data.imageIcon}
            alt=""
            style={{
                width: '32px',
                height: '32px',
                objectFit: 'contain',
                borderRadius: '4px'
            }}
        />
        <span style={{ 
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
        }}>{data.name}</span>
    </div>
);

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

const ActionRenderer = (params) => {
    const { data, context } = params;
    return (
        <div
            className="action-cell"
            style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
                height: '100%'
            }}
        >
            <button
                onClick={() => context.handleEdit(data)}
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#5641f4'
                }}
            >
                <FaEdit size={16} />
            </button>
            <button
                onClick={() => context.handleDelete(data)}
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#ff4d4d'
                }}
            >
                <FaTrash size={16} />
            </button>
        </div>
    );
};

function TableComponent({ onEdit }) {
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
            field: 'batchEligible',
            flex: 2,
            cellRenderer: DefaultRenderer
        },
        {
            headerName: 'Actions',
            field: 'actions',
            flex: 1,
            cellRenderer: ActionRenderer,
            cellStyle: {
                display: 'flex',
                justifyContent: 'center'
            }
        }
    ], []);

    const rowData = useMemo(() => [
        {
            id: 1,
            name: "Software Developer",
            type: "job",
            company: "Google",
            website: "google.com/careers",
            imageIcon: "https://www.google.com/favicon.ico",
            ctc: "30 LPA",
            batchEligible: "2023-2024",
            closingDate: "2024-03-01T12:00:00Z"
        },
        {
            id: 2,
            name: "Summer Internship",
            type: "internship",
            company: "Microsoft",
            website: "microsoft.com/careers",
            imageIcon: "https://www.microsoft.com/favicon.ico",
            ctc: "2 LPA",
            batchEligible: "2024-2025",
            closingDate: "2024-04-15T12:00:00Z"
        },
        {
            id: 3,
            name: "Code Quest Challenge",
            type: "hackathon",
            company: "Amazon",
            website: "amazon.com/hackathon",
            imageIcon: "https://www.amazon.com/favicon.ico",
            closingDate: "2024-03-20T12:00:00Z"
        },
        {
            id: 4,
            name: "AI Competition",
            type: "contest",
            company: "Meta",
            website: "meta.com/contest",
            imageIcon: "https://png.pngtree.com/png-clipart/20190520/original/pngtree-facebook-social-media-icon-design-template-vector-png-image_3654755.jpg",
            closingDate: "2024-05-01T12:00:00Z"
        },
        {
            id: 5,
            name: "Backend Developer",
            type: "job",
            company: "Netflix",
            website: "netflix.com/careers",
            imageIcon: "https://www.netflix.com/favicon.ico",
            ctc: "45 LPA",
            batchEligible: "2023-2024",
            closingDate: "2024-03-30T12:00:00Z"
        }
    ], []);

    const context = useMemo(() => ({
        handleEdit: (data) => {
            onEdit(data);
        },
        handleDelete: (data) => {
            // TODO: Implement delete functionality
            console.log('Delete:', data);
        }
    }), [onEdit]);

    return (
        <div className="tableSection" style={{ height: '100%', width: '100%' }} data-ag-theme-mode="dark">
            <AgGridReact
                modules={[ClientSideRowModelModule]}
                theme={myDarkTheme}
                rowModelType="clientSide"
                columnDefs={columnDefs}
                rowData={rowData}
                context={context}
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
                headerHeight={40}
            />
        </div>
    );
}

export default TableComponent;
