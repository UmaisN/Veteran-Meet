import { Avatar,Table, Grid,Paper,TextareaAutosize, TextField, FormControlLabel, Checkbox, Button, Typography, Link, TableContainer, TableHead, TableRow, TableCell, makeStyles } from "@mui/material";
import React, {useEffect, useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from "axios";



import { renderMatches, useNavigate, useParams} from "react-router-dom";

import { TabContext } from "@mui/lab";
import { ClassNames } from "@emotion/react";
import Divider from '@mui/material/Divider';


const ViewHobby = ()=>
{
         const navigate = useNavigate();
    const handleSubmit = (hobbyid) =>
    
    {

         localStorage.removeItem('hobbyid')
         localStorage.setItem('hobbyid',hobbyid)
            navigate("/home/edithobby");
    }
    //let hobby = useParams().hobby;
    const [ hobbies, setHobbies] = useState([]);
    
    useEffect(()=>
    {
        

    axios.get("http://localhost:5000/hobby/gethobbies")
        .then(res=> {
                console.log(res.data)
                setHobbies(res.data)
        }).catch (err=> {
            console.log(err) })
    },[hobbies]);
   
    const paperStyle = {padding : 20, height: '400vh', width: 900,
    margin: '80px 0px 50px 240px'}
const avatarStyle = {backgroundColor: '#4169e1'}
const btStyle = {margin: '30px 0px 12px'}
const textStyle = {margin: '3px 0'}
    return (
       <Grid>
         <Paper elevation={15} style={paperStyle}>
                    <Grid align='center'>
                        <h2>View Hobbies</h2>
                    </Grid>  
        
                    {hobbies.map((hobby)=>
                        (
                      <>
                      <Typography sx={{ fontWeight: 400, margin:2  }} variant="h6">
              Name: <TextField
                    type='text' 
                     defaultValue={hobby.name}
                     variant='outlined'
                    //  onClick={()=> handleSubmit()}
                     inputProps = {
                     { readOnly: true,}
                     }/>
                      </Typography>
                       
                      <Typography sx={{ fontWeight: 400, margin:2  }} variant="h6">
              Hobby: <TextField
                    type='text' 
                     defaultValue={hobby.hobby}
                     variant='outlined'
                     inputProps = {
                     { readOnly: true,}
                     }/>
                      </Typography>
                    
                      <Typography sx={{ fontWeight: 400, margin:2 }} variant="h6">
              Category: <TextField
                    type='text' 
                     defaultValue={hobby.category}
                     variant='outlined'
                     inputProps = {
                     { readOnly: true,}
                     }/>
                      </Typography>
                      
                      <Grid align='center'>
                        <EditIcon sx={{fontSize:40 }} onClick={()=>handleSubmit(hobby._id)}></EditIcon>
                      </Grid>
                     
                     <Divider sx={{ borderBottomWidth: 5, margin: 2}}></Divider>
                     
    
                   {/* <Button   type='submit' onClick={()=>handleSubmit()} variant="contained" style={btStyle} color='primary' fullWidth>EDIT HOBBY</Button>  */}
                    </>
                    ))}
                     
        </Paper>
       </Grid>
    )

}

export default ViewHobby;