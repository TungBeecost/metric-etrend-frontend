// trigger first action
export const debounceLeading = (func: any, timeout = 800) => {
  let timer: any;
  return (...args: any[]) => {
    if (!timer) {
      func(...args);
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
    }, timeout);
  };
};

// trigger last action
export const debounce = (func: any, timeout = 800) => {
  let timer: any;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
};
