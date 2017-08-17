// Required packages
var gkm = require('gkm');
var childProcess = require('child_process')
var terminate = require('terminate');
var OSD = require('./on_screen_display_commands.js')

// Create variables placeholders
var mirrorHandler = null
var currentMirror = null

var recording = false
var playing = false
var recordingHandler = null
var onScreenDisplay = null


function terminateProcess(pid){
  terminate(pid)
  return null
}

function showOSD(command){
  onScreenDisplay = childProcess.exec(command , function(err, stdout,stderr){});
}

function closePreviousOSD(){
  if (onScreenDisplay) { onScreenDisplay = terminateProcess(onScreenDisplay.pid)}
}

function startMirror(mirrorSuffix){
  if(mirrorSuffix === currentMirror){
    keypressPreventAction(false)
  } else {
    if (mirrorHandler) { mirrorHandler = terminateProcess(mirrorHandler.pid) }
    mirrorHandler = childProcess.execFile('sh', ['./scripts/mirror_' + mirrorSuffix + '.sh'], (err, stdout, stderr) => {});
  }
}



function initializeMirror () {
  mirrorType = 'filter0'
  startMirror(mirrorType)
  currentMirror = mirrorType
}

if (!mirrorHandler){initializeMirror()}

// prevent keys from being pressed.
function keypressPreventAction(osdShow = true) {
  if (osdShow) {showOSD(OSD.notAllowed)}
  if (recording) {showRecordingOSDAgain()}
}

// show record after 3 seconds
// it is related to show that keypress is not allowed and return back to record sign.
function showRecordingOSDAgain () {
  showOSD(OSD.recording)
  setTimeout(function(){
      if(recording) {
        closePreviousOSD()
        showOSD(OSD.recording)
      }}, 3000);
}

gkm.events.on('key.*', function(data) {
  //  Listen to keyboard in the backgroudnd

  // PressIn is excluded, the app only listens to pressOut
  if (this.event === 'key.released'){

    closePreviousOSD()

    if (data[0] === '1'){
      if (!recording && !playing){
        mirrorType = 'filter0'
        startMirror(mirrorType)
        currentMirror = mirrorType
        showOSD(OSD.videoNotFiltered)
      }else{
        keypressPreventAction()
      }
    }
    if (data[0] === '2'){
      if (!recording && !playing){
        mirrorType = 'filter1'
        startMirror(mirrorType)
        currentMirror = mirrorType
        showOSD(OSD.videoFilter1)
      }else{
        keypressPreventAction()
      }
    }
    if (data[0] === '3'){
      if (!recording && !playing){
        mirrorType = 'filter2'
        startMirror(mirrorType)
        currentMirror = mirrorType
        showOSD(OSD.videoFilter2)
      }else{
        keypressPreventAction()
      }
    }

    // Toggle record and stop- arbitrary has been set to 'Space'
    if (data[0] === 'Space'){
      if (recording){
        recording = false
        console.log('stop recording /////')
        if (recordingHandler) { recordingHandler = terminateProcess(recordingHandler.pid) }
        showOSD(OSD.stopRecording)

      } else {
        recording = true
        console.log('recording /////')
        showOSD(OSD.recording)
        recordingHandler = childProcess.execFile('sh', ['./scripts/record.sh'], (err, stdout, stderr) => {});
      }
    }

    // Toggle record and stop- arbitrary has been set to 'Space'
    if (data[0] === 'P'){
      if (recording || playing){
        keypressPreventAction()
      } else {
        showOSD(OSD.play)
        playHandler =  childProcess.execFile('sh', ['./scripts/play.sh'], (err, stdout, stderr) => {});
      }
    }


    // Debug key - temporarily set, should be removed in production.
    if (data[0] === 'Q'){
      abort();
    }
  }
})



// Exit Procedure - Cleanup processes before exit.

process.stdin.resume();//so the program will not close instantly

function exitHandler(options, err) {

    if (mirrorHandler) { mirrorHandler.kill() }
    if (recordingHandler) { recordingHandler.kill() }
    if (onScreenDisplay) { terminateProcess(onScreenDisplay.pid) }

    if (options.cleanup) console.log('clean');
    if (err) console.log(err.stack);
    if (options.exit) process.exit();
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));


// end exit procedures
