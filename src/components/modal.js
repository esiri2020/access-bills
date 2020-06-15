import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import theme from './styles/theme'

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

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
    to: { opacity: open ? 1 : 0, transform: open ? 'translate3d(0,0px,0)': 'translate3d(0,40px,0)' },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

const tv = [
  {id:1,name:'DSTV'},
  {id:2,name:'GoTV'},
  {id:3,name:'StarTimes'},
  {id:4,name:'MetroDigital'},
]

const Form = () => {
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

export default function SpringModal(props) {
  const classes = useStyles(theme);
  const {open, handleClose} = props;
  console.log(open);

  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={() => handleClose()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Form/>
        </Fade>
      </Modal>
    </div>
  );
}
