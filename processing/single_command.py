#!/usr/bin/env python3

from vosk import Model, KaldiRecognizer, SetLogLevel
import sys
import os
import wave
import subprocess
import time

SetLogLevel(0)

if not os.path.exists("model"):
    print ("Please download the model from https://alphacephei.com/vosk/models and unpack as 'model' in the current folder.")
    exit (1)

sample_rate=64000
model = Model("model")
rec = KaldiRecognizer(model, sample_rate)

# process = subprocess.Popen(['ffmpeg', '-loglevel', 'quiet', '-i',
#                             sys.argv[1],
#                             '-ar', str(sample_rate) , '-ac', '1', '-f', 's16le', '-'],
#                             stdout=subprocess.PIPE)
#process = subprocess.Popen([ 'ffmpeg','-f','flv','-listen','1','-i','rtmp://localhost:1935/live/123456','-c','-ar', 16000, '-ac', 1, '-f','s161e','-'], stdout=subprocess.PIPE)

# Process working perfectly fine
#process = subprocess.Popen([ 'ffmpeg','-listen','1','-i','rtmp://localhost:1935/live/123456', '-vn', '-acodec', 'copy', '-ar', str(sample_rate), '-ac', '1', '-f', 'adts', '-'], stdout=subprocess.PIPE)

#successful output but no word recognition
#process = subprocess.Popen([ 'ffmpeg','-listen','1','-i','rtmp://localhost:1935/live/123456', '-vn', '-acodec', 'copy', '-ar', str(sample_rate), '-ac', '1', '-f', 'flv', '-'], stdout=subprocess.PIPE)

#working aac format
# ffmpeg -listen 1 -i rtmp://localhost:1935/live/123456 -vn -acodec copy -ar 16000 -ac 1 output-audio.aac

process = subprocess.Popen([ 'ffmpeg','-f','flv','-listen','1','-i','rtmp://localhost:1935/live/123456','-acodec', 'pcm_s16le', '-f','s16le', '-ac', '1', '-ar', str(sample_rate), '-'], stdout=subprocess.PIPE)
while True:
    data = process.stdout.read(int(sample_rate/4))
    if len(data) == 0:
        print("nothing to see here")
        break
    if rec.AcceptWaveform(data):
        print(rec.Result())


print(rec.FinalResult())