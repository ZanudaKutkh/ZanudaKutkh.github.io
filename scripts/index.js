let scale = 1
let currentScreen = 'loaderScreen'
const animationScreenEnd = {}
let animationNextStop = false
let animationStop = false
let bottleStartOffset
let laptopTextInterval = []

const moveToTop = () => moveTo(1)

const resizeContent = () => {
  bottleStartOffset = undefined
  const hc = document.getElementById('hiddenContent')
  const { body } = document
  scale = Math.min(body.offsetWidth / hc.offsetWidth, body.offsetHeight / hc.offsetHeight)

  const headerWrappers = document.getElementsByClassName('headerWrapper')
  for(let headerWrapper of headerWrappers) {
    headerWrapper.style.transform = `scaleY(${scale})`
    for(let header of headerWrapper.children) {
      header.style.transform = `scaleX(${scale})`
      header.style.opacity = '1'
    }
  }

  const contents = document.getElementsByClassName('content')
  for(let content of contents) {
    content.style.transform = `scale(${scale})`
    content.style.opacity = '1'
  }

  const menuHintContents = document.getElementsByClassName('menuHintContent')
  for(let menuHintContent of menuHintContents) {
    menuHintContent.style.transform = `scale(${scale})`
    menuHintContent.style.opacity = '1'
  }
}

const animateFirstScreen = ({ currentY }) => {
  const content = document.querySelector('#firstScreen .content')
  const wrapper = content.parentElement || content.parentNode
  const layer2 = document.getElementById('layer2')
  const eye = document.querySelector('#firstScreen .eye')

  const viewContentHeight = content.offsetHeight * scale
  const heightDelta = Math.floor((wrapper.offsetHeight - viewContentHeight) / scale)

  animationScreenEnd.firstScreen = wrapper.offsetHeight * 4.2

  if (currentY >= 0) {
    if (currentY < wrapper.offsetHeight * 0.2) {
      eye.style.opacity = '0'
      layer2.style.top = '0'
    } else if (currentY < wrapper.offsetHeight * 1.2) {
      eye.style.opacity = '1'
      eye.className = 'eye badge'
      eye.dataset.product = 'id'
      layer2.style.top = '0'
    } else if (currentY < wrapper.offsetHeight * 2.2) {
      eye.style.opacity = '1'
      eye.className = 'eye gift'
      eye.dataset.product = 'gift'
      layer2.style.top = '0'
    } else if (currentY < wrapper.offsetHeight * 3.2) {
      eye.style.opacity = '1'
      eye.className = 'eye bag'
      eye.dataset.product = 'bag'
      layer2.style.top = '0'
    } else if (currentY < wrapper.offsetHeight * 4.2) {
      eye.style.opacity = '0'
      const percent = 1 - ((wrapper.offsetHeight * 4.2 - currentY) / wrapper.offsetHeight)
      layer2.style.top = `-${percent * (content.offsetHeight + heightDelta)}px`
    } else {
      layer2.style.top = `-${content.offsetHeight + heightDelta}px`
      dispatchAnimationEnd('secondScreen', false)
    }
  }
}

const getStopAttr = (elements) => {
  for (let el of elements) {
    const style = getComputedStyle(el)
    if (style.display !== 'none' && !isNaN(+el.dataset.stop)) {
      return +el.dataset.stop
    }
  }
  return 0
}

const animateSecondScreen = ({ currentY: posY, deltaY }) => {
  const currentY = posY - animationScreenEnd.firstScreen
  const content = document.querySelector('#secondScreen .content')
  const wrapper = content.parentElement || content.parentNode
  const secondText = document.getElementById('secondText')
  const clothesImages = document.getElementById('clothesImages')
  const eye = document.querySelector('#secondScreen .eye')

  const viewContentWidth = content.offsetWidth * scale
  const widthDelta = Math.floor(((wrapper.offsetWidth - viewContentWidth) / 2) / scale)
  const imagesOffset = content.offsetWidth + widthDelta

  animationScreenEnd.secondScreen = animationScreenEnd.firstScreen + (wrapper.offsetHeight * 4)

  if (deltaY < 0 && currentY <= 0) {
    wrapper.style.opacity = '0'
    secondText.style.top = '100%'
    dispatchAnimationEnd('firstScreen', true, 300)
    clothesImages.style.opacity = '0'
    clothesImages.style.zIndex = '-1'
  } else if (currentY < wrapper.offsetHeight) {
    const percent = (wrapper.offsetHeight - currentY) / wrapper.offsetHeight
    clothesImages.style.opacity = '1'
    clothesImages.style.zIndex = '2'
    clothesImages.style.left = `${imagesOffset}px`
    secondText.style.top = `${content.offsetHeight * percent}px`
  } else if (currentY < (wrapper.offsetHeight * 2)) {
    const percent = ((wrapper.offsetHeight * 2) - currentY) / wrapper.offsetHeight
    const stop = getStopAttr(content.getElementsByClassName('tShirt'))
    const position = Math.round(((imagesOffset - stop) * percent) + stop)
    clothesImages.style.opacity = '1'
    clothesImages.style.zIndex = '2'
    clothesImages.style.left = `${position}px`
    eye.style.transition = 'transform 0.4s, opacity 0.3s, z-index 0s 0.3s'
    eye.style.zIndex = '-1'
    eye.style.opacity = '0'
  } else if (currentY < (wrapper.offsetHeight * 2.5)) {
    const stop = getStopAttr(content.getElementsByClassName('tShirt'))
    clothesImages.style.opacity = '1'
    clothesImages.style.zIndex = '2'
    clothesImages.style.left = `${stop}px`
    eye.style.transition = 'transform 0.4s, opacity 0.3s'
    eye.style.zIndex = '3'
    eye.style.opacity = '1'
    eye.dataset.product = 'tShirt'
  } else if (currentY < (wrapper.offsetHeight * 3)) {
    eye.style.transition = 'transform 0.4s, opacity 0.3s, z-index 0s 0.3s'
    eye.style.opacity = '0'
    eye.style.zIndex = '-1'
    const percent = ((wrapper.offsetHeight * 3) - currentY) / (wrapper.offsetHeight / 2)
    const start = getStopAttr(content.getElementsByClassName('tShirt'))
    const stop = getStopAttr(content.getElementsByClassName('apron'))
    const position = Math.round(((start - stop) * percent) + stop)
    clothesImages.style.opacity = '1'
    clothesImages.style.zIndex = '2'
    clothesImages.style.left = `${position}px`
  } else if (currentY < (wrapper.offsetHeight * 3.5)) {
    const stop = getStopAttr(content.getElementsByClassName('apron'))
    clothesImages.style.opacity = '1'
    clothesImages.style.zIndex = '2'
    clothesImages.style.left = `${stop}px`
    eye.style.transition = 'transform 0.4s, opacity 0.3s'
    eye.style.zIndex = '3'
    eye.style.opacity = '1'
    eye.dataset.product = 'apron'
  } else if (currentY < (wrapper.offsetHeight * 4)) {
    eye.style.transition = 'transform 0.4s, opacity 0.3s, z-index 0s 0.3s'
    eye.style.zIndex = '-1'
    eye.style.opacity = '0'
    const stop = getStopAttr(content.getElementsByClassName('apron'))
    const percent = 1 - ((wrapper.offsetHeight * 4) - currentY) / (wrapper.offsetHeight / 2)
    clothesImages.style.opacity = '1'
    clothesImages.style.zIndex = '2'
    clothesImages.style.left = `calc(${stop - (widthDelta * percent)}px - ${100 * percent}%)`
  } else if (posY >= animationScreenEnd.secondScreen) {
    eye.style.transition = 'transform 0.4s, opacity 0.3s, z-index 0s 0.3s'
    eye.style.opacity = '0'
    eye.style.zIndex = '-1'
    secondText.style.top = '0'
    dispatchAnimationEnd('cupScreen', false)
  }
}

const animateCupScreen = ({ currentY: posY, deltaY }) => {
  const currentY = posY - animationScreenEnd.secondScreen
  const content = document.querySelector('#cupScreen .content')
  const wrapper = content.parentElement || content.parentNode
  const cup = document.getElementById('cup')
  const cupText = document.getElementById('cupText')
  const eye = document.querySelector('#cupScreen .eye')

  const viewContentWidth = content.offsetWidth * scale
  const viewContentHeight = content.offsetHeight * scale

  const widthDelta = Math.floor(((wrapper.offsetWidth - viewContentWidth) / 2) / scale)
  const heightDelta = Math.floor(((wrapper.offsetHeight - viewContentHeight) / 2) / scale)

  if (!cup.style.top || (deltaY > 0 && cup.style.top === `calc(100% + ${heightDelta}px)`)) {
    cup.style.top = `calc(100% + ${heightDelta}px)`
    cup.style.opacity = '1'
    cup.style.transition = 'top 0.5s'
    cup.style.top = `calc((100% - ${cup.offsetHeight}px) / 2)`
    cup.style.transition = 'top 0.5s, opacity 0.3s'
  }
  if (!cupText.style.top) {
    cupText.style.left = `calc(100% + ${widthDelta}px)`
    cupText.style.opacity = '1'
  }

  const animationLength = content.offsetWidth + cupText.offsetWidth + (widthDelta * 2)
  animationScreenEnd.cupScreen = animationScreenEnd.secondScreen + animationLength

  if (currentY <= 0) {
    eye.style.opacity = '0'
    cup.style.opacity = '1'
    cup.style.transform = 'rotate(0deg)'
    if (deltaY < 0) {
      cup.style.top = `calc(100% + ${heightDelta}px)`
      dispatchAnimationEnd('secondScreen', true)
    } else {
      cup.style.top = `calc((100% - ${cup.offsetHeight}px) / 2)`
    }
    cupText.style.left = `calc(100% + ${widthDelta}px)`
  } else if (posY >= animationScreenEnd.cupScreen) {
    eye.style.opacity = '0'
    cup.style.opacity = '0'
    cup.style.transform = 'rotate(360deg)'
    cupText.style.left = `calc(100% + ${widthDelta}px - ${animationScreenEnd.cupScreen}px)`
    dispatchAnimationEnd('bottleScreen', false, 500)
  } else {
    if (currentY >= (animationLength / 3) && currentY < (animationLength * 0.95)) {
      eye.style.opacity = '1'
    } else {
      eye.style.opacity = '0'
    }
    cup.style.opacity = '1'
    const rotate = (currentY / animationLength) * 360
    cup.style.transform = `rotate(${-rotate}deg)`
    cupText.style.left = `calc(100% + ${widthDelta}px - ${currentY}px)`
  }
}

const animateBottleScreen = ({ currentY: posY, deltaY }) => {
  const currentY = posY - animationScreenEnd.cupScreen
  const content = document.querySelector('#bottleScreen .content')
  const wrapper = content.parentElement || content.parentNode
  const bottle = document.getElementById('bottle')
  const bottleText = document.getElementById('bottleText')
  const eye = document.querySelector('#bottleScreen .eye')

  const viewContentHeight = content.offsetHeight * scale
  const heightDelta = Math.floor(((wrapper.offsetHeight - viewContentHeight) / 2) / scale)

  const scrollScreenHeight = content.offsetHeight + (heightDelta * 2)

  animationScreenEnd.bottleScreen = animationScreenEnd.cupScreen + (scrollScreenHeight * 2.5)

  if (deltaY < 0 && currentY <= 0) {
    eye.style.opacity = '0'
    dispatchAnimationEnd('cupScreen', true)
  } else if (currentY < scrollScreenHeight) {
    eye.style.opacity = '0'
    bottleText.style.opacity = '0'
    const animationPercent = currentY / scrollScreenHeight
    if (bottleStartOffset === undefined) {
      bottleStartOffset = bottle.offsetTop
    }
    bottle.style.top = `calc(${50 * animationPercent}% - ${(bottle.offsetHeight / 2) * animationPercent}px + ${bottleStartOffset * (1 - animationPercent)}px)`
    const rotate = 90 * animationPercent
    bottle.style.transform = `rotate(${rotate}deg)`
  } else if (currentY < scrollScreenHeight * 2) {
    eye.style.opacity = '0'
    bottleText.style.opacity = '1'
    const animationPercent = (currentY - scrollScreenHeight) / scrollScreenHeight
    bottle.style.transform = `rotate(90deg)`
    const center = `(50% - ${bottle.offsetHeight / 2}px)`
    bottle.style.top = `calc(${center} - (50% * ${animationPercent}))`
  } else if (posY < animationScreenEnd.bottleScreen) {
    eye.style.opacity = '1'
    bottle.style.top = `calc(-${bottle.offsetHeight / 2}px)`
  } else {
    bottle.style.top = `calc(-${bottle.offsetHeight / 2}px)`
    dispatchAnimationEnd('boxScreen', false)
  }
}

const animateBoxScreen = ({ currentY: posY, deltaY }) => {
  const currentY = posY - animationScreenEnd.bottleScreen
  const content = document.querySelector('#boxScreen .content')
  const wrapper = content.parentElement || content.parentNode
  const box = document.getElementById('box')
  const boxCover = document.getElementById('boxCover')
  const eye = document.querySelector('#boxScreen .eye')

  const viewContentHeight = content.offsetHeight * scale
  const heightDelta = Math.floor(((wrapper.offsetHeight - viewContentHeight) / 2) / scale)

  const scrollScreenHeight = content.offsetHeight + (heightDelta * 2)

  animationScreenEnd.boxScreen = animationScreenEnd.bottleScreen + (scrollScreenHeight * 3.3)

  if (deltaY < 0) {
    box.style.opacity = '1'
  }

  if (deltaY < 0 && currentY <= 0) {
    box.style.transform = 'scale(0)'
    eye.style.opacity = '0'
    dispatchAnimationEnd('bottleScreen', true)
  } else if (currentY < scrollScreenHeight) {
    eye.style.opacity = '0'
    const animationPercent = currentY / scrollScreenHeight
    box.style.transform = `scale(${animationPercent})`
    boxCover.style.top = '0px'
  } else if (currentY < scrollScreenHeight * 2) {
    if (currentY < scrollScreenHeight * 1.8) {
      eye.style.opacity = '0'
    } else {
      eye.style.opacity = '1'
    }
    box.style.transform = 'scale(1)'
    const animationPercent = (currentY - scrollScreenHeight) / scrollScreenHeight
    const height = boxCover.offsetHeight - 25
    const offset = height * animationPercent
    boxCover.style.top = `${offset}px`
  } else if (currentY < scrollScreenHeight * 2.3) {
    eye.style.opacity = '1'
    const height = boxCover.offsetHeight - 25
    boxCover.style.top = `${height}px`
  } else if (posY < animationScreenEnd.boxScreen) {
    eye.style.opacity = '0'
    const animationPercent = (currentY - (scrollScreenHeight * 2.3)) / scrollScreenHeight
    const height = boxCover.offsetHeight - 25
    const offset = height - (height * animationPercent)
    boxCover.style.top = `${offset}px`
  } else {
    eye.style.opacity = '0'
    boxCover.style.top = '0px'
    box.style.opacity = '0'
    dispatchAnimationEnd('laptopScreen', false, 500)
  }
}

const animateLaptopScreen = ({ currentY: posY, deltaY }) => {
  const currentY = posY - animationScreenEnd.boxScreen
  const content = document.querySelector('#laptopScreen .content')
  const footerContent = document.querySelector('#footer .content')
  const wrapper = content.parentElement || content.parentNode
  const eye = document.querySelector('#laptopScreen .eye')

  const footerHeight = footerContent.offsetHeight * scale
  animationScreenEnd.laptopScreen = animationScreenEnd.boxScreen + footerHeight

  if (deltaY < 0 && posY <= animationScreenEnd.boxScreen) {
    eye.style.opacity = '0'
    if (laptopTextInterval.length) {
      laptopTextInterval.forEach(clearInterval)
      laptopTextInterval = []
    }
    const textEl = document.getElementById('laptopText')
    textEl.innerText = ''
    dispatchAnimationEnd('boxScreen', true)
  } else if (posY <= animationScreenEnd.laptopScreen) {
    wrapper.style.top = `-${currentY}px`
  }
}

const animate = ({ detail = {} }) => {
  switch (currentScreen) {
    case 'firstScreen':
      animateFirstScreen(detail)
      break
    case 'secondScreen':
      animateSecondScreen(detail)
      break
    case 'cupScreen':
      animateCupScreen(detail)
      break
    case 'bottleScreen':
      animateBottleScreen(detail)
      break
    case 'boxScreen':
      animateBoxScreen(detail)
      break
    case 'laptopScreen':
      animateLaptopScreen(detail)
      break
    default:
      // console.log(currentScreen, e)
  }
}

const defaultActivateScreen = (screen, prev, stopAnimation) => {
  const footer = document.getElementById('footer')
  footer.style.zIndex = '-1'
  animationNextStop = true
  if (prev) {
    const current = document.querySelector(`#${screen}`)
    const next = current.nextElementSibling
    if (next) {
      if (!stopAnimation) {
        next.addEventListener('transitionend', e => {
          if (e.target === next) {
            animationNextStop = false
          }
        })
      }
      next.style.top = '100%'
    }
  } else {
    const current = document.querySelector(`#${screen}`)
    if (current) {
      if (!stopAnimation) {
        current.addEventListener('transitionend', e => {
          if (e.target === current) {
            animationNextStop = false
          }
        })
      }
      const prev = current.previousElementSibling
      if (prev.classList.contains('contentWrapper')) prev.style.zIndex = '1'
      current.style.top = '0'
      current.style.opacity = '1'
      current.style.zIndex = '2'
    }
  }
}

const activateLaptopScreen = () => {
  const laptopScreen = document.getElementById('laptopScreen')
  const footer = document.getElementById('footer')
  const eye = document.querySelector('#laptopScreen .eye')
  const textEl = document.getElementById('laptopText')

  const text = textEl.dataset.text

  laptopScreen.style.zIndex = '3'
  footer.style.zIndex = '2'
  footer.style.opacity = '1'
  eye.style.opacity = '0'
  let i = 0
  const setText = i => {
    textEl.innerText = text.substring(0, i)
  }
  laptopTextInterval.push(setInterval(() => {
    setText(i)
    if (i >= text.length) {
      laptopTextInterval.forEach(clearInterval)
      laptopTextInterval = []
      eye.style.opacity = '1'
      laptopScreen.style.animation = '1s linear 0s prevFooter'
      animationNextStop = false
    }
    i += 1
  }, 100))
}

const changeCurrentScreen = (e) => {
  const { nextScreen, prev, delay } = e.detail
  if (delay) {
    animationStop = true
  }
  setTimeout(() => {
    animationStop = false
    switch (nextScreen) {
      case 'firstScreen':
        defaultActivateScreen(nextScreen, prev)
        animationNextStop = false
        break
      case 'secondScreen':
      case 'cupScreen':
      case 'bottleScreen':
      case 'boxScreen':
        defaultActivateScreen(nextScreen, prev)
        break
      case 'laptopScreen':
        defaultActivateScreen(nextScreen, prev, true)
        activateLaptopScreen()
    }
    currentScreen = nextScreen
  }, delay)
}

const moveTo = (moveToY) => {
  const moveToEvent = new CustomEvent('moveTo', { detail: { moveTo: moveToY } })
  window.dispatchEvent(moveToEvent)
}

const getStopPseudoScroll = (deltaY) => {
  if (animationStop) return true
  if (deltaY < 0) {
    animationNextStop = false
  }
  return animationNextStop
}

const startMainFlow = () => {
  const preloader = document.getElementById('preloader')
  const content = document.querySelector('#preloader .content')
  const wrapper = content.parentElement || content.parentNode
  const preloaderRound = document.getElementById('preloaderRound')
  const preloaderButton = document.getElementById('preloaderButton')

  const maxSize = Math.max(wrapper.offsetHeight, wrapper.offsetWidth)
  const viewContentHeight = content.offsetHeight * scale
  const heightDelta = Math.floor((wrapper.offsetHeight - viewContentHeight) / scale)

  dispatchAnimationEnd('firstScreen', false)
  preloaderRound.style.transform = `scale(${maxSize / scale})`
  preloaderButton.style.bottom = `calc(100% + ${heightDelta}px)`
  preloader.style.opacity = `0.1`

  preloader.addEventListener('transitionend', () => {
    preloader.classList.remove('open')
  })
}

const preloaderActivate = ({ target }) => {
  if (!videoStarted) {
    videoStarted = true
    const { duration } = target
    const content = document.querySelector('#preloader .content')
    const wrapper = content.parentElement || content.parentNode
    const preloaderText = document.getElementById('preloaderText')

    const viewContentWidth = content.offsetWidth * scale
    const widthDelta = Math.floor(((wrapper.offsetWidth - viewContentWidth) / 2) / scale)

    preloaderText.style.left = `calc(100% + ${widthDelta}px)`
    preloaderText.style.transition = `left ${duration}s`
    preloaderText.style.left = `-${preloaderText.offsetWidth + widthDelta}px`
    preloaderText.style.opacity = '1'
  }
}

let videoStarted = false

const preloaderVideoEnd = ({ target }) => {
  const preloaderImage = document.getElementById('preloaderImage')
  const preloaderRound = document.getElementById('preloaderRound')
  const preloaderButton = document.getElementById('preloaderButton')

  preloaderButton.addEventListener('click', startMainFlow)

  target.style.opacity = '0'
  preloaderImage.style.opacity = '1'
  preloaderRound.style.transform = 'scale(445)'
  preloaderButton.style.bottom = '310px'
}

const activateProduct = (product, animate = true) => {
  const capitalizedProduct = product.charAt(0).toUpperCase() + product.slice(1)
  const productImageId = 'product' + capitalizedProduct
  const productNavigatorId = 'navigator' + capitalizedProduct
  const productImage = document.getElementById(productImageId)
  const productWrapper = productImage.parentElement || productImage.parentNode
  for(let image of productWrapper.children) {
    if (image !== productImage && image.classList.contains('active')) {
      if (animate) {
        const keyframes = [
          {
            top: 'unset',
            left: 'unset',
            bottom: 0,
            right: 0,
            opacity: 1,
            transform: 'none'
          },
          {
            bottom: '-50%',
            right: '-100%',
            opacity: 0,
            transform: 'rotate(32deg)'
          },
          {
            bottom: '-50%',
            right: '-100%',
            opacity: 0,
            transform: 'rotate(32deg)'
          },
        ]
        const timing = {
          duration: 550,
          iterations: 1,
          rangeStart: "cover 0%",
          rangeEnd: "cover 90%",
        }
        image.animate(keyframes, timing)
      }
      image.classList.remove('active')
    }
  }
  productImage.classList.add('active')
  const productNavigator = document.getElementById(productNavigatorId)
  const navigator = productNavigator.parentElement || productNavigator.parentNode
  for(let nav of navigator.children) {
    if (nav !== productNavigator) nav.classList.remove('active')
  }
  productNavigator.classList.add('active')
}

let zIndex = 10000

const addEvents = () => {
  window.addEventListener('resize', resizeContent)
  window.addEventListener('pseudoScroll', animate)
  window.addEventListener('animationEnd', changeCurrentScreen)

  const preloaderVideo = document.querySelector('#preloader video')
  preloaderVideo.addEventListener('play', preloaderActivate)
  preloaderVideo.addEventListener('timeupdate', preloaderActivate)
  preloaderVideo.addEventListener('ended', preloaderVideoEnd)

  const modalsAutoClose = document.getElementsByClassName('modalAutoClose')
  const modalOpenButtons = document.getElementsByClassName('modalOpen')
  const modalCloseButtons = document.getElementsByClassName('modalClose')
  const mainHeader = document.getElementById('mainHeader')

  for(let modalOpenButton of modalOpenButtons) {
    const { classList, dataset } = modalOpenButton
    const { modal: modalName } = dataset
    if (classList.contains('eye')) {
      modalOpenButton.addEventListener('transitionend', e => {
        if (e.target === modalOpenButton && e.propertyName === 'transform') {
          for(let modalAutoClose of modalsAutoClose) {
            modalAutoClose.classList.remove('open')
          }
          const { product } = dataset
          const modal = document.getElementById(modalName)
          modal.classList.add('open')
          zIndex += 1
          modal.style.zIndex = zIndex.toString()
          activateProduct(product, false)
          mainHeader.style.transition = 'opacity 0.3s'
          mainHeader.style.opacity = '0'
          e.target.style.transform = ''
          animationStop = true
        }
      })
      modalOpenButton.addEventListener('click', e => {
        e.target.style.transform = 'scale(350)'
      })
    } else {
      modalOpenButton.addEventListener("click", () => {
        for(let modalAutoClose of modalsAutoClose) {
          modalAutoClose.classList.remove('open')
        }
        const { product } = dataset
        const modal = document.getElementById(modalName)
        modal.classList.add('open')
        zIndex += 1
        modal.style.zIndex = zIndex.toString()
        if (dataset.product) {
          activateProduct(dataset.product, false)
        }
        mainHeader.style.transition = 'opacity 0.3s'
        mainHeader.style.opacity = '0'
        animationStop = true
      })
    }
  }

  for(let modalCloseButton of modalCloseButtons) {
    const { modal: modalName } = modalCloseButton.dataset
    modalCloseButton.addEventListener("click", () => {
      mainHeader.style.transition = ''
      mainHeader.style.opacity = ''
      const modal = document.getElementById(modalName)
      if (modal) {
        modal.classList.remove('open')
        zIndex -= 1
        modal.style.zIndex = ''
        animationStop = false
      }
    })
  }

  const changeProductButtons = document.getElementsByClassName('changeProduct')

  for(let changeProductButton of changeProductButtons) {
    const { dataset } = changeProductButton
    const { product } = dataset
    changeProductButton.addEventListener("click", () => {
      activateProduct(product)
      animationStop = true
    })
  }

  const navButtons = document.getElementsByClassName('navButton')
  const menuNavigator = document.getElementById('menuNavigator')
  const menuContent = menuNavigator.parentElement || menuNavigator.parentNode
  const menuContentWrapper = menuContent.parentElement || menuContent.parentNode

  for(let navButton of navButtons) {
    const { type } = navButton.dataset
    const menuHintContent = document.querySelector(`.menuHintContentWrapper.${type} .menuHintContent`)
    const menuHintContentWrapper = menuHintContent.parentElement || menuHintContent.parentNode
    navButton.addEventListener('mouseover', () => {
      const viewContentWidth = menuContent.offsetWidth * scale
      const widthDelta = Math.floor(((menuContentWrapper.offsetWidth - viewContentWidth) / 2))
      const navigatorDelta = (menuContent.offsetWidth - menuNavigator.offsetWidth) * scale
      const contentWidth = widthDelta + navigatorDelta
      if (contentWidth < menuHintContent.offsetWidth) {
        menuHintContent.style.minWidth = `${widthDelta + navigatorDelta}px`
        menuHintContent.style.maxWidth = `${widthDelta + navigatorDelta}px`
      }
      menuHintContentWrapper.style.transition = 'left 0.3s 0.2s';
      menuHintContentWrapper.style.left = `calc(100% - ${contentWidth}px)`
      for(let navButton2 of navButtons) {
        if (navButton2 !== navButton) {
          navButton2.style.opacity = '0.3'
        }
      }
    })
    navButton.addEventListener('mouseout', () => {
      menuHintContent.style.minWidth = ''
      menuHintContent.style.maxWidth = ''
      menuHintContentWrapper.style.transition = 'left 0.3s';
      menuHintContentWrapper.style.left = '100%'
      for(let navButton2 of navButtons) {
        if (navButton2 !== navButton) {
          navButton2.style.opacity = ''
        }
      }
    })
  }
}

window.onload = () => {
  animationStop = true
  registerPseudoScrollEvent(window, getStopPseudoScroll)
  resizeContent()
  addEvents()
}
