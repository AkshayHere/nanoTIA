import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Avatar, Grid, Link } from '@material-ui/core';
import { useEffect } from 'react';
import { useState } from 'react';
import Loader from 'pages/common/Loader';
import { push } from 'connected-react-router';
import moment from 'moment';

const useStyles = makeStyles({
    root: {
        // maxWidth: 350,
        // width: '80%'
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

export default function Post(props) {
    const classes = useStyles();

    const handleClick = (event) => {
        let slug = props.post.slug;
        // window.location.href = '/post/' + slug;
        window.store.dispatch(push('/post/' + slug));
    };

    const [image, setImage] = useState("");

    useEffect(() => {
        if ('post' in props && props.post) {
            if ('featured_image' in props.post) {
                let sizes = props.post.featured_image.attachment_meta.sizes;
                if ('medium' in sizes) {
                    let source = sizes.medium.url;
                    setImage(source);
                } else {
                    let originalSource = props.post.featured_image.source;
                    setImage(originalSource);
                }
            }
        }
    }, []);

    return (
        <React.Fragment>
            <Card className={classes.root} elevation={1}>
                <CardActionArea onClick={handleClick}>
                    <Grid container className={classes.root} spacing={2}>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            {image ?
                                <CardMedia
                                    className={classes.media}
                                    image={image}
                                    title={props.post.title}
                                    alt={props.post.title}
                                /> : <Loader />}
                        </Grid>
                        <Grid item xs={12} sm={6} md={8} lg={8}>
                            <Grid container className={classes.gridText} spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h5" component="h2">
                                        {props.post.title}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {props.post.excerpt}
                                    </Typography>
                                </Grid>
                                {
                                    'author' in props.post && props.post.author &&
                                    <React.Fragment>
                                        <Grid item xs={12} sm={2} md={1}>
                                            <Avatar alt="Remy Sharp" src={props.post.author.avatar_url} />
                                        </Grid>
                                        <Grid item xs={12} sm={10} md={11}>
                                            <Typography variant="caption" color="textSecondary" component="p" align="left">
                                                {props.post.author.display_name}
                                                &nbsp;&middot;&nbsp;{moment(props.post.author.date_gmt).format("DD MMM YYYY")}
                                                &nbsp;&middot;&nbsp;{props.post.read_time} min read
                                            </Typography>
                                        </Grid>
                                    </React.Fragment>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </CardActionArea>
            </Card>
        </React.Fragment>
    );
}