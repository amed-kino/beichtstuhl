LAST_FILE=$(ls ./outputs/ -lat | head -2 | tail -1 | awk '{print $9}')


ffmpeg -i "outputs/video_$LAST_FILE.mpg" "outputs/audio_$LAST_FILE.wav" &&
rubberband -p +5 "outputs/audio_$LAST_FILE.wav" "outputs/audio_pitched_$LAST_FILE.wav" &&
ffmpeg -i "outputs/video_$LAST_FILE.mpg" -vf smartblur=1.6:0.5:0,hue=10:1,gradfun=51:32,eq=1:0:0.1:1.25:1:0.96:1 "outputs/video_filtered_$LAST_FILE.mpg" &&
ffmpeg -i "outputs/audio_pitched_$LAST_FILE.wav" -itsoffset -00:00:00.5 -i "outputs/video_filtered_$LAST_FILE.mpg" "outputs_accepted/video_$LAST_FILE.mpg"

# TIME_NOW=$(date +%s%N)
# ffmpeg -f alsa -i hw:0,0 -f video4linux2 -i /dev/video0 "outputs/video_$TIME_NOW.mpg" -y &&
# ffmpeg -i "outputs/video_$TIME_NOW.mpg" "outputs/audio_$TIME_NOW.wav" &&
# rubberband -p +5 "outputs/audio_$TIME_NOW.wav" "outputs/audio_pitched_$TIME_NOW.wav" &&
# ffmpeg -i "outputs/video_$TIME_NOW.mpg" -vf smartblur=1.6:0.5:0,hue=10:1,gradfun=51:32,eq=1:0:0.1:1.25:1:0.96:1 "outputs/video_filtered_$TIME_NOW.mpg" &&
# ffmpeg -i "outputs/audio_pitched_$TIME_NOW.wav" -itsoffset -00:00:00.5 -i "outputs/video_filtered_$TIME_NOW.mpg" "outputs_accepted/video_$TIME_NOW.mpg"
# #
