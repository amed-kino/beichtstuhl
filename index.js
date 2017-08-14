var gkm = require('gkm');
var childProcess = require('child_process')
var terminate = require('terminate');

var processHandler = null
var mirrorType = null

function terminateProcess (handler) {
  terminate(handler.pid, function(err, done){
    if(err) {
      console.log(err);
    } else {
      console.log('Done!');
    }
  });
  return null
}

function initializeMirror () {
  processHandler = childProcess.execFile('sh', ['./scripts/play_mirror_without_filter.sh'], (err, stdout, stderr) => {});
  mirrorType = 'withoutFilter'
}
if (!processHandler){initializeMirror()}

gkm.events.on('key.*', function(data) {
  if (this.event === 'key.released'){
    if (data[0] === 'D'){
      if(mirrorType ==='filter'){
        mirrorType = 'withoutFilter'
        processHandler = terminateProcess(processHandler)
        processHandler = childProcess.execFile('sh', ['./scripts/play_mirror_without_filter.sh'], (err, stdout, stderr) => {});
      } else {
        mirrorType = 'filter'
        processHandler = terminateProcess(processHandler)
        processHandler = childProcess.execFile('sh', ['./scripts/play_mirror_without_filter.sh'], (err, stdout, stderr) => {});
      }

    }
  }
})
