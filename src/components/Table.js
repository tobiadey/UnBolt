import {useEffect,useState } from 'react'
import './Table.css';
import { DataGrid } from '@mui/x-data-grid';


// components for showing the table in the dashboard
//takes in props which it uses to load the table with data
// this is a material ui component mainly, which was edited to take a prop rather than const variables to load the table
// https://mui.com/material-ui/react-table/
// const Table = (assets,handleSetSelection) => {
const Table = (props) => {

  console.log("Inside table");
  // console.log(props);
  console.log(props.assets);

  // console.log(props.assets.assets);
  // const tempArray = props.assets.assets
  const tempArray = props.assets

 

// column headings 
const columns = [
    { field: 'id', headerName: 'ID', width: 130 },
    { field: 'assetName', headerName: 'Asset name', width: 250 },
    {field: 'quantity', headerName: 'Quantity', width: 250},
    { field: 'completed', headerName: 'Completed', width: 180 },
    { field: 'cancelled', headerName: 'Cancelled', width: 180 },
    ];

// use tempArray as the row data
const rows = tempArray
// const rows = []
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
        onSelectionModelChange={itm => props.handleSetSelection(itm)}
        // onSelectionModelChange={props.handleSetSelection([2,4])}
        // handleSetSelection('itm')
        />
        </div>
      </>


    )
  
  }
  
  
  export default Table








