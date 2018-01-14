/* global $ */

$(function () {
  var current = 0
  var player = $('audio')[0]
  var playlist = $('#playlist')
  var tracks = playlist.find('li a')
  var len = tracks.length - 1
  var track = null

  init()

  function init () {
    // set initial volume
    player.volume = 1.0

    playlist.on('click', 'a', function (e) {
      e.preventDefault()
      track = $(this)
      current = track.parent().index()
      play(track)
    })

    player.addEventListener('ended', function (e) {
      current++

      if (current > len) {
        current = 0
        track = playlist.find('a')[0]
      } else {
        track = playlist.find('a')[current]
      }

      play($(track))
    })
  }

  function play (track) {
    player.src = track.attr('href')
    track.parent().addClass('active').siblings().removeClass('active')
    player.load()
    player.play()
  }
})
