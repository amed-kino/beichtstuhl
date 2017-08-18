// Required packages
var gkm = require('gkm');
var childProcess = require('child_process')
var terminate = require('terminate');
var OSD = require('./on_screen_display_commands.js')

// Create variables placeholders
var mirrorHandler = null
var currentMirror = null
var currentAduioEcho = null
var recording = false
var recordingSaved = false
var playing = false
var recordingHandler = null
var AudioEchoHandler = null
var onScreenDisplay = null

var keypressPrevented = false

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

function startAduioEcho(audioSuffix){
  if(audioSuffix === currentAduioEcho){
    keypressPreventAction(false)
  } else {
    if (AudioEchoHandler) { AudioEchoHandler = terminateProcess(AudioEchoHandler.pid) }
    AudioEchoHandler = childProcess.execFile('sh', ['./scripts/audio_' + audioSuffix + '.sh'], (err, stdout, stderr) => {});
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
  if (this.event === 'key.released' && !keypressPrevented){

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

    if (data[0] === '4'){
      if (!recording && !playing){
        audioType = 'filter0'
        startAduioEcho(audioType)
        currentAduioEcho = audioType
        showOSD(OSD.audioNotFiltered)
      }else{
        keypressPreventAction()
      }
    }
    if (data[0] === '5'){
      if (!recording && !playing){
        audioType = 'filter1'
        startAduioEcho(audioType)
        currentAduioEcho = audioType
        showOSD(OSD.audioFilter1)
      }else{
        keypressPreventAction()
      }
    }
    if (data[0] === '6'){
      if (!recording && !playing){
        audioType = 'filter2'
        startAduioEcho(audioType)
        currentAduioEcho = audioType
        showOSD(OSD.audioFilter2)
      }else{
        keypressPreventAction()
      }
    }

    // Toggle record and stop- arbitrary has been set to '7'
    if (data[0] === '7'){
      closePreviousOSD()
      if (recording){
        // Stop Recording

        recording = false
        recordingSaved = true

        console.log('stop recording /////')
        if (recordingHandler) {
          showOSD(OSD.stopRecording)
          recordingHandler.stdin.write("q")
          recordingHandler.kill()
        }
      } else {
        // toggle between save and stop recording
        if (!recordingSaved) {
          // here start recording
          console.log('recording /////')
          recording = true
          showOSD(OSD.recording)
          recordingHandler = childProcess.execFile('sh', ['./scripts/record.sh'], {killSignal: 'SIGINT'});
        } else {
          showOSD(OSD.save)
          playHandler =  childProcess.execFile('sh', ['./scripts/accept_last.sh'], (err, stdout, stderr) => {});
          recordingSaved = false
        }
      }
    }

    // Cancel button
    if (data[0] === '8'){
      recordingSaved = false
      recording = false

      if (recordingHandler) {
        terminateProcess(terminateProcess)
        recordingHandler.kill()
      }
      if (onScreenDisplay) { terminateProcess(onScreenDisplay.pid) }
      showOSD(OSD.reset)
    }


    // Debug key - temporarily set, should be removed in production.
    if (data[0] === 'Q'){
      process.exit(0);
    }
  }
})



// Exit Procedure - Cleanup processes before exit.

process.stdin.resume();//so the program will not close instantly

function exitHandler(options, err) {

    if (mirrorHandler) { mirrorHandler.kill() }
    if (recordingHandler) {
      terminateProcess(terminateProcess)
      recordingHandler.kill()
    }
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
