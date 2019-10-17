const asciify = require('asciify-image');

// const options = {
//   fit: 'box',
//   width: 80,
//   height: 40
// };

// asciify('./assets/images/frame-1.png', options, function(err, asciified) {
//   if(err) throw err;

//   // Print to console
//   console.log(asciified);
// });

const options = {
  fit: 'box',
  width: 80,
  height: 40
}

asciify('path/to/frame-1.png', options)
  .then(function(asciified) {
    // Print asciified image to console
    console.log(asciified);
  })
  .catch(function(err) {
    // Print error to console
    console.error(err);
  });