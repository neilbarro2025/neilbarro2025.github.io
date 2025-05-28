window.onload = function () {
  const messagesEl = document.querySelector('.messages')
  const typingSpeed = 1
  const loadingText = '<b>•</b><b>•</b><b>•</b>'
  let messageIndex = 0

  const messages = [
  '<span style="color: black;"><em>Part 2: Chaya Lunch Date</em></span>',
  '<img src="assets/chaya.jpeg" style="width:250px; max-width:500px; border-radius:10px; margin:auto;">',
  '<span style="color: black;"><em>Picture by Sharmaine Galima (10/06/2024)</em></span>',
  '<span style="color: black;">Fate is a beautifully complex person, someone who never ceases to amaze me with her wonder and depth, and whom I will never tire of learning about. She has the most beautiful heart, one that is kind and considerate, yet carries a paradoxical nature that makes her all the more intriguing. She has the most beautiful mind, one that is intelligent, creative, and capable of seeing beauty in ways that few can. She holds a romantic view of life, yet her indecisiveness sometimes contrasts with her driven nature.</span>',
  '<span style="color: black;">I like how she’s flawed, imperfect in ways that make her feel real and grounded. Her openness to plans shows her trust and willingness to be present. She can be both fiercely independent and quietly vulnerable, creating a duality that invites understanding rather than judgment.</span>',
  '<span style="color: black;">Fate is someone whose values and perspectives inspire admiration. She sees the beauty in things that others might overlook. She has the most artistic soul, reflected in her love for creating the most wonderful art and for appreciating art. She’s funny, cute, smart, and she brings a sense of warmth wherever she goes. She\'s just amazing. She\'s sunshine and beauty.</span>',
  '<span style="color: black;">Being with her feels like solving a beautiful puzzle, one that is full of surprises, not to fix, but to be studied and to admire each piece of her as it fits into place. She challenges me to grow, to be patient, and to see the world through her uniquely vibrant lens. Fate is, quite simply, a person you don’t just like, she\'s someone you love, admire, cherish, and endlessly want to understand.</span>',
  '<a href="part2.html" style="text-decoration: none; color: red;">(Next Page) Alone with you in the Ether... (Can’t wait to share this with you! Almost done.)</a>',
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
    messageH = 245;
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
