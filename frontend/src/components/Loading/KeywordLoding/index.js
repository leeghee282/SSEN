import React from 'react';
import { Avatar } from '@mui/material';
import './style.css';

const KeywordLoading = () => {
  return (
    <div className="imgbox">
      <Avatar
        variant="square"
        src="/images/keyword_loading_last.gif"
        sx={{ width: '60%', height: '60%' }}
      ></Avatar>
    </div>
  );
};

// const KeywordLoading2 = () => {
//   return (
//     <div className="imgbox">
//       <Avatar
//         variant="square"
//         src="/images/keyword_loading_last.gif"
//         sx={{ width: '100%', height: '100%' }}
//       ></Avatar>
//     </div>
//   );
// };

export default KeywordLoading;
