import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import Loading from '../components/common/Loading'
// import Error from '../components/common/Error'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});
@inject('store')
@inject('state')
@observer
class Login extends React.Component {
  constructor(props){
    super(props);
    this.props = props;
    this.props.store.common.setTitle('Login')
  }

  static contextTypes = {
    router: PropTypes.any
  }

  state = {
    username: '',
    password: '',
    loading: false,
    error: null
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLogin = (e) => {
    e.preventDefault()
    const { store } = this.props
    const { router } = this.context
    const { username, password } = this.state
    
    this.setState({
      error: null,
      loading: true
    })

    store.account.login({ username, password });
  }

  render() {
    const { loading, error, username } = this.state
    const { classes, store, state } = this.props;
    const { router } = this.context
    if(store.account.isLoggedIn){
      router.history.push('/dashboard')
    }

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography variant="headline">Sign in</Typography>
            <form className={classes.form} onSubmit={this.handleLogin}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username">Email Address</InputLabel>
                <Input id="username" type="text" name="username" autoComplete="username" onChange={this.handleChange} value={username} autoFocus />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  onChange={this.handleChange}
                  autoComplete="current-password"
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="raised"
                color="primary"
                className={classes.submit}>
                  Sign in
              </Button>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(Login);
