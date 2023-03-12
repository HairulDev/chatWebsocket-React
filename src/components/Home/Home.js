import React, { useState, useEffect, useRef } from "react";
import env from "../../configs/vars";
import "../../App.css";
import { Avatar, Button, Chip, Container, Grid, List, ListItem, Paper, TextField, Typography } from "@material-ui/core";

import useStyles from './styles';
import './styles.css';
import SendIcon from '@material-ui/icons/Send';
import { useDispatch, useSelector } from "react-redux";
import { createMessage, deleteMessage, fetchMessage } from '../../actions/messages';
import MoodIcon from '@material-ui/icons/Mood';

const Home = () => {
  const dispatch = useDispatch();
  const messagesContainer = useRef(null);
  const classes = useStyles();
  const [form, setForm] = useState({ message: '' });
  const [guid, setGuid] = useState("");
  const { messages } = useSelector((state) => state.messages);

  const localStorageRes = JSON.parse(localStorage.getItem("profile"));

  const ws = new WebSocket(`${env.reactAppWebSocketHost}/cable`);


  useEffect(() => {
    ws.onopen = () => {
      setGuid(Math.random().toString(36).substring(2, 15));
      ws.send(
        JSON.stringify({
          command: "subscribe",
          identifier: JSON.stringify({
            channel: "MessagesChannel",
          }),
        })
      );
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === "ping" || data.type === "welcome" || data.type === "confirm_subscription") return;

      const message = data.message;
      console.log("onmessage ========", message);
      dispatch(fetchMessage([...messages, message]));
    };

  }, [dispatch]);


  useEffect(() => {
    dispatch(fetchMessage());
  }, [dispatch]);

  console.log("messages ========", messages);


  useEffect(() => {
    if (messagesContainer.current) {
      messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.message.value = "";
    dispatch(createMessage({
      body: form.message,
      name: localStorageRes.name,
      email: localStorageRes.email,
      image: localStorageRes.image,
      user_created: localStorageRes._id.$oid
    }));
  };

  const deleteMessageAct = (id) => {

    ws.send(
      JSON.stringify({
        command: "message",
        identifier: JSON.stringify({
          channel: "MessagesChannel",
        }),
        data: JSON.stringify({
          delete_message: true,
          id: id,
        }),
      })
    );

    dispatch(deleteMessage(id));
  }

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  if (!localStorageRes)
    return (
      <Container
        style={{
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          marginTop: "30vh",
        }}
      >
        <Chip
          component="a"
          href="/auth"
          size="medium"
          color="primary"
          icon={<MoodIcon />}
          variant="h5"
          label="Choose user please"
          style={{
            color: "white", padding: 10
          }}
        />
      </Container>
    );

  return (
    <Container component="main" maxWidth="sm" >
      <Paper className={classes.paper} elevation={6}>
        <Grid container alignItems="stretch" spacing={3}>
          <Grid item xs={1} >
            <Avatar src={require(`../../assets/images/${localStorageRes.image}`)} />
          </Grid>
          <Grid item >
            <Typography variant="subtitle1" className={classes.messageName}>{localStorageRes?.name}</Typography>
          </Grid>
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <List className={classes.messages} ref={messagesContainer}>
              {messages.map((message) => (
                <ListItem key={message.id}>
                  {/* <ListItem key={message._id.$oid}> */}
                  <Grid item xs={2} className={classes.messageAvatar} >
                    <Avatar src={require(`../../assets/images/${message.image}`)} />
                  </Grid>
                  <Grid item xs={10} >
                    <Grid container direction="column">
                      <div className={classes.messageBody}>
                        <Grid item>
                          <Typography variant="subtitle1" className={classes.messageName}>{message.name}</Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle1">
                            {message.body}
                          </Typography>
                        </Grid>
                      </div>
                      <Grid item>
                        <Typography variant="caption"
                          onClick={() => deleteMessageAct(message.id)}
                        >
                          Delete
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
            <Grid item xs={12}>
              <div style={{ display: 'flex', alignItems: 'center', }}>
                <TextField
                  autoFocus
                  name="message"
                  onChange={onChange}
                  variant="outlined"
                  placeholder="Send messages ?"
                  style={{
                    padding: "5px 15px 15px 35px",
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
