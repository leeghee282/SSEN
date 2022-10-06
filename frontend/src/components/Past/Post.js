import React from 'react';
import PostLoading from '../Loading/PostLoading';
import { Typography, Box, Link, Grid, Container } from '@mui/material';
import './style.css';

const Posts = ({ posts, loading, showKeyword }) => {
  if (loading) {
    return <PostLoading />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: '30px',
        
        
      }}
    >
      <Typography className="jb-default-2 fc-grey past-result" id="font_test" >
        {/* <span >"<span className="search-keyword">{search}</span>"</span> */}
        <span className="past-result-keyword">"{showKeyword}"</span>
        <span className="jb-smaller">뉴스 정보</span>
      </Typography>

      {posts.map((post, index) => (

<Grid sx={{display:"flex",justifyContent:"center"}}item xs={12} >
  <Link
    key={index}
    href={post.url}
    target="_blank"
    sx={{ textDecoration: 'none', color: 'black' }}
  >
    <Box
      sx={{
        height: 'auto',
        width: '800px',
        pt: 1,
        '&:hover': {
          background: '#DEE0E4',
        },
      }}
      className="card"
    >
      <Grid sx={{ borderBottom: '1px dashed black' }} container>
        <Grid item xs={10.5}>
          <Typography
            id="font_test"
            // fontSize="30px"
            className="main-post-title"
            sx={{ ml: 2, height: '50px' }}
          >
            {post.title.length >= 30
              ? post.title.length.replaceAll('…', ' ').substr(0, 30) +
              '...'
              : post.title}
          </Typography>
        </Grid>
        <Grid item xs={1.5} className="main-post-press">
          <Grid container direction="column">
            <Grid id="font_test" item xs={2}>
              {post.press}
            </Grid>
            <Grid id="font_test" sx={{ mt: 1 }} item xs={10}>
              {post.time.slice(0, 10).replaceAll('\u0000', '')}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid sx={{ pl: 1 }} item xs={11.8}>
        <Typography sx={{ pt: 2, pb: 2}} id="font_test" className="main-post-content">
          {post.content.length >= 130
            ? post.content.substr(0, 130) + '...'
            : post.content}
        </Typography>
      </Grid>
    </Box>
  </Link>
</Grid>

))}
    </Box>
  );
};

export default Posts;
