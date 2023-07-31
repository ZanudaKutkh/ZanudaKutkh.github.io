const registerPseudoScrollEvent = (el, getStopPseudoScroll) => {
  let startY
  let currentY = 0

  el.addEventListener("wheel", e => {
    const { deltaY } = e
    const stopPseudoScroll = getStopPseudoScroll(deltaY)
    let nextY = currentY + deltaY
    nextY = nextY < 0 ? 0 : nextY

    if (currentY !== nextY && !stopPseudoScroll) {
      currentY = nextY
      const pseudoScrollEvent = new CustomEvent('pseudoScroll', { detail: { currentY, deltaY } })
      el.dispatchEvent(pseudoScrollEvent)
    }
  })

  el.addEventListener("touchstart", e => {
    if (e.touches.length === 1) {
      const [touch] = e.touches
      startY = touch?.clientY
    }
  })

  el.addEventListener("touchmove", e => {
    if (e.touches.length === 1 && !isNaN(+startY)) {
      const [touch] = e.touches
      const thisY = touch?.clientY
      const deltaY = startY - thisY
      startY = thisY
      const stopPseudoScroll = getStopPseudoScroll(deltaY)
      let nextY = currentY + deltaY
      nextY = nextY < 0 ? 0 : nextY

      if (currentY !== nextY && !stopPseudoScroll) {
        currentY = nextY
        const pseudoScrollEvent = new CustomEvent('pseudoScroll', { detail: { currentY, deltaY } })
        el.dispatchEvent(pseudoScrollEvent)
      }
    }
  })

  el.addEventListener("touchend", () => {
    startY = undefined
  })
}
