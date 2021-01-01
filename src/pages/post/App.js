// import logo from './logo.svg';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { push } from 'connected-react-router';
import { cloneDeep, isEmpty } from 'lodash';
import Loader from 'pages/common/Loader';
import Master from 'pages/common/Master';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getPostDetails, setPostDetails } from 'redux/actions';
import { useCookies } from 'react-cookie';

import './App.css';

const useStyles = makeStyles(theme => (
  {
    root: {
      display: 'flex'
    },
    contents: {
      fontSize: '18px',
      fontFamily:'Georgia, serif',
      lineHeight: '1.8em',
      color: '#171717'
    }
  }
));

const mapDispatchToProps = (dispatch) => {
  return {
    getPostDetails: (payload) => { dispatch(getPostDetails(payload)) },
    setPostDetails: (payload) => { dispatch(setPostDetails(payload)) },
    push: (url) => { dispatch(push(url)) }
  }
}

const mapStateToProps = (state) => {
  return {
    currentPost: state.common && "currentPost" in state.common ? state.common.currentPost : null
  };
}

const componentCookieName = 'postCookie';

function Component(props) {

  const classes = useStyles();
  const [searchCookie, setCookie] = useCookies();
  const [cookie, setCookieVal] = useState(false);

  useEffect(() => {
    document.title = `Tech in Asia - Post`;
    let payload = {};        
        const path = window.location.pathname;
        let slug = encodeURIComponent(path.split("/post/").pop());

        // if key already exists, then no need to make api call
        let existinSlug = props.currentPost.slug;
        console.log('searchCookie', searchCookie);

        if(existinSlug !== slug){
          payload['slug'] = slug;
          props.getPostDetails(payload);
        }
  }, []);

  return (
    <Master>
      <div className={classes.root}>
        {
          !props.currentPost && <Loader />
        }
        {
          props.currentPost &&
          <Grid container className={classes.gridWrapper} spacing={4} direction="row" justify="center"
            alignItems="center">
            <Grid item xs={10}>
              <Typography variant="h4" component="h2">{props.currentPost.title}</Typography>
              <div className={classes.contents} dangerouslySetInnerHTML={{__html: props.currentPost.content}} />
            </Grid>              
          </Grid>
        }
      </div>
    </Master>
  );
}

const App = connect(mapStateToProps, mapDispatchToProps)(Component);
export default App;