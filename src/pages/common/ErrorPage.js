import { Grid, makeStyles, Typography } from '@material-ui/core';
import { push } from 'connected-react-router';
import Master from 'pages/common/Master';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => (
  {
    root: {
      display: 'flex'
    },
    gridWrapper: {
    }
  }
));

const mapDispatchToProps = (dispatch) => {
  return {
    push: (url) => { dispatch(push(url)) }
  }
}

const mapStateToProps = (state) => {
  return {
  };
}

function Component(props) {
  const classes = useStyles();

  useEffect(() => {
    
  }, []);

  return (
    <Master>
      <div className={classes.root}>
          <Grid container className={classes.gridWrapper} spacing={4} direction="row" justify="center"
            alignItems="center">
            <Grid item xs={12}>
            <Typography variant="h5" component="h5"></Typography>
            </Grid>
          </Grid>
      </div>
    </Master>
  );
}

const ErrorPage = connect(mapStateToProps, mapDispatchToProps)(Component);
export default ErrorPage;
