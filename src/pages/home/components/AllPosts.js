import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import { getPosts } from 'redux/actions';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { useEffect } from 'react';

import Post from './Post';
import Loader from 'pages/common/Loader';

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
        posts: state.common && "posts" in state.common ? state.common.posts : null,
        pageNo: state.common && "pageNo" in state.common ? state.common.pageNo : 1,
    };
}

function Component(props) {
    const classes = useStyles();

    useEffect(() => {
        let payload = {};
        props.getPosts(payload);
    }, []);

    // Get Scroll height
    const [pos, setPos] = useState("top");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.addEventListener("scroll", e => {
            let totalBrowserHeight = document.body.offsetHeight;
            let scrollHeight = window.scrollY;
            let windowHeight = window.innerHeight;

            if (((scrollHeight + windowHeight) + 5) >= totalBrowserHeight) {
                console.log('reached end of page...');
                let urlPath = window.location.pathname;
                console.log('urlPath', urlPath);
                if ('common' in window.store.getState() && 'pageNo' in window.store.getState().common) {
                    if (urlPath === '/') {
                        let nextPage = window.store.getState().common.pageNo + 1;
                        console.log('nextPage', nextPage);
                        let payload = {};
                        payload['pageNo'] = nextPage;
                        props.getPosts(payload);
                        setLoading(true);
                    }
                }
            } else {
                setLoading(false);
            }
        })
    }, []);

    return (
        <React.Fragment>
            <Grid container className={classes.root} spacing={2} direction="row" justify="center"
          alignItems="center">
                {
                    props.posts && props.posts.length ?
                        props.posts.map((post, index) => {
                            return (
                                <Grid item xs={12} sm={12} lg={10} key={index}>
                                    <Post key={index} post={post} />
                                </Grid>
                            )
                        }) : <div><Loader /></div>
                }
                {
                    loading &&
                    <Grid item xs={12}>
                        <Loader />
                    </Grid>
                }
            </Grid>
        </React.Fragment>
    );
}

const AllPosts = connect(mapStateToProps, mapDispatchToProps)(Component);
export default AllPosts;