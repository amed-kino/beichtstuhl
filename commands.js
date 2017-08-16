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
// Note: enhancement and consistency is required.
var osd_cat = 'osd_cat -o 320 -f -*-*-*-*-*-*-60-520-60-*-*-*-*-*'
var osd_cat_smaller = 'osd_cat -o 320 -d 3 -c green -f -*-*-*-*-*-*-40-320-60-*-*-*-*-*'
var osd_cat_delayed = 'osd_cat -o 320 -d 60 -f -*-*-*-*-*-*-60-520-60-*-*-*-*-*'
var osd_cat_bottom = 'osd_cat -T Recording..... -A right -o -180 -p bottom -f -*-*-*-*-*-*-36-120-*-*-*-*-*-*'
var notAllowed = 'echo "Not allowed!" | ' + osd_cat_bottom
var recording = 'echo "REC" | ' + osd_cat_delayed
var play = 'echo "PLAY" | ' + osd_cat
var stopRecording = 'echo "Recording done!\n\nfile is ready!" | ' + osd_cat_smaller
var filtered = 'echo "Filtered" | ' + osd_cat
var notFiltered = 'echo "Without filters" | ' + osd_cat

onScreenDisplay = {notAllowed, recording, stopRecording, play}
module.exports = {recordingCmd, recordingArgs, playerCmd, withoutFilterArgs, withFilterArgs, onScreenDisplay}
