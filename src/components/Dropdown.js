// import { useEffect,useState } from 'react'
// import Button from '../components/Button'
// import './Dropdown.css';
// import {Link} from 'react-router-dom'
// import { useMoralis } from "react-moralis";
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';


// // this is a handler for the about page
// const Dropdown = ({list}) => {
//     const [age, setAge] = useState('');
//     const [ethAddress, setEthAddress] = useState('');
//     const handleChange = (event) => {
//         setAge(event.target.value);
//         setEthAddress(event.target.value);
//         console.log(list);
//         console.log(event.target.value);
//       };
  
//   return (
//     <div className="">
//         {/* <Box sx={{ minWidth: 120 }}> */}
//             <FormControl fullWidth>
//                 <InputLabel id="demo-simple-select-label">Search Intermediary</InputLabel>
//                 <Select
//                 labelId="demo-simple-select-label"
//                 id="demo-simple-select"
//                 value={ethAddress}
//                 label="Search Intermediary"
//                 onChange={handleChange}
//                 defaultValue = 'ddkd'
//                 // ref = {this.input}
//                 >
//                     {list.map((item)=>{
//                         // console.log(item.get("name"));
//                         return(
//                             <div key={item.id}>
//                                 <MenuItem value={item.attributes.ethAddress}>{item.get("name")}</MenuItem>
//                             </div >
//                         );
//                     })}
//                 </Select>
//             </FormControl>
//         {/* </Box> */}
//       </div>
//   );
// }

// export default Dropdown
