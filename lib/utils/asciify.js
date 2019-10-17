var asciify = require('asciify-image');
 
var options = {
  fit:    'box',
  width:  95,
  height: 50
};
 
asciify('assets/images/BASHful-ascii-ver.png', options, function(err, asciified) {
  if(err) throw err;
 
  // Print to console
  console.log(asciified);
}); 