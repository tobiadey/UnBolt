import {useEffect,useState } from 'react'
import './Table.css';
import { DataGrid } from '@mui/x-data-grid';


// components for showing the table in the dashboard
//takes in props which it uses to load the table with data
// this is a material ui component mainly, which was edited to take a prop rather than const variables to load the table
// https://mui.com/material-ui/react-table/
const Table = (assets) => {
  // const [row, setRow] = useState([]);

  const tempArray = []

  // i dont remember
  const data = Object.values(assets)

  // loop through assets array passed in a prop
  //appending the tempArray with the data
  for (let index = 1; index <= (data[0].length-1); index++) {
    tempArray[index] = data[0][index]
  }

  // shift as first index of 0 is empty 
  tempArray.shift()
  console.log(tempArray);


// column headings 
const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'assetName', headerName: 'Asset name', width: 130 },
    {field: 'quantity', headerName: 'Quantity', type: 'number', width: 90},
    { field: 'completed', headerName: 'Status', width: 130 },
    ];

// use tempArray as the row data
const rows = tempArray
    return(
      <>
        {/* {assets>0 && 
        <>
        <Button classVar='dark' text={'asset'} onClick={(e)=> {asset.map((item)=>{console.log(item)})}}/> 
        <Button classVar='dark' text={'count'} onClick={(e)=> {asset.map((item)=>{console.log(assetCount)})}}/> 
        </>

        } */}
        <div className='table' style={{ height: 400, width: '100%' }}>
        <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        />
        </div>
      </>


    )
  
  }
  
  
  export default Table