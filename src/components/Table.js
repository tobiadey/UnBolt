import {useEffect,useState } from 'react'
import './Table.css';
import { DataGrid } from '@mui/x-data-grid';


// components for showing the table in the dashboard
//takes in props which it uses to load the table with data
// this is a material ui component mainly, which was edited to take a prop rather than const variables to load the table
// https://mui.com/material-ui/react-table/
const Table = (assets) => {

  console.log(assets.assets);
  const tempArray = assets.assets

 

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