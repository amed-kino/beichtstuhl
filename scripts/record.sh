TIME_NOW=$(date +%s%N)
# ffmpeg -f v4l2 -i /dev/video0 -f alsa -ac 2 -i hw:0 "outputs/video_$TIME_NOW.mkv" -y

ffmpeg -y -f alsa -ac 2 -i pulse -acodec pcm_s16le -f v4l2 -framerate 25 -i /dev/video0 "outputs/video_$TIME_NOW.mkv"
