import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Avatar, Button, Grid, Link } from '@material-ui/core';
import { useEffect } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { push, goBack } from 'connected-react-router';
import moment from 'moment';

const useStyles = makeStyles({
    root: {
        margin: '10px'
    },
    media: {
        width: '100%',
        height: 150
    },
    gridText: {
        padding: '10px'
    },
});

const mapDispatchToProps = (dispatch) => {
    return {
      push: (url) => { dispatch(push(url)) },
    //   goBack: () => { dispatch(goBack()) },
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
        <React.Fragment>
            <Grid container className={classes.gridWrapper} spacing={4} direction="row" justify="center"
            alignItems="center">
            <Grid item xs={10}>
              <Grid container className={classes.gridWrapper} spacing={4} direction="row" justify="center" alignItems="center">
                <Grid item xs={9} sm={6} md={9}>
                  {
                    'author' in props.currentPost && props.currentPost.author &&
                    <React.Fragment>
                      <Grid container className={classes.gridWrapper} spacing={4} direction="row" justify="center" alignItems="center">
                        <Grid item xs={6} sm={2} md={1}>
                          <Avatar alt="Remy Sharp" src={props.currentPost.author.avatar_url} />
                        </Grid>
                        <Grid item xs={6} sm={10} md={11}>
                          <Typography variant="caption" color="textSecondary" component="p" align="left">
                            {props.currentPost.author.display_name}
                            &nbsp;&middot;&nbsp;{moment(props.currentPost.author.date_gmt).format("DD MMM YYYY")}
                            &nbsp;&middot;&nbsp;{props.currentPost.read_time} min read
                          </Typography>
                        </Grid>
                      </Grid>
                    </React.Fragment>
                  }
                </Grid>
                <Grid item xs={12} sm={6} md={3}></Grid>
              </Grid>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="h4" component="h2">{props.currentPost.title}</Typography>
              <div className={classes.contents} dangerouslySetInnerHTML={{ __html: props.currentPost.content }} />
            </Grid>
          </Grid>
        </React.Fragment>
    );
}

const App = connect(mapStateToProps, mapDispatchToProps)(Component);
export default App;