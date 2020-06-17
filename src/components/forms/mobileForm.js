import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import ATApi from './axios.service';
import theme from '../styles/theme'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
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

const network = [
  {id:1,name:'MTN'},
  {id:2,name:'GLO'},
  {id:3,name:'Airtel'},
  {id:4,name:'9Mobile'},
  {id:5,name:'Smile'},
  {id:6,name:'Spectranet'},
]

export default function Form() {
  const classes = useStyles(theme);
  const [selectedNetwork, setNetwork] = useState('')
  const [amount, setAmount] = useState('')
  const [phoneNumber, setphoneNumber] = useState('')

  const submit = (event) => {
    event.preventDefault()
    if (phoneNumber) {
      ATApi.airtimeInfo(phoneNumber).then(response => {
        console.log(response.data);
      }).catch(error => console.log(error))
    }

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
              id="outlined-select-network"
              select
              label="Select Network"
              value={selectedNetwork}
              helperText="Please select your network service provider"
              variant="outlined"
              onChange={event => setNetwork(event.target.value)}
              InputLabelProps={{
                shrink: true,
              }}>
              {network.map((option) => (
                <MenuItem key={option.id} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              name="phoneNumber"
              id="outlined-required-phoneNumber"
              label="Phone Number"
              variant="outlined"
              value={phoneNumber}
              onChange={event => setphoneNumber(event.target.value)}
              placeholder="Enter amount you want to Purchase"
              InputLabelProps={{
                shrink: true,
              }}
            />
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
        </Grid>
      </form>
    </Paper>
  )
}
