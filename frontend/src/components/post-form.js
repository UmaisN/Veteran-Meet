import { Avatar, Grid,Paper,TextareaAutosize, TextField, FormControlLabel, Checkbox, Button, Typography, Link } from "@mui/material";
import React, {useState,useEffect} from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from "axios";

import { useNavigate} from "react-router-dom";


const FormPost = ()=>
{       
     
     const [name, setName] = useState();
     const [userName, setUserName] = useState();
     const [comment, setComment] = useState();
     const [selectedFile, setSelectedFile] =useState(null);
     const [fileInputState, setFileInputState ] = useState("");
     const [imageValue, setImageValue] = useState(0)
     const [postImage , setPostImage] = useState(null)
     const [msg, setMsg] = useState('');
     const [previewSource , setPreviewSource] = useState("");


const handleFileInputChange =(e)=>
{
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
};

const previewFile = (file) =>
{
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend=()=>
    {
        setPreviewSource(reader.result);
    }
}
     
          const navigate = useNavigate();
          const [userID, setUserID] = useState("");

          const getUserProfile = () =>
          {
            let logintoken = localStorage.getItem("logintoken")
            console.log(logintoken);
            axios.defaults.headers.common["Authorization"] = `Bearer ${logintoken}`;
            axios.get("http://localhost:5000/home/viewprofile")
              .then(res=> {
                      console.log(res.data)
                     // setUserID(res.data._id);
                      setName(res.data.name);
                      //setEmail(res.data.email);
                      //setGender(res.data.gender);
                      //setPhoneNo(res.data.phoneno);
                      //setProfession(res.data.profession);
              }).catch (err=> {
                  console.log(err) })
          }

          useEffect(()=>
          {
            getUserProfile();
          },[]);


        //   useEffect(()=>
        //     {
        //       axios.get("http://localhost:5000/home/viewprofile")
        //         .then(res=> {
        //                 console.log(res.data)
        //                 setName(res.data)
        //         }).catch (err=> {
        //             console.log(err) })
        //     },[name]);

         const AddPost = async(e) =>
         { 
            
            e.preventDefault();
                // axios.get("http://localhost:5000/home/viewprofile"
                //       )
                //   .then(res=> {
                //           console.log(res.data);
                //           //console.log(res.data._id);

                //           setName(res.data.name);
                //           console.log(res.data.name);
                //           //setUserID(res.data._id);
                        
                //   })
                //  .catch((err)=>
                 // {
                   // console.log(err);
                 // })
                   
           const url='http://localhost:5000/post/addpost'
           const formData = new FormData()
           
           setUserName(name);
           //formData.append('userid',l
           formData.append('name',name)
           formData.append('comment',comment)
           formData.append('image',selectedFile)
           console.log(formData);
           axios.post(url,formData).then ((res)=>
           {
            console.log(res.data)
           })
          
         }


     
     
         const paperStyle = {padding : 20, height: '40vh', width: 700,
    margin: '150px 0px 50px 240px'}
         const avatarStyle = {backgroundColor: '#4169e1'}
         const btStyle = {margin: '30px 0px 12px'}
         const textStyle = {margin: '3px 0'}
    return (
        <div>
            <Grid>
            <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <h2>Add Post</h2>
                    </Grid>   

                    <TextareaAutosize 
                        aria-label="minimum height"
                        minRows={5}
                        placeholder="Minimum 5 rows"
                        style={{ width: 700 }}    
                        onChange={e => setComment(e.target.value)}
                    />  
                   
                  
                   <input 
                    type="file"
                     name="file"
                      onChange={handleFileInputChange} 
                      value={fileInputState}
                      />
                   {previewSource && (
                    <img
                        src={previewSource}
                        alt="chosen"
                        style={{height:"200px", width: "400px", class:"center", borderRadous:"50%"}}
                        />
                   )}
                    <Button   type='submit'onClick={AddPost} variant="contained" style={btStyle} color='primary' fullWidth>ADD POST</Button>   
                   
                    
                </Paper>
            </Grid>
        </div>
    )
}

export default FormPost;