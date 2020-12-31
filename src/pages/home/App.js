import { Grid, makeStyles, Typography } from '@material-ui/core';
import { push } from 'connected-react-router';
import Loader from 'pages/common/Loader';
import Master from 'pages/common/Master';
import { useEffect } from 'react';
import { connect } from 'react-redux';
// import './App.css';

import { getPosts } from 'redux/actions';

const useStyles = makeStyles(theme => (
  {
    root: {
      display: 'flex'
    },
  }
));

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: (payload) => { dispatch(getPosts(payload)) },
    push: (url) => { dispatch(push(url)) }
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.common.posts
  };
}

function Component(props) {
  const classes = useStyles();

  useEffect(() => {
    document.title = `Tech in Asia`;
    let payload = {};
    props.getPosts(payload);
  }, []);

  return (
    <Master title={"Dashboard"} >
      <div className={classes.root}>
        {/* <Box my={2}>
          {[...new Array(120)]
            .map(
              () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            )
            .join('\n')}
        </Box> */}
        {
          props.loading && <Loader />
        }
        {
          !props.loading &&
          <Grid container className={classes.gridWrapper} spacing={4} direction="row" justify="center"
            alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h3" className={classes.title}>
                No Images Found!
                            </Typography>
            </Grid>
          </Grid>
        }
      </div>
    </Master>
  );
}

const App = connect(mapStateToProps, mapDispatchToProps)(Component);
export default App;
