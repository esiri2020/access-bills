import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import theme from '../styles/theme'
import ATApi from './axios.service';
import Close from '../closeButton'
import CircularProgress from '@material-ui/core/CircularProgress';
import {useTransition, config , animated} from 'react-spring'
import {makePayment} from './remita'

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


export default function Form(props) {
  const classes = useStyles(theme);
  const [selectedTv, setTV] = useState('')
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [userData, setUd] = useState(null)
  const [number, setN] = useState('')
  const [fields, setFields] = useState([]);
  const [newPackage, selectNewPackage] = useState("")

  const VerifyButton = {
    id:3,
    xs:6,
    Field: ({verify}) => {
      return (
        <Button fullWidth variant='outlined' onClick={verify}>
          Verify
        </Button>
      )
    }
  }

  const User = {
    id:6,
    xs:12,
    Field: ({userData}) => {
    return (
      <>
        <Typography gutterBottom variant='body1'>{`${userData.first_name} ${userData.last_name}`}</Typography>
        <Typography gutterBottom variant='body1'>{`Package: ${userData.primary_product_name}`}</Typography>
        <Typography gutterBottom variant='body1'>{`Package: ${userData.primary_product_price}`}</Typography>
      </>
    )
  }}

  const RenewButton = {
    id:7,
    xs:6,
    Field: ({renew}) => {
      return (
        <Button fullWidth variant='outlined' onClick={renew}>
          Renew subscription
        </Button>
      )
    }
  }

  const ChoosePackage = {
    id: 8,
    xs: 12,
    Field: ({userData, newPackage, selectNewPackage}) => {
      let array = userData.upgrades
      return (
        <TextField
          fullWidth
          required
          select
          name="selectPackage"
          id="outlined-required-selectPackage"
          label="Select New Dstv Package"
          variant="outlined"
          value={newPackage}
          onChange={event => selectNewPackage(event.target.value)}
          placeholder="Select New Dstv Package"
          InputLabelProps={{
            shrink: true,
          }}>
          {array.map((item) => (
            <MenuItem key={item.product_id} value={item.product_id}>
              <div style={{display:'flex',justifyContent:'space-between',width:'100%'}}>
                <div>{item.description}</div><div>{`₦${item.topup_value}`}</div>
              </div>

            </MenuItem>
          ))}
        </TextField>
        )
    }
  }

  const UpgradeButton = {
    id:9,
    xs:6,
    Field: ({upgrade}) => {
      return (
        <Button fullWidth variant='outlined' onClick={upgrade}>
          Upgrade subscription
        </Button>
      )
    }
  }

  const verify = () => {
    if (number) {
      setLoading(true)
      ATApi.smartCardInfo(number).then(res => {
        setUd(res.data)
        if (fields.filter(field => field.id === 6).length === 0) {
          const nfields = [...fields]
          nfields.push(User, RenewButton, ChoosePackage)
          setFields(nfields)
          setLoading(false)
        }
      }).catch(err => {
        console.error(err)
        setLoading(false)
        alert('Invalid smart card number')
      })

    }
  }

  const upgrade = () => {
    const data = {product_id: newPackage}
    const successFunc = (response) => {
      ATApi.newDstvPackage(number, data).then(res => {
        console.log(res.data)
        alert("Payment successful!")
      }).catch(err => {
        console.error(err)
        alert(err.message)
      })
    }

    const errorFunc = (error) => {
      alert(error.message)
    }

    if (userData) {
      const [selected] = userData.upgrades.filter(item => item.product_id === newPackage)
      makePayment(selected.topup_value, successFunc, errorFunc)
      props.close()
    }
  }

  const renew = () => {
    const successFunc = (response) => {
      ATApi.renewDstv(number).then(res => {
        console.log(res.data)
        alert("Payment successful!")
      }).catch(err => {
        console.error(err)
        alert(err.message)
      })
    }

    const errorFunc = (error) => {
      alert(error.message)
    }

    if (userData) {
      makePayment(userData.primary_product_price, successFunc, errorFunc)
      props.close()
    }
  }

  const formProps = { verify, userData, renew, upgrade, newPackage, selectNewPackage }

  useEffect(() => {
    ATApi.tvInfo().then(response => {
      setData(response.data.products)
      setLoading(false)
    }).catch(error => console.error(error))
  }, [])

  useEffect(() => {
    if (number && (fields.filter(field => field.id === 3).length === 0)) {
      setFields([VerifyButton])
    }
  }, [number, fields, VerifyButton])

  useEffect(() => {
    if (newPackage && (fields.filter(field => field.id === 9).length === 0)) {
      const nFields = [...fields, UpgradeButton]
      setFields(nFields)
    }
  }, [newPackage, fields, UpgradeButton])

  // const transRef = useRef()
  const transitions = useTransition(fields, item => item.id, {
    config: config.stiff,
    // ref: transRef,
    unique: true,
    trail: 0,
    reset: true,
    from: { opacity: 0, transform: 'scale(0)', position: "absolute" },
    enter: { opacity: 1, transform: 'scale(1)', position: "relative" },
    leave: { opacity: 0, transform: 'scale(0)', position: "absolute"}
  })

  return (
    <Paper className={classes.paper} elevation={3}>
      <Close close={props.close}/>
      <Typography variant='h4'>
        Pay TV bills
      </Typography>
      <Typography variant='caption'></Typography>
      <form>
        <Grid container spacing={2} justify={!loading? 'flex-start' : 'center'} style={{marginTop: theme.spacing(2)}}>
          {loading ? <CircularProgress style={{marginTop: theme.spacing(4)}}/> : <>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-select-currency"
                select
                label="Select Tv service"
                value={selectedTv}
                helperText="Please select your cable service provider"
                variant="outlined"
                onChange={event => setTV(event.target.value)}>
                {data.map((option) => (
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
                name="number"
                id="outlined-required-number"
                type="number"
                label="smartcard Number"
                variant="outlined"
                value={number}
                onChange={event => setN(event.target.value)}
                placeholder="Enter your smart card number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            {(fields.length > 0) && transitions.map(({ item, key, props }) => (
              <AnimatedGrid key={item.id} style={{...props}} item xs={item.xs}>
                {item.Field(formProps)}
              </AnimatedGrid>
            ))}

          </>}
        </Grid>
      </form>
    </Paper>
  )
}
