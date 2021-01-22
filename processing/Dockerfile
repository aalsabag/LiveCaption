FROM alphacep/kaldi-vosk-server:latest

ENV MODEL_VERSION 0.2
RUN mkdir /opt/vosk-model-en \
   && cd /opt/vosk-model-en \
   && wget -q http://alphacephei.com/vosk/models/vosk-model-en-us-aspire-${MODEL_VERSION}.zip \
   && unzip vosk-model-en-us-aspire-${MODEL_VERSION}.zip \
   && mv vosk-model-en-us-aspire-${MODEL_VERSION} model \
   && rm -rf vosk-model-en-us-aspire-${MODEL_VERSION}.zip \
   && apt update \
   && apt install ffmpeg -y

WORKDIR /opt/vosk-model-en
COPY requirements.txt requirements.txt
RUN pip install requirements.txt

COPY ffmpeg.py ffmpeg.py

CMD ["python3", "ffmpeg.py"]