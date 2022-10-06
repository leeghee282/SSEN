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
      <Typography className="jb-default-2 fc-grey main-result" id="font_test">
        <span className="main-result-keyword">"{showKeyword}"</span>
        <span className="jb-smaller"> 뉴스 정보</span>
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
                height: 'auto',
                pt: 1.3,
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
                    sx={{ ml: 2, height: '40px' }}
                  >
                    {post.title.length >= 36
                      ? post.title.replaceAll('…', ' ').substr(0, 36) + '...'
                      : post.title}
                  </Typography>
                </Grid>
                <Grid item xs={1.5} className="main-post-press">
                  <Grid container direction="column">
                    <Grid
                      sx={{ display: 'flex', justifyContent: 'flex-start' }}
                      id="font_test"
                      item
                      xs={2}
                    >
                      {post.press}
                    </Grid>
                    <Grid
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        mt: 0.5,
                      }}
                      id="font_test"
                      item
                      xs={10}
                    >
                      {post.time.slice(0, 10).replaceAll('\u0000', '')}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid sx={{ pl: 1 }} item xs={12}>
                <Typography
                  sx={{ pt: 2, pb: 2 }}
                  id="font_test"
                  className="main-post-content"
                >
                  {post.content.length >= 120
                    ? post.content.substr(0, 120) + '...'
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
