import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import {useTransition, animated} from 'react-spring'
import Typography from '@material-ui/core/Typography';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Option, {CustomCard}from './components/card'
import Modal from './components/modal'
import Topbar from "./components/Topbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import TvForm from './components/forms/tvForm'
import UtilityForm from './components/forms/utilityForm'
import MobileForm from './components/forms/nmf'
import InternetForm from './components/forms/internet'
import ExamForm from './components/forms/exam'
import theme from './components/styles/theme'
import Dialog from './components/responseDialog';

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
    // backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    // backgroundColor:
    //   theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    // backgroundSize: 'cover',
    // backgroundPosition: 'center',
    height: '100%',
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  },
  image: {
    backgroundImage: 'url(./images/unifying-the-vs-eco-system.svg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    width: 300,
    height: 300,
    marginBottom: '20px',
    [theme.breakpoints.down('sm')]: {
      // display: 'none'
      position: 'absolute',
      zIndex: '-1',
      width: '90vw',
      height: '60vh',
      top: '1vh'
    }

  },
  action: {
    [theme.breakpoints.down('sm')]:{
      marginTop: '12em'
    }
  },
  heroButtons: {
    marginTop: theme.spacing(0),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardGrid: {
    // paddingTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    overflowX: 'hidden',
    paddingBottom: theme.spacing(8),
    fontFamily: `${theme.typography.fontFamily} !important`
  },
  cardsGrid: {
    alignItems: 'stretch',
    alignSelf: 'flex-end'
  },
  paperGrid: {
    height: '85vh',
    width: '100vw',
    marginBottom:'2em',
    '@media (max-width: 600px)':{
      height: 'auto'
    }
  },
  paperGridx: {
    height: '100%',
    width: '100vw',
    marginBottom:'2em',
    '@media (max-width: 600px)':{
      height: 'auto'
    }
  },
  paper: {
    borderRadius: 16,
    height: '100%',
    width: '100%',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
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
  body: {
    fontFamily: theme.typography.fontFamily
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
    subtitle: ['Select the service you would like to pay for (electricity bill, Internet data, Airtime)'],
    image: './images/select a service step 1.svg'
  },
  {
    id: 2,
    title: 'Step 2',
    subtitle: ['Input all relevant details in the fields provided including amount to pay'],
    image: './images/input all fields step 2.svg'
  },
  {
    id: 3,
    title: 'Step 3',
    subtitle: ['Make your payment online and recieve value instantly.'],
    image: './images/pay step 3.svg'
  },

];

const services = [
  {
    id:1,
    title: 'Airtime and Data',
    subtitle: 'Purchase your airtime and data',
    image: './images/step-1.svg'
  },
  {
    id:2,
    title: 'TV',
    subtitle: "Renew your cable & satellite television subscriptions",
    image: './images/step-2_3.png'
  },
  {
    id:3,
    title: 'Electricity',
    subtitle: 'Pay electric and other utility bills ',
    image: './images/step-3_1.png'
  },
  {
    id:4,
    title: 'Internet',
    subtitle: 'Purchase data on your internet ISP provider',
    image: './images/internet.png'
  },
  {
    id:5,
    title: 'Exam',
    subtitle: 'Pay for exams registration ',
    image: './images/exam.png'
  },
]

const cardstyles = {
  margin: '2em 0', width: '100%'
}

export default function App() {
  const classes = useStyles(theme);
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState(1)
  const [openRes, _setOpenRes] = React.useState(false)
  const [response, setRes] = React.useState(null)
  const [type, setType] = React.useState('')
  const serviceRef = React.useRef();
  const cardRef = React.useRef();

  const handleResClose = () => {
    _setOpenRes(false);
  };

  const setOpenRes = (res, t) => {
    setType(t)
    setRes(res)
    _setOpenRes(true)
  }

  const handleOpen = (n) => {
    setForm(n);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const forms = [
    <MobileForm close={handleClose}/>,<TvForm close={handleClose}/>,<UtilityForm open={setOpenRes} close={handleClose}/>,
    <InternetForm close={handleClose}/>, <ExamForm close={handleClose}/>
  ]

  const transitions = useTransition(services, item => item.id, {
    from: { transform: 'translate3d(0,-40px,0)' },
    enter: { transform: 'translate3d(0,0px,0)' },
    leave: { transform: 'translate3d(0,-40px,0)' },
  })

  const scrollTo = (ref) => {
  if (ref /* + other conditions */) {
    // ref.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.scrollTo({ behavior: 'smooth', block: 'start', top: ref.current.offsetTop - 65 })
    }
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container className={classes.cardGrid} maxWidth="lg">
          <Topbar to={cardRef} handle={scrollTo}/>
        </Container>
        <main>
          <Container className={classes.cardGrid} maxWidth="lg">
            {/* Hero unit */}
            <Grid className={classes.paperGrid} container spacing={2} justify="center" style={{margin: '60px -20px 24px -20px', height: '90vh'}}>
              <div className={classes.heroContent}>
                <Container maxWidth="lg" height="5rem">
                  <Grid container spacing={2} justify="center" >
                  </Grid>
                  <div className={classes.heroButtons}>
                    <Grid container spacing={2} justify="center" >
                      <Grid item  xs={12} sm={6} className={classes.action}>
                        <Typography component="h4" style= {{    fontWeight: '500', color: '#203f52', fontFamily: 'Rubik',}} variant="h4" align="left" gutterBottom>
                          Unifying the VAS ecosystem
                        </Typography>
                        <Typography variant="body1" align="left" style= {{    fontSize: '12px', fontWeight: '500', color: '#203f52', fontFamily: 'Rubik',}}  paragraph>
                          AccessTech is a VAS Oriented company located in Lagos-Nigeria, servicing clients across Nigeria and the world.
                        </Typography>
                        <Button  variant="contained" style={{backgroundColor:"#24b47e", color: '#fff'}} onClick={() => scrollTo(serviceRef)}>
                          select a service to pay for
                        </Button>
                      </Grid>
                      <Grid  xs={null} sm={6} item className={classes.image} />
                    </Grid>
                  </div>
                </Container>
              </div>
            </Grid>
            {/* End hero unit */}
            <Grid className={classes.paperGrid} ref={cardRef} container spacing={2}  justify="center" style={cardstyles}>
              <Container maxWidth='md'>
                <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom style= {{   fontWeight: '500', color: '#203f52', fontFamily: 'Rubik',}}>
                  How It Works
                </Typography>
                <Typography variant="body1" align="center" color="textSecondary" paragraph>
                Paying for any services online should be easy, convenient and secure. we have curated a 3-step way for you to quickly top up your airtime, renew your cable subscriptions, renew your data access across several ISPs and also pay for your electricity.
                </Typography>
              </Container>
              <Grid container spacing={4} className={classes.cardsGrid} style={{margin: 0, width: '100%'}}>
                {cards.map((card) => (
                  <Grid item key={card.id} xs={12} sm={4} md={4} style={{ padding: '16px 16px 0 16px' }}>
                    <CustomCard item={card}/>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid className={classes.paperGridx} ref={serviceRef} container spacing={2} justify="center" style={cardstyles}>
              <Typography component="h4" variant="h4" align="center" color="textPrimary"  gutterBottom style= {{marginTop:'100px',  fontWeight: '500', color: '#203f52', fontFamily: 'Rubik',}}>
                Select A Service
              </Typography>
              <Grid container spacing={4} className={classes.cardsGrid} style={{margin: 0, width: '100%'}}>
                {transitions.map(({ item, props, key }) =>
                  <AnimatedGrid item xs={12} sm={4} key={key} style={props}>
                    <Option
                      item={item}
                      handleOpen={handleOpen}
                    />
                  </AnimatedGrid>)}
              </Grid>
            </Grid>
          </Container>
          <Modal
            open={open}
            handleClose={handleClose}
          >{forms[form]}</Modal>
          <Dialog open={openRes} handleClose={handleResClose} res={response} type={type}/>

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
      </ThemeProvider>
    </React.Fragment>
  );
}
