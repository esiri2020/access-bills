import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs({open, handleClose, res, type}) {
  const print = () => {
    const content = document.getElementById('content').innerHTML;
    var printWindow = window.open('', '', 'height=400,width=400');
    printWindow.document.write('<html><head><title>Print Receipt</title>');
    printWindow.document.write('</head><body >');
    printWindow.document.write(content);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  }

  const error = type.split(' ').length === 2

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="payment response" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {error ? 'An Error occurred':'Payment Successful'}
        </DialogTitle>
        <DialogContent dividers>
          <div id="content">
            {(type === 'utility') && <>
              <Typography gutterBottom>
                {res && `Reference Number: ${res.reference}`}
              </Typography>
              <Typography gutterBottom>
                {res && `Date: ${new Date(res.time).toLocaleString()}`}
              </Typography>
              <Typography gutterBottom>
                {res && `Disco: ${res.operator_name}`}
              </Typography>
              <Typography gutterBottom>
                {res && `Meter No: ${res.target}`}
              </Typography>
              <Typography gutterBottom>
                {res && `Amount: ${res.paid_currency}${res.topup_amount}`}
              </Typography>
              <Typography gutterBottom>
                {res && `PIN: ${res.pin_code}`}
              </Typography>
            </>}
            {(type === 'utility error') && <>
              <Typography gutterBottom>
                An error occurred, please contact admin.
              </Typography>
            </>}
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={print} color="primary">
            Print
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
