window.onload = function () {
  const messagesEl = document.querySelector('.messages')
  const typingSpeed = 1
  const loadingText = '<b>•</b><b>•</b><b>•</b>'
  let messageIndex = 0

  const messages = [
  '<span style="color: black;"><em>Part 3: Alone with You in the Ether (unfinished)</em></span>',
  '<img src="assets/ether.jpeg" style="width:300px; max-width:500px; border-radius:10px; margin:auto;">',
  '<span style="color: black;"><em>\'Alone with You in the Ether\'</em></span>',
  '<span style="color: black;">Her favorite book.</span>',
  '<span style="color: black;">I started reading this in July because I wanted to understand her. She once featured it on an Intagram post, and I immediately looked for it. A month later, still only one chapter in, she told me it was her favorite and recommended that I give it a read. It took me another month to finish, longer than I expected, but with it, I learned something unexpected.</span>',
  '<span style="color: black;">Love.</span>',
  '<span style="color: black;">In this book, I learned how to love. Not the grand, sweeping kind that exists in certainty, but the quiet, intricate kind. The one that requires patience, understanding, and the willingness to see someone fully. It showed me that love is not just admiration or attraction, it is a study, it is caring, it is knowing and still choosing.</span>',
  '<span style="color: black;">In Regan, I saw the complexity of emotions, the way love can feel overwhelming yet undeniable. In Aldo, I saw the relentless search for meaning, the way love can be both grounding and infinite. And in the space between them, I understood something about Fate and myself. How love is not always about what is easy or clear but about what is real.</span>',
  '<span style="color: black;">This book made me realize that loving Fate is not just about feeling drawn to her, but about wanting to know her, to understand every piece of her. It’s about listening when she speaks, watching how she thinks, holding space for the parts of her she doesn’t always show. It is about patience. It is about appreciation. It is about seeing her, truly seeing her, and choosing her everyday.</span>',
  '<span style="color: black;">And so, I love her, not in the way that demands, but in the way that stays.</span>',
  '<a href="part4.html" style="text-decoration: none; color: purple;">(Next Page) Winter Nocturne...</a>',
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
