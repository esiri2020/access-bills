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

const tv = [
  {id:1,name:'DSTV'},
  {id:2,name:'GoTV'},
  {id:3,name:'StarTimes'},
  {id:4,name:'MetroDigital'},
]

export default function Form() {
  const classes = useStyles(theme);
  const [selectedTv, setTV] = useState('')

  return (
    <Paper className={classes.paper} elevation={3}>
      <Typography variant='h4'>
        Pay TV bills
      </Typography>
      <Typography variant='caption'></Typography>
      <form>
        <Grid container spacing={2}>
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
              {tv.map((option) => (
                <MenuItem key={option.id} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
}
