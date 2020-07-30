import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  closeDiv: {
    position: 'absolute',
    top: '-23px',
    right: '-23px',
  },
  closeButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '32px',
    cursor: 'pointer',
    height: '50px',
    width: '50px',
    borderRadius: '100px',
    background: '#fff',
    boxShadow: '2px 2px 11px rgba(0,0,0,.2)',
    paddingBottom: '4px'
  }
}))

export default function Close({close}) {
  const classes = useStyles();

  return (
    <div className={classes.closeDiv}>
      <button onClick={close} className={classes.closeButton}><span>x</span></button>
    </div>
  )
}
