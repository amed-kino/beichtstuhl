TIME_NOW=$(date +%s%N)
ffmpeg -y -f alsa -i hw:0,0 -f v4l2 -i /dev/video0 -af "asetrate=44100*7/4" "outputs/video_$TIME_NOW.avi"

# ffmpeg -f v4l2 -i /dev/video0 -f alsa -ac 2 -i hw:0 "outputs/video_$TIME_NOW.mkv" -y
# ffmpeg -y -f alsa -i pulse -f v4l2 -i /dev/video0 "outputs/video_$TIME_NOW.mpeg"
