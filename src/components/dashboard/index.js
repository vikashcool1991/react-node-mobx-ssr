import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SimpleLineChart from './SimpleLineChart';
import SimpleTable from './SimpleTable';
import { observer, inject } from 'mobx-react'
import Card from '@material-ui/core/Card';

const styles = theme => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    position:'relative',
    // padding: theme.spacing.unit * 16,
    paddingLeft: '7%',
    height: '100vh',
    overflow: 'auto',
  },
  contentShift: {
    flexGrow: 1,
    position:'relative',
    // padding: theme.spacing.unit * 16,
    paddingLeft: '19%',
    height: '100vh',
    overflow: 'auto',
    transition: theme.transitions.create('padding', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  card: {
    minWidth: '82px',
    minHeight: '82px',
    width: '163px',
    height: '163px',
    marginBottom: '30px',
    marginTop: '30Px',
    marginRight: '15px',
    marginLeft: '30px',
    background: 'yellow'
  },
  subcard: {
    minWidth: '22px',
    minHeight: '22px',
    width: '83px',
    height: '83px',
    marginTop: '-20Px',
    marginLeft: '-20px',
    position: 'absolute',
    zIndex: 2,
    background: 'grey'
  },
  shiftcard: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  statsmargin: {
    marginTop: '15px'
  },
  productsmargin: {
    marginTop: '25px'
  }
});

@inject('store')
@observer
class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.props = props;
    this.props.store.common.setHeader('Dashboard')
    this.props.store.common.setTitle('Dashboard')
  }
  
  render() {
    const {classes} = this.props;
    return (
      <main className={this.props.store.common.drawerOpen ? classes.contentShift : classes.content}>
        <div className={classes.appBarSpacer} />
        <Typography variant="display1" gutterBottom className={classes.statsmargin}>
          Statistics
        </Typography>
        <div className={classes.shiftcard}>
          <Card className={classes.card}>
            <Card className={classes.subcard}>
            
            </Card>
          </Card>
          <Card className={classes.card}>
            <Card className={classes.subcard}>
            
            </Card>
          </Card>
          <Card className={classes.card}>
            <Card className={classes.subcard}>
            
            </Card>
          </Card>
          <Card className={classes.card}>
            <Card className={classes.subcard}>
            
            </Card>
          </Card>
          <Card className={classes.card}>
            <Card className={classes.subcard}>
            
            </Card>
          </Card>
        </div>
        <Typography variant="display1" gutterBottom>
          Orders
        </Typography>
        <Typography component="div" className={classes.chartContainer}>
          <SimpleLineChart />
        </Typography>
        <Typography variant="display1" gutterBottom className={classes.productsmargin}>
          Products
        </Typography>
        <div className={classes.tableContainer}>
          <SimpleTable />
        </div>
      </main>
    );
  }
}
Dashboard.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Dashboard);