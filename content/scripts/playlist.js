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

  init()

  function init () {
    player.volume = 1.0

    playlist.on('click', 'a', function (e) {
      e.preventDefault()
      track = $(this)
      current = track.parent().index()
      play(track)
    })

    rewind.on('click', function (e) {
      e.preventDefault()
      current = current - 1
      changeTrack(current)
    })

    forward.on('click', function (e) {
      e.preventDefault()
      current = current + 1
      changeTrack(current)
    })

    player.addEventListener('ended', function () {
      current = current + 1
      changeTrack(current)
    })
  }

  function changeTrack (current) {
    if (current > len) {
      current = 0
    } else if (current < 0) {
      current = len
    }

    play($(playlist.find('a')[current]))
  }

  function play (track) {
    player.src = track.attr('href')
    track.parent().addClass('active').siblings().removeClass('active')
    player.load()
    player.play()
  }
})
