# LiveCaption
A live closed captioning tool for those who are hard of hearing

The zoom call is streamed over a protocol called RTMP. A basic RTMP server is setup using
`ffmpeg`. Audio is extracted through `ALSA` and processed via the `volsk` api. Text is sent intermittently to Zoom.
