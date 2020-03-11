const touch = function(element, callback) {
  if (element && element.addEventListener) {
    let x0 = 0;

    element.addEventListener("touchstart", function(event) {
      x0 = event.changedTouches[0].clientX;
    });
    element.addEventListener("touchmove", function(event) {
      let x1 = event.changedTouches[0].clientX;
      let move = x0 - x1;
      callback(move, false);
    });
    element.addEventListener("touchend", function(event) {
      let x1 = event.changedTouches[0].clientX;
      let move = x0 - x1;
      callback(move, true);
    });
  }
};

export default {
  bind(el, binding) {
    touch(el, binding.value);
  }
};
