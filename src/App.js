import React from 'react';
// import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
// import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import {useTransition, animated} from 'react-spring'
import {Transition} from 'react-spring/renderprops'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CardHeader from '@material-ui/core/CardHeader';
import Link from '@material-ui/core/Link';
import Option from './components/card'
import Modal from './components/modal'
import Topbar from "./components/Topbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import TvForm from './components/forms/tvForm'
import UtilityForm from './components/forms/utilityForm'
import MobileForm from './components/forms/mobileForm'
import VisibilitySensor from './components/visibilitySensor'
// import App from './App';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © 2020 '}
      <Link color="inherit" href="https://material-ui.com/">
        AccessTech Bills
      </Link>{' '}

      {'.'}
    </Typography>
  );
}

const AnimatedGrid = animated(Grid)

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  // appBar: {
  //   borderBottom: `1px solid ${theme.palette.divider}`,
  // },
  // toolbar: {
  //   flexWrap: 'wrap',
  // },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '20rem',
    paddingTop: '10rem'

  },
  heroButtons: {
    marginTop: theme.spacing(0),


  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [
  {
    id: 1,
    title: 'Step 1',
    description: ['Select the service you would like to pay for (Disco bill, Internet data, Airtime)'],
    image: './images/image-1.png'
  },
  {
    id: 2,
    title: 'Step 2',
    description: ['Input all relevant details in the fields provided including amount to pay'],
    image: './images/image-1.png'
  },
  {
    id: 3,
    title: 'Step 3',
    description: ['Make payment online through our payment partner and recieve value.'],
    image: './images/image-1.png'
  },

];

const services = [
  {
    id:1,
    title: 'Connection Bills',
    subtitle: 'Buy credit and data',
    image: './images/bank.svg'
  },
  {
    id:2,
    title: 'TV Bills',
    subtitle: "Renew your cable & satellite television subscriptions",
    image: './images/tv.svg'
  },
  {
    id:3,
    title: 'Utility Bills',
    subtitle: 'Pay electric and other utility bills ',
    image: './images/fire.svg'
  },
]

export default function Album() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState(1)
  let serviceRef = React.useRef();
  const forms = [<MobileForm/>,<TvForm/>,<UtilityForm/>]

  const handleOpen = (n) => {
    setForm(n);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const transitions = useTransition(services, item => item.id, {
    from: { transform: 'translate3d(0,-40px,0)' },
    enter: { transform: 'translate3d(0,0px,0)' },
    leave: { transform: 'translate3d(0,-40px,0)' },
  })

  const scrollTo = (ref) => {
  if (ref /* + other conditions */) {
    // ref.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.scrollTo({ behavior: 'smooth', block: 'start', top: ref.current.offsetTop })
  }
}

  return (
    <React.Fragment>
      <CssBaseline />
      <Topbar />
      {/* <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
        Access Tech Bills
          </Typography>
          <nav>
        <Link variant="button" color="textPrimary" href="#" className={classes.link}>
        Home
        </Link>
        <Link variant="button" color="textPrimary" href="#" className={classes.link}>
        How it works
        </Link>
        <Link variant="button" color="textPrimary" href="#" className={classes.link}>
        Self Support
        </Link>
          </nav>

        </Toolbar>
      </AppBar> */}
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="lg" height="5rem">
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center" >

                <Grid item>
                  <Button  variant="contained" color="primary" onClick={() => scrollTo(serviceRef)}>
                    select a service to pay for
                  </Button>
                </Grid>
                <Grid item>

                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Paper>
            <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom>
              How It Works
            </Typography>
            <Typography variant="body1" align="center" color="textSecondary" paragraph>
              Paying for any service online should be easy, convenient and secure.
              we have curated a 3 step way for you to quickly top up your airtime,
              renew your dstv subscriptions, renew your data access across several ISPs and also pay for your light.
            </Typography>

            <Grid container spacing={4}>
              {cards.map((card) => (
                <Grid item key={card.id} xs={12} sm={6} md={4} style={{ padding: '16px 16px 0 16px' }}>
                  <Card className={classes.card}>
                    <CardHeader
                      title={card.title}

                      titleTypographyProps={{ align: 'center' }}
                      subheaderTypographyProps={{ align: 'center' }}

                      className={classes.cardHeader}
                    />
                    <CardMedia
                      className={classes.cardMedia}
                      image={card.image}
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      {card.description}
                    </CardContent>

                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
          <Paper ref={serviceRef} style={{marginTop:'2em'}}>
            <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom>
              Select A Service
            </Typography>
            <Grid container spacing={4}>
              {/* {transitions.map(({ item, props, key }) =>
                  <AnimatedGrid item xs={12} sm={4} key={key} style={props}>
                <Option
                  item={item}
                  handleOpen={handleOpen}
                />
              </AnimatedGrid>)} */}
              <VisibilitySensor >
                {({ isVisible }) => (
                  <Transition
                    items={services} keys={item => item.id}
                    from={{ opacity: 0, transform: 'translate3d(0,-40px,0)' }}
                    enter={{ opacity: 1, transform: 'translate3d(0,0px,0)' }}
                    leave={{ opacity: 1, transform: 'translate3d(0,-40px,0)' }}>
                    {item => props =>
                      <AnimatedGrid item xs={12} sm={4} key={item.id} style={props}>
                        <Option
                          item={item}
                          handleOpen={handleOpen}
                        />
                      </AnimatedGrid>
                    }
                  </Transition>
                )}
              </VisibilitySensor>
            </Grid>
          </Paper>
        </Container>
        <Modal
          open={open}
          handleClose={handleClose}
        >{forms[form]}</Modal>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>

        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">

        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
