import * as React from 'react';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const SuccessPage = () => {
  return (
    <Paper>
      <Typography style={{fontSize: 30,fontWeight: 400}}>
        Your registration was successful
      </Typography>
      <Typography>
        Message with instruction was sent on your email.
      </Typography>
    </Paper>
  )
};

export default SuccessPage;
