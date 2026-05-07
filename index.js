const keywords = {
  true: true,
  false: false,
  null: null,
  undefined,
};

const isPlainObject = (val) => Object.prototype.toString.call(val) === '[object Object]';
const coerceArray = (arr) => arr.map(coerceValue);
const coerceObject = (obj) => Object.entries(obj)
  .reduce((nobj, [key, val]) => {
    nobj[key] = coerceValue(val);
    return nobj;
  }, {});

const coerceValue = (val) => {
  if (val === '') {
    return val;

  } else if (val in keywords) {
    return keywords[val]

  } else if (Array.isArray(val)) {
    return coerceArray(val);

  } else if (isPlainObject(val)) {
    return coerceObject(val);
  }

  return val;
}

const get = (obj, path) => path.split('.').reduce((o, k) => o?.[k], obj);

const set = (obj, path, val) => {
  const keys = path.split('.');
  const last = keys.pop();
  keys.reduce((o, k) => o[k] ??= {}, obj)[last] = val;
};

const coerceParams = (obj, q, map) => {
  for (const param of new URLSearchParams(q).keys()) {
    const format = map[param];
    if (format) {
      set(obj, param, format(get(obj, param)));
    }
  }
  return obj;
}

const coerce = (obj, opts, q) => {
  const nobj = coerceValue(obj);
  return (opts && opts.coerceMap) && q
    ? coerceParams(nobj, q, opts.coerceMap)
    : nobj;
}

exports.coerce = coerce;
