import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ClientSideRowModelModule, themeQuartz } from 'ag-grid-community';
import { FaEdit, FaTrash } from 'react-icons/fa';
import "../../styles/MainPage/CustomAlpineDark.css"
import "../../styles/MainPage/TableComponent.css"

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
                backgroundColor: '#2b2b2b',
                padding: '4px',
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
                        maxWidth: '100%',
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
                        maxWidth: '100%',
                        lineHeight: '1.5',
                    }}
                >
                    {data.website}
                </div>
            </div>
        </div>
    );
};

const TypeRenderer = (params) => {
    const getTypeClass = (type) => {
        return `type-${type.toLowerCase()}`;
    };

    return (
        <div
            className="type-cell"
            style={{
                display: 'flex',
                alignItems: 'center',
                height: '100%'
            }}
        >
            <button
                className={`type-button ${getTypeClass(params.value)}`}
                style={{
                    width: '7rem',
                    padding: '7px 10px',
                    borderRadius: '0.7rem',
                    color: '#fff',
                    backgroundColor: '#313131',
                    fontWeight: 600,
                    border: '2px solid',
                    cursor: 'default',
                    filter: 'brightness(0.9)',
                    transition: 'all 0.3s ease-in-out',
                    borderColor: params.value === 'job' ? 'rgb(134, 95, 193)' :
                               params.value === 'hackathon' ? 'rgb(69, 196, 243)' :
                               params.value === 'internship' ? 'rgb(66, 204, 188)' :
                               params.value === 'contest' ? 'rgb(254, 178, 48)' : '#313131'
                }}
            >
                {params.value}
            </button>
        </div>
    );
};

const DateRenderer = (params) => {
    const { value } = params;
    const date = new Date(value);

    const formatDate = (date) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const formatTime = (date) => {
        const options = { hour: '2-digit', minute: '2-digit', hour12: true };
        return date.toLocaleTimeString('en-US', options);
    };

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
                className="date-cell"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 0,
                    width: '100%',
                }}
            >
                <div
                    className="date-cell__date"
                    style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '90%',
                        lineHeight: '1.4',
                        fontSize: '0.95rem'
                    }}
                >
                    {formatDate(date)}
                </div>
                <div
                    className="date-cell__time"
                    style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '90%',
                        lineHeight: '1.5',
                        color: '#888',
                        fontSize: '0.85rem'
                    }}
                >
                    {formatTime(date)}
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
    const handleClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div
            className="action-cells"
            onClick={handleClick}
            style={{
                display: 'flex',
                gap: '4px',
                alignItems: 'center',
                height: '100%',
                justifyContent: 'flex-start',
                paddingLeft: '4px'
            }}
        >
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    context.handleEdit(data);
                }}
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#5641f4',
                    pointerEvents: 'auto'
                }}
            >
                <FaEdit size={16} />
            </button>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    context.handleDelete(data);
                }}
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#ff4d4d',
                    pointerEvents: 'auto'
                }}
            >
                <FaTrash size={16} />
            </button>
        </div>
    );
};

function TableComponent({ onEdit, searchText, filterValue }) {
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
            width: 170,
            cellRenderer: CompanyRenderer
        },
        {
            headerName: 'Closing Date',
            field: 'closingDate',
            flex: 1.7,
            cellRenderer: DateRenderer
        },
        {
            headerName: 'Type',
            field: 'type',
            flex: 1.5,
            cellRenderer: TypeRenderer,
            sortable: true
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
            flex: 1,
            cellRenderer: DefaultRenderer
        },
        {
            headerName: 'Actions',
            field: 'actions',
            flex: 1,
            cellRenderer: ActionRenderer,
            editable: false,
            suppressMovable: true,
            suppressCellSelection: true,
            suppressNavigable: true,
            suppressClickSelection: true,
            suppressKeyboardEvent: () => true,
            cellStyle: {
                display: 'flex',
                justifyContent: 'flex-start',
                pointerEvents: 'none',
                userSelect: 'none'
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

    const filteredRowData = useMemo(() => {
        let filtered = rowData;
        
        // Apply type filter first
        if (filterValue && filterValue !== 'all') {
            filtered = filtered.filter(item => item.type === filterValue);
        }
        
        // Then apply search filter
        if (searchText) {
            const searchLower = searchText.toLowerCase();
            filtered = filtered.filter(item => 
                item.name.toLowerCase().includes(searchLower) ||
                item.company.toLowerCase().includes(searchLower)
            );
        }
        
        return filtered;
    }, [rowData, searchText, filterValue]);

    return (
        <div className="tableSection" style={{ 
            height: '100%', 
            width: '96%',
            minHeight: '350px',
            display: 'flex',
            flexDirection: 'column'
        }} data-ag-theme-mode="dark">
            <AgGridReact
                modules={[ClientSideRowModelModule]}
                theme={myDarkTheme}
                rowModelType="clientSide"
                columnDefs={columnDefs}
                rowData={filteredRowData}
                context={context}
                suppressCellSelection={true}
                suppressRowClickSelection={true}
                suppressRowHoverHighlight={true}
                suppressCellFocus={true}
                defaultColDef={{
                    resizable: true,
                    sortable: true,
                    minWidth: 120,
                    cellStyle: {
                        paddingTop: '4px',
                        paddingBottom: '4px',
                        textAlign: 'left',
                        userSelect: 'none'
                    }
                }}
                domLayout={'autoHeight'}
                rowHeight={65}
                headerHeight={40}
            />
        </div>
    );
}

export default TableComponent;
