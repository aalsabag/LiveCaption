#!/usr/bin/env python3

from vosk import Model, KaldiRecognizer, SetLogLevel
import os
import subprocess
import time
import requests
import json
from flask import Flask, request
import threading
from flask_cors import CORS
app = Flask(__name__)

# cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
# TODO stricter implementation of CORS origins
CORS(app)
SetLogLevel(0)
#ffmpeg -f flv -listen 1 -i rtmp://localhost:1935/live/app -c copy -f flv -listen 1 rtmp://localhost:1936/live/app

sample_rate=16000
model = Model("/models/english")
rec = KaldiRecognizer(model, sample_rate)

if not os.path.exists("/models/english"):
    print ("Please download the model from https://alphacephei.com/vosk/models and unpack as '/models/english'")
    exit (1)


@app.route('/health')
def login():
    return 'I am healthy!'

@app.route('/process', methods=['POST'])
def process():
    api_token = request.form['api_token']
    meeting_id = request.form['meeting_id']
    if not verify_meeting(meeting_id):
        return 500
    meeting_length = float(request.form['meeting_length']) #in hours

    ending_time = time.time() + (60 * meeting_length * 60) # 60 seconds times n hours times 60 minutes 
    receive_endpoint = "rtmp://localhost:1935/live/{0}".format(meeting_id)

    #process = subprocess.Popen([ 'ffmpeg','-f','flv','-listen','1','-i', receive_endpoint,'-acodec', 'pcm_s16le', '-f','s16le', '-ac', '1', '-ar', str(sample_rate), '-'], stdout=subprocess.PIPE)

    processing_thread = threading.Thread(target=process_stream, name="Downloader", args=[meeting_id, ending_time, api_token])
    processing_thread.start()
    return "Initiating Processor"
    #print(rec.FinalResult())    


def process_stream(meeting_id, ending_time, api_token):
    seq = 3
    print(api_token)
    print("in function!!")
    send_caption("NOW STARTING LIVE CAPTIONING SERVICE https://github.com/aalsabag/LiveCaption", api_token, seq, "en-US")
    stream_file = '/mnt/streaming-{0}'.format(meeting_id)
    f = open(stream_file, 'rb')
    currentByteSize = os.path.getsize(stream_file)
    f.read(currentByteSize-4000)

    while time.time() < ending_time:
        #data = process.stdout.read(int(sample_rate/4))
        data = f.read(4000)
        if len(data) == 0:
            continue
        if rec.AcceptWaveform(data):
            res = json.loads(rec.Result())
            print(res['text'])
            send_caption(res['text'], api_token, seq, "en-US")
            seq = seq + 1
    if os.path.exists(stream_file):
        os.remove(stream_file)

def send_caption(caption_string, api_token, seq, language):
    # url = "https://wmcc.zoom.us/closedcaption?id=89888325091&ns=QWhtZWQgQWxzYWJhZydzIFpvb20gTWVldGluZw&expire=86400&sparams=id%2Cns%2Cexpire&signature=ERaP06oLJrDZ17ZqUYh-gMZ42BWWJbkHLgiQa91Dbn0.AG._6Hj1896SpaP-fgqIyiUQ9tEP0AP7D_yYaa-MoIEJTtSHFHCzzmIudK2TtJtvPfYBiWDmr5KflSKcTB2i-7Ptft-BA5nbtd0iD8vf_WVvixjVpG53JZK.Q_HKB5JprjvdI7IZWrSz4w.7OGeAndgnfYgGanm&seq=9&lang=en-US"
    headers = {
    'Content-Type': 'text/plain'
    }
    response = requests.request("POST", api_token, headers=headers, data=caption_string, params={'seq': seq, 'lang': language})

    print(response.text)

def verify_meeting(meeting_id):
    return True

def main():
    print("Starting Program")
    app.run(host='0.0.0.0', port=5000) 
    

if __name__ == "__main__":
    main()
