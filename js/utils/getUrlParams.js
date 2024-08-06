export const URL_PARAMS = {
  USTENSILES: "ustensiles",
  SEARCH: "search",
  INGREDIENTS: "ingredients",
  APPAREILS: "appareils",
};

const extractValueFromSearchParams = (value) => {
  if (value?.includes(",")) {
    return value.split(",");
  }

  return value;
};

export const getURLParams = () => {
  const searchParam = new URLSearchParams(window.location.search);
  const params = {};

  for (const [key, value] of searchParam.entries()) {
    params[key] = value.split(',');
  }

  return params;
};

export const setURLParams = (key, value, overwrite) => {
  const url = new URL(window.location);
  const searchParam = new URLSearchParams(url.search);
  overwrite = overwrite || false;

  if (overwrite) {
    searchParam.delete(key);
  }

  const values = new Set(searchParam.get(key)?.split(',') || []);
  if (values.has(value)) {
    values.delete(value);
  } else {
    values.add(value);
  }

  if (values.size > 0) {
    searchParam.set(key, Array.from(values).join(','));
  } else {
    searchParam.delete(key);
  }

  window.history.pushState({}, '', `${window.location.pathname}?${searchParam.toString()}`);
};



export default {
  getURLParams,
  setURLParams,
  URL_PARAMS,
  extractValueFromSearchParams
};
