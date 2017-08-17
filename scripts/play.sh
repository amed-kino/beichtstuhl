LAST_FILE=$(ls outputs/ -lat | head -2 | tail -1 | awk '{print $9}')
mplayer -fs outputs/"$LAST_FILE" -xineramascreen 1
