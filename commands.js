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
// osd_cat is the command that shows the OSD over the screen
osd_cat = 'osd_cat -o 320 -f -*-*-*-*-*-*-60-520-60-*-*-*-*-*'
var notAllowed = 'echo "Not allowed!" | ' + osd_cat
var recording = 'echo "REC" | ' + osd_cat
var stopRecording = 'echo "STOP" | ' + osd_cat
var filtered = 'echo "Filtered" | ' + osd_cat
var notFiltered = 'echo "Without filters" | ' + osd_cat

onScreenDisplay = {notAllowed, recording, stopRecording}
module.exports = {playerCmd, withoutFilterArgs, withFilterArgs, onScreenDisplay}
