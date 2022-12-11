import { Avatar, Grid,Paper,Select, TextField, FormControlLabel, Checkbox, Button, Typography, Link } from "@mui/material";
import React, {useState} from "react";
import MenuItem from "@material-ui/core/MenuItem";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from "axios";

import { useNavigate} from "react-router-dom";
const FormHobby = ()=>
{
     // const [name, setName] = useState('');
     const [name, setName] = useState('');
         const [hobby, setHobby] = useState('');
         const [category, setCategory] = useState('');
         const [msg, setMsg] = useState('');
     
          const navigate = useNavigate();
         const handleSubmit = () =>
         {
                 navigate("/signup");
         }
     
     
         const AddHobby = async(e) =>
         {
             e.preventDefault();
             try {
                 await axios.post('http://localhost:5000/hobby/addhobby', {
                 name: name,    
                 hobby:hobby,
                    category: category,
                 });
                 navigate("/home");
             } catch (error) {
                 if (error.response) {
                     setMsg(error.response.data.msg);
                 }
             }
         }
     
     
         const paperStyle = {padding : 20, height: '50vh', width: 600,
                             margin: '150px 10px 200px 240px'}
         const avatarStyle = {backgroundColor: '#D6E4E5'}
         const btStyle = {margin: '30px 0px 12px'}
         const textStyle = {margin: '3px 0'}
    return (
        <div>
            <Grid>
            <Paper elevation={15} style={paperStyle}>
                    <Grid align='center'>
                        <h2>Add Hobby</h2>
                    </Grid> 
                    <TextField 
                     onChange={e => setName(e.target.value)}
                    id='name' 
                    name='name'
                    label='Name' 
                    placeholder="" 
                    style={textStyle}
                    fullWidth 
                    variant="standard"
                     required
                     />    
                    <TextField 
                     onChange={e => setHobby(e.target.value)}
                    id='hobby' 
                    name='hobby'
                    label='Hobby Name' 
                    placeholder="" 
                    style={textStyle}
                    fullWidth 
                    variant="standard"
                     required
                     />

            <Select
            labelId="select"
            id="select"
            value={category}
            label="Talks"
            fullWidth
            required
            onChange={e=>setCategory(e.target.value)}
            >
              <MenuItem value={"Public Talks"}>Public Talks</MenuItem>
              <MenuItem value={"Motivational Talks"}>Motivational Talks</MenuItem>
              <MenuItem value={"Professional Talk"}>Professional Talk</MenuItem>
              <MenuItem value={"Professional Task"}>Professional Task</MenuItem>
              <MenuItem value={"Plantational Drive"}>Plantational Drive</MenuItem>
              <MenuItem value={"Orphanage Visit"}>Orphanage Visit</MenuItem>
              <MenuItem value={"Visiting Patients In Hospitals"}>Visiting Patients In Hospitals</MenuItem>
              <MenuItem value={"Recreational Visit"}>Professional Talks</MenuItem>
              <MenuItem value={"Old Home Visit"}>Old Home Visit</MenuItem>
              <MenuItem value={"Book Reading"}>Book Reading</MenuItem> 
            </Select>   

                    <Button   type='submit'onClick={AddHobby} variant="contained" style={btStyle} color='primary' fullWidth>ADD HOBBY</Button>   
                   
                    
                </Paper>
            </Grid>
        </div>
    )
}

export default FormHobby;