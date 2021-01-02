import React from 'react';
import { Avatar, Button, Grid, makeStyles, Typography } from '@material-ui/core';
import { push, goBack } from 'connected-react-router';
import { cloneDeep, isEmpty } from 'lodash';
import Loader from 'pages/common/Loader';
import Master from 'pages/common/Master';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getPostDetails, setPostDetails, getPosts } from 'redux/actions';
import moment from 'moment';
import CurrentPost from './components/CurrentPost';

import './App.css';

const useStyles = makeStyles(theme => (
  {
    root: {
      display: 'flex'
    },
    contents: {
      fontSize: '18px',
      fontFamily: 'Georgia, serif',
      lineHeight: '1.8em',
      color: '#171717'
    }
  }
));

const mapDispatchToProps = (dispatch) => {
  return {
    getPostDetails: (payload) => { dispatch(getPostDetails(payload)) },
    setPostDetails: (payload) => { dispatch(setPostDetails(payload)) },
    getPosts: (payload) => { dispatch(getPosts(payload)) },
    push: (url) => { dispatch(push(url)) },
    goBack: () => { dispatch(goBack()) },
  }
}

const mapStateToProps = (state) => {
  return {
    currentPost: state.common && "currentPost" in state.common ? state.common.currentPost : null,
    posts: state.common && "posts" in state.common ? state.common.posts : null
  };
}

function Component(props) {

  const classes = useStyles();

  useEffect(() => {
    let payload = {};
    const path = window.location.pathname;
    let slug = encodeURIComponent(path.split("/post/").pop());

    if (props.posts.length > 0) {
      console.log('props.posts', props.posts);
      var result = props.posts.filter(obj => {
        return obj.slug === slug
      });
      console.log('result', result);

      let existinSlug = result[0][slug];

      if (existinSlug !== slug) {
        payload = result[0];
        props.setPostDetails(payload);
      }
    }
    else {
      // if key already exists, then no need to make api call
      let existinSlug = props.currentPost.slug;

      if (existinSlug !== slug) {
        payload['slug'] = slug;
        props.getPostDetails(payload);
      }
    }

    let title = window.store.getState().common.currentPost.title;
    document.title = title;

  }, []);

  const [loading, setLoading] = useState(false);

  // Get Scroll height
  const [pos, setPos] = useState("top");
  const [articles, setMoreArticles] = useState([]);

  // useEffect(() => {
  //   console.log('custom', window.store.getState().common.pageNo);
  //   console.log('articles', articles);

  //   if(articles && articles.length > 0){
  //     let posts = window.store.getState().common.posts;
  //   let lastSlug = articles[articles.length - 1].slug;
  //   let index = posts.findIndex(x => x.slug === lastSlug);
  //   let newArticles = posts.slice(index);
  //   console.log('newArticles.length', newArticles.length);
  //   setMoreArticles(newArticles);
  //   }
  // }, [window.store.getState().common.pageNo]);

  useEffect(() => {
    document.addEventListener("scroll", e => {
      let totalBrowserHeight = document.body.offsetHeight;
      let scrollHeight = window.scrollY;
      let windowHeight = window.innerHeight;

      if (((scrollHeight + windowHeight) + 10) >= totalBrowserHeight) {
        console.log('reached end of page...');
        let urlPath = window.location.pathname;
        console.log('urlPath', urlPath);
        let existinSlug = window.store.getState().common.currentPost.slug;
        console.log('existinSlug', existinSlug);
        // setSlug(existinSlug);

        if (urlPath === '/post/' + existinSlug) {
          console.log('matches....');
          setLoading(true);
          setMoreArticles([]);
          let posts = window.store.getState().common.posts;
          let originalPostLength = posts.length;
          let index = posts.findIndex(x => x.slug === existinSlug);
          console.log('index', index);
          console.log('posts.length', posts.length);
          let moreArticles = posts.slice(index + 1);
          console.log('moreArticles.length', moreArticles.length);

          console.log('moreArticles', moreArticles);
          if (moreArticles && moreArticles.length === 0) {
            // this means we have reached the last element of our list
            let nextPage = window.store.getState().common.pageNo + 1;
            console.log('nextPage', nextPage);
            let payload = {};
            payload['pageNo'] = nextPage;
            props.getPosts(payload);

            let newPosts = window.store.getState().common.posts;
            console.log('newPosts.length', newPosts.length);
            console.log('originalPostLength', originalPostLength);
            moreArticles = newPosts.slice(originalPostLength);
            console.log('moreArticles.length', moreArticles.length);
          }
          setMoreArticles(moreArticles);
        }
      } else {
        setLoading(false);
      }
    })
  }, []);

  const redirectToHome = (event) => {
    props.goBack();
  }

  return (
    <Master>
      <div className={classes.root}>
        <Grid container className={classes.gridWrapper} spacing={4} direction="row" justify="center"
          alignItems="center">
          <Grid item xs={10}>
            <Grid container className={classes.gridWrapper} spacing={4} direction="row" justify="flex-start"
              alignItems="center">
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  variant="outlined"
                  color="secondary"
                  className={classes.button}
                  startIcon={<ArrowBackIosIcon />}
                  fullWidth
                  onClick={redirectToHome}
                >
                  Back to Posts
                  </Button>
              </Grid>
            </Grid>
          </Grid>
          {
            props.currentPost ?
              <Grid item xs={12}>
                <CurrentPost currentPost={props.currentPost} />
              </Grid> :
              <Grid item xs={12}>
                <Loader />
              </Grid>
          }
          <Grid item xs={10}>
            <Typography variant="h6" color="textSecondary" component="p" align="left">
              More Articles
          </Typography>
          </Grid>
          {
            articles && articles.length ?
              articles.map((article, index) => {
                return (
                  <Grid item xs={12} key={index}>
                    <CurrentPost currentPost={article} key={index} />
                  </Grid>
                )
              }) : <Loader />
          }
          {
            loading &&
            <Grid item xs={12}>
              <Loader />
            </Grid>
          }
        </Grid>
      </div>
    </Master>
  );
}

const App = connect(mapStateToProps, mapDispatchToProps)(Component);
export default App;