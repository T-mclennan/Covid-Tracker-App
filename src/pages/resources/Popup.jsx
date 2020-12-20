import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
import Zoom from '@material-ui/core/Zoom';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  popup: {
    color: 'white',
    backgroundColor: 'rgba(128, 0, 128, 0.9)',
  },
}));

export default function CustomizedSnackbars() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const zoom = (props) => {
    return <Zoom  {...props} in={open} style={{ transitionDelay: '500ms'}}/>
  }

  function Alert(props) {
    return <MuiAlert elevation={6} in={open} variant="filled" className={classes.popup} {...props} />;
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
        <Snackbar 
          open={open} 
          autoHideDuration={6000} 
          onClose={handleClose}  
          TransitionComponent={zoom}  
          anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}   
          mountOnEnter 
          unmountOnExit  
        >
          <Alert onClose={handleClose} severity="warning">
            <div style={{width: '100%'}}>
              If you are experiencing any Covid-19 symptoms, please schedule a test immediately!
            </div>
          </Alert>
        </Snackbar>
    </div>
  );
}
