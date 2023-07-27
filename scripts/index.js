let scale = 1

const resizeContent = () => {
  const hc = document.getElementById('hiddenContent')
  const { body } = document
  scale = Math.min(body.offsetWidth / hc.offsetWidth, body.offsetHeight / hc.offsetHeight)

  const header = document.getElementById('header')
  header.style.transform = `scale(${scale})`
  header.style.opacity = '1'

  const contents = document.getElementsByClassName('content')
  for(let content of contents) {
    content.style.transform = `scale(${scale})`
    content.style.opacity = '1'
  }
}

const animate = (e) => {
  const { currentY, deltaY } = e.detail
  const content = document.querySelector('#cupScreen .content')
  const wrapper = content.parentElement || content.parentNode
  const cup = document.getElementById('cup')
  const cupText = document.getElementById('cupText')

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

  const scrollWidth = content.offsetWidth + cupText.offsetWidth + (widthDelta * 2)

  if (currentY <= 0) {
    cup.style.opacity = '1'
    cup.style.transform = 'rotate(0deg)'
    if (deltaY < 0) {
      cup.style.top = `calc(100% + ${heightDelta}px)`
    } else {
      cup.style.top = `calc((100% - ${cup.offsetHeight}px) / 2)`
    }
    cupText.style.left = `calc(100% + ${widthDelta}px)`
  } else if (currentY >= scrollWidth) {
    cup.style.opacity = '0'
    cup.style.transform = 'rotate(360deg)'
    cupText.style.left = `calc(100% + ${widthDelta}px - ${scrollWidth}px)`
  } else {
    cup.style.opacity = '1'
    const rotate = (currentY / scrollWidth) * 360
    cup.style.transform = `rotate(${-rotate}deg)`
    cupText.style.left = `calc(100% + ${widthDelta}px - ${currentY}px)`
  }
}

window.onload = () => {
  registerPseudoScrollEvent(window)
  resizeContent()

  window.addEventListener('resize', resizeContent)
  window.addEventListener('pseudoScroll', animate)
}
