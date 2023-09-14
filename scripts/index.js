let scale = 1
let currentScreen = 'loaderScreen'
const animationScreenEnd = {}
let animationNextStop = false
let animationStop = false
let bottleStartOffset
let boxBadgeStartOffsetTop
let boxBadgeStartOffsetLeft
let laptopTextInterval = []

const preloaderVideos = {
  vp9: {
    type: 'video/webm',
    codec: 'vp9',
    src: '/media/video/preloader_vp9.webm',
  },
  vp8: {
    type: 'video/webm',
    codec: 'vp8',
    src: '/media/video/preloader_vp8.webm',
  },
  hvc1: {
    type: 'video/quicktime',
    codec: 'hvc1',
    src: '/media/video/preloader_hevc.mov',
  },
}

const quizData = {
  clothes: [
    {
      type: 'MULTI_CHOICE',
      question: 'Какая одежда необходима?',
      choices: [
        'Футболки',
        'Поло',
        'Жилеты',
        'Куртка (ветровка)',
        'Худи (толстовка)',
        'Фартук',
        'Нужно нанесение принта на готовое изделие',
      ],
      other: 'Свой вариант',
    },
    {
      type: 'INPUT',
      question: 'Какое количество необходимо?',
      placeholder: 'Укажите общее количество (минимальный тираж 30 шт.)',
    },
    {
      type: 'CHOICE',
      question: 'Нужно ли нанесение логотипа (принта)?',
      choices: [
        'Нужно, есть макет',
        'Нужно, нет макета',
        'Не нужно',
      ],
    },
  ],
  office: [
    {
      type: 'MULTI_CHOICE',
      question: 'Какие аксессуары необходимы?',
      choices: [
        'Бейдж с лентой',
        'Внешний аккумулятор / powerbank',
        'Ежедневник',
        'Ручка',
        'Термостакан / бутылка для воды',
        'Стикерпак с локальными мемами',
        'Шоппер',
        'Беспроводные наушники',
        'Бейсболка',
        'Футболка с принтом',
      ],
      other: 'Свой вариант',
    },
    {
      type: 'INPUT',
      question: 'Какое количество необходимо?',
      placeholder: 'Укажите общее количество (минимальный тираж 30 шт.)',
    },
    {
      type: 'CHOICE',
      question: 'Нужно ли нанесение логотипа (принта)?',
      choices: [
        'Нужно, есть макет',
        'Нужно, нет макета',
        'Не нужно',
      ],
    },
  ],
  gift: [
    {
      type: 'MULTI_CHOICE',
      question: 'Какие позиции необходимы?',
      choices: [
        'Внешний аккумулятор / powerbank',
        'Термостакан / бутылка для воды',
        'Вместительная сумка-шоппер',
        'Рюкзак',
        'Плед / декоративная подушка',
        'Зонт',
        'Футболка',
        'Худи',
      ],
      other: 'Свой вариант',
    },
    {
      type: 'INPUT',
      question: 'Какое количество необходимо?',
      placeholder: 'Укажите общее количество (минимальный тираж 30 шт.)',
    },
    {
      type: 'CHOICE',
      question: 'Нужно ли нанесение логотипа (принта)?',
      choices: [
        'Нужно, есть макет',
        'Нужно, нет макета',
        'Не нужно',
      ],
    },
  ],
}

const productsData = {
  id: {
    type: 'product',
    title: 'Хочу выделяться\nво время конференции',
    text: 'Хотите заказать одежду со свои логотипом или фирменным стилем? Пройдите небольшую анкенту для того, чтобы мы могли подготовить для вас наилучшее предложение.',
    shortText: 'Хотите заказать аксессуары для конференции?',
    video: '/media/video/conference',
    quizTitle: 'Аксессуары для конференции',
    quizKey: 'office',
  },
  gift: {
    type: 'product',
    title: 'Хочу подарки\nна праздники',
    text: 'Хотите заказать одежду со свои логотипом или фирменным стилем? Пройдите небольшую анкенту для того, чтобы мы могли подготовить для вас наилучшее предложение.',
    shortText: 'Хотите заказать подарки на праздники?',
    video: '/media/video/gift',
    quizTitle: 'Подарки на праздники',
    quizKey: 'gift',
  },
  bag: {
    type: 'product',
    title: 'Хочу мерч\nдля продажи',
    text: 'Хотите заказать одежду со свои логотипом или фирменным стилем? Пройдите небольшую анкенту для того, чтобы мы могли подготовить для вас наилучшее предложение.',
    shortText: 'Хотите заказать мерч для продажи?',
    video: '/media/video/merch',
    quizTitle: 'Мерч для продажи',
    quizKey: 'gift',
  },
  tShirt: {
    type: 'product',
    title: 'Хочу одежду\nсо своим брендигом',
    text: 'Хотите заказать одежду со свои логотипом или фирменным стилем? Пройдите небольшую анкенту для того, чтобы мы могли подготовить для вас наилучшее предложение.',
    shortText: 'Хотите заказать одежду со своим брендингом?',
    video: '/media/video/branding',
    quizTitle: 'Одежда с брендингом',
    quizKey: 'clothes',
  },
  apron: {
    type: 'product',
    title: 'Хочу одеть\nсвоих сотрудников',
    text: 'Хотите заказать одежду со свои логотипом или фирменным стилем? Пройдите небольшую анкенту для того, чтобы мы могли подготовить для вас наилучшее предложение.',
    shortText: 'Хотите заказать одежду для своих сотрудников?',
    video: '/media/video/corp',
    quizTitle: 'Одежда для сотрудников',
    quizKey: 'clothes',
  },
  cup: {
    type: 'product',
    title: 'Хочу аксессуары\nдля офиса',
    text: 'Хотите заказать одежду со свои логотипом или фирменным стилем? Пройдите небольшую анкенту для того, чтобы мы могли подготовить для вас наилучшее предложение.',
    shortText: 'Хотите заказать аксессуары для офиса?',
    video: '/media/video/office',
    quizTitle: 'Аксессуары для офиса',
    quizKey: 'office',
  },
  bottle: {
    type: 'product',
    title: 'Хочу сувениры\nдля спорта и отдыха',
    text: 'Хотите заказать одежду со свои логотипом или фирменным стилем? Пройдите небольшую анкенту для того, чтобы мы могли подготовить для вас наилучшее предложение.',
    shortText: 'Хотите заказать сувениры для спорта и отдыха?',
    video: '/media/video/souvenir',
    quizTitle: 'Сувениры для спорта и отдыха',
    quizKey: 'gift',
  },
  welcome: {
    type: 'product',
    title: 'Хочу welcome-pack\nдля сотрудников',
    text: 'Хотите заказать одежду со свои логотипом или фирменным стилем? Пройдите небольшую анкенту для того, чтобы мы могли подготовить для вас наилучшее предложение.',
    shortText: 'Хотите заказать welcome-pack для своих сотрудников?',
    video: '/media/video/welcome',
    quizTitle: 'Welcome-pack',
    quizKey: 'office',
  },
  laptop: {
    type: 'service',
    title: 'Хотите заказать такую же\nпромо страницу?',
    text: 'У вас есть продукт, который нужно эффектно представить потенциальной аудитории? Хотите видеть на вашей странице подобную анимацию? Тогда отправляйте свой запрос нам на почту <a href="mailto:info@topline.ru">info@topline.ru</a> и в ближайшее время наш менеджер свяжется с вами.',
    shortText: 'Хотите заказать такую же промо страницу?',
  },
}

const getDisplayedEl = elements => {
  for (let el of elements) {
    const style = getComputedStyle(el)
    if (style.display !== 'none') return el
  }
  return undefined
}

const getAttr = (elements, name, def) => {
  const el = getDisplayedEl(elements)
  if (el) {
    const attr = el.dataset[name]
    if (!isNaN(+attr)) return +attr
    if (attr === 'true') return true
    if (attr === 'false') return false
    return el.dataset[name]
  }
  return def
}

const moveToTop = () => {
  const openModals = document.querySelectorAll('.modal.open')
  for (let modal of openModals) {
    modal.classList.remove('open')
    if (modal.classList.contains('product')) {
      closeFullVideoOrQuiz(false)
    }
    zIndex -= 1
    modal.style.zIndex = ''
  }
  for(let screen of document.querySelectorAll('.contentWrapper')) {
    screen.style.zIndex = ''
    screen.style.top = ''
    screen.style.opacity = ''
  }
  dispatchAnimationEnd('firstScreen', false, 0, () => {
    moveTo(0)
    rollbackAnimation()
  })
  animationStop = false
}

const resizeContent = () => {
  bottleStartOffset = undefined
  boxBadgeStartOffsetTop = undefined
  boxBadgeStartOffsetLeft = undefined
  const hc = document.getElementById('hiddenContent')
  const { body } = document
  scale = Math.min(body.offsetWidth / hc.offsetWidth, body.offsetHeight / hc.offsetHeight)

  const headerWrappers = document.getElementsByClassName('headerWrapper')
  for (let headerWrapper of headerWrappers) {
    headerWrapper.style.transform = `scaleY(${scale})`
    for (let header of headerWrapper.children) {
      header.style.transform = `scaleX(${scale})`
      header.style.opacity = '1'
    }
  }

  const contents = document.getElementsByClassName('content')
  for (let content of contents) {
    content.style.transform = `scale(${scale})`
    content.style.opacity = '1'
  }

  const menuModalButtons = document.getElementById('menuModalButtons')
  menuModalButtons.style.transform = `scale(${scale})`
  menuModalButtons.firstElementChild.style.width = `${100 / scale}%`

  const productNavigator = document.getElementById('productNavigator')
  productNavigator.style.width = `${100 / scale}%`
  productNavigator.style.transform = `scale(${scale})`
  /*
  const navigator = document.querySelector('#productNavigator .navigator')
  productNavigator.style.transform = `scale(${scale})`
  const isVertical = (window.innerWidth / window.innerHeight) < 0.75
  if (isVertical) {
    if (scale < 1) {
      const width = window.innerWidth / scale / scale
      productNavigator.style.width = `${width}px`
      const offset = ((window.innerWidth / scale) - width) / 2
      productNavigator.style.left = `${offset}px`
      navigator.style.width = `calc(100% - ${Math.abs(offset) * 2}px)`
    } else {
      const width = window.innerWidth
      productNavigator.style.width = `${width}px`
      const offset = (width - (window.innerWidth / scale)) / 2
      productNavigator.style.left = `${offset}px`
      navigator.style.width = `${(window.innerWidth / scale / scale) + Math.abs(offset * 2)}px`
    }
  } else {
    navigator.style.width = ''
    productNavigator.style.width = ''
    productNavigator.style.left = ''
  }
   */

  const menuHintContents = document.getElementsByClassName('menuHintContent')
  for (let menuHintContent of menuHintContents) {
    menuHintContent.style.transform = `scale(${scale})`
    menuHintContent.style.opacity = '1'
  }
}

const animateFirstScreen = ({ currentY, deltaY }) => {
  const content = document.querySelector('#firstScreen .content')
  const wrapper = content.parentElement || content.parentNode
  const layer2 = document.getElementById('layer2')

  const viewContentHeight = content.offsetHeight * scale
  const heightDelta = Math.floor((wrapper.offsetHeight - viewContentHeight) / scale)

  animationScreenEnd.firstScreen = wrapper.offsetHeight

  if (currentY > 0) {
    if (currentY < wrapper.offsetHeight) {
      const percent = 1 - ((wrapper.offsetHeight - currentY) / wrapper.offsetHeight)
      layer2.style.top = `-${percent * (content.offsetHeight + heightDelta)}px`
    } else {
      layer2.style.top = `-${content.offsetHeight + heightDelta}px`
      dispatchAnimationEnd('secondScreen', false)
    }
  } else if (currentY === 0 && deltaY < 0) {
    layer2.style.top = '0px'
  }
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
    secondText.style.top = `0px`
    const percent = ((wrapper.offsetHeight * 2) - currentY) / wrapper.offsetHeight
    const stop = getAttr(content.getElementsByClassName('tShirt'), 'stop', 0)
    const position = Math.round(((imagesOffset - stop) * percent) + stop)
    clothesImages.style.opacity = '1'
    clothesImages.style.zIndex = '2'
    clothesImages.style.left = `${position}px`
    eye.style.transition = 'opacity 0.3s, z-index 0s 0.3s, width 0.3s, height 0.3s, font-size 0.3s'
    eye.style.zIndex = '-1'
    eye.style.opacity = '0'
  } else if (currentY < (wrapper.offsetHeight * 2.5)) {
    const stop = getAttr(content.getElementsByClassName('tShirt'), 'stop', 0)
    clothesImages.style.opacity = '1'
    clothesImages.style.zIndex = '2'
    clothesImages.style.left = `${stop}px`
    eye.style.transition = 'opacity 0.3s, width 0.3s, height 0.3s, font-size 0.3s'
    eye.style.zIndex = '3'
    eye.style.opacity = '1'
    eye.dataset.product = 'tShirt'
  } else if (currentY < (wrapper.offsetHeight * 3)) {
    eye.style.transition = 'opacity 0.3s, z-index 0s 0.3s, width 0.3s, height 0.3s, font-size 0.3s'
    eye.style.opacity = '0'
    eye.style.zIndex = '-1'
    const percent = ((wrapper.offsetHeight * 3) - currentY) / (wrapper.offsetHeight / 2)
    const start = getAttr(content.getElementsByClassName('tShirt'), 'stop', 0)
    const stop = getAttr(content.getElementsByClassName('apron'), 'stop', 0)
    const position = Math.round(((start - stop) * percent) + stop)
    clothesImages.style.opacity = '1'
    clothesImages.style.zIndex = '2'
    clothesImages.style.left = `${position}px`
  } else if (currentY < (wrapper.offsetHeight * 3.5)) {
    const stop = getAttr(content.getElementsByClassName('apron'), 'stop', 0)
    clothesImages.style.opacity = '1'
    clothesImages.style.zIndex = '2'
    clothesImages.style.left = `${stop}px`
    eye.style.transition = 'opacity 0.3s, width 0.3s, height 0.3s, font-size 0.3s'
    eye.style.zIndex = '3'
    eye.style.opacity = '1'
    eye.dataset.product = 'apron'
  } else if (currentY < (wrapper.offsetHeight * 4)) {
    eye.style.transition = 'opacity 0.3s, z-index 0s 0.3s, width 0.3s, height 0.3s, font-size 0.3s'
    eye.style.zIndex = '-1'
    eye.style.opacity = '0'
    const stop = getAttr(content.getElementsByClassName('apron'), 'stop', 0)
    const percent = 1 - ((wrapper.offsetHeight * 4) - currentY) / (wrapper.offsetHeight / 2)
    clothesImages.style.opacity = '1'
    clothesImages.style.zIndex = '2'
    clothesImages.style.left = `calc(${stop - (widthDelta * percent)}px - ${100 * percent}%)`
  } else if (posY >= animationScreenEnd.secondScreen) {
    eye.style.transition = 'opacity 0.3s, z-index 0s 0.3s, width 0.3s, height 0.3s, font-size 0.3s'
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
  const bottles = document.getElementsByClassName('bottle')
  const bottle = getDisplayedEl(bottles)
  const bottleRotate = getAttr(bottles, 'rotate', true)
  const bottleStop = getAttr(bottles, 'stop', true)
  const bottleText = document.getElementById('bottleText')
  const eye = document.querySelector('#bottleScreen .eye')

  const viewContentHeight = content.offsetHeight * scale
  const heightDelta = Math.floor(((wrapper.offsetHeight - viewContentHeight) / 2) / scale)

  const scrollScreenHeight = content.offsetHeight + (heightDelta * 2)

  animationScreenEnd.bottleScreen = animationScreenEnd.cupScreen + (scrollScreenHeight * 2.5)

  if (bottleStartOffset === undefined) {
    bottleStartOffset = bottle.offsetTop
  }

  if (deltaY < 0 && currentY <= 0) {
    eye.style.opacity = '0'
    bottle.style.top = ''
    bottleText.style.opacity = '0'
    dispatchAnimationEnd('cupScreen', true)
  } else if (currentY < scrollScreenHeight) {
    eye.style.opacity = '0'
    const animationPercent = currentY / scrollScreenHeight
    if (bottleRotate) {
      bottleText.style.opacity = '0'
      bottle.style.top = `calc(${50 * animationPercent}% - ${(bottle.offsetHeight / 2) * animationPercent}px + ${bottleStartOffset * (1 - animationPercent)}px)`
      const rotate = 90 * animationPercent
      bottle.style.transform = `rotate(${rotate}deg)`
    } else {
      if (currentY > (scrollScreenHeight * 0.3)) {
        bottleText.style.opacity = '1'
      } else {
        bottleText.style.opacity = '0'
      }
      bottle.style.top = `calc(${bottleStartOffset * (1 - animationPercent)}px + ${bottleStop * animationPercent}px - ${bottle.offsetHeight * animationPercent}px)`
    }
  } else if (currentY < scrollScreenHeight * 2) {
    bottleText.style.opacity = '1'
    if (bottleRotate) {
      eye.style.opacity = '0'
      const animationPercent = (currentY - scrollScreenHeight) / scrollScreenHeight
      bottle.style.transform = `rotate(90deg)`
      const center = `(50% - ${bottle.offsetHeight / 2}px)`
      bottle.style.top = `calc(${center} - (50% * ${animationPercent}))`
    } else {
      eye.style.opacity = '1'
      bottle.style.top = `${bottleStop - bottle.offsetHeight}px`
    }
  } else if (posY < animationScreenEnd.bottleScreen) {
    eye.style.opacity = '1'
    if (bottleRotate) {
      bottle.style.top = `calc(-${bottle.offsetHeight / 2}px)`
    } else {
      bottle.style.top = `${bottleStop - bottle.offsetHeight}px`
    }
  } else {
    if (bottleRotate) {
      bottle.style.top = `calc(-${bottle.offsetHeight / 2}px)`
    } else {
      bottle.style.top = `${bottleStop - bottle.offsetHeight}px`
    }
    dispatchAnimationEnd('boxScreen', false)
  }
}

const animateBoxScreen = ({ currentY: posY, deltaY }) => {
  const currentY = posY - animationScreenEnd.bottleScreen
  const content = document.querySelector('#boxScreen .content')
  const wrapper = content.parentElement || content.parentNode
  const box = document.getElementById('box')
  const boxCover = document.getElementById('boxCover')
  const boxBadge = document.getElementById('boxBadge')
  const eye = document.querySelector('#boxScreen .eye')

  const viewContentHeight = content.offsetHeight * scale
  const heightDelta = Math.floor(((wrapper.offsetHeight - viewContentHeight) / 2) / scale)

  const scrollScreenHeight = content.offsetHeight + (heightDelta * 2)

  animationScreenEnd.boxScreen = animationScreenEnd.bottleScreen + (scrollScreenHeight * 5.3)

  if (boxBadgeStartOffsetTop === undefined) {
    boxBadgeStartOffsetTop = boxBadge.offsetTop
  }

  if (boxBadgeStartOffsetLeft === undefined) {
    boxBadgeStartOffsetLeft = boxBadge.offsetLeft
  }

  if (deltaY < 0) {
    box.style.opacity = '1'
  }

  if (deltaY < 0 && currentY <= 0) {
    box.style.transform = 'scale(0)'
    eye.style.opacity = '0'
    eye.style.zIndex = '-1'
    dispatchAnimationEnd('bottleScreen', true)
  } else if (currentY < scrollScreenHeight) {
    eye.style.opacity = '0'
    eye.style.zIndex = '-1'
    const animationPercent = currentY / scrollScreenHeight
    box.style.transform = `scale(${animationPercent})`
    boxCover.style.top = '0px'
  } else if (currentY < scrollScreenHeight * 2) {
    if (currentY < scrollScreenHeight * 1.8) {
      eye.style.opacity = '0'
      eye.style.zIndex = '-1'
      eye.className = 'eye modalOpen'
      eye.dataset.product = ''
    } else {
      eye.style.opacity = '1'
      eye.style.zIndex = '3'
      eye.className = 'eye modalOpen tShirtEye'
      eye.dataset.product = 'welcome'
    }
    box.style.transform = 'scale(1)'
    const animationPercent = (currentY - scrollScreenHeight) / scrollScreenHeight
    const height = boxCover.offsetHeight - 25
    const offset = height * animationPercent
    boxCover.style.top = `${offset}px`
  } else if (currentY < scrollScreenHeight * 2.3) {
    eye.style.opacity = '1'
    eye.style.zIndex = '3'
    eye.className = 'eye modalOpen tShirtEye'
    eye.dataset.product = 'welcome'
    const height = boxCover.offsetHeight - 25
    boxCover.style.top = `${height}px`
    boxBadge.style.transform = ''
    boxBadge.style.top = ''
    boxBadge.style.left = ''
    boxBadge.style.zIndex = ''
  } else if (currentY < scrollScreenHeight * 2.8) {
    const animationPercent = (((scrollScreenHeight * 2.8) - currentY) * 2) / scrollScreenHeight
    eye.style.opacity = '0'
    eye.style.zIndex = '-1'
    eye.className = 'eye modalOpen'
    eye.dataset.product = ''
    boxBadge.style.transform = `scale(${1 + (3.2 * (1 - animationPercent))}) rotate(${(39 * (1 - animationPercent)) - (46 * animationPercent)}deg)`
    boxBadge.style.top = `${(boxBadgeStartOffsetTop * animationPercent) + (((box.offsetHeight - boxBadge.offsetHeight) / 2) * (1 - animationPercent))}px`
    boxBadge.style.left = `${(boxBadgeStartOffsetLeft * animationPercent) + (((box.offsetWidth - boxBadge.offsetWidth) / 2) * (1 - animationPercent))}px`
    boxBadge.style.zIndex = '2'
  } else if (currentY < scrollScreenHeight * 3.8) {
    eye.style.opacity = '1'
    eye.style.zIndex = '3'
    eye.className = 'eye modalOpen boxBadgeEye'
    eye.dataset.product = 'id'
    boxBadge.style.transform = 'scale(4.2) rotate(39deg)'
    boxBadge.style.top = `${(box.offsetHeight - boxBadge.offsetHeight) / 2}px`
    boxBadge.style.left = `${(box.offsetWidth - boxBadge.offsetWidth) / 2}px`
    boxBadge.style.zIndex = '2'
  } else if (currentY < scrollScreenHeight * 4.3) {
    eye.style.opacity = '0'
    eye.style.zIndex = '-1'
    eye.className = 'eye modalOpen'
    eye.dataset.product = ''
    const animationPercent = (((scrollScreenHeight * 4.3) - currentY) * 2) / scrollScreenHeight
    boxBadge.style.transform = `scale(${1 + (3.2 * animationPercent)}) rotate(${39 * animationPercent - (46 * (1 - animationPercent))}deg)`
    boxBadge.style.top = `${(boxBadgeStartOffsetTop * (1 - animationPercent)) + (((box.offsetHeight - boxBadge.offsetHeight) / 2) * animationPercent)}px`
    boxBadge.style.left = `${(boxBadgeStartOffsetLeft * (1 - animationPercent)) + (((box.offsetWidth - boxBadge.offsetWidth) / 2) * animationPercent)}px`
    boxBadge.style.zIndex = '2'
  } else if (posY < animationScreenEnd.boxScreen) {
    eye.style.opacity = '0'
    eye.style.zIndex = '-1'
    eye.className = 'eye modalOpen'
    eye.dataset.product = ''
    boxBadge.style.transform = ''
    boxBadge.style.top = ''
    boxBadge.style.left = ''
    boxBadge.style.zIndex = ''
    const animationPercent = (currentY - (scrollScreenHeight * 4.3)) / scrollScreenHeight
    const height = boxCover.offsetHeight - 25
    const offset = height - (height * animationPercent)
    boxCover.style.top = `${offset}px`
  } else {
    eye.style.opacity = '0'
    eye.style.zIndex = '-1'
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
  } else {
    wrapper.style.top = `-${footerHeight}px`
    animationNextStop = true
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
  }
}

const rollbackAnimation = () => {
  const detail = { currentY: 0, deltaY: -1 }
  animateFirstScreen(detail)
  animateSecondScreen(detail)
  animateCupScreen(detail)
  animateBottleScreen(detail)
  animateBoxScreen(detail)
  animateLaptopScreen(detail)
}

const defaultActivateScreen = (screen, prev, stopAnimation) => {
  const footer = document.getElementById('footer')
  footer.style.zIndex = '-1'
  animationNextStop = true
  if (prev) {
    const current = document.getElementById(screen)
    const next = current.nextElementSibling
    if (next) {
      if (!stopAnimation) {
        const transitionend = e => {
          if (e.target === next) {
            current.style.zIndex = '2'
            next.style.zIndex = ''
            animationNextStop = false
            next.removeEventListener('transitionend', transitionend)
          }
        }
        next.addEventListener('transitionend', transitionend)
      }
      next.style.top = '100%'
    }
  } else {
    const current = document.getElementById(screen)
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
  const { nextScreen, prev, delay, callback } = e.detail
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
        break
    }
    currentScreen = nextScreen
    callback && callback()
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
  const roundSize = (maxSize / scale) * 2

  dispatchAnimationEnd('firstScreen', false)
  preloaderRound.style.height = `${roundSize}px`
  preloaderRound.style.width = `${roundSize}px`
  preloaderButton.style.display = 'none'
  preloader.style.opacity = `0`

  preloader.addEventListener('transitionend', () => {
    preloader.classList.remove('open')
  })

  if (!window.localStorage.hintClosed) {
    animationStop = true
    const modalHint = document.getElementById('modalHint')
    zIndex += 1
    modalHint.style.zIndex = zIndex.toString()
    modalHint.classList.add('open')
  } else {
    setTimeout(() => {
      for (let eye of document.querySelectorAll('#firstScreen .eye')) {
        eye.classList.add('active')
      }
    }, 1000)
  }
}

let videoStarted = false

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

const preloaderVideoEnd = () => {
  const preloader = document.getElementById('preloader')
  const preloaderButton = document.getElementById('preloaderButton')

  preloaderButton.addEventListener('click', startMainFlow)

  preloader.classList.add('videoEnd')
}

const videoSample = e => {
  if (e.target.currentTime > 2) {
    e.target.currentTime = 0
  }
}

const closeModal = e => {
  let { target } = e
  let i = 0
  while (!target.classList.contains('modalClose') && i < 10) {
    target = target.parentElement || target.parentNode
    i += 1
  }
  const modalOpenButtons = document.querySelectorAll('.modalOpen.hideOnClick')
  const { modal: modalName } = target.dataset
  const modal = document.getElementById(modalName)
  for (let modalOpenButton of modalOpenButtons) {
    if (modalOpenButton.dataset.modal === modalName) {
      modalOpenButton.style.opacity = ''
    }
  }
  if (modal) {
    modal.classList.remove('open')
    modal.classList.remove('inactiveVideoOrQuiz')
    zIndex -= 1
    modal.style.zIndex = ''
    animationStop = false
  }
}

const closeFullVideoOrQuiz = (addInactiveClass = true) => {
  const productBlock = document.getElementById('productBlock')
  const modalProduct = document.getElementById('modalProduct')
  const backButton = document.getElementById('backButton')
  const playButton = document.getElementById('playButton')
  const video = document.querySelector('#modalProduct video')
  const infoBlock = document.getElementById('infoBlock')
  const quizBlock = document.getElementById('quizBlock')

  playButton.style.display = ''
  setTimeout(() => {
    infoBlock.style.display = ''
    quizBlock.style.display = ''
  }, 200)
  setTimeout(() => {
    productBlock.style.height = ''
  }, 1200)
  backButton.removeEventListener('click', closeFullVideoOrQuiz)
  backButton.addEventListener('click', closeModal)
  modalProduct.classList.remove('activeVideo')
  modalProduct.classList.remove('activeQuiz')
  if (addInactiveClass) modalProduct.classList.add('inactiveVideoOrQuiz')
  if (video) video.addEventListener('timeupdate', videoSample)
}

const playFullVideo = () => {
  const modalProduct = document.getElementById('modalProduct')
  const backButton = document.getElementById('backButton')
  const playButton = document.getElementById('playButton')
  const video = document.querySelector('#modalProduct video')

  playButton.style.display = 'none'
  backButton.removeEventListener('click', closeModal)
  backButton.addEventListener('click', closeFullVideoOrQuiz)
  video.removeEventListener('timeupdate', videoSample)
  modalProduct.classList.remove('inactiveVideoOrQuiz')
  modalProduct.classList.add('activeVideo')
}

const fullScreenChange = (e) => {
  let fullscreenElement = document.fullscreenElement
  if (!fullscreenElement && document.mozFullScreenElement) {
    fullscreenElement = document.mozFullScreenElement
  } else if (!fullscreenElement && document.webkitFullscreenElement) {
    fullscreenElement = document.webkitFullscreenElement
  }

  const video = document.querySelector('#modalProduct video')
  if (e.target === fullscreenElement) {
    video.removeEventListener('timeupdate', videoSample)
    e.target.classList.add('mobileHorizontal')
  } else {
    video.addEventListener('timeupdate', videoSample)
    e.target.classList.remove('mobileHorizontal')
  }
}

const fullScreenVideo = () => {
  const video = document.querySelector('#modalProduct video')
  video.playsInline = undefined
  video.removeEventListener('timeupdate', videoSample)
  if (video.requestFullscreen) {
    video.requestFullscreen()
  } else if (video.webkitEnterFullscreen) {
    video.webkitEnterFullscreen()
  } else if (video.webkitRequestFullScreen) {
    video.webkitRequestFullScreen()
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen()
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen()
  }
}

const setQuizStep = step => () => {
  const quizQuestion = document.getElementById('quizQuestion')
  const curr = quizQuestion.innerText - 1

  if (Number.isInteger(step)) {
    quizQuestion.innerText = step + 1
  } else {
    const quizTitle = document.getElementById('quizTitle')
    quizTitle.innerText = 'Оставьте свои контакты и имя'
    const quizCounter = document.getElementById('quizCounter')
    quizCounter.style.display = 'none'
  }

  const currQ = document.getElementById('question_' + curr)
  currQ.classList.remove('active')
  const nextQ = document.getElementById('question_' + step)
  nextQ.classList.add('active')
}

const submitQuiz = e => {
  e.preventDefault()
  const form = document.getElementById('quiz')
  const formData = new window.FormData(form)
  const quizKey = formData.get('quizKey')
  const quiz = quizData[quizKey]
  let comment = formData.get('quizName')

  const dataKeys = Array.from(formData.keys())
    .filter((value, index, array) => array.indexOf(value) === index)

  quiz.forEach((q, i) => {
    comment += '\n' + q.question

    dataKeys.forEach(key => {
      if (key.includes('question_' + i)) {
        comment += '\n' + formData.getAll(key).join('\n')
      }
    })
  })

  const queryData = {
    '_url': window.location.href,
    'your-name': formData.get('name'),
    'your-phone': formData.get('phone'),
    'your-email': formData.get('mail'),
    'your-message': comment,
  }

  fetch('http://new.topline.gq/n8n/webhook/promo_orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(queryData)
  })
    .then(() => {
      const quizTitle = document.getElementById('quizTitle')
      quizTitle.innerText = 'Уже видим Ваш запрос!'
      const questions = document.querySelectorAll('#quizBlock .question.active')
      questions.forEach(q => { q.classList.remove('active') })
      const message = document.createElement('h2')
      message.className = 'message'
      message.innerText = 'Вернемся с расчетом бюджета и сроков в самое ближайшее время'
      form.append(message)
    })
}

const checkAnswer = (question, button) => () => {
  const form = document.getElementById('quiz')
  const answers = Array.from(new window.FormData(form).entries())
  const hasValue = answers.find(([key, val]) => {
    return key.includes('question_' + question) && val
  })
  button.disabled = !hasValue
}

const checkContact = (button) => () => {
  const form = document.getElementById('quiz')
  const answers = new window.FormData(form)
  const phone = answers.get('phone')
  const phoneValid = phone.length >= 16
  const mail = answers.get('mail')
  const mailValid = /[^@]+@[^@]+\.[^@.]+/.test(mail)
  button.disabled = !(answers.get('name') && (phoneValid || mailValid))
}

const startQuiz = productData => () => {
  const modalProduct = document.getElementById('modalProduct')
  const productBlock = document.getElementById('productBlock')
  const backButton = document.getElementById('backButton')
  const infoBlock = document.getElementById('infoBlock')
  const quizBlock = document.getElementById('quizBlock')
  const form = document.getElementById('quiz')
  form.addEventListener('submit', e => e.preventDefault())

  form.innerHTML = ''

  const quiz = quizData[productData.quizKey]

  const quizHeader = document.createElement('div')
  quizHeader.className = 'quizHeader'

  const quizTitle = document.createElement('h1')
  quizTitle.className = 'quizTitle'
  quizTitle.id = 'quizTitle'
  quizTitle.innerText = productData.quizTitle
  quizHeader.append(quizTitle)

  const quizCounter = document.createElement('div')
  quizCounter.className = 'quizCounter'
  quizCounter.id = 'quizCounter'
  const curr = document.createElement('span')
  curr.innerText = '1'
  curr.id = 'quizQuestion'
  quizCounter.append(curr)
  const total = document.createElement('span')
  total.innerText = quiz.length.toString()
  quizCounter.append(total)
  quizHeader.append(quizCounter)

  form.append(quizHeader)

  const quizKey = document.createElement('input')
  quizKey.name = 'quizKey'
  quizKey.type = 'hidden'
  quizKey.value = productData.quizKey
  form.append(quizKey)

  const quizName = document.createElement('input')
  quizName.name = 'quizName'
  quizName.type = 'hidden'
  quizName.value = productData.quizTitle
  form.append(quizName)

  quiz.forEach((question, i) => {
    const q = document.createElement('div')
    if (!i) {
      q.className = 'question active'
    } else {
      q.className = 'question'
    }
    q.id = 'question_' + i
    const title = document.createElement('h2')
    title.innerText = question.question
    q.append(title)

    const next = document.createElement('button')

    if (question.type === 'MULTI_CHOICE') {
      const subTitle = document.createElement('i')
      subTitle.innerText = '(можно выбрать несколько вариантов)'
      title.append(subTitle)

      const fieldSet = document.createElement('fieldset')
      question.choices.forEach(choice => {
        const label = document.createElement('label')
        label.className = 'checkbox'
        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.name = 'question_' + i + '_choice'
        checkbox.value = choice
        checkbox.addEventListener('change', checkAnswer(i, next))
        label.append(checkbox)
        const text = document.createElement('span')
        text.innerText = choice
        label.append(text)
        fieldSet.append(label)
      })
      q.append(fieldSet)
    }

    if (question.type === 'CHOICE') {
      const fieldSet = document.createElement('fieldset')
      question.choices.forEach(choice => {
        const label = document.createElement('label')
        label.className = 'radio'
        const radio = document.createElement('input')
        radio.type = 'radio'
        radio.name = 'question_' + i + '_choice'
        radio.value = choice
        radio.addEventListener('change', checkAnswer(i, next))
        label.append(radio)
        const text = document.createElement('span')
        text.innerText = choice
        label.append(text)
        fieldSet.append(label)
      })
      q.append(fieldSet)
    }

    if (question.type === 'INPUT') {
      const textarea = document.createElement('textarea')
      textarea.name = 'question_' + i + '_text'
      textarea.placeholder = question.placeholder
      textarea.addEventListener('input', checkAnswer(i, next))
      q.append(textarea)
    }

    if (question.other) {
      const textarea = document.createElement('textarea')
      textarea.name = 'question_' + i + '_text'
      textarea.placeholder = question.other
      textarea.addEventListener('input', checkAnswer(i, next))
      q.append(textarea)
    }

    const buttons = document.createElement('div')
    buttons.className = 'buttons'
    if (i) {
      const prev = document.createElement('button')
      prev.className = 'button border blue'
      prev.innerHTML = '<span>Назад</span>'
      prev.addEventListener('click', setQuizStep(i - 1))
      buttons.append(prev)
    }
    next.className = 'button blue'
    next.disabled = true
    if (i < quiz.length - 1) {
      next.innerHTML = '<span>Дальше</span>'
      next.addEventListener('click', setQuizStep(i + 1))
    } else {
      next.innerHTML = '<span>Оформить</span>'
      next.addEventListener('click', setQuizStep('contact'))
    }
    buttons.append(next)
    q.append(buttons)

    form.append(q)
  })

  {
    const submit = document.createElement('button')
    const q = document.createElement('div')
    q.className = 'question'
    q.id = 'question_contact'

    const name = document.createElement('input')
    name.name = 'name'
    name.placeholder = 'Имя'
    name.addEventListener('input', checkContact(submit))
    q.append(name)

    const phone = document.createElement('input')
    phone.type = 'phone'
    phone.name = 'phone'
    phone.placeholder = '+7 ('
    IMask(phone, {
      mask: '+{7}(000)000-00-00'
    })
    phone.addEventListener('input', checkContact(submit))
    q.append(phone)

    const mail = document.createElement('input')
    mail.name = 'mail'
    mail.placeholder = 'test@test.com'
    mail.addEventListener('input', checkContact(submit))
    q.append(mail)

    submit.className = 'submit button blue'
    submit.innerHTML = '<span>Отправить</span>'
    submit.disabled = true
    submit.addEventListener('click', submitQuiz)
    q.append(submit)

    form.append(q)
  }

  productBlock.style.height = `${productBlock.offsetHeight}px`
  backButton.removeEventListener('click', closeModal)
  backButton.addEventListener('click', closeFullVideoOrQuiz)
  setTimeout(() => {
    modalProduct.classList.remove('inactiveVideoOrQuiz')
    modalProduct.classList.add('activeQuiz')
  }, 10)
  setTimeout(() => {
    infoBlock.style.display = 'none'
    quizBlock.style.display = 'flex'
  }, 1000)
}

const activateProduct = (product, animate = true) => {
  const modalProduct = document.getElementById('modalProduct')
  modalProduct.classList.remove('activeVideo')
  const capitalizedProduct = product.charAt(0).toUpperCase() + product.slice(1)
  const productImageId = 'product' + capitalizedProduct
  const productNavigatorId = 'navigator' + capitalizedProduct
  const productImage = document.getElementById(productImageId)
  const productWrapper = productImage.parentElement || productImage.parentNode
  for (let image of productWrapper.children) {
    if (image !== productImage && image.classList.contains('active')) {
      image.classList.remove('active')
    }
  }
  productImage.classList.add('active')
  const productNavigator = document.getElementById(productNavigatorId)
  const navigator = productNavigator.parentElement || productNavigator.parentNode
  for (let nav of navigator.children) {
    if (nav !== productNavigator) nav.classList.remove('active')
  }
  productNavigator.classList.add('active')
  navigator.scrollTo(productNavigator.offsetLeft - (navigator.offsetWidth / 2), 0)

  const productData = productsData[product]
  const productTitle = document.getElementById('productTitle')
  productTitle.innerHTML = productData.title
  const productText = document.getElementById('productText')
  productText.innerHTML = productData.text
  const productShortText = document.getElementById('productShortText')
  productShortText.innerHTML = productData.shortText

  const quizButton = document.getElementById('quizButton')
  const mailButton = document.getElementById('mailButton')

  const productVideo = document.getElementById('productVideo')
  const playButton = document.getElementById('playButton')
  const playButtonMobile = document.getElementById('playButtonMobile')
  const downloadButton = document.getElementById('downloadButton')
  const downloadButtonMobile = document.getElementById('downloadButtonMobile')

  const videos = productVideo.getElementsByTagName('video')
  while (videos.length) {
    videos.item(0).remove()
  }

  if (productData.type === 'service') {
    quizButton.style.display = 'none'
    mailButton.style.display = 'flex'
    playButton.style.display = 'none'
    playButtonMobile.style.display = 'none'
    downloadButton.style.display = 'flex'
    downloadButtonMobile.style.display = 'flex'
    productVideo.classList.add('empty')
    productVideo.style.height = ''
    productVideo.style.width = ''
  } else if (productData.type === 'product') {
    mailButton.style.display = 'none'
    quizButton.style.display = 'flex'
    downloadButton.style.display = 'none'
    downloadButtonMobile.style.display = 'none'
    playButton.style.display = 'flex'
    playButtonMobile.style.display = 'flex'

    productVideo.classList.remove('empty')
    const video = document.createElement('video')
    video.addEventListener('timeupdate', videoSample)
    if (video.requestFullscreen) {
      video.addEventListener('fullscreenchange', fullScreenChange)
    } else if (video.mozRequestFullScreen) {
      video.addEventListener('mozfullscreenchange', fullScreenChange)
    } else if (video.webkitRequestFullScreen) {
      video.addEventListener('webkitfullscreenchange', fullScreenChange)
    }
    video.autoplay = true
    video.loop = true
    video.playsInline = true
    const source1 = document.createElement('source')
    source1.src = productData.video + '.webm'
    source1.type = 'video/webm'
    video.append(source1)
    const source2 = document.createElement('source')
    source2.src = productData.video + '.mp4'
    source2.type = 'video/mp4'
    video.append(source2)
    video.oncanplay = () => {
      video.play()
    }
    productVideo.insertBefore(video, productVideo.firstChild)

    playButton.addEventListener('click', playFullVideo)
    playButtonMobile.addEventListener('click', fullScreenVideo)
    quizButton.addEventListener('click', startQuiz(productData))
  }
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

  const modalOpenButtons = document.getElementsByClassName('modalOpen')
  const modalCloseButtons = document.getElementsByClassName('modalClose')

  for (let modalOpenButton of modalOpenButtons) {
    const { classList, dataset } = modalOpenButton
    const { modal: modalName } = dataset
    if (classList.contains('eye')) {
      modalOpenButton.addEventListener('transitionend', e => {
        if (e.propertyName === 'width') {
          let { target } = e
          if (e.target.dataset.click === '1') {
            e.target.dataset.click = ''
            let i = 0
            while (!target.classList.contains('modalOpen') && i < 10) {
              target = target.parentElement || target.parentNode
              i += 1
            }
            if (target === modalOpenButton) {
              const { product } = dataset
              const modal = document.getElementById(modalName)
              modal.classList.add('open')
              zIndex += 1
              modal.style.zIndex = zIndex.toString()
              activateProduct(product, false)
              target.style.top = target.dataset.top
              target.style.left = target.dataset.left
              target.style.height = target.dataset.height
              target.style.width = target.dataset.width
              target.style.fontSize = target.dataset.fontSize
              target.style.transition = target.dataset.transition
              target.style.zIndex = target.dataset.zIndex
              animationStop = true
            }
          }
        }
      })
      modalOpenButton.addEventListener('click', e => {
        let { target } = e
        let i = 0
        while (!target.classList.contains('modalOpen') && i < 10) {
          target = target.parentElement || target.parentNode
          i += 1
        }
        let content = target
        i = 0
        while (!content.classList.contains('content') && i < 100) {
          content = content.parentElement || content.parentNode
          i += 1
        }

        const maxSize = Math.max(window.innerHeight, window.innerWidth)
        const proportion = target.offsetHeight / target.offsetWidth
        let width
        let height
        if (proportion > 1) {
          height = maxSize * 15
          width = (maxSize * 15) / proportion
        } else {
          height = maxSize * 15 * proportion
          width = maxSize * 15
        }
        const scale = height / target.offsetHeight

        target.dataset.click = '1'
        target.dataset.transition = target.style.transition
        target.style.transition = 'font-size cubic-bezier(.4,0,1,.44) 1.5s, width cubic-bezier(.4,0,1,.44) 1.5s, height cubic-bezier(.4,0,1,.44) 1.5s, top cubic-bezier(.4,0,1,.44) 1.5s, left cubic-bezier(.4,0,1,.44) 1.5s'
        target.dataset.top = target.style.top
        target.style.top = '50%'
        target.dataset.left = target.style.left
        target.style.left = '50%'
        target.dataset.height = target.style.height
        target.style.height = `${height}px`
        target.dataset.width = target.style.width
        target.style.width = `${width}px`
        target.dataset.fontSize = target.style.fontSize
        target.style.fontSize = `${10 * scale}px`
        target.dataset.zIndex = target.style.zIndex
        zIndex += 1
        target.style.zIndex = zIndex
      })
    } else {
      modalOpenButton.addEventListener('click', e => {
        let { target } = e
        let i = 0
        while (!target.classList.contains('modalOpen') && i < 10) {
          target = target.parentElement || target.parentNode
          i += 1
        }
        const modal = document.getElementById(modalName)
        let animate = modal.classList.contains('open')
        modal.classList.add('open')
        zIndex += 1
        modal.style.zIndex = zIndex.toString()
        if (dataset.product) {
          activateProduct(dataset.product, animate)
        }
        if (target.classList.contains('hideOnClick')) {
          target.style.opacity = '0'
        }
        animationStop = true
      })
    }
  }

  for (let modalCloseButton of modalCloseButtons) {
    modalCloseButton.addEventListener('click', closeModal)
  }

  const changeProductButtons = document.getElementsByClassName('changeProduct')

  for (let changeProductButton of changeProductButtons) {
    const { dataset } = changeProductButton
    const { product } = dataset
    changeProductButton.addEventListener('click', () => {
      activateProduct(product)
      animationStop = true
    })
  }

  const navButtons = document.getElementsByClassName('navButton')
  const menuNavigator = document.getElementById('menuNavigator')
  const menuContent = menuNavigator.parentElement || menuNavigator.parentNode
  const menuContentWrapper = menuContent.parentElement || menuContent.parentNode

  for (let navButton of navButtons) {
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
      menuHintContentWrapper.style.transition = 'left 0.3s 0.2s'
      menuHintContentWrapper.style.left = `calc(100% - ${contentWidth}px)`
      for (let navButton2 of navButtons) {
        if (navButton2 !== navButton) {
          navButton2.style.opacity = '0.3'
        }
      }
    })
    navButton.addEventListener('mouseout', () => {
      menuHintContent.style.minWidth = ''
      menuHintContent.style.maxWidth = ''
      menuHintContentWrapper.style.transition = 'left 0.3s'
      menuHintContentWrapper.style.left = '100%'
      for (let navButton2 of navButtons) {
        if (navButton2 !== navButton) {
          navButton2.style.opacity = ''
        }
      }
    })
  }
}

const closeHint = () => {
  animationStop = false
  const modalHint = document.getElementById('modalHint')
  modalHint.classList.remove('open')
  zIndex -= 1
  modalHint.style.zIndex = ''
  setTimeout(() => {
    for (let eye of document.querySelectorAll('#firstScreen .eye')) {
      eye.classList.add('active')
    }
  }, 1000)
  window.localStorage.hintClosed = true
}

const setPreloaderVideo = () => {
  const isIOs = ['iPad', 'iPhone', 'iPod'].includes(navigator.platform)
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  const isSafari = window.safari !== undefined

  const preloader = document.getElementById('preloader')
  const preloaderVideo = document.getElementById('preloaderVideo')

  let src

  if (isSafari || isIOs) {
    src = preloaderVideos.hvc1.src
    preloader.style.background = '#FFFFFF'
    preloader.style.color = '#7382EC'
  } else if (preloaderVideo.canPlayType && preloaderVideo.canPlayType(`${preloaderVideos.vp9.type}; codecs=${preloaderVideos.vp9.codec}`)) {
    src = preloaderVideos.vp9.src
  } else {
    src = preloaderVideos.vp8.src
  }

  preloaderVideo.src = src
  preloaderVideo.oncanplay = () => {
    preloaderVideo.play()
  }
}

window.onload = () => {
  animationStop = true
  registerPseudoScrollEvent(window, getStopPseudoScroll)
  resizeContent()
  addEvents()
  setPreloaderVideo()
}
