import React from 'react';
import PostLoading from '../Loading/PostLoading';
import { Typography, Box, Link, Grid, Container } from '@mui/material';
import './style.css';

const Posts = ({ posts, loading, showKeyword }) => {
  if (loading) {
    return <PostLoading />;
  }
  console.log(posts, 123123);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: '30px'
      }}
    >
      <Typography
        fontSize="28px"
        fontWeight="600"
        marginTop="20px"
        marginBottom="6px"
        color={'#333333'}
      >
        "{showKeyword}" 뉴스 정보
      </Typography>

      {posts.map((post, index) => (

        <Grid item xs={12}>
          <Link
            key={index}
            href={post.url}
            target="_blank"
            sx={{ textDecoration: 'none', color: 'black' }}
          >
            <Box
              sx={{
                height: '120px',
                pt: 1,
                '&:hover': {
                  background: '#DEE0E4',
                },
              }}
              className="card"
            >
              <Grid sx={{ borderBottom: '1px dashed black' }} container>
                <Grid item xs={10}>
                  <Typography
                    id="font_test"
                    // fontSize="30px"
                    className="main-post-title"
                    sx={{ ml: 2, height: '40px' }}
                  >
                    {post.title.length >= 1
                      ? post.title.replaceAll('…', ' ').substr(0, 36) +
                      '...'
                      : post.title}
                  </Typography>
                </Grid>
                <Grid item xs={2} className="main-post-press">
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
                <Typography sx={{ pt: 2 }} id="font_test" className="main-post-content">
                  {post.content.length >= 110
                    ? post.content.substr(0, 110) + '...'
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
