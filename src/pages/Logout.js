import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
    marginLeft: '50%'
  },
});

@inject('store')
@observer
class Logout extends React.Component {
  constructor(props){
    super(props);
    document.title = 'Log Out'
  }

  static contextTypes = {
    router: PropTypes.any
  }

  state = {
    open: true,
    loading: false
  }

  handleLogout = () => {
    const { store } = this.props
    const { router } = this.context
    this.setState({loading: true});
    new Promise(resolve => setTimeout(resolve, 0))
      .then(() => store.account.logout())
      .then(() => router.history.push('/'))
  }

  handleClose = () => {
    this.setState({ open: false });
    this.context.router.history.goBack();
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
        <DialogTitle id="alert-dialog-slide-title">
            {"Do you want to log out ?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              This will disconnect you and you will have to login again next time.
            </DialogContentText>
            { this.state.loading ? <CircularProgress className={this.props.classes.progress} /> : null }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleLogout} color="primary">
              Log Out
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

Logout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Logout);