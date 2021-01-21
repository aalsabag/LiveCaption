#!/usr/bin/env python3

from vosk import Model, KaldiRecognizer, SetLogLevel
import sys
import os
import wave
import subprocess
import argparse
import time
from flask import Flask, request
import asyncio
app = Flask(__name__)

SetLogLevel(0)
#ffmpeg -f flv -listen 1 -i rtmp://localhost:1935/live/app -c copy -f flv -listen 1 rtmp://localhost:1936/live/app


sample_rate=16000
model = Model("model")
rec = KaldiRecognizer(model, sample_rate)
loop = asyncio.new_event_loop()

if not os.path.exists("model"):
    print ("Please download the model from https://alphacephei.com/vosk/models and unpack as 'model' in the current folder.")
    exit (1)


@app.route('/health')
def login():
    return 'I am healthy!'

@app.route('/process', methods=['POST'])
def process():
    caption_key = request.form['caption_key']
    meeting_id = request.form['meeting_id']
    if not verify_meeting(meeting_id):
        return 500
    meeting_length = float(request.form['meeting_length']) #in hours

    ending_time = time.time() + (60 * meeting_length * 60) # 60 seconds times n hours times 60 minutes 
    receive_endpoint = "rtmp://localhost:1935/live/{0}".format(meeting_id)
    output_endpoint =  "rtmp://localhost:1936/live/{0}".format(meeting_id)

    start_call = "ffmpeg -f flv -listen 1 -i {0} -c copy -f flv -listen 1 {1} &".format(receive_endpoint, output_endpoint)
    os.system(start_call)
    os.system('sleep 10')

    process = subprocess.Popen(['ffmpeg', '-loglevel', 'quiet', '-i',
                               output_endpoint,
                                '-ar', str(sample_rate) , '-ac', '1', '-f', 's16le', '-'],
                                stdout=subprocess.PIPE)

    result = loop.create_task(process_stream(process, ending_time))
    return "hi"
    #print(rec.FinalResult())    


async def process_stream(process, ending_time):
    os.system("sleep 5")
    print("testing")
    while time.time() < ending_time:
        print("in loop")
        data = process.stdout.read(4000)
        if len(data) == 0:
            continue
        if rec.AcceptWaveform(data):
            print(rec.Result())
    return "hello"

def verify_meeting(meeting_id):
    return True

def main():
    print("Starting Program")
    app.run(host='0.0.0.0', port=5000) 
    

if __name__ == "__main__":
    main()