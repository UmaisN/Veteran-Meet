import {
  Avatar,
  Grid,
  Paper,
  Select,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  Link,
  Rating
} from "@mui/material";
import React, { useState } from "react";
import "../style/loginform.css";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";

import { useNavigate } from "react-router-dom";
const FormHobby = () => {
  // const [name, setName] = useState('');
  const [orgname, setOrgName] = useState("");
  const [name, setName] = useState("");
  const [venue, setVenue] = useState("");
  const [interests, setInterests] = useState("");
  const [date, setDate] = useState("");
  const [stars, setStars] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/signup");
  };

  const AddEvent = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/event/addevent", {
        orgname: orgname,
        name: name,
        venue: venue,
        interests: interests,
        date: date,
        stars: stars
      });
      // navigate("/home");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const paperStyle = {
    padding: 15,
    height: "600",
    width: 500,
    margin: "100px 50px 200px 240px"
  };
  const avatarStyle = { backgroundColor: "#4169e1" };
  const btStyle = { margin: "30px 0px 12px" };
  const textStyle = { margin: "3px 0" };
  return (
    <div>
      <Grid>
        <Paper elevation={15} style={paperStyle}>
          <Grid align="center">
            <h2>Add Event</h2>
          </Grid>
          <Grid marginTop="10px">
            <TextField
              onChange={(e) => setOrgName(e.target.value)}
              id="orgname"
              name="orgname"
              label="Organization Name"
              placeholder=""
              style={textStyle}
              fullWidth
              variant="standard"
              required
            />
          </Grid>
          <Grid marginTop="10px">
            <TextField
              onChange={(e) => setName(e.target.value)}
              id="name"
              name="name"
              label="Event Name"
              placeholder=""
              style={textStyle}
              fullWidth
              variant="standard"
              required
            />
          </Grid>
          <Grid marginTop="10px">
            <TextField
              onChange={(e) => setVenue(e.target.value)}
              id="venue"
              name="venue"
              label="Venue"
              placeholder=""
              style={textStyle}
              fullWidth
              variant="standard"
              required
            />
          </Grid>
          <Grid marginTop="10px">
            <Typography>Event Type</Typography>
            <Select
              labelId="select"
              id="select"
              value={interests}
              label="Event Type"
              fullWidth
              required
              onChange={(e) => setInterests(e.target.value)}
            >
              <MenuItem value={"Public Talks"}>Public Talks</MenuItem>
              <MenuItem value={"Motivational Talks"}>
                Motivational Talks
              </MenuItem>
              <MenuItem value={"Professional Talk"}>Professional Talk</MenuItem>
              <MenuItem value={"Professional Task"}>Professional Task</MenuItem>
              <MenuItem value={"Plantational Drive"}>
                Plantational Drive
              </MenuItem>
              <MenuItem value={"Orphanage Visit"}>Orphanage Visit</MenuItem>
              <MenuItem value={"Visiting Patients In Hospitals"}>
                Visiting Patients In Hospitals
              </MenuItem>
              <MenuItem value={"Recreational Visit"}>
                Professional Talks
              </MenuItem>
              <MenuItem value={"Old Home Visit"}>Old Home Visit</MenuItem>
              <MenuItem value={"Book Reading"}>Book Reading</MenuItem>
            </Select>
          </Grid>
          <Grid marginTop="15px">
            <TextField
              id="date"
              label="Date"
              type="date"
              onChange={(e) => setDate(e.target.value)}
              defaultValue="7/05/2015"
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          <Grid marginTop="10px">
            <Typography>
              Event Stars (1 star = 1000 stars)
              <Rating
                name="simple-controlled"
                value={stars}
                onChange={(e) => setStars(e.target.value)}
              />
            </Typography>
          </Grid>
          <Button
            type="submit"
            onClick={AddEvent}
            variant="contained"
            style={btStyle}
            color="primary"
            fullWidth
          >
            ADD EVENT
          </Button>
        </Paper>
      </Grid>
    </div>
  );
};

export default FormHobby;
