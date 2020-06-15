import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CardHeader from '@material-ui/core/CardHeader';
import Link from '@material-ui/core/Link';
import Option from './components/card'
import Modal from './components/modal'

// import App from './App';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
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

export default function Album() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <CssBaseline />
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
                  <Button  variant="contained" color="primary">
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
              <Grid item key={card.id} xs={12} sm={6} md={4}>
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
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <Option/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Option
                handleOpen={handleOpen}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Option/>
            </Grid>
          </Grid>
        </Container>
        <Modal
          open={open}
          handleClose={handleClose}
        />
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
