import React from 'react';
import MySet from '../../components/MyAsset';
import Button from "@mui/material/Button";

const Profile= () => {
  return (
    <>
    <Button id="font_test"variant="contained" sx={{display: 'block', textAlign:'center', mb:2}} href='/profileupdate'>프로필 변경</Button>
    <MySet/>
    </>
  );
};

export default Profile;