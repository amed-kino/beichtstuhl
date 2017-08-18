// osd_cat is the command that shows the OSD over the screen
// Note: enhancement and consistency is required.

var osd_cat = 'osd_cat -p bottom -f -*-*-*-*-*-*-60-520-60-*-*-*-*-*'
var osd_cat_smaller = 'osd_cat -o 320 -d 3 -c green -f -*-*-*-*-*-*-40-320-60-*-*-*-*-*'
var osd_cat_delayed = 'osd_cat -o 320 -d 60 -f -*-*-*-*-*-*-60-520-60-*-*-*-*-*'
var osd_cat_other_side = 'osd_cat -A right -p bottom -f -*-*-*-*-*-*-36-120-*-*-*-*-*-*'

var notAllowed = 'echo "Not allowed!" | ' + osd_cat_other_side
var recording = 'echo "REC" | ' + osd_cat_delayed
var stopRecording = 'echo "Recording done!\n\nfile is ready!" | ' + osd_cat_smaller
var play = 'echo "PLAY" | ' + osd_cat
var save = 'echo "SAVED!" | ' + osd_cat_smaller
var reset = 'echo "RESET\n\nfiles deleted" | ' + osd_cat

var videoNotFiltered = 'echo "Video Without Filters" | ' + osd_cat
var videoFilter1 = 'echo "Video Filter 1" | ' + osd_cat
var videoFilter2 = 'echo "Video Filter 2" | ' + osd_cat

var audioNotFiltered = 'echo "Without audio Filter" | ' + osd_cat
var audioFilter1 = 'echo "Audio Filter 1" | ' + osd_cat
var audioFilter2 = 'echo "Audio Filter 2" | ' + osd_cat

module.exports = {
  notAllowed,
  recording,
  stopRecording,
  play,
  save,
  reset,
  videoNotFiltered,
  videoFilter1,
  videoFilter2,
  audioNotFiltered,
  audioFilter1,
  audioFilter2
}
