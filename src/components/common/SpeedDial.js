import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import HorizontalLinearStepper from './Stepper';
import { observer, inject } from 'mobx-react'

const styles = theme => ({
  root: {
    height: '160px',
  },
  rootShift: {
    height: '220px',
  },
  speedDial: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
});

const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
  { icon: <DeleteIcon />, name: 'Delete' },
];

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

@inject('store')
@observer
class OpenIconSpeedDial extends React.Component {
  state = {
    open: false,
    dialog: false
  };

  handleClick = () => {
    this.setState(state => ({
      open: !state.open,
    }));
  };

  handleOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleClickOpenDialog = () => {
    this.setState({ dialog: true });
  };

  handleCloseDialog = () => {
    this.setState({ dialog: false });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={this.props.store.common.drawerOpen ? classes.rootShift : classes.root}>
        <SpeedDial
          ariaLabel="SpeedDial openIcon example"
          className={classes.speedDial}
          icon={<SpeedDialIcon openIcon={<EditIcon />} />}
          onBlur={this.handleClose}
          onClick={this.handleClick}
          onClose={this.handleClose}
          onFocus={this.handleOpen}
          onMouseEnter={this.handleOpen}
          onMouseLeave={this.handleClose}
          open={open}
        >
          {actions.map(action => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={this.handleClickOpenDialog}
            />
          ))}
        </SpeedDial>
        <div>
          <Dialog
            fullScreen
            open={this.state.dialog}
            onClose={this.handleCloseDialog}
            TransitionComponent={Transition}
          >
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton color="inherit" onClick={this.handleCloseDialog} aria-label="Close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="title" color="inherit" className={classes.flex}>
                  Sound
                </Typography>
                <Button color="inherit" onClick={this.handleCloseDialog}>
                  save
                </Button>
              </Toolbar>
            </AppBar>
            <HorizontalLinearStepper/>
          </Dialog>
        </div>
      </div>
    );
  }
}

OpenIconSpeedDial.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(OpenIconSpeedDial);