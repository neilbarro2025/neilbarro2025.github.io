window.onload = function () {
  const messagesEl = document.querySelector('.messages')
  const typingSpeed = 1
  const loadingText = '<b>•</b><b>•</b><b>•</b>'
  let messageIndex = 0

  const messages = [
  '<span style="color: black;">Hiii, Fate! Let\'s start from the beginning</span>',
  '<span style="color: black;">From the moment I noticed you.</span>',
  '<span style="color: black;">From the moment you caught my eye.</span>',
  '<span style="color: black;">From the moment you made me pause and breathe as I started to admire you.</span>',
  '<span style="color: black;">From the moment you became my crush.</span>',
  '<span style="color: black;">Are you readyyyy?</span>',
  '<span style="color: black;"><em>Part 1: Crush</em></span>',
  '<span style="color: black;">Each time you spoke, I wanted to hear what you had to say. Your perspectives on different subjects caught my curiosity. I admired the way you spoke, the way you always knew the right words to say. I was always ready to listen. But in those early days, the only time I could was in class, when our professors asked you questions, and you answered effortlessly, leaving them impressed and me in awe.</span>',
  '<span style="color: black;">I was entranced by you. Your beauty. Your elegance. Your passion. Your mind. Your movements. Your voice. I was curious. I was obsessed. And all I could do was watch from a distance, admiring you in silence as you worked. I admired everything you were, everything you said, everything you did.</span>',
  '<span style="color: black;">I couldn’t get you out of my head. To distract myself, I wanted to translate what I felt into something I could hold onto. I composed this piece to turn what I felt into music, something real, something I could always come back to.</span>',
  '<span style="color: black;"><video src="assets/senticherde.mp4" controls preload="metadata" style="width:90%; margin-left:10%; padding-left: 10%; border-radius: 10px;"></video></span>',
  '<span style="color: black;"><em>S\'enticher de</em> - 07/19/2024</span>',
  '<span style="color: black;">I named this piece “S\'enticher de”, a reflection of just how crazyyyyy I was for you. OA ba? Hehe. Anyway, in this piece my focus was to play with different intensities to show how my feelings were very inconsistent at the time. Still, there was one thing I was completely sure of, I liked you, and I had to make a move.</span>',
  '<span style="color: black;">And so… Monaco Grand Prix 2024 happened. A few drinks here, a few cries there, got drunk, and finally! I sent the message. This is where it all began.</span>',
  '<span style="color: black;">I needed to quench the thirst, the endless curiosity, about who you were, what you liked, how you’d think, how you moved. I wanted to know everything. I wanted to study you.</span>',
  '<span style="color: black;">And so, with no excuse other than Formula 1 races, I made sure to message you for every Grand Prix that came after, and for each conversation we had, I learned more about you, and I became more and more curious.</span>',
  '<span style="color: black;">S\'enticher de. I was infatuated, I was obsessed. You were the most profound woman I had ever seen. You were perfect.</span>',
  '<span style="color: black;">While I was composing this piece, I was thinking of Lord Byrons poem. With each line, I saw you. With each line, I was reminded of your beauty.</span>',
  '<span style="color: black;">She walks in beauty, like the night <br>Of cloudless climes and starry skies;<br>And all that’s best of dark and bright<br>Meet in her aspect and her eyes;<br>Thus mellowed to that tender light<br>Which heaven to gaudy day denies.<br><br>One shade the more, one ray the less,<br>Had half impaired the nameless grace<br>Which waves in every raven tress,<br>Or softly lightens o’er her face;<br>Where thoughts serenely sweet express,<br>How pure, how dear their dwelling-place.<br><br>And on that cheek, and o’er that brow,<br>So soft, so calm, yet eloquent,<br>The smiles that win, the tints that glow,<br>But tell of days in goodness spent,<br>A mind at peace with all below,<br>A heart whose love is innocent!</span>',
  '<a href="part2.html" style="text-decoration: none; color: purple;">(Next Page) First Date...</a>',
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

  const getDimensions = function (elements) {
    const messageW = elements.message.offsetWidth + 2
    const messageH = elements.message.offsetHeight
    const messageS = getComputedStyle(elements.bubble)
    const paddingTop = Math.ceil(parseFloat(messageS.paddingTop))
    const paddingLeft = Math.ceil(parseFloat(messageS.paddingLeft))
    return {
      loading: { w: '4rem', h: '2.25rem' },
      bubble: { w: pxToRem(messageW + paddingLeft * 2), h: pxToRem(messageH + paddingTop * 2) },
      message: { w: pxToRem(messageW), h: pxToRem(messageH) }
    }
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
