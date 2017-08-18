LAST_FILE=$(ls ./outputs/ -lat | head -2 | tail -1 | awk '{print $9}')

ffmpeg -i "outputs/video_$LAST_FILE.mpg" "outputs/audio_$LAST_FILE.wav" &&
rubberband -p -5 "outputs/audio_$LAST_FILE.wav" "outputs/audio_pitched_$LAST_FILE.wav" &&
ffmpeg -i "outputs/video_$LAST_FILE.mpg" -vf unsharp=7:5:0.8:7:7:-2,hue=-5:10,eq=8:7:4:4:122 "outputs/video_filtered_$LAST_FILE.mpg" &&
ffmpeg -i "outputs/audio_pitched_$LAST_FILE.wav" -itsoffset -00:00:00.5 -i "outputs/video_filtered_$LAST_FILE.mpg" "outputs_accepted/video_$LAST_FILE.mpg"



TIME_NOW=$(date +%s%N)
ffmpeg -f alsa -i hw:0,0 -f video4linux2 -i /dev/video0 "outputs/video_$TIME_NOW.mpg" -y &&
ffmpeg -i "outputs/video_$TIME_NOW.mpg" "outputs/audio_$TIME_NOW.wav" &&
rubberband -p -5 "outputs/audio_$TIME_NOW.wav" "outputs/audio_pitched_$TIME_NOW.wav" &&
ffmpeg -i "outputs/video_$TIME_NOW.mpg" -vf unsharp=7:5:0.8:7:7:-2,hue=-5:10,eq=8:7:4:4:122 "outputs/video_filtered_$TIME_NOW.mpg" &&
ffmpeg -i "outputs/audio_pitched_$TIME_NOW.wav" -itsoffset -00:00:00.5 -i "outputs/video_filtered_$TIME_NOW.mpg" "outputs_accepted/video_$TIME_NOW.mpg"
