import React, { useState, useEffect, useRef } from "react";
import env from "../../configs/vars";
import "../../App.css";
import { Avatar, Button, Chip, Container, Grid, List, ListItem, Paper, TextField, Typography } from "@material-ui/core";

import useStyles from './styles';
import './styles.css';
import SendIcon from '@material-ui/icons/Send';
import { useDispatch, useSelector } from "react-redux";
import { createMessage, fetchMessage } from '../../actions/messages';
import MoodIcon from '@material-ui/icons/Mood';

const Home = () => {
  const dispatch = useDispatch();
  const messagesContainer = useRef(null);
  const classes = useStyles();
  const [form, setForm] = useState({ message: '' });

  const { messages } = useSelector((state) => state.messages);

  const localStorageRes = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {

    const ws = new WebSocket(`${env.reactAppWebSocketHost}/cable`);
    let guid;

    ws.onopen = () => {
      guid = Math.random().toString(36).substring(2, 15);
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
      if (data.type === "ping" || data.type === "welcome" || data.type === "confirm_subscription") return;

      const message = data.message;
      dispatch(fetchMessage([...messages, message]));
    };

    return () => {
      ws.close();
    };
  }, [dispatch, messages]);

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
    dispatch(createMessage({ body: form.message, user_created: localStorageRes.id }));
  };

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
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
          <Grid item xs={1} >
            <Avatar src={`${env.urlBucket}/${localStorageRes?.image}`} />
          </Grid>
          <Grid item >
            <Typography variant="subtitle1" className={classes.messageName}>{localStorageRes?.name}</Typography>
          </Grid>
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <List className={classes.messages} ref={messagesContainer}>
              {messages.map((message) => (
                <ListItem key={message.id}>
                  <Grid item xs={2} className={classes.messageAvatar} >
                    <Avatar src={`${env.urlBucket}/${message?.user?.image}`} />
                  </Grid>
                  <Grid item xs={10}>
                    <Grid container direction="column" className={classes.messageBody}>
                      <Grid item>
                        <Typography variant="subtitle1" className={classes.messageName}>{message?.user?.name}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1">
                          {message.body}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>


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
