import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import { getPosts } from 'redux/actions';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { useEffect } from 'react';

import Post from './Post';

const useStyles = makeStyles({
    root: {},
});

const mapDispatchToProps = (dispatch) => {
    return {
        getPosts: (payload) => { dispatch(getPosts(payload)) },
        push: (url) => { dispatch(push(url)) }
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.common && "posts" in state.common ? state.common.posts : null
    };
}

function Component(props) {
    const classes = useStyles();

    useEffect(() => {
        document.title = `Tech in Asia - Home`;
        let payload = {};
        props.getPosts(payload); 
    }, []);

    return (
        <React.Fragment>
            <Grid container className={classes.root} spacing={2}>
                {
                    props.posts && props.posts.length ?
                        props.posts.map((post, index) => {
                            return (
                                <Grid item xs={12} sm={12} lg={10} key={index}>
                                    <Post key={index} post={post} />
                                </Grid>

                            )
                        }) : <div>Loading posts...</div>
                }
            </Grid>
        </React.Fragment>
    );
}

const AllPosts = connect(mapStateToProps, mapDispatchToProps)(Component);
export default AllPosts;