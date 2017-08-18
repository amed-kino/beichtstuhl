mplayer -fs tv:// -tv driver=v4l2:device=/dev/video1 -xineramascreen 1 -vf mirror,unsharp=l12x5:.8:c8x8:8,hue=-5:10,eq2=8:7:4:4:122
