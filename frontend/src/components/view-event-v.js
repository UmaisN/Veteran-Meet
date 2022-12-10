import { Avatar, Grid,Paper,TextareaAutosize, TextField, FormControlLabel, Checkbox, Button, Typography, Link, Rating } from "@mui/material";
import React, {useEffect, useState} from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FavouriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import axios from "axios";


const ViewPosts =() =>

{
  const [ orgname , setOrgName] = useState("");
  const [ name , setName] = useState("");
  const [ venue, setVenue] = useState("");
  const [ interests ,setInterests] = useState("");
  const [date , setDate] = useState("");
  const [stars,setStars] = useState("");
  const [ events, setEvents] = useState([]);
  const [interested , setInteresed] = useState();
  useEffect(()=>
  {
    axios.get("http://localhost:5000/event/getevent")
      .then(res=> {
              console.log(res.data)
              setEvents(res.data)
      }).catch (err=> {
          console.log(err) })
  },[events]);

  const paperStyle = {padding : 20, height: '50vh', width: 450,
  margin: '180px 10px 200px 240px'}
const avatarStyle = {backgroundColor: '#4169e1'}
const btStyle = {margin: '30px 0px 12px'}
const textStyle = {margin: '3px 0'}
  return (
      <Grid>
       <Paper elevation={15} style={paperStyle}>
                  <Grid align='center'>
                      <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                      <h2>View Posts</h2>
                  </Grid>  
                  {[...events].reverse().map((event)=>
                        (
<>
<Typography sx={{ fontWeight: 400 }} variant="h6">
                   Organization Name:   {event.orgname}   
                  </Typography>  
                  <Typography sx={{ fontWeight: 400 }} variant="h6">
                    Event Name:   {event.name}   
                  </Typography>
                  <Typography sx={{fontWeight:400}} variant="h6">
                    Venue: {event.venue}
                  </Typography>
                  <Typography sx={{fontWeight:400}} variant="h6">
                    Category : {event.interests}
                  </Typography>
                  <Typography sx={{fontWeight:400}} variant="h6">
                    Date: {event.date}
                  </Typography>
                  <Rating
                  name ="read-only"
                  value={event.stars}
                  readOnly
                  />
                    <FavouriteBorderIcon onClick={e=>setInteresed(true)}>

                    </FavouriteBorderIcon>
                  
                  </>
                    ))}   
                          </Paper>
     </Grid>
  )
}

export default ViewPosts;