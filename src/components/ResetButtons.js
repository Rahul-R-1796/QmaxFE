import React from 'react';
import Button from '@mui/material/Button';

function ResetButtons({ resetState, resetCount }) {
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={resetState}
        style={{ marginBottom: '16px' }}
      >
        Reset State
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={resetCount}
        style={{ marginBottom: '16px', marginLeft: '16px' }}
      >
        Reset Count
      </Button>
    </div>
  );
}

export default ResetButtons;
