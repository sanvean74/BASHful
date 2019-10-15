const asciify = require('asciify-image');

const options = {
  fit: 'box',
  width: 80,
  height: 40
};

asciify('./assets/images/DeadAnt-Logo.png', options, function(err, asciified) {
  if(err) throw err;

  // Print to console
  console.log(asciified);
});