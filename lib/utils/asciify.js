var asciify = require('asciify-image');

var options = {
  fit:    'box',
  width:  70,
  height: 40
};

asciify('assets/images/angela.jpeg', options, function(err, asciified) {
  if(err) throw err;

  // Print to console
  console.log(asciified);
}); 