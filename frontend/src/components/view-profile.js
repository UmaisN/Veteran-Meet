import { Avatar, Grid,Paper,TextareaAutosize, TextField, FormControlLabel, Checkbox, Button, Typography, Link } from "@mui/material";
import React, {useEffect, useState} from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import axios from "axios";


const ViewProfile = ()=>
{
    const [ userID , setUserID] = useState("");
    const [name, setName] = useState("");
    const [email ,setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [phoneno, setPhoneNo]= useState("");
    const [profession, setProfession]= useState("");
    const [ posts, setPosts] = useState([]);
    const [comment, setComment] = useState();
    const [image , setImage] = useState("");
    
    const getCuurentUser = () =>
    {
      let logintoken = localStorage.getItem("logintoken")
      console.log(logintoken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${logintoken}`;
      axios.get("http://localhost:5000/home/viewprofile")
        .then(res=> {
                console.log(res.data)
                setUserID(res.data._id);
                setName(res.data.name);
                setEmail(res.data.email);
                setGender(res.data.gender);
                setPhoneNo(res.data.phoneno);
                setProfession(res.data.profession);
        }).catch (err=> {
            console.log(err) })
    }

    const getCurrUserPosts=() =>
    {
      axios.get("http://localhost:5000/post/getposts")
          .then(res=> {
                  console.log(res.data)
                  //setName(res.data.name);
                  //setComment(res.data.comment);
                  //setImage(res.data.image);
                  //console.log(res.data.comment);
                  setPosts(res.data)
          }).catch (err=> {
              console.log(err) })
      }
    

    useEffect(()=>
    {
      getCuurentUser();
      getCurrUserPosts();
    });
   


    const paperStyle = {padding : 20, height: '70vh', width: 800,
    margin: '80px 0px 50px 240px'}
const avatarStyle = {backgroundColor: '#4169e1'}
const btStyle = {margin: '30px 0px 12px'}
const textStyle = {margin: '3px 0'}
    
    return (
        <Grid>
         <Paper elevation={15} style={paperStyle}>
                    <Grid align='center'>
                        <h2>View Profile</h2>
                    </Grid>  
                    
                    <Typography sx={{ fontWeight: 400 }} variant="h6">
                      ID: {userID}      
                    </Typography>
               
                    <Typography sx={{ fontWeight: 400 }} variant="h6">
                      Name: {name}      
                    </Typography>
                    <Typography sx={{ fontWeight: 400 }} variant="h6">
                       Email: {email}
                    </Typography>
                    
                    <Typography sx={{ fontWeight: 400 }} variant="h6">
                       Gender: {gender}
                    </Typography>
                    <Typography sx={{ fontWeight: 400 }} variant="h6">
                      Phone No: {phoneno}
                    </Typography>
                    <Typography sx={{ fontWeight: 400 }} variant="h6">
                       Profession: {profession}


                    </Typography>

                    {[...posts].reverse().map((post) => {
                  if (post.name ==  name ) {
                  return(
                <>
                <Typography sx={{ fontWeight: 400 }} variant="h6">
                    Comment: {post.comment}
                </Typography>

                <img
                    src={post.image}
                    style={{ height: "200px", width: "400px", class: "center", borderRadous: "50%" }}
                />


            </>
                          
                    );
            }
})}                  
                  
        </Paper>
       </Grid>
    )
}

export default ViewProfile