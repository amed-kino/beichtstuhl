TIME_NOW=$(date +%s%N)
ffmpeg -f alsa -i hw:0,0 -f video4linux2 -i /dev/video0 "outputs/video_$TIME_NOW.mpg"  -y &&
ffmpeg -i "outputs/video_$TIME_NOW.mpg" -vf smartblur=1.6:0.5:0,hue=10:1,gradfun=51:32,eq=1:0:0.1:1.25:1:0.96:1 "outputs_accepted/video_$TIME_NOW.mpg"
