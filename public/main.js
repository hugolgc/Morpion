$(() => {

  const socket = io()
  const main = $('main')
  var draw = 'circle'

  const init = () => {
    main.html('')
    for (var i = 0; i < 9; i++) {
      main.append(`<div id="${i}" class="w-32 h-32 border-2 cursor-pointer"></div>`)
    }
    $('div').click((event) => setplay(event.target.id))
  }

  const setDraw = (string = null) => {
    if (string === null) {
      if (draw === 'circle') draw = 'cross'
      else draw = 'circle'
    } else draw = string
  }

  const getPlay = (int, string) => {
    $(`#${int}`).attr('class', 'w-32 h-32 border-2 pointer-events-none')
    $(`#${int}`).html((string === 'circle') ? '<img src="circle.png" alt="Circle">' : '<img src="cross.png" alt="Cross">')
    setDraw(string)
  }

  const setplay = (id) => {
    $(`#${id}`).attr('class', 'w-32 h-32 border-2 pointer-events-none')
    $(`#${id}`).html((draw === 'circle') ? '<img src="circle.png" alt="Circle">' : '<img src="cross.png" alt="Cross">')
    setDraw()
    socket.emit('getPlay', { int: id, string: draw })
  }

  init()
  socket.emit('init', draw)

  $('a').click(() => {
    init()
    socket.emit('init', draw)
  })

  socket.on('init', (bool) => {
    setDraw(bool)
    init()
  })

  socket.on('getPlay', (array) => {
    getPlay(array.int, array.string)
  })

})
