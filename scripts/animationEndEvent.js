const dispatchAnimationEnd = (nextScreen, prev = false, delay = 0) => {
  const animationEnd = new CustomEvent('animationEnd', { detail: { nextScreen, prev, delay } })

  window.dispatchEvent(animationEnd);
}