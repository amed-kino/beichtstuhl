var gkm = require('gkm');
var childProcess = require('child_process')
var terminate = require('terminate');
var commands = require('./commands.js')
var processHandler = null
var mirrorType = null


function terminateProcess (handler) {
  terminate(handler.pid, function(err, done){
    if(err) {
      console.log(err);
    }
  });
  handler.kill()
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
      terminateProcess(processHandler)
    }
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


gkm.events.on('key.*', function(data) {
  if (this.event === 'key.released'){
    if (data[0] === 'D'){
      if(mirrorType ==='filter'){
        mirrorType = 'withoutFilter'
        processHandler = terminateProcess(processHandler)
        processHandler = childProcess.spawn(commands.playerCmd, commands.withoutFilterArgs.concat([]), {stdio: 'ignore', detached: true});
      } else {
        mirrorType = 'filter'
        processHandler = terminateProcess(processHandler)
        processHandler = childProcess.spawn(commands.playerCmd, commands.withFilterArgs.concat([]), {stdio: 'ignore', detached: true});
      }
    }
  }
})
