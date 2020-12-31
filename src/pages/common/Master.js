import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { Card, CardMedia, useScrollTrigger } from '@material-ui/core';

import Container from '@material-ui/core/Container';

import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { theme } from 'pages/common/theme';
import { connect } from 'react-redux';

// import Header from './Navigation';

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
        overflow: 'auto',
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
    buttonFroup :{
        paddingLeft: "20px"
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
        elevation: trigger ? 4 : 0,
    });
}

function MasterLayout(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    React.useEffect(() => {
        document.title = `Tech in Asia`;
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <CssBaseline />
                <ElevationScroll {...props}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            {/* Tech in Asia Logo */}
                            <Card className={classes.cardRoot} elevation={0}>
                                <CardMedia
                                    image={tiaLogo}
                                    component="img"
                                    title="TIA Logo"
                                />
                            </Card>
                            {/* <Header/> */}
                        </Toolbar>
                    </AppBar>
                </ElevationScroll>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container {...props.container && props.container} maxWidth="xl" className={classes.container}>
                        {props.children}
                    </Container>
                </main>
            </div>
        </ThemeProvider>
    );
}

const Master = connect(mapStateToProps, null)(MasterLayout);
export default Master;