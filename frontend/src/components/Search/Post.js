import React from 'react';
import { Typography, Grid, Box, Link } from '@mui/material';
import './style.css';

const Posts = ({ posts, search }) => {
  return (
    <div>
      <p className="jb-default-2 fc-grey search-result" id="font_test">
        {/* <span >"<span className="search-keyword">{search}</span>"</span> */}
        <span className="search-keyword">"{search}"</span>
        <span className="jb-smaller">(으)로 검색한 결과</span>
      </p>
      {/* <Typography
        sx={{
          mt: 4,
          mb: 3,
          display: 'flex',
          justifyContent: 'center',
          fontSize: '35px',
          fontWeight: 600,
        }}
      >
        "{search}"으로 검색한 결과
      </Typography> */}

      {/* <Typography sx={{ ml: 3 }} id="font_test">
          페이지 당 표시할 게시물 수 : &nbsp;
          <select
            id="font_test"
            type="number"
            
            onChange={({ target: { value } }) => setLimit(Number(value))}
          >
            <option value="5">5</option>
            <option value="12">12</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </Typography> */}

      <main>
        <ul>
          {posts.map((post, index) => (
            <li>
              <Grid key={index} container>
                <Grid item xs={12}>
                  <Link
                    href={post.url}
                    target="_blank"
                    sx={{ textDecoration: 'none', color: 'black' }}
                  >
                    <Box
                      sx={{
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
                            fontSize="30px"
                            className="search-title"
                            sx={{ ml: 2, height: '60px' }}
                          >
                            {post.title.length >= 1
                              ? post.title.replaceAll('…', ' ').substr(0, 30) +
                              '...'
                              : post.title}
                          </Typography>
                        </Grid>
                        <Grid item xs={2} className="search-press">
                          <Grid container direction="column">
                            <Grid id="font_test" item xs={2}>
                              {post.press}
                            </Grid>
                            <Grid id="font_test" sx={{ mt: 1 }} item xs={10}>
                              {post.time.replaceAll('\u0000', '')}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid sx={{ pl: 1 }} item xs={11.8}>
                        <Typography sx={{ pt: 2 }} id="font_test" className="search-content">
                          {post.content.length >= 170
                            ? post.content.substr(0, 170) + '...'
                            : post.content}
                        </Typography>
                      </Grid>
                    </Box>
                  </Link>
                </Grid>
              </Grid>
            </li>
          ))}
        </ul>
      </main>
      <br></br>
    </div>
  );
};

export default Posts;
