import React, {useState, useRef, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from '@material-ui/core/InputAdornment';
import {useTransition, useSpring, useChain, config , animated} from 'react-spring'
import ATApi from './axios.service';
import MuiPhoneNumber from 'material-ui-phone-number'
import theme from '../styles/theme'
import Close from '../closeButton'
import {makePayment} from './remita'

const AnimatedGrid = animated(Grid)
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '100ch',
    '@media (max-width: 600px)':{
      maxWidth: '90vw'
    }
  },
  container: {
    position: 'relative',
    cursor: 'pointer',
    boxShadow: '0px 10px 10px -5px rgba(0, 0, 0, 0.05)',
    willChange: 'width, height',
  },
  form: {
      marginTop: theme.spacing(2),
    // "@media screen and (max-width: 600px)":{}
  },
  formGrid:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function Form(props) {
  const classes = useStyles(theme);
  const [data, setData] = useState({})
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('')
  const [open, setOpen] = useState(false)
  const [phoneNumber, _setphoneNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [validity, _setValidity] = useState('')
  const [dataAmount, setdataAmount] = useState('')
  const [fields, setFields] = useState([]);
  const [dataId, setDataId] = useState('');

  const setphoneNumber = fields => event => {
    _setphoneNumber(event);
    if (event.length === 14 && event.startsWith('+234')) {
      setLoading(true)
      const number = event.slice(1)
      if (type === 'Airtime'){
      ATApi.airtimeInfo(number).then(response => {
        setData(response.data)
        setLoading(false)
        if (fields.filter(field => field.id === 6).length === 0){
          const nFields = [...fields]
          nFields.splice(1, 0, Carrier, AmountField)
          setFields(nFields)
        }
      }).catch(error => {
        console.log(error)
        setLoading(false)
      })
      }
      else if (type === 'Data') {
        ATApi.dataInfo(number).then(response => {
          setData(response.data)
          setLoading(false)
          if (fields.filter(field => field.id === 6).length === 0){
            const nFields = [...fields]
            nFields.splice(1, 0, Carrier, ValidityField)
            setFields(nFields)
          }
        }).catch(error => {
          console.log(error)
          setLoading(false)
        })
      }
    } else {
      // setLoaded(false)
    }
  }
  const setValidity = value => {
    setDataId('')
    _setValidity(value)
  }

  const _setDataAmount = value => {
    setDataId(value)
    const [selected_package] = data.products.filter(item => item.product_id === value)
    setdataAmount(selected_package.face_value)
  }

  const NumberField = {
    id: 1,
    xs: 12,
    Field: ({phoneNumber, setphoneNumber, loading, fields}) => {
      return (
        <MuiPhoneNumber
          defaultCountry={'ng'}
          fullWidth
          required
          name="phoneNumber"
          id="outlined-required-phoneNumber"
          label="Phone Number"
          variant="outlined"
          value={phoneNumber}
          onChange={setphoneNumber(fields)}
          placeholder="Enter your phone number"
          helperText="Must be in this format 2348012345678"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            endAdornment: loading && <InputAdornment position="end"><CircularProgress size={24}/></InputAdornment>,
          }}/>
        )
      }
    }

  const AmountField = {
    id: 2,
    xs: 12,
    Field: ({amount, setAmount}) => {
      return (
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
          }}/>
        )
      }
    }

  const BackButton = {
    id:3,
    xs:6,
    Field: () => {
      return (
        <Button fullWidth variant='outlined' onClick={closeForm}>
          Back
        </Button>
      )
    }
  }

  const AirtimeButton = {
    id:4,
    xs:6,
    Field: () => {
      return (
        <Button fullWidth variant="outlined" onClick={() => openForm('Airtime')}>
          Airtime
        </Button>
      )
    }
  }

  const DataButton = {
    id:5,
    xs:6,
    Field: () => {
      return (
        <Button fullWidth variant="outlined" onClick={() => openForm('Data')}>
          Data
        </Button>
      )
    }
  }

  const Carrier = {
    id:6,
    xs:12,
    Field: ({data}) => {
    return (
      <Typography style={{float: 'left', fontSize: '1.2em'}} variant='caption'>Network: {` ${data.opts.operator}`}</Typography>
    )
  }}

  const SubmitButton = {
    id: 7,
    xs: 6,
    Field: () => {
      return(
        <Button fullWidth variant='contained' type='submit'>BUY</Button>
      )
    }
  }

  const ValidityField = {
    id: 8,
    xs: 6,
    Field: ({validity, setValidity, data}) => {
      let period = [...new Set(data.products.map(a => a.validity))]
      return (
        <TextField
          fullWidth
          required
          select
          name="validity"
          id="outlined-required-validity"
          label="Validity Period"
          variant="outlined"
          value={validity}
          onChange={event => setValidity(event.target.value)}
          placeholder="Select Validity Period"
          InputLabelProps={{
            shrink: true,
          }}>
          {period.map((period) => (
            <MenuItem key={period} value={period}>
              {period}
            </MenuItem>
          ))}
          </TextField>
        )
      }
    }

  const DataVolume = {
    id: 9,
    xs: 6,
    Field: ({data, validity, dataAmount, setdataAmount, dataId}) => {
      let array = data.products.filter(a => a.validity === validity)
      return (
        <TextField
          fullWidth
          required
          select
          name="dataAmount"
          id="outlined-required-dataAmount"
          label="Select Data Bundle"
          variant="outlined"
          value={dataId}
          onChange={event => setdataAmount(event.target.value)}
          placeholder="Select Data Bundle"
          InputLabelProps={{
            shrink: true,
          }}>
          {array.map((item) => (
            <MenuItem key={item.product_id} value={item.product_id}>
              <div style={{display:'flex',justifyContent:'space-between',width:'100%'}}>
                <div>{item.product_id.split('-')[3]}</div><div>{`₦${item.face_value}`}</div>
              </div>

            </MenuItem>
          ))}
        </TextField>
        )
    }
  }

  useEffect(() => {
    if (validity && (fields.filter(field => field.id === 9).length === 0)){
      const nFields = [...fields]
      nFields.splice(3, 0, DataVolume)
      setFields(nFields)
    }
  },[fields, validity, DataVolume])

  useEffect(() => {
    if(dataAmount && (fields.filter(field => field.id === 7).length === 0)) {
      const nFields = [...fields]
      nFields.push(SubmitButton)
      setFields(nFields)
    }
  }, [dataAmount, fields, SubmitButton])

  useEffect(() => {
    if(amount && (fields.filter(field => field.id === 7).length === 0)) {
      const nFields = [...fields]
      nFields.splice(4, 0, SubmitButton)
      setFields(nFields)
    }
  }, [amount, fields, SubmitButton])

  const springRef = useRef()
  const { size, opacity, ...rest } = useSpring({
    ref: springRef,
    config: config.stiff,
    from: { size: '50%', },
    to: { size: open ? '100%' : '50%'}
  })

  const transRef = useRef()
  const transitions = useTransition(open ? fields : [ AirtimeButton, DataButton ], item => item.id, {
    ref: transRef,
    unique: true,
    trail: 0,
    reset: true,
    from: { opacity: 0, transform: 'scale(0)', position: "absolute" },
    enter: { opacity: 1, transform: 'scale(1)', position: "relative" },
    leave: { opacity: 0, transform: 'scale(0)', position: "absolute"}
  })

  const openForm = type => {
    _setphoneNumber('')
    setType(type)
    setFields([NumberField, BackButton])
    setOpen(true)
  }

  const closeForm = () => {
    setType('')
    setFields([])
    setOpen(false)
  }

  const formProps = {
    phoneNumber: phoneNumber,
    setphoneNumber: setphoneNumber,
    loading: loading,
    data: data,
    fields: fields,
    amount: amount,
    setAmount: setAmount,
    validity: validity,
    setValidity: setValidity,
    dataAmount: dataAmount,
    setdataAmount: _setDataAmount,
    dataId: dataId
  }

  const airtimeSuccessFunc = response => {
    const postData = {
      product_id: data.products[0].product_id,
      denomination : amount,
      send_sms : false,
      sms_text : "",
      awuf4u: true
    }
    ATApi.airtimeTopup(phoneNumber.slice(1), postData).then(res => {
      alert("Purchase successful!")
      console.log(res.data);
    }).catch(err => {
      alert('Something went wrong, please contact admin')
      console.error(err);
    })
  }
  const dataSuccessFunc = response => {
    const postData = {
      product_id: dataId,
      denomination : dataAmount,
      send_sms : false,
      sms_text : "",
      customer_reference : "xxx193"
    }
    ATApi.dataTopup(phoneNumber.slice(1), postData).then(res => {
      alert("Purchase successful!")
      console.log(res.data);
    }).catch(err => {
      alert('Something went wrong, please contact admin')
      console.error(err);
    })
  }
  const errorFunc = (error) => {
    alert(error.message)
  }

  const submit = (event) => {
    event.preventDefault()
    props.close()
    if (type === 'Airtime') {
      makePayment(amount, airtimeSuccessFunc, errorFunc)
    } else {
      makePayment(dataAmount, dataSuccessFunc, errorFunc)
    }
  }

  useChain(open ? [springRef, transRef] : [transRef, springRef], [0, open ? 0.1 : 0.2])

  return (
    <Paper className={classes.paper} elevation={3}>
      <Close close={props.close}/>
      <Typography variant='h4'>
        {type ? `Buy ${type}` : 'Airtime and Data'}
      </Typography>
      <Typography variant='caption'></Typography>
      <form className={classes.form} validate='true' onSubmit={submit}>
        <Grid container className={classes.formGrid}>
          <AnimatedGrid className={classes.container} style={{ ...rest, width: size, height: size, textAlign: 'center' }} container spacing={2} >

            {transitions.map(({ item, key, props }) => (
              <AnimatedGrid key={item.id} style={{...props}} item xs={item.xs}>
                {item.Field(formProps)}
              </AnimatedGrid>
            ))}
          </AnimatedGrid>

        </Grid>
      </form>
    </Paper>
  )
}
