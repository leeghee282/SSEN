import { image } from 'd3';
import React from 'react';
import { Avatar } from '@mui/material';
import './style.css';

const Loading = () => {
  return (
    <div>
      <Avatar
        variant="square"
        src="/images/loading4.gif"
        sx={{ width: '100%', height: '100%', justifyContent: 'center' }}
      ></Avatar>
    </div>
  );
};

export default Loading;
