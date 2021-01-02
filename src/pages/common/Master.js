import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { Card, CardMedia, useScrollTrigger, Zoom } from '@material-ui/core';

import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { theme } from 'pages/common/theme';
import { connect } from 'react-redux';
import { createRef } from 'react';

// company images
const tiaLogo = process.env.PUBLIC_URL + "/tia-logo.png";
// const tiaLogoSmall = process.env.PUBLIC_URL + "/tia-logo-small.png";

const mapStateToProps = (state) => {
    return {};
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        padding: '0px',
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto'
    },
    container: {
        marginTop: theme.spacing(7),
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    faTitleIcon: {
        width: '2em !important',
        height: '1.6em',
        marginRight: '5px'
    },
    cardRoot: {
        maxWidth: 200,
        [theme.breakpoints.down('sm')]: {
            // maxWidth: 50,
        },
    },
    appBar: {
        borderBottom: '1px solid #C01820'
    },
    buttonFroup: {
        paddingLeft: "20px"
    },
    footer: {
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(2)
    }
}));

function ElevationScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 10 : 0,
    });
}

const ScrollTop = React.forwardRef((props, ref) => {
    const { children, window } = props;
    const classes = useStyles();

    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');
        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <Zoom in={trigger} ref={ref}>
            <div onClick={handleClick} role="presentation" className={classes.footer}>
                {children}
            </div>
        </Zoom>
    );
});


function MasterLayout(props) {
    const classes = useStyles();
    const ref = createRef();

    React.useEffect(() => {
        document.title = `Tech in Asia - Connecting Asia's startup ecosystem`;
    }, []);

    const redirectHome = (event) => {
        window.location.href = '/';
    };

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <CssBaseline />
                <ElevationScroll {...props}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            {/* Tech in Asia Logo */}
                            <Card className={classes.cardRoot} elevation={0} onClick={redirectHome}>
                                <CardMedia
                                    image={tiaLogo}
                                    component="img"
                                    title="TIA Logo"
                                />
                            </Card>
                        </Toolbar>
                    </AppBar>
                </ElevationScroll>
                <div id="back-to-top-anchor" className={classes.appBarSpacer} />
                <Container {...props.container && props.container} maxWidth="xl" className={classes.container}>
                    {props.children}
                </Container>
                <ScrollTop {...props} ref={ref}>
                    <Fab color="secondary" size="small" aria-label="scroll back to top">
                        <KeyboardArrowUpIcon />
                    </Fab>
                </ScrollTop>
            </div>
        </ThemeProvider>
    );
}
const Master = connect(mapStateToProps, null)(MasterLayout);
export default Master;