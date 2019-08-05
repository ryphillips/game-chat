import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
//import PacManAnimation from '../../assets/Pacman.svg';
import { Typography, CircularProgress } from '@material-ui/core';

const LoadingIndicator = (props) => (
  <div style={{ flexGrow: 1 }}>
    <LinearProgress color="primary" />
    <div
      style={{
        position: "absolute",
        margin: "auto",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        height: 400,
        width: 400,
      }}>
      <Typography align="center" component="h1" variant="h3">
        Loading...
      </Typography>
      {/*< img src={PacManAnimation} alt='pacman' />*/}
      <CircularProgress style={{marginLeft: 130, marginTop: 100}} size={100} color="primary" />
    </div>
  </div>
);


export default LoadingIndicator;