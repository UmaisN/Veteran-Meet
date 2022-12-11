import { Avatar, Rating,Grid,Paper,TextareaAutosize, TextField, FormControlLabel, Checkbox, Button, Typography, Link } from "@mui/material";
import React, {useEffect, useState} from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Divider from '@mui/material/Divider';
import axios from "axios";


const ViewProfile = ()=>
{
    const [ userID , setUserID] = useState("");
    const [orgname, setOrgName] = useState("");
    const [email ,setEmail] = useState("");
    const [phoneno, setPhoneNo]= useState("");
    const [profession, setProfession]= useState("");
    const [ events, setEvents] = useState([]);
    const [comment, setComment] = useState();
    const [image , setImage] = useState("");
    const [ stars, setStars] = useState("");
   
    
    const getCuurentUser = () =>
    {
      let logintoken = localStorage.getItem("ltoken")
      console.log(logintoken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${logintoken}`;
      axios.get("http://localhost:5000/chome/profile")
        .then(res=> {
                console.log(res.data)
                setUserID(res.data._id);
                setOrgName(res.data.orgname);
                setEmail(res.data.email);
                setPhoneNo(res.data.phoneno);
        }).catch (err=> {
            console.log(err) })
    }

    const getCurrUserEvents=() =>
    {
      axios.get("http://localhost:5000/event/getevent")
          .then(res=> {
                  console.log(res.data)
                  //setName(res.data.name);
                  //setComment(res.data.comment);
                  //setImage(res.data.image);
                  //console.log(res.data.comment);
                  setEvents(res.data)
          }).catch (err=> {
              console.log(err) })
      }
    

    useEffect(()=>
    {
      getCuurentUser();
      getCurrUserEvents();
     // getCurrUserPosts();
    });
   


    const paperStyle = {padding : 20, height: '150vh', width: 800,
    margin: '80px 0px 50px 240px'}
const avatarStyle = {backgroundColor: '#4169e1'}
const btStyle = {margin: '30px 0px 12px'}
const textStyle = {margin: '3px 0'}
    
    return (
        <Grid>
         <Paper elevation={15} style={paperStyle}>
                    <Grid align='center'>
                        <h2>Community Profile</h2>
                    </Grid>  
                    
                    <Typography sx={{ fontWeight: 400 }} variant="h6">
                      ID: {userID}      
                    </Typography>
               
                    <Typography sx={{ fontWeight: 400 }} variant="h6">
                      Organization Name: {orgname}      
                    </Typography>
                    <Typography sx={{ fontWeight: 400 }} variant="h6">
                       Email: {email}
                    </Typography>
                    
                  
                    <Typography sx={{ fontWeight: 400 }} variant="h6">
                      Phone No: {phoneno}
                    </Typography>
   
                    {events.map((event) => {
                 if (event.orgname ===  orgname ) {
                  return(
                <>
                
                <Typography sx={{ fontWeight: 400 }} variant="h6">
                    Event Name: {event.name}
                </Typography>
                <Typography sx={{ fontWeight: 400 }} variant="h6">
                    Event Venue: {event.venue}
                </Typography>
                <Typography sx={{ fontWeight: 400 }} variant="h6">
                    Category: {event.interests}
                </Typography>
                <Typography sx={{ fontWeight: 400 }} variant="h6">
                    Date: {event.date}
                </Typography>
                <Rating
                  name ="read-only"
                  value={event.stars}
                  readOnly
                  />
                <Divider sx={{ borderBottomWidth: 5, margin: 2}}></Divider>
               

            </>
                          
                    );
            }
})}                  
                  
        </Paper>
       </Grid>
    )
}

export default ViewProfile