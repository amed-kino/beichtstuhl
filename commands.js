var playerCmd = 'mplayer'
var withoutFilterArgs = [
  '-fs', 'tv://',
  '-tv', 'driver=v4l2:device=/dev/video0',
  '-vf', 'hqdn3d',
  '-xineramascreen', 1
]
var withFilterArgs = [
  '-fs', 'tv://',
  '-tv', 'driver=v4l2:device=/dev/video0',
  '-vf', 'smartblur=.6:-.5:0,unsharp=l5x5:.8:c5x5:.4,hue=-20:5,gradfun=130:220',
  '-xineramascreen', 1
]

module.exports = {playerCmd, withoutFilterArgs, withFilterArgs}
