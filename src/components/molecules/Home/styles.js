import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },


  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  messages: {
    height: "63vh",
    overflowY: "scroll",
    padding: "0 10px",
    width: "93%",
    marginTop: 10,
  },
  messageEditButton: {
    textAlign: 'right',
    marginTop: 20,
  },
  messageEditAvatar: {
    fontWeight: 600,
    marginRight: -15,
    marginTop: 12,
  },
  messageAvatar: {
    fontWeight: 600,
    marginRight: -15,
    marginBottom: 25,
  },
  messageName: {
    fontWeight: 600,
    marginLeft: 7,
  },
  messageBody: {
    padding: 2,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.default,
  },
  paper: {
    padding: theme.spacing(1),
  },
  messageText: {
    marginLeft: 7,
  },
  featureAct: {
    marginLeft: 11,
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  buttonSubmit: {
    marginBottom: 10,
  },
}));


