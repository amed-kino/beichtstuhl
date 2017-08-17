mplayer -fs tv:// -tv driver=v4l2:device=/dev/video1 -xineramascreen 1 -vf mirror,smartblur=1.6:0.5:0,unsharp=l5x2:.8:c10x10:0,hue=10:1,gradfun=120:320,eq2=1:12:0.1:1.25:1:0.96:1
