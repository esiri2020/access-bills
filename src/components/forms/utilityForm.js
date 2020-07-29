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
import {useTransition, useSpring, useChain, config , animated} from 'react-spring'
import Close from '../closeButton'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';

const AnimatedGrid = animated(Grid)
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '100ch',
    '@media (max-width: 600px)':{
      width: 'auto'
    }
  },
}));

const disco = [
  {id:1,name:'EKODC'},
  {id:2,name:'PHED'},
  {id:3,name:'KEDC'},
  {id:4,name:'AEDC'},
]

export default function Form(props) {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [selectedDisco, setDisco] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(true)
  const [meter, setMeter] = useState('')
  const [data, setData] = useState(null)
  const [value, setValue] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('');

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText('');
    setError(false);
  };

  useEffect(() => {
    ATApi.utilityInfo().then(response => {
      console.log(response);
      setData(response.data.products)
      setLoading(false)
    }).catch(error => console.error(error))
  },[])

  const makePayment = async (amount) => {
    const key = process.env.REACT_APP_REMITA_KEY
    const RmPaymentEngine = window.RmPaymentEngine
    var paymentEngine = RmPaymentEngine.init({
      key: key,
      customerId: "",
      firstName: "",
      lastName: "",
      email: "",
      narration: "Payment Description",
      amount: amount,
      onSuccess: (response) => {
        console.log('callback Successful Response', response);
        return ATApi.utilityTopUp({
          meter: meter,
          denomination: amount,
          product_id: selectedDisco,
          prepared: value
        }).then(response => {
          console.log(response);
        })
      },
      onError: (response) => {
        console.log('callback Error Response', response);
      },
      onClose: () => {
        console.log("closed");
      }
    });
    // console.log(paymentEngine.showPaymentWidget());
    paymentEngine.showPaymentWidget();
  }

  const submit = event => {
    event.preventDefault();
    props.close()
    makePayment(amount)
  }

  return (
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
              <FormControl component="fieldset" error={error} className={classes.formControl}>
                <FormLabel component="legend">Payment Plan</FormLabel>
                <RadioGroup aria-label="payment plan" name="prepaid" value={value} onChange={handleRadioChange}>
                  <FormControlLabel value={true} control={<Radio />} label="Prepaid" />
                  <FormControlLabel value={false} control={<Radio />} label="Postpaid" />
                </RadioGroup>
                <FormHelperText>{helperText}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth disabled={!(amount)} style={{marginTop: 8}} variant='contained' color="primary" type='submit'>BUY</Button>
            </Grid>
          </>}
        </Grid>
      </form>
    </Paper>
  )
}
