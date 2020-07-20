import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import {useTransition, animated} from 'react-spring'
import ATApi from './axios.service';
import theme from '../styles/theme'

const AnimatedGrid = animated(Grid)
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '100ch',
    '@media (max-width: 600px)':{
      width: 'auto'
    }
  },
  form: {
    marginTop: theme.spacing(2),
    // "@media screen and (max-width: 600px)":{}
  }
}));

export default function Form() {
  const classes = useStyles(theme);
  const [data, setData] = useState({})
  const [amount, setAmount] = useState('')
  const [phoneNumber, _setphoneNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const transitions = useTransition(loaded, null, {
    from: { opacity: 0, transform: 'translate3d(0,40px,0)' },
    enter: { opacity: 1, transform: 'translate3d(0,0px,0)' },
    leave: { opacity: 0, transform: 'translate3d(0,40px,0)' },
  })

  const setphoneNumber = (event) => {
    _setphoneNumber(event.target.value);
    if (event.target.value.length === 13 && event.target.value.startsWith('234')) {
      setLoading(true)
      ATApi.airtimeInfo(event.target.value).then(response => {
        console.log(response.data);
        setData(response.data)
        setLoading(false)
        setLoaded(true)
      }).catch(error => {
        console.log(error)
        setLoading(false)
      })
    } else {
      setLoaded(false)
    }
  }

  const submit = (event) => {
    event.preventDefault()

  }

  return (
    <Paper className={classes.paper} elevation={3}>
      <Typography variant='h4'>
        Pay Connectivity bills
      </Typography>
      <Typography variant='caption'></Typography>
      <form className={classes.form} validate='true' onSubmit={submit}>
        <Grid container spacing={2}>

          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              name="phoneNumber"
              id="outlined-required-phoneNumber"
              label="Phone Number"
              variant="outlined"
              value={phoneNumber}
              onChange={event => setphoneNumber(event)}
              placeholder="Enter your phone number"
              helperText="Must be in this format 2348012345678"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: loading && <InputAdornment position="end"><CircularProgress size={24}/></InputAdornment>,
              }}
            />

          </Grid>

          {transitions.map(({ item, key, props }) =>
            item && <AnimatedGrid key={key} style={{...props, margin: 0, width: '100%'}} container spacing={2}>
              <Grid item xs={12}>
                <Typography variant='caption'>Network: {` ${data.opts.operator}`}</Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  required
                  name="amount"
                  id="outlined-required-amount"
                  type="number"
                  label="Amount"
                  variant="outlined"
                  value={amount}
                  onChange={event => setAmount(event.target.value)}
                  placeholder="Enter amount you want to Purchase"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    inputProps: {
                      max: 10000, min: 100
                    }
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Button fullWidth variant='contained' type='submit'>Submit</Button>
              </Grid>
            </AnimatedGrid>
          )}
        </Grid>
      </form>
    </Paper>
  )
}
