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
}));

const disco = [
  {id:1,name:'EKODC'},
  {id:2,name:'PHED'},
  {id:3,name:'KEDC'},
  {id:4,name:'AEDC'},
]

export default function Form() {
  const classes = useStyles(theme);
  const [selectedDisco, setDisco] = useState('')
  const [amount, setAmount] = useState('')

  return (
    <Paper className={classes.paper} elevation={3}>
      <Typography variant='h4'>
        Pay Utility bills
      </Typography>
      <Typography variant='caption'></Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="outlined-select-utility"
              select
              label="Select Electricity disco"
              value={selectedDisco}
              helperText="Please select your electricity distribution company"
              variant="outlined"
              onChange={event => setDisco(event.target.value)}>
              {disco.map((option) => (
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
