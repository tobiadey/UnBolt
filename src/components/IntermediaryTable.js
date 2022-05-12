import {useEffect,useState } from 'react'
import './Table.css';
import { DataGrid } from '@mui/x-data-grid';


// components for showing the table in the dashboard
//takes in props which it uses to load the table with data
// this is a material ui component mainly, which was edited to take a prop rather than const variables to load the table
// https://mui.com/material-ui/react-table/
const IntermediaryTable = (list) => {

//   console.log(list);
//   console.log(list.list);
//   console.log(list.list.length);
//   console.log(list.list[0].attributes);

  
//   console.log(list.length);
  const tempArray = []

  for (let index = 0; index < list.list.length; index++) {
      const element = list.list[index];
    //   console.log("hello world");
    //   console.log(element.id);
    //   console.log(element.attributes.name);
      tempArray.push({id:element.id, name:element.attributes.name, ethAddress: element.attributes.ethAddress})
  }

//   console.log(temp);
 

// column headings 
const columns = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'ethAddress', headerName: 'ETH Address', width: 200 },
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
        // checkboxSelection
        />
        </div>
      </>


    )
  
  }
  
  
  export default IntermediaryTable