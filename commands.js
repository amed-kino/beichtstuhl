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
// var recordingCmd = 'ffmpeg'
var recordingCmd = 'ffmpeg -f video4linux2 -i /dev/video0 file.mpeg'
var recordingArgs = [
  '-f', 'video4linux2',
  // '-video_size', '640x480',
  '-i', '/dev/video0',
  'file.mpeg'
]

// osd_cat is the command that shows the OSD over the screen
var osd_cat = 'osd_cat -o 320 -f -*-*-*-*-*-*-60-520-60-*-*-*-*-*'
var osd_cat_bottom = 'osd_cat -T Recording..... -A right -o -480 -p bottom -f -*-*-*-*-*-*-36-120-*-*-*-*-*-*'
var notAllowed = 'echo "Not allowed!" | ' + osd_cat_bottom
var recording = 'echo "REC" | ' + osd_cat
var play = 'echo "play" | ' + osd_cat
var stopRecording = 'echo "STOP" | ' + osd_cat
var filtered = 'echo "Filtered" | ' + osd_cat
var notFiltered = 'echo "Without filters" | ' + osd_cat

onScreenDisplay = {notAllowed, recording, stopRecording}
module.exports = {recordingCmd, recordingArgs, playerCmd, withoutFilterArgs, withFilterArgs, onScreenDisplay, play}
