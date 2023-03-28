import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Avatar, Button, Card, Chip, Container, Grid, List, ListItem, Paper, TextField, Typography } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import MoodIcon from '@material-ui/icons/Mood';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


import useStyles from './styles';
import './styles.css';
import "../../../App.css";
import env from "../../../configs/vars";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { createMessage, deleteMessage, fetchMessages, fetchMessage, updateMessage } from '../../../actions/messages';

const Home = () => {
  const dispatch = useDispatch();
  const messagesContainer = useRef(null);
  const classes = useStyles();

  const initialsState = {
    id: "",
    body: "",
    created_at: "",
    email: "",
    id: "",
    image: "",
    name: "",
    updated_at: "",
    user_created: ""
  }
  const { messages, messageBy } = useSelector((state) => state.messages);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialsState);
  const localStorageRes = JSON.parse(localStorage.getItem("profile"));

  const ws = new WebSocket(`${env.reactAppWebSocketHost}/cable`);

  useEffect(() => {
    ws.onopen = () => {
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
      dispatch(fetchMessages([...messages, message]));
    };
  }, [dispatch]);


  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.body.value = "";
    if (!form.id) {
      dispatch(createMessage({
        body: form.body,
        name: localStorageRes.name,
        email: localStorageRes.email,
        image: localStorageRes.image,
        user_created: localStorageRes.id
      }));
      setForm(initialsState)
    } else {
      dispatch(updateMessage(form.id, {
        body: form.body,
        name: localStorageRes.name,
        email: localStorageRes.email,
        image: localStorageRes.image,
        user_created: localStorageRes.id
      }));
      setForm(initialsState)
      handleClose();
    }
  };

  const updateMessageAct = (id) => {
    dispatch(fetchMessage(id));
    setOpen(true);
  }

  const deleteMessageAct = (id) => {
    confirmAlert({
      message: "Delete this message?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(deleteMessage(id));
          },
        },
        {
          label: "No",
          onClick: () => console.log("user tidak setuju"),
        },
      ],
      overlayClassName: "react-confirm-alert-overlay"
    });
  }

  useEffect(() => {
    setForm(messageBy);
  }, [messageBy])


  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (messagesContainer.current)
      messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight;
  }, [messages]);


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
            <Avatar src={require(`../../../assets/images/${localStorageRes.image}`)} />
          </Grid>
          <Grid item >
            <Typography variant="subtitle1" className={classes.messageName}>{localStorageRes?.name}</Typography>
          </Grid>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <List className={classes.messages} ref={messagesContainer}>
              {messages.map((message) => (
                <ListItem>
                  <Grid item xs={2} className={classes.messageAvatar} >
                    <Avatar src={require(`../../../assets/images/${message.image}`)} />
                  </Grid>
                  <Grid item xs={10} >
                    <Grid container direction="column">

                      <Grid container className={classes.messageBody}>
                        <Grid item xs={9}>
                          <Typography variant="subtitle1" className={classes.messageName}>{message.name}</Typography>
                        </Grid>
                        <Grid item xs={3} style={{ textAlign: 'right' }}>
                          {localStorageRes && localStorageRes.id && localStorageRes.id === parseInt(message?.user_created) && (
                            <Button style={{ color: 'black' }} size="small"
                              onClick={() => updateMessageAct(message.id)}
                            >
                              <MoreHorizIcon fontSize="default" />
                            </Button>
                          )}
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="subtitle1" className={classes.messageText}>{message.body}</Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs={2}>
                        {localStorageRes && localStorageRes.id && localStorageRes.id === parseInt(message?.user_created) && (
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            className={classes.featureAct}
                            onClick={() => deleteMessageAct(message.id)}
                          > Delete </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
            <Grid item xs={12}>
              <div style={{ display: 'flex', alignItems: 'center', }}>
                <TextField
                  onChange={onChange}
                  name="body"
                  required
                  variant="outlined"
                  placeholder="Send messages ?"
                  autoFocus
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

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Card className={classes.paper}>
            <form autoComplete="off" onSubmit={handleSubmit}>

              <Grid container alignItems="stretch">
                <Grid item xs={2} className={classes.messageEditAvatar} >
                  <Avatar src={require(`../../../assets/images/${localStorageRes.image}`)} />
                </Grid>
                <Grid item xs={10} >
                  <Grid container direction="column">
                    <Grid container className={classes.messageBody}>
                      <Grid item xs={9}>
                        <Typography variant="subtitle1" className={classes.messageName}>{localStorageRes.name}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          InputProps={{ inputProps: { style: { borderBottom: 'none' } } }}
                          className={classes.messageText}
                          onChange={onChange}
                          value={form.body}
                          name="body"
                          placeholder="Send messages ?"
                          autoFocus
                          style={{
                            minWidth: 300,
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={12} className={classes.messageEditButton}>
                      <Button
                        type="submit"
                        variant="outlined"
                        color="primary"
                      >
                        <SendIcon />
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

            </form>

          </Card>
        </Fade>
      </Modal>
    </Container >


  );
}

export default Home;
