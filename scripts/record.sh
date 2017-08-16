# ffmpeg -f video4linux2 -i /dev/video0 outputs/1.mp4 -y
ffmpeg -f video4linux2 -i /dev/video0  -preset ultrafast -crf 27 outputs/1.mp4  -y
