import {
    Avatar,
    Grid,
    Paper,
    TextareaAutosize,
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    Typography,
    Link
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
  import "../style/loginform.css";
  import axios from "axios";
  
  const ViewProfilesV = () => {

    //let x = "";
    const [userID , setUserID] = useState("");
    const [users, setUsers] = useState([]);
    const [ following , setFollowing] = useState([{}]);
    
    //const getAllUsers = async(e)=>
    //{
    // axios
    //   .get("http://localhost:5000/signup/getuser")
    //   .then((res) => {
    //    // console.log(res.data);
    //     setUsers(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // }
    useEffect(()=>
    {
      axios
      .get("http://localhost:5000/signup/getuser")
      .then((res) => {
       // console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    
       // getAllUsers();
    },[])


    const FollowV = (uid) => //
    {
        
        let logintoken = localStorage.getItem("logintoken")
      //console.log(logintoken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${logintoken}`;
      axios.get("http://localhost:5000/home/viewprofile")
        .then(res=> {
                console.log(res.data)
                //x= res.data._id;
                
                setUserID(res.data._id);
                setFollowing(res.data.following);
               //console.log(x)
        }).catch (err=> {
            console.log(err) })
        let arr=[]
               // getCurrUser();
            arr.push(userID);  // current user id
            arr.push(uid); // following one's

            axios.post("http://localhost:5000/signup/addfollowing",arr)
            .then((res)=>
            {
                Follower(uid);
            }).catch((err)=>
            {
                console.log(err)
            })

    }

    const Follower = (uid)=>
    {
       let arr =[]
       arr.push(uid);
       arr.push(userID);

       axios.post("http://localhost:5000/signup/addfollow",arr)
       .then((res)=>
       {
           // window.location.reload();
            alert("Followed");

        }).catch((err)=>
       {
        console.log(err);
       })
    }

    const paperStyle = {
      padding: 20,
      height: '300vh',
      width: 700,
      margin: "100px 10px 200px 240px"
    };
    const avatarStyle = { backgroundColor: "#4169e1" };
    const btStyle = { margin: "30px 0px 12px" };
    const textStyle = { margin: "3px 0" };
    return (
      <Grid>
        <Paper elevation={15} style={paperStyle}>
          <Grid align="center">
            <h2>Follow Veterans</h2>
          </Grid>
 
                {users.map((userdata) => {
                if((!following.includes(userdata._id)) && userdata._id!=={userID})
                {
                return (
                <>
            <Typography sx={{ fontWeight: 400 }} variant="h6">
                Name: {userdata.name}
            </Typography>
            <Typography sx={{ fontWeight: 400 }} variant="h6">
                Email: {userdata.email}
            </Typography>
            <Typography sx={{ fontWeight: 400 }} variant="h6">
                Gender: {userdata.gender}
            </Typography>
            <Typography sx={{ fontWeight: 400 }} variant="h6">
                PhoneNo: {userdata.phoneno}
            </Typography>
            <Typography sx={{ fontWeight: 400 }} variant="h6">
                Profession: {userdata.profession}
            </Typography>
            <Button   onClick= {FollowV(userdata._id)}type='submit' variant="contained" style={btStyle} color='primary' fullWidth>FOLLOW</Button> 
            </>
                );        
       }
                })};;
        </Paper>
      </Grid>
    );
  };
  
  export default ViewProfilesV;
  