import { Avatar,Table, Grid,Paper,TextareaAutosize, TextField, FormControlLabel, Checkbox, Button, Typography, Link, TableContainer, TableHead, TableRow, TableCell, makeStyles } from "@mui/material";
import React, {useEffect, useState, useContext} from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import '../style/loginform.css'
import axios from "axios";
import {useParams} from 'react-router-dom'
import {getAllHobbies} from '../services/user-services'
import {UserContext} from '../App'


import { renderMatches, useNavigate} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { TabContext } from "@mui/lab";
import { ClassNames } from "@emotion/react";

const ViewVeteran = ()=>
{
    const [ users, setUsers] = useState([]);
    useEffect(()=>
    {
    axios.get("http://localhost:5000/signup/GetUser")
        .then(res=> {
                console.log(res.data)
                setUsers(res.data)
        }).catch (err=> {
            console.log(err) })
    },[users]);

    const [userProfile,setProfile] = useState(null)
    
    //const {state,dispatch} = useParams();
    const {state,dispatch} = useContext(UserContext)
    const {userid} = useParams()
    const [showfollow,setShowFollow] = useState(state?!state.following.includes(userid):true)
    useEffect(()=>{
       fetch(`/SignUp/${userid}`,{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           //console.log(result)
         
            setProfile(result)
       })
    },[])


    const followUser = ()=>{
        fetch('http://localhost:5000/signup/follow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
        
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
             localStorage.setItem("user",JSON.stringify(data))
             setProfile((prevState)=>{
                 return {
                     ...prevState,
                     user:{
                         ...prevState.user,
                         followers:[...prevState.user.followers,data._id]
                        }
                 }
             })
             setShowFollow(false)
        })
    }
    const unfollowUser = ()=>{
        fetch('http://localhost:5000/signup/unfollow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
             localStorage.setItem("user",JSON.stringify(data))
            
             setProfile((prevState)=>{
                const newFollower = prevState.user.followers.filter(item=>item != data._id )
                 return {
                     ...prevState,
                     user:{
                         ...prevState.user,
                         followers:newFollower
                        }
                 }
             })
             setShowFollow(true)
             
        })
    }

    const paperStyle = {padding : 20, height: '50vh', width: 450,
    margin: '120px 10px 200px 240px'}
const avatarStyle = {backgroundColor: '#4169e1'}
const btStyle = {margin: '30px 0px 12px'}
const textStyle = {margin: '3px 0'}
    return (
       <Grid>
         <Paper elevation={15} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                        <h2>View Veterans</h2>
                    </Grid>  
                    {users.map((item)=>
                        (
<>
                    <Typography sx={{ fontWeight: 400 }} variant="h6">
                      Name:  {item.name}
                    </Typography>
                    {showfollow?
                   <button style={{
                       margin:"10px"
                   }} className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={()=>followUser()}
                    >
                        Follow
                    </button>
                    : 
                    <button
                    style={{
                        margin:"10px"
                    }}
                    className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={()=>unfollowUser()}
                    >
                        Unfollow
                    </button>
                    }
                    </>
                    ))}
                     
        </Paper>
       </Grid>
    )

}

export default ViewVeteran;