var gkm = require('gkm');
var childProcess = require('child_process')
var terminate = require('terminate');

var processHandler = null

function terminateProcess (handler) {
  terminate(handler.pid, function(err, done){
    if(err) {
      console.log(err);
    } else {
      console.log('Done!');
    }
    console.log('.')
  });
  return null
}


gkm.events.on('key.*', function(data) {
  if (this.event === 'key.released'){
    if (data[0] === 'D'){
      if (!processHandler){
        processHandler = childProcess.execFile('sh', ['./scripts/play.sh'], (err, stdout, stderr) => {});
      }

    }
    if (data[0] === 'C'){
      if (processHandler){
        processHandler = terminateProcess(processHandler)
      }

    }
  }
})
