window.onload = function () {
  const messagesEl = document.querySelector('.messages')
  const typingSpeed = 1
  const loadingText = '<b>•</b><b>•</b><b>•</b>'
  let messageIndex = 0

  const messages = [
  '<span style="color: black;"><em>Part 4: Winter Nocturne (unfinished)</em></span>',
  '<span style="color: black;"><em>Mon Amor Fati Nocturne 1<br>"Winter Nocturne"<br>Op. 2. No. 2</em></span>',
  '<span style="color: black;">Dec 31, 2024</span>',
  '<span style="color: black;">The night sky is empty<br>A new moon hides,<br>And the stars retreat behind the city’s glow.<br>Only a dark grey canvas lingers,<br>Heavy and silent.<br>Yet what joy it would still bring<br>To share this desolate sky with her<br>Her hand in mine,<br>Transforming emptiness into beauty.</span>',
  '<span style="color: black;">I miss her presence,<br>One that turns the dull, such as this sky, to divine,<br>Her voice, a melody that soothes my restless soul.<br>Her smile that captures my heart;<br>Her laughter that brightens even the dimmest days.</span>',
  '<span style="color: black;">I miss her scent,<br>A quiet balm that words cannot describe.<br>I miss the soft brush of her skin on my fingers,<br>The way moonlight would kiss her face,<br>Where unspoken thoughts bloom serenely,<br>In such a sweet, tender, innocent realm of her gaze they dwell.</span>',
  '<span style="color: black;">I miss her.</span>',
  '<span style="color: black;">I miss her.</span>',
  '<span style="color: black;">I miss her.</span>',
  '<span style="color: black;">May this be one of the last of these moments I\'ll have without her.<br>May the future offer its gentleness,<br>To fill these quiet, mundane moments with her presence,<br>Where all I will long for is eternity</span>',
  '<a href="part5.html" style="text-decoration: none; color: purple;">(Next Page) Meditations...</a>',
]


  const getFontSize = () => parseInt(getComputedStyle(document.body).fontSize)
  const pxToRem = px => px / getFontSize() + 'rem'

  const createBubbleElements = function (message, position) {
    const bubbleEl = document.createElement('div')
    const messageEl = document.createElement('span')
    const loadingEl = document.createElement('span')

    bubbleEl.classList.add('bubble', 'is-loading', 'cornered', position === 'right' ? 'right' : 'left')
    messageEl.classList.add('message')
    loadingEl.classList.add('loading')

    messageEl.innerHTML = message
    loadingEl.innerHTML = loadingText

    bubbleEl.appendChild(loadingEl)
    bubbleEl.appendChild(messageEl)
    bubbleEl.style.opacity = '0'

    return { bubble: bubbleEl, message: messageEl, loading: loadingEl }
  }

const getDimensions = function(elements) {
  const image = elements.message.querySelector('img');
  let messageW, messageH;

  if (image) {
    // Use the image's natural size if available, fallback to its client size
    messageW = (image.naturalWidth || image.clientWidth) || elements.message.offsetWidth;
    messageH = 400;
  } else {
    // Fallback to the message container size
    messageW = elements.message.offsetWidth;
    messageH = elements.message.offsetHeight;
  }

  messageW += 2; // small buffer for borders/margins

  const messageS = getComputedStyle(elements.bubble);
  const paddingTop = Math.ceil(parseFloat(messageS.paddingTop));
  const paddingLeft = Math.ceil(parseFloat(messageS.paddingLeft));
  const paddingBottom = Math.ceil(parseFloat(messageS.paddingBottom));

  return {
    loading: {
      w: '4rem',
      h: '2.25rem'
    },
    bubble: {
      w: pxToRem(messageW + paddingLeft * 2),
      h: pxToRem(messageH + paddingTop + paddingBottom)
    },
    message: {
      w: pxToRem(messageW),
      h: pxToRem(messageH)
    }
  };
}


  const sendMessage = function (message, position = 'left') {
    const loadingDuration = (message.replace(/<(?:.|\n)*?>/gm, '').length * typingSpeed) + 500
    const elements = createBubbleElements(message, position)
    messagesEl.appendChild(elements.bubble)
    messagesEl.appendChild(document.createElement('br'))

    const dimensions = getDimensions(elements)
    elements.message.style.display = 'block'
    elements.bubble.style.width = '0rem'
    elements.bubble.style.height = dimensions.loading.h
    elements.message.style.width = dimensions.message.w
    elements.message.style.height = dimensions.message.h
    elements.bubble.style.opacity = '1'

    const bubbleOffset = elements.bubble.offsetTop + elements.bubble.offsetHeight
    if (bubbleOffset > messagesEl.offsetHeight) {
      anime({ targets: messagesEl, scrollTop: bubbleOffset, duration: 750 })
    }

    anime({
      targets: elements.bubble,
      width: ['0ch', dimensions.loading.w],
      marginTop: ['2.5rem', 0],
      marginLeft: ['-2.5rem', 0],
      duration: 800,
      easing: 'easeOutElastic'
    })

    const loadingLoop = anime({
      targets: elements.bubble,
      scale: [1.05, 0.95],
      duration: 1100,
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutQuad'
    })

    anime({
      targets: elements.loading,
      translateX: ['-2rem', '0rem'],
      scale: [0.5, 1],
      duration: 400,
      delay: 25,
      easing: 'easeOutElastic'
    })

    const dotsPulse = anime({
      targets: elements.bubble.querySelectorAll('b'),
      scale: [1, 1.25],
      opacity: [0.5, 1],
      duration: 300,
      loop: true,
      direction: 'alternate',
      delay: i => (i * 100) + 50
    })

    setTimeout(function () {
  loadingLoop.pause();
  dotsPulse.pause(); // Pause the dotsPulse animation
  elements.bubble.classList.remove('is-loading');
  elements.bubble.removeChild(elements.loading); // Remove the loading element
  anime({
    targets: elements.message,
    opacity: [0, 1],
    duration: 100
  });
  anime({
    targets: elements.bubble,
    scale: 1,
    width: [dimensions.loading.w, dimensions.bubble.w],
    height: [dimensions.loading.h, dimensions.bubble.h],
    marginTop: 0,
    marginLeft: 0,
    duration: 800,
    easing: 'easeOutElastic'
  });
}, loadingDuration - 100)

  }

  const sendMessages = function () {
    const message = messages[messageIndex]
    if (!message) return
    sendMessage(message)
    messageIndex++
    setTimeout(sendMessages, (message.replace(/<(?:.|\n)*?>/gm, '').length * typingSpeed) + anime.random(900, 1200))
  }

  sendMessages()
}
