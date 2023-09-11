const dispatchAnimationEnd = (nextScreen, prev = false, delay = 0, callback) => {
  const animationEnd = new CustomEvent('animationEnd', { detail: { nextScreen, prev, delay, callback } })

  window.dispatchEvent(animationEnd);
}