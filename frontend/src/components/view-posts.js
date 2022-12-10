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

const ViewPosts = () => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [image, setImage] = useState("");
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/post/getposts")
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [posts]);

  const paperStyle = {
    padding: 10,
    height: 500,
    width: 600,
    margin: "50px 50px 0px 80px"
  };
  const avatarStyle = { backgroundColor: "#4169e1" };
  const btStyle = { margin: "30px 0px 12px" };
  const textStyle = { margin: "3px 0" };
  return (
    <Grid>
      <Paper elevation={55} style={paperStyle}>
        <Grid align="center">
          <h2>Event Feed</h2>
        </Grid>
        {posts.map((post) => (
          <>
            <Typography sx={{ fontWeight: 400 }} variant="h6">
              Name: {post.name}
            </Typography>
            <Typography sx={{ fontWeight: 400 }} variant="h6">
              Comment: {post.comment}
            </Typography>

            <img
              src={post.image}
              style={{
                height: "200px",
                width: "400px",
                class: "center",
                borderRadous: "50%"
              }}
            />
          </>
        ))}
      </Paper>
    </Grid>
  );
};

export default ViewPosts;
