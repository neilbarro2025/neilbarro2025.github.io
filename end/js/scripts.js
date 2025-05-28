window.onload = function () {
  const messagesEl = document.querySelector('.messages')
  const typingSpeed = 1
  const loadingText = '<b>•</b><b>•</b><b>•</b>'
  let messageIndex = 0

  const messages = [
  '<span style="color: black;">Fate, I haven’t finished this yet. I couldn’t wait to show you what I’ve done, so I already posted them even though they’re still unfinished. I just really wanted to tell you everything I’ve written for you. I’m still working on Part 6, and I hope it’s okay if it takes me a little longer to finish.</span>',
  '<span style="color: black;">I love you, Fate, and I’ll keep loving you for the rest of my life. There’s nothing else in this world I want more than what we have. I’ll cherish this. I’ll take care of you, no matter how fucked up things may get.</span>',
  '<span style="color: black;">I want you to know that I’ll wait. I’ll wait for you. That’s my promise.</span>',
  '<span style="color: black;">I know it’s a little early to say all of this, but it’s you. I’m so certain about you. I want this so much, Fate.</span>',
  '<span style="color: black;">When you feel lonely, I want you to come back to this. I want you to keep looking for me, to tell me everything.</span>',
  '<span style="color: black;">You deserve everything, to be happy, to be loved, to feel safe. I’ll give you everything I can.</span>',
  '<span style="color: black;">I love you so much. And I miss you so much, Fate!</span>',
  '<span style="color: black;">- Neil</span>',
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
