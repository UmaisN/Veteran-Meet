import { Avatar, Grid,Paper,Card, Box,TextField, FormControlLabel,Snackbar, InputLabel, Checkbox, Button, Typography, Link, Alert } from "@mui/material";
import React, {useEffect, useState} from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import UpdateIcon from '@mui/icons-material/Update';
import axios from "axios";

import { useNavigate, useParams} from "react-router-dom";
import AssignmentIcon from "@mui/icons-material/Assessment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";


const EditHobby = () =>
{
    const [userID , setUserID] = useState()
    const [name , setName] = useState('');
   const [hobby, setHobby] = useState("");
  const [category , setCategory] = useState('');
  const [hobbies , setHobbies] = useState([]);
      const [description, setDescription] = useState('');
      const [msg, setMsg] = useState('');





  const getHobbies = async()=>
{
//   axios.get('http://localhost:5000/hobby/gethobby', {params : {id: localStorage.getItem('hobbyid')}})
//   .then(res=> {
//     console.log(res.data)
//     setName(res.data.name);
//     setHobby(res.data.hobby);
//     setCategory(res.data.category)
//     console.log(res.data.category)
//     //setUserID(res.data._id);
//    // setName(res.data.name);
//     //setHobbies(res.data)
//     }).catch (err=> {
// console.log(err) })
}

  const EditHobbies = async(e) =>
  {
    axios.get('http://localhost:5000/hobby/gethobby', {params : {id: localStorage.getItem('hobbyid')}})
    .then(res=> {
      console.log(res.data)
      setName(res.data.name);
      setHobby(res.data.hobby);
      setCategory(res.data.category)
      console.log(res.data.category)
      //setUserID(res.data._id);
     // setName(res.data.name);
      //setHobbies(res.data)
      }).catch (err=> {
  console.log(err) })

    e.preventDefault();
    console.log(`id: ${localStorage.getItem('hobbyid')}`)
    //setName(name);
    axios.put(`http://localhost:5000/hobby/updatehobby/${localStorage.getItem('hobbyid')}`,
    {
      name:name,
      hobby: hobby,
      category: category,
    
    }).then((res)=>
    {
      console.log(category)
      window.alert("EditSuccesFUll")
    }).catch((err)=>
      {
        window.alert("EditNOTSuccesFUll")
      })
           
  }
  const paperStyle = {padding : 20, height: '50vh', width: 650, margin: '140px 10px 200px 240px'}
         const avatarStyle = {backgroundColor: '#4169e1'}
         const btStyle = {margin: '30px 0px 12px'}
         const textStyle = {margin: '3px 0'}
         return (
          <div>
            <Grid>
            <Paper elevation={15} style={paperStyle}>
                    <Grid align='center'>
                        <h2>Edit Hobby</h2>
                    </Grid>
                    {/* {hobbies.map((hobby)=>
                        (
                      <> */}

                    <Typography sx={{ fontWeight: 400, margin: 2 }} variant="h6">
              Name: <TextField
                    type='text' 
                    //{hobby.name}
                    defaultValue={name}
                    onChange={e=>setName(e.target.value)}
                     variant='outlined'
                     inputProps = {
                     { readOnly: false,}
                     }/>   
                      </Typography>

                      <Typography sx={{ fontWeight: 400,margin: 2 }} variant="h6">
              Hobby: <TextField
                    type='text' 
                    onChange={e=>setHobby(e.target.value)}
                     defaultValue={hobby}
                     variant='outlined'
                     inputProps = {
                     { readOnly: false,}
                     }/>
                      </Typography>

                      <Typography sx={{ fontWeight: 400,margin: 2 }} variant="h6">
              Category: <TextField
                    type='text' 
                    
                    onChange={e=>setCategory(e.target.value)}
                    defaultValue={category}
                     variant='outlined'
                     inputProps = {
                     { readOnly: false,}
                     }/> 
                      </Typography>
                      
                    
                      <Grid align='center'>
                        <UpdateIcon sx={{fontSize: 40}} onClick={EditHobbies}></UpdateIcon>     
                      </Grid>
                     
                    
                  
                    
                    {/* <Button   type='submit' onClick={EditHobbies}variant="contained" style={btStyle} color='primary' fullWidth>ADD HOBBY</Button>    */}
                    {/* </>
                    ))}
                     */}
                </Paper>
            </Grid>
        </div>

          
         )
   };

export default EditHobby;