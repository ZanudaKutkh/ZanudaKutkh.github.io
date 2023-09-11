const registerPseudoScrollEvent = (el, getStopPseudoScroll) => {
  let startY
  let currentY = 0
  const maxScrollLength = 30

  const dispatchPseudoScroll = (detail) => {
    currentY = detail?.currentY === undefined ? currentY : detail.currentY
    const pseudoScrollEvent = new CustomEvent('pseudoScroll', { detail })
    el.dispatchEvent(pseudoScrollEvent)
  }

  const throttleDispatchPseudoScroll = throttle(dispatchPseudoScroll, 20)

  el.addEventListener("moveTo", e => {
    const { detail } = e
    const { moveTo, step = maxScrollLength, delayStep } = detail

    let delay = 0;
    if (moveTo >= currentY) {
      if (delayStep) {
        for (let i = currentY; i < moveTo + step; i += step) {
          delay += delayStep;
          const nextY = i > moveTo ? moveTo : i
          const deltaY = nextY - currentY
          setTimeout(() => {
            dispatchPseudoScroll({ currentY: nextY, deltaY })
          }, delay)
        }
      } else {
        dispatchPseudoScroll({ currentY: moveTo, deltaY: moveTo - currentY })
      }
    } else {
      if (delayStep) {
        for (let i = currentY; i > moveTo - step; i -= step) {
          delay += delayStep;
          const nextY = i < moveTo ? moveTo : i
          const deltaY = nextY - currentY
          setTimeout(() => {
            dispatchPseudoScroll({ currentY: nextY, deltaY })
          }, delay)
        }
      } else {
        dispatchPseudoScroll({ currentY: moveTo, deltaY: moveTo - currentY })
      }
    }
  })

  el.addEventListener("wheel", e => {
    let { deltaY } = e
    if (Math.abs(deltaY) > maxScrollLength) {
      deltaY = deltaY < 0 ? -maxScrollLength : maxScrollLength
    }
    const stopPseudoScroll = getStopPseudoScroll(deltaY)
    let nextY = currentY + deltaY
    nextY = nextY < 0 ? 0 : nextY

    if (currentY !== nextY && !stopPseudoScroll) {
      throttleDispatchPseudoScroll({ currentY: nextY, deltaY })
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
      const deltaY = (startY - thisY) * 2
      startY = thisY
      const stopPseudoScroll = getStopPseudoScroll(deltaY)
      let nextY = currentY + deltaY
      nextY = nextY < 0 ? 0 : nextY

      if (currentY !== nextY && !stopPseudoScroll) {
        dispatchPseudoScroll({ currentY: nextY, deltaY })
      }
    }
  })

  el.addEventListener("touchend", () => {
    startY = undefined
  })
}
