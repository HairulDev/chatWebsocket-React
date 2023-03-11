import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  messages: {
    height: "63vh",
    overflowY: "scroll",
    padding: "0 20px",
    width: "100%",
    marginTop: 10,
  },
  messageAvatar: {
    fontWeight: 600,
    marginRight: -15,
  },
  messageName: {
    fontWeight: 600,
  },
  messageBody: {
    padding: 4,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.default,
  },
  paper: {
    padding: theme.spacing(1),
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


