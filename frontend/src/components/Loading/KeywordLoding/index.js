import React from 'react';
import { Avatar } from '@mui/material';

const KeywordLoading = () => {
  return (
    <div>
      <Avatar
        variant="square"
        src="/images/keyword_loading_last.gif"
        sx={{ width: '60%', height: '60%' }}
      ></Avatar>
    </div>
  );
};

export default KeywordLoading;
