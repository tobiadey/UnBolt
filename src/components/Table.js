import './Table.css';
import { DataGrid } from '@mui/x-data-grid';


const Table = () => {

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'assetName', headerName: 'Task name', width: 130 },
    {field: 'quantity', headerName: 'Quantity', type: 'number', width: 90},
    {
        field: 'signator',
        headerName: 'Signator',
        width: 400,
        // description: 'This column has a value getter and is not sortable.',
        // sortable: false,
        // width: 160,
        // valueGetter: (params) =>
        // `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    { field: 'status', headerName: 'Status', width: 130 },

    ];

const rows = [
    { id: 1, assetName: 'Berken Bag', status: 'Completed', quantity: 35, signator: '0x5E7b2Bbb14B8a9097A26A93982624067A1dB11dE' },
    { id: 2, assetName: 'Ps5', status: 'In Progress', quantity: 42, signator: '0x5E7b2Bbb14B8a9097A26A93982624067A1dB11dE' },
    { id: 3, assetName: 'Lannister', status: 'Pending', quantity: 45, signator: '0x5E7b2Bbb14B8a9097A26A93982624067A1dB11dE' },
    { id: 4, assetName: 'ps4', status: 'In Progress', quantity: 16, signator: '0x5E7b2Bbb14B8a9097A26A93982624067A1dB11dE' },
    { id: 5, assetName: 'Iphone 11', status: 'Pending', quantity: null, signator: '0x5E7b2Bbb14B8a9097A26A93982624067A1dB11dE' },
    { id: 6, assetName: 'Perinase', status: null, quantity: 150, signator: '0x5E7b2Bbb14B8a9097A26A93982624067A1dB11dE' },
    { id: 7, assetName: 'Xbox Controller', status: 'Pending', quantity: 44 , signator: '0x5E7b2Bbb14B8a9097A26A93982624067A1dB11dE'},
    { id: 8,assettName: 'Nike Air Max', status: 'In Progress', quantity: 36, signator: '0x5E7b2Bbb14B8a9097A26A93982624067A1dB11dE' },
    { id: 9, assetName: 'Rolex', status: 'Pending', quantity: 65, signator: '0x5E7b2Bbb14B8a9097A26A93982624067A1dB11dE' },
    ];

    return(
    <div className='table' style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>

    )
  
  }
  
  
  export default Table