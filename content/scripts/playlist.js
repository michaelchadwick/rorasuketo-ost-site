/* global $ */

$(function () {
  var current = 0
  var player = $('audio')[0]
  var rewind = $('#rewind')
  var forward = $('#forward')
  var playlist = $('#playlist')
  var tracks = playlist.find('li a')
  var len = tracks.length - 1
  var track = null

  player.volume = 1.0

  playlist.on('click', 'a', function (e) {
    e.preventDefault()
    track = $(this)
    current = track.parent().index()
    play(track)
  })

  rewind.on('click', function (e) {
    goBack(e)
  })

  forward.on('click', function (e) {
    goForward(e)
  })

  player.addEventListener('ended', function (e) {
    goForward(e)
  })

  function goForward (e) {
    e.preventDefault()

    if (current === len) {
      current = 0
    } else {
      current = current + 1
    }
    changeTrack(current)
  }

  function goBack (e) {
    e.preventDefault()

    if (current === 0) {
      current = len
    } else {
      current = current - 1
    }
    changeTrack(current)
  }

  function changeTrack (current) {
    play($(playlist.find('a')[current]))
  }

  function play (track) {
    player.src = track.attr('href')
    track.parent().addClass('active').siblings().removeClass('active')
    player.load()
    player.play()
  }
})
