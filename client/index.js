const startApp = require('./startApp');
const { exec } = require('child_process');

startApp();

const audio = () => {
  const cmd = exec('afplay assets/audio/berlin.mp3', audio);
  process.on('SIGINT', () => {
    cmd.kill();
    process.exit(0);
  });
};

audio();