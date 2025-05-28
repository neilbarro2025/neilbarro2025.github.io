window.onload = function () {
  const messagesEl = document.querySelector('.messages')
  const typingSpeed = 1
  const loadingText = '<b>•</b><b>•</b><b>•</b>'
  let messageIndex = 0

  const getCurrentTime = function () {
    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const current = hours + (minutes * 0.01)
    if (current >= 0 && current < 1) return 'How are youu? Is everything okay? It’s already late, 12 na. Sleep na, Fate, when you can. Take breaks too.'
    if (current >= 1 && current < 2) return 'Hiiii. Why are you still awake? Sleep na, baby ko. It’s 1 na. Tell me if you need anything, wake me up if I’m asleep na.'
    if (current >= 2 && current < 3) return 'Fateee, bat gising ka pa? 2 na. Bat ka nagpupuyat? I want you to be healthy too. You can always continue what you are doing tomorrow. Sleep naaa.'
    if (current >= 3 && current < 4) return 'It’s 3 naaa. Aren’t you scared, baka may multo na with you? Hehe. Let’s sleep na, my love. Need anything? Wake me up anytime.'  
    if (current >= 4 && current < 5) return 'Fate! Good morninggg! Kakagising mo? Or you haven’t slept pa? It’s still early, you should sleep pa… or finally sleep na! I love you.'  
    if (current >= 5 && current < 6) return 'Good morninggg, my baby! I hope you have a wonderful day. I love you so much! Chat mo me if you need anythinggg.'    
    if (current >= 6 && current < 7) return 'Hiii baby kooo! Did you sleep well? Enjoy your day! Good luck! I love you so so so so much.'    
    if (current >= 7 && current < 8) return 'Fatee, you’re awake! Yayyy! Miss na kitaa! Chat mo na ako, I’m probably dying to get a notification from you na hehe.'
    if (current >= 8 && current < 9) return 'Good morningggg, Fate! Have a great day! Eat breakfast ha—dapat complete 3 meals a day ka. I love youuu.'
    if (current >= 9 && current < 10) return 'Hiiii, Fate! How are youuu? How was your sleep? I love youuuu!'
    if (current >= 10 && current < 11) return 'FATE! Hehe. I love you! Enjoy your day!'
    if (current >= 11 && current < 12) return 'Hi, baby ko! Tara brunch? Chat mo na ako. Let’s eat, I’m probably super gutom na rin. Taraaa!'
    if (current >= 12 && current < 13) return 'Fateee, lunch naaa. Don’t skip lunch ah. Eat na, my love. Eat well!'
    if (current >= 13 && current < 14) return 'Hiiiii, Fate! Do you need anything? Miss mo na ko? Dali! Chat mo na ako, miss na rin kitaa.'
    if (current >= 14 && current < 15) return 'Fate! Look behind you, I’m here na, ready to hug youuu! Joke lang hehe. Pero come chat me na, let’s meet so I can hug you for real.'
    if (current >= 15 && current < 16) return 'Hiii Fate! How are youuuu? I hope you’re having an amazing day.'
    if (current >= 16 && current < 17) return 'Fate! The day’s almost overrr. Kaya mo yan! Good luck! I love you!' 
    if (current >= 17 && current < 18) return 'Hiiiii! Miss mo ko noh? I miss youuu!' 
    if (current >= 18 && current < 19) return 'Hi Fateee! Dinner later? Ayain mo na ko, dali hehe. Hope you’re enjoying your dayyy.' 
    if (current >= 19 && current < 20) return 'Hellooooo poooo! How are you? Did you have dinner na? Eat naaa, eat well my baby.' 
    if (current >= 20 && current < 21) return 'Hiiii Fate! How are youuu? Tired? Talk tayo, come chat me na. Kulitin mo ako!' 
    if (current >= 21 && current < 22) return 'Fateeee! We should be chatting na ngayon eh. How’s your day? Tell me everything, I want to know it all.' 
    if (current >= 22 && current < 23) return 'Hi my loveee! Sleep na when you can while it’s still early para complete sleep! Good nighttt baby ko! Or if di ka pa matutulog, go fate! Tapusin mo na agad ginagawa mo so you can rest. Don’t forget to say good night sakin ha. Tell me pag sleep ka na.' 
    return 'Hiiiii Fate! Busy ka pa? Take some breaks rin ha. I love you so much. Tell me if you need anything. I’m always here for you! Ay, tara, let’s get a midnight snack? Walk? Drive? Hehe. Taraaa, chat mo na meee.'
  }

  const messages = [
  '<span style="color: black;">Fate!!!</span>',
  '<span style="color: black;">Hiii</span>',
  '<span style="color: black;">I made you something! I know this is long, long, long overdue na hehe.  It\'s not finished yet, but you can expect to see some few stuff here already.</span>',
  '<span style="color: black;">Inside, you’ll find pieces of me. Our story. My thoughts, the things I’ve learned about you, the moments that made me fall for you, and everything I love about you.</span>',
  '<span style="color: black;">It’s a collection of us, of the way you make my world feel a lot brighter.</span>',
  '<span style="color: black;">I hope you’ll love it as much as I loved making it for you.</span>',
  '<span style="color: black;">Oh and</span>',
  `<span style="color: black;">${getCurrentTime()}</span>`,
  '<span style="color: black;">I miss youuuu! Can\'t wait to see you again after this break</span>',
  '<span style="color: black;">I love you so muchhh, my baby, my sweet Fate</span>',
  '<span style="color: black;">~ Neil ❤️</span>',
  '<a href="part1.html" onclick="handleYesClick()" style="text-decoration: none; color: purple;" id="yes-button" class="yes-button">(Next Page) Where it All Began...</a>',
  '<em><a href="part1.html" style="text-decoration: none; color: Black;">Skip to Parts: </a><br><a href="part1.html" onclick="handleYesClick()" style="text-decoration: none; color: purple;" id="yes-button" class="yes-button">P1: Where it all began</a><br><a href="part2.html" onclick="handleYesClick()" style="text-decoration: none; color: purple;" id="yes-button" class="yes-button">P2: Chaya Lunch Date</a><br><a href="part3.html" onclick="handleYesClick()" style="text-decoration: none; color: purple;" id="yes-button" class="yes-button">P3: Alone with You in the Ether</a><br><a href="part4.html" onclick="handleYesClick()" style="text-decoration: none; color: purple;" id="yes-button" class="yes-button">P4: Winter Nocturne</a><br><a href="part5.html" onclick="handleYesClick()" style="text-decoration: none; color: purple;" id="yes-button" class="yes-button">P5: Meditations</a></em>'
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

  // Handlers moved to global scope
  // Handlers moved to global scope
  window.handleNoClick = function () {
    const noButton = document.querySelector('.no-button')
    const yesButton = document.querySelector('.yes-button')
    noButton.textContent = messages[messageIndex]
    messageIndex = (messageIndex + 1) % messages.length
    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize)
    yesButton.style.fontSize = `${currentSize * 1.5}px`
  }

  window.handleYesClick = function () {
    fetch('https://script.google.com/macros/s/AKfycbznfjxS6xmKGeDq11WVVFL-fuVVTbylbUWTn4EGXASyRcoZmfP82CYtWnPXzI9FOvbJiQ/exec')
    alert('Six parts. Six sides. Our story. The story of how we met, fell quietly, stayed, and kept making each other smile. A story of how everything became as it was, only very slightly different. This is us.')
    window.location.href = 'yes_page.html'
  }
}
