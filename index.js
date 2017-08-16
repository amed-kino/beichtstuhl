// Required packages
var gkm = require('gkm');
var childProcess = require('child_process')
var terminate = require('terminate');
var commands = require('./commands.js')

// Create variables placeholders
var mirrorHandler = null
var mirrorType = null
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

function startMirror(type){
  args = (type === 'filter') ? commands.withFilterArgs : commands.withoutFilterArgs
  if (mirrorHandler) { mirrorHandler = terminateProcess(mirrorHandler.pid) }
  // mirrorHandler = childProcess.spawn(commands.playerCmd, args);
}

function initializeMirror () {
  mirrorType = 'withoutFilter' // variable may be needed globally
  startMirror(mirrorType)
}

if (!mirrorHandler){initializeMirror()}

// prevent keys from being pressed.
function keypressPreventAction() {
  showOSD(commands.onScreenDisplay.notAllowed)
  showRecordingOSDAgain()
}

// show record after 3 seconds
// it is related to show that keypress is not allowed and return back to record sign.
function showRecordingOSDAgain () {
  closePreviousOSD()
  showOSD(commands.onScreenDisplay.recording)
  setTimeout(function(){
      if(recording) {
        closePreviousOSD()
        showOSD(commands.onScreenDisplay.recording)
      }}, 3000);
}

gkm.events.on('key.*', function(data) {
  //  Listen to keyboard in the backgroudnd

  // PressIn is excluded, the app only listens to pressOut
  if (this.event === 'key.released'){

    closePreviousOSD()

    // Switch filter - arbitrary has been set to 'D'
    if (data[0] === 'D'){
      if (recording){
        keypressPreventAction()
      } else if (mirrorType ==='filter'){
        mirrorType = 'withoutFilter'
        startMirror(mirrorType)
      } else {
        mirrorType = 'filter'
        startMirror(mirrorType)
      }
    }

    // Toggle record and stop- arbitrary has been set to 'Space'
    if (data[0] === 'Space'){
      if (recording){
        recording = false
        console.log('stop recording /////')
        if (recordingHandler) { recordingHandler = terminateProcess(recordingHandler.pid) }
        showOSD(commands.onScreenDisplay.stopRecording)

      } else {
        recording = true
        console.log('recording /////')
        showOSD(commands.onScreenDisplay.recording)
        recordingHandler = childProcess.execFile('sh', ['./scripts/record.sh'], (err, stdout, stderr) => {});
      }
    }

    // Toggle record and stop- arbitrary has been set to 'Space'
    if (data[0] === 'P'){
      if (recording || playing){
        keypressPreventAction()
      } else {
        showOSD(commands.onScreenDisplay.play)
        playHandler =  childProcess.execFile('sh', ['./scripts/play.sh'], (err, stdout, stderr) => {});
      }
    }

    // Toggle record and stop- arbitrary has been set to 'Space'
    if (data[0] === 'P'){
      if (recording || playing){
        keypressPreventAction()
      } else {
        showOSD(commands.onScreenDisplay.play)
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
