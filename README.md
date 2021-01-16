# LiveCaption
A live closed captioning tool for those who are hard of hearing

The zoom call is streamed over a protocol called RTMP. A basic RTMP server is setup using
`ffmpeg`. Audio is extracted through `ALSA` and processed via the `volsk` api. Text is sent intermittently to Zoom.


```
ffmpeg -re -f lavfi -i aevalsrc="sin(400*2*PI*t)" -ar 11025 -f alsa -f flv "rtmp://localhost:8084" #stream data

ffmpeg -f flv -listen 1 -i rtmp://localhost:8084 #receive data

```
