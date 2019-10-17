const startApp = require('./startApp');
const { exec } = require('child_process');

startApp();

const audio = () => {
  const cmd = exec('afplay assets/audio/berlin.mp3');
  process.on('SIGINT', () => {
    console.log('hello');
    cmd.kill();
  });
};

audio();