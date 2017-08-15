## BEICHTSTUHL
A node.js tool made for beichtstuhl project.

### Prerequisites
This tool has been developed on [Ubuntu 16.04 (Xenial Xerus)](http://releases.ubuntu.com/16.04/), the following `System Requirements`, `Installation` and `instructions` are only for this Operating System.  
It is only referred here, in no other places, the relation of this tool to Ubuntu 16.04 will be mentioned.

## System Requirements
Root privileges may be required, adding `$ sudo _command_` before every command will fix it.
### 1- node.js (6.9.x)
#### installation:  
  install node: `$ apt-get install nodejs-legacy`  
  install npm: `$ sudo apt-get install npm`

#### Changing node version:
  To change `node` version, node version management will be required. It is likely to use ([n](https://github.com/tj/n)).  
  `$ npm install -g n`  
  `$ n 6.9.4`

### 2- [pm2](https://github.com/Unitech/pm2)
install: `$ npm install forever -g`

### 3- [ffmpeg](https://www.ffmpeg.org/)
install: `$ apt-get install ffmpeg`

### 4- [mplayer](http://www.mplayerhq.hu/)
install: `$ apt-get install mplayer`  
configurations:
- Copy the file `_files/input.con` into `~/.mplayer/input.conf` to disable key control.

### 5- Java
The latest java is required to run node `child_process`. You can skip it if you have the latest version.
- `$ add-apt-repository ppa:webupd8team/java`  
- `$ apt-get update`
- `$ apt-get install oracle-java8-installer`


## Installation

- Clone the repository locally.
- run `$ npm install`
