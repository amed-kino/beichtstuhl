TIME_NOW=$(date +%s%N)
ffmpeg -f v4l2 -i /dev/video1 -f alsa -ac 2 -i hw:1 "outputs/video_$TIME_NOW.mkv" -y
