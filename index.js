var gkm = require('gkm');
var childProcess = require('child_process')
var terminate = require('terminate');
var commands = require('./commands.js')

var processHandler = null
var mirrorType = null
var recording = false
var recordingHandler = null
var onScreenDisplay = null
console.log(commands.recordingCmd, commands.recordingArgs.concat(commands.recordingArgs))
function terminateProcess(pid){
  terminate(pid)
  return null
}

function initializeMirror () {
  // processHandler = childProcess.execFile('sh', ['./scripts/play_mirror_without_filter.sh'], (err, stdout, stderr) => {});
  processHandler = childProcess.spawn(commands.playerCmd, commands.withoutFilterArgs.concat([]), {stdio: 'ignore', detached: true});
  mirrorType = 'withoutFilter'
}
if (!processHandler){initializeMirror()}

// Cleanup before exit.
process.stdin.resume();//so the program will not close instantly
function exitHandler(options, err) {

    if (processHandler) {
      // terminateProcess(processHandler.pid)
      processHandler.kill()
    }
    if (options.cleanup) console.log('clean');
    if (err) console.log(err.stack);
    if (options.exit) process.exit();
}

// prevent keys from being pressed.
function keypressPreventAction() { onScreenDisplay = childProcess.exec(commands.onScreenDisplay.notAllowed); }


setInterval(function(){
    if(recording) {
      if (onScreenDisplay) { onScreenDisplay = terminateProcess(onScreenDisplay.pid) }
      onScreenDisplay = childProcess.exec(commands.onScreenDisplay.recording , function(err, stdout,stderr){});
    }
}, 6000);

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));
//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));
//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));

gkm.events.on('key.*', function(data) {

  if (this.event === 'key.released'){

    // close the previous OSD
    if (onScreenDisplay) { onScreenDisplay = terminateProcess(onScreenDisplay.pid) }
    if (recordingHandler) { recordingHandler = terminateProcess(recordingHandler.pid) }

    if (data[0] === 'D'){
      if (recording){
        keypressPreventAction()
      } else if (mirrorType ==='filter'){
        mirrorType = 'withoutFilter'
        processHandler = terminateProcess(processHandler.pid)
        processHandler = childProcess.spawn(commands.playerCmd, commands.withoutFilterArgs.concat([]), {stdio: 'ignore', detached: true});
      } else {
        mirrorType = 'filter'
        processHandler = terminateProcess(processHandler.pid)
        processHandler = childProcess.spawn(commands.playerCmd, commands.withFilterArgs.concat([]), {stdio: 'ignore', detached: true});
      }
    }
    if (data[0] === 'Space'){
      if (recording){
        recording = false
        onScreenDisplay = childProcess.exec(commands.onScreenDisplay.stopRecording , function(err, stdout,stderr){});
      } else {
        recording = true
        console.log('recording /////')
        onScreenDisplay = childProcess.exec(commands.onScreenDisplay.recording , function(err, stdout,stderr){});
        recordingHandler = childProcess.execFile('sh', ['./scripts/record.sh'], (err, stdout, stderr) => {
          console.log(err, stdout, stderr)
        });

        // recordingHandler = childProcess.spawn(commands.recordingCmd, commands.recordingArgs, {stdio: 'ignore', detached: true});
      }
    }
    if (data[0] === 'P'){
      if (recording){
        keypressPreventAction()
      } else {
        onScreenDisplay = childProcess.exec(commands.onScreenDisplay.recording , function(err, stdout,stderr){});
      }
    }
    if (data[0] === 'Q'){
      // temporarily for debugging
      abort();
    }
  }
})
