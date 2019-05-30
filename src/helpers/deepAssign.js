function deepAssign (target, source) {
  const newObj = { ...target };

  for (let key in source) {
    if (isObject(source[key])) {
      if (!newObj[key]) {
        newObj[key] = {};
      }

      newObj[key] = deepAssign(newObj[key], source[key]);
      continue;
    }

    newObj[key] = source[key];
  }

  return newObj;
}

function isObject (el) {
  return Object.prototype.toString.call(el) === '[object Object]';
}

export default deepAssign;
