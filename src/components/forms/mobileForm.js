import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
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
  },
  form: {
    "@media screen and (max-width: 600px)":{}
  }
}));

const network = [
  {id:1,name:'MTN'},
  {id:2,name:'GLO'},
  {id:3,name:'Airtel'},
  {id:4,name:'9Mobile'},
  {id:4,name:'Smile'},
  {id:4,name:'Spectranet'},
]

export default function Form() {
  const classes = useStyles(theme);
  const [selectedNetwork, setNetwork] = useState('')
  const [amount, setAmount] = useState('')

  return (
    <Paper className={classes.paper} elevation={3}>
      <Typography variant='h4'>
        Pay Connectivity bills
      </Typography>
      <Typography variant='caption'></Typography>
      <form>
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
        </Grid>
      </form>
    </Paper>
  )
}
