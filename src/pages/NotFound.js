import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: '10%'
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

@observer
class NotFound extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.center}>
        <Paper className={classes.root} elevation={1}>
          <Typography variant="headline" component="h3">
            Page not found. Are you lost ?
          </Typography>
          <Typography component="p">
            <Link to="/">Main menu</Link>
          </Typography>
        </Paper>
      </div>
    );
  }
}

NotFound.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotFound);