const jimp = require('jimp');

module.exports = {
  resize
}

function resize (filepath, width, height) {
  width = width || jimp.AUTO;
  height = height || jimp.AUTO;

  return jimp.read(filepath)
    .then((image) =>
      image
        .resize(width, height)
        .write(filepath)
  );
}
