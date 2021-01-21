
import os 
from flask import Flask, request
import time
import random
import threading

# basic testing of async calls
# def nested():
#     test1 = asyncio.create_task(testing())
#     print("hi")
#     return 42

# async def testing():
#     os.system("sleep 1")
#     print("hi2")

# async def main():
#     # Schedule nested() to run soon concurrently
#     # with "main()".
#     nested()

#     # "task" can now be used to cancel "nested()", or
#     # can simply be awaited to wait until it is complete:
#     print("no")
#     os.system("sleep 8")

# if __name__ == "__main__":
#     asyncio.run(main())

app = Flask(__name__)

@app.route('/health')
def login():
    return 'I am healthy!'

@app.route('/process', methods=['POST'])
def process():
    download_thread = threading.Thread(target=process_stream, name="Downloader", args=["abc"])
    download_thread.start()
    return "hi"
    #print(rec.FinalResult())    

def process_stream(ending_time):
    print("testing")
    random_string = ''
    count = 0
    for _ in range(10):
        # Considering only upper and lowercase letters
        random_integer = random.randint(97, 97 + 26 - 1)
        flip_bit = random.randint(0, 1)
        # Convert to lowercase if the flip bit is on
        random_integer = random_integer - 32 if flip_bit == 1 else random_integer
        # Keep appending random characters using chr(x)
        random_string += (chr(random_integer))
    ending_time = time.time() + (60*5)
    while time.time() < ending_time:
        count = count + 1
        print("in loop {}".format(random_string))
    return "hello"

def verify_meeting(meeting_id):
    return True

def main():
    print("Starting Program")
    app.run(host='0.0.0.0', port=5000) 
    

if __name__ == "__main__":
    main()