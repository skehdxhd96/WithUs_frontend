import React, {useState, Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  axios.defaults.withCredentials = true;
  const header = {
      "Content-Type": "application/json"
  }
  const classes = useStyles();

  const [User_id, setUser_id] = useState("");
  const [User_password, setUser_password] = useState("");

  const onIdHandler = (event) => {

    setUser_id(event.currentTarget.value);
  }

  const onPasswordHandler = (event) => {

    setUser_password(event.currentTarget.value);
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    var body = {
      User_id : User_id,
      User_password : User_password
    }

    axios.post('http://localhost:3001/passport/', body, {header})
    .then(response => {
      if(response.data.loginSuccess) {
        alert("Hello! " + response.data.User_id);
        console.log(response.data.user);
        props.history.push('/');
      } else{
        alert("login failed");
      }
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmitHandler}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="User_id"
            label="User_id"
            name="User_id"
            autoComplete="User_id"
            autoFocus
            value = {User_id}
            onChange = {onIdHandler}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="User_password"
            label="User_password"
            type="password"
            id="User_password"
            autoComplete="current-password"
            value = {User_password}
            onChange = {onPasswordHandler}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="SignUp" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}