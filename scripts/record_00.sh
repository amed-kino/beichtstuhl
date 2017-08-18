# TIME_NOW=$(date +%s%N)
# ffmpeg -f alsa -i hw:0,0 -f video4linux2 -i /dev/video0 "outputs/video_$TIME_NOW.mpg"  -y


LAST_FILE=$(ls ./outputs/ -lat | head -2 | tail -1 | awk '{print $9}')
cp ./outputs/"$LAST_FILE" ./outputs_accepted/"$LAST_FILE"
