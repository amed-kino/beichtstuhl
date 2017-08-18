LAST_FILE=$(ls ./outputs/ -lat | head -2 | tail -1 | awk '{print $9}')
ffmpeg -i "outputs/video_$LAST_FILE.mpg" -vf unsharp=7:5:0.8:7:7:-2,hue=-5:10,eq=8:7:4:4:122 "outputs_accepted/video_$LAST_FILE.mpg"


# TIME_NOW=$(date +%s%N)
# ffmpeg -f alsa -i hw:0,0 -f video4linux2 -i /dev/video0 "outputs/video_$TIME_NOW.mpg"  -y &&
# ffmpeg -i "outputs/video_$TIME_NOW.mpg" -vf unsharp=7:5:0.8:7:7:-2,hue=-5:10,eq=8:7:4:4:122 "outputs_accepted/video_$TIME_NOW.mpg"
