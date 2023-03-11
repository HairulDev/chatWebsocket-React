import React, { useState, useEffect } from "react";
import env from "../../configs/vars";
import "../../App.css";
import { Avatar, Button, Card, Chip, Container, Grid, List, ListItem, ListItemText, Paper, TextField, Typography } from "@material-ui/core";

import useStyles from './styles';
import './styles.css';
import SendIcon from '@material-ui/icons/Send';
import { useDispatch, useSelector } from "react-redux";
import { createPost, getPosts, } from '../../actions/posts';
import MoodIcon from '@material-ui/icons/Mood';

const ws = new WebSocket(`${env.reactAppWebSocketHost}/cable`);

const Home = () => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [guid, setGuid] = useState("");
  const messagesContainer = document.getElementById("messages");
  const classes = useStyles();

  const initialState = { message: '' };
  const [form, setForm] = useState(initialState);

  const { posts } = useSelector((state) => state.posts);

  const localStorageRes = JSON.parse(localStorage.getItem("profile"));

  ws.onopen = () => {
    setGuid(Math.random().toString(36).substring(2, 15));
    ws.send(
      JSON.stringify({
        command: "subscribe",
        identifier: JSON.stringify({
          id: guid,
          channel: "MessagesChannel",
        }),
      })
    );
  };


  ws.onmessage = (e) => {
    const data = JSON.parse(e.data);
    if (data.type === "ping") return;
    if (data.type === "welcome") return;
    if (data.type === "confirm_subscription") return;

    const message = data.message;
    setMessagesAndScrollDown([...messages, message]);
  };


  ws.onclose = (e) => {
    console.log("onclose from server", e);
  };
  ws.onerror = (e) => {
    console.log("onerror from server", e);
  }

  useEffect(() => {
    resetScroll();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.message.value = "";
    dispatch(createPost({ body: form.message, user_created: localStorageRes.id }));
  };

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  console.log("messages ====", messages);
  console.log("posts ====", posts);

  useEffect(() => {
    setMessagesAndScrollDown(posts)
  }, [posts]);

  const setMessagesAndScrollDown = (data) => {
    setMessages(data);
    resetScroll();
  };

  const resetScroll = () => {
    if (!messagesContainer) return
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  if (!localStorageRes)
    return (
      <Container style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <Chip
          component="a"
          href="/auth"
          size="medium"
          color="primary"
          icon={<MoodIcon />}
          variant="h5"
          label="Sign In first please"
          style={{
            textDecoration: "none", color: "white"
          }}
        />
      </Container>
    );


  return (
    <Container component="main" maxWidth="sm" >
      <Paper className={classes.paper} elevation={6}>
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
          <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Grid item xs={12} style={{ marginTop: 30 }}>
              <List className={classes.messages} id="messages">
                {messages.map((message) => (
                  <ListItem key={message.id}>
                    <Avatar style={{ marginRight: 10 }} />
                    <ListItemText className={classes.messageBody}>{message.body}</ListItemText>
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  autoFocus
                  name="message"
                  onChange={onChange}
                  variant="outlined"
                  placeholder="Send messages ?"
                  style={{
                    padding: 20,
                    minWidth: 400,
                  }}
                />
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                >
                  <SendIcon />
                </Button>
              </div>
            </Grid>
          </form>
        </Grid>
      </Paper >
    </Container >
  );
}

export default Home;
