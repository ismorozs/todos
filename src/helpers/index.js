import settings from '../../settings';

export const getProps = (obj, props) => {
  const newObj = {};

  props.forEach((prop) => {
    if (typeof obj[prop] !== 'undefined') {
      newObj[prop] = obj[prop];
    }
  });

  return newObj;
}

export const getPropsThroughKey = (obj, propName) => {
  const newObj = {};

  for (let key in obj) {
    if (typeof obj[key][propName] !== 'undefined') {
      newObj[key] = obj[key][propName];
    }
  }

  return newObj;
}

export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

export const doIf = (statement, cb, defaultReturn) => {
  if (statement) {
    return cb();
  }

  return Promise.resolve(defaultReturn);
}

export const getAbsImagePath = (filename) => {
  return settings.ABS_IMAGES_FOLDER + filename;
}

export const getServerImagePath = (filename) => {
  return settings.IMAGES_FOLDER + filename;
}
