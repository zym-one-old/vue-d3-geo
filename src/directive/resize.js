const resize = function(element, callback) {
  setInterval(() => {
    const { offsetWidth, offsetHeight } = element;
    callback(offsetWidth, offsetHeight);
  }, 1);
};

export default {
  bind(el, binding) {
    resize(el, binding.value);
  }
};
