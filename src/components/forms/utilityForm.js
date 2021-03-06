import React, {useState, useEffect} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import ATApi from './axios.service';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
// import {useTransition, useSpring, useChain, config , animated} from 'react-spring'
import Close from '../closeButton'
import {makePayment} from './remita'

// const res = {
//     "status": 201,
//     "message": "Operation Successful, Recharge created, Reference : 394c86e0-d1af-11ea-bc61-67ae0cf09d72",
//     "reference": "394c86e0-d1af-11ea-bc61-67ae0cf09d72",
//     "code": "RECHARGE_COMPLETE",
//     "paid_amount": 497.475,
//     "paid_currency": "NGN",
//     "topup_amount": 500,
//     "topup_currency": "NGN",
//     "target": "54181237451",
//     "product_id": "BPE-NGIE-OR",
//     "time": "2020-07-29T15:22:03.581Z",
//     "country": "Nigeria",
//     "operator_name": "Ikeja Electric",
//     "completed_in": 14450,
//     "customer_reference": null,
//     "pin_based": true,
//     "pin_code": "5745-0465-0610-4542-8157",
//     "pin_option1": "5745-0465-0610-4542-8157"
// }

// const AnimatedGrid = animated(Grid)
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '100ch',
    '@media (max-width: 600px)':{
      maxWidth: '95vw'
    }
  },
}));

export default function Form(props) {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [selectedDisco, setDisco] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(true)
  const [meter, setMeter] = useState('')
  const [data, setData] = useState(null)

  useEffect(() => {
    ATApi.utilityInfo().then(response => {
      setData(response.data.products)
      setLoading(false)
    }).catch(error => console.error(error))
  },[])

  const successFunc = (response) => {
    console.log('callback Successful Response', response);
    return ATApi.utilityTopUp({
      meter: meter,
      denomination: amount,
      product_id: selectedDisco,
      prepaid: true
    }).then(response => {
      console.log(response)
      setTimeout(()=>{
        props.open(response.data, 'utility')
      }, 1000)
    }).catch(error => {
      setTimeout(()=>{
        props.open(error, 'utility error')
      }, 1000)
    })
  }

  const errorFunc = (response) => {
    console.log('callback Error Response', response);
  }

  const submit = event => {
    event.preventDefault();
    props.close()
    // setTimeout(()=>{
    //   props.open(res, 'utility')
    // }, 1000)
    makePayment(amount, successFunc, errorFunc)
  }

  return (
    <>
      <Paper className={classes.paper} elevation={3}>
        <Close close={props.close}/>
        <Typography variant='h4'>
          Pay Utility bills
        </Typography>
        <Typography variant='caption'></Typography>
        <form onSubmit={submit}>
          <Grid container spacing={2} justify={!loading? 'flex-start' : 'center'}>
            {loading ? <CircularProgress style={{marginTop: theme.spacing(4)}}/> :
            <><Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-select-utility"
                select
                label="Select Electricity disco"
                value={selectedDisco}
                helperText="Please select your electricity distribution company"
                variant="outlined"
                onChange={event => setDisco(event.target.value)}>
                {data && data.map((option) => (
                  <MenuItem key={option.product_id} value={option.product_id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  disabled={!(selectedDisco)}
                  name="meter"
                  id="outlined-required-meter"
                  type="number"
                  label="Meter Number"
                  variant="outlined"
                  value={meter}
                  onChange={event => setMeter(event.target.value)}
                  placeholder="Enter your meter number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  required
                  disabled={!(selectedDisco)}
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
                      max: 50000, min: 1000, step: 100,
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth disabled={!(amount)} style={{marginTop: 8}} variant='contained' color="primary" type='submit'>BUY</Button>
              </Grid>
            </>}
          </Grid>
        </form>
      </Paper>
    </>
  )
}
