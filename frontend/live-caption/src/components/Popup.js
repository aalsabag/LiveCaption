import React, { Component } from 'react';
import enableLiveStream from '../resources/enable-live-stream.png';
import settingsEnableLiveStream from '../resources/settings-enable-live-stream.png';
import startLiveStream from '../resources/start-live-stream.png';
import './Popup.css';

class Popup extends React.Component {
    constructor(props) {
        super(props)
        this.getResults = this.getResults.bind(this);
        this.url = process.env.REACT_APP_BACKEND_URL + "/"
    }

    getResults() {
        var captionButton = document.getElementById("finalButton")
        captionButton.style.backgroundColor = "lightyellow";
        captionButton.style.color = "black";
        captionButton.innerHTML = "Loading...";
        var formData = new FormData()
        formData.append('api_token', this.props.api_token)
        formData.append('meeting_id', this.props.meeting_id)
        formData.append('meeting_length', this.props.meeting_length)
  
        var requestOptions = {
            method: 'POST',
            redirect: 'follow',
            body: formData
          };
  
        // fetch(this.url + "health", requestOptions).then(response => response.json()).then(json=>{
        //     console.log("Making an API call")
        //   })
        fetch(this.url + "process", requestOptions).then(function(response){
          captionButton.style.backgroundColor = "lightblue";
          captionButton.innerHTML = "Captioning Started!!!";
          console.log("captioning started")
        })
      }

    render() {
      return (
        <div className="modal">
            <div className="header"><font size="7">You are almost there!</font> </div>
            <div className="content">

                <strong><font size="5">1. Start Custom Live Streaming on your meeting:</font></strong>
                <br />
                <img class="instructional-image" src={startLiveStream} alt="Start the live stream"></img>
                <br />
                <i>a. If you don't see this button you must enable it by going to https://zoom.us/signin → Settings → In Meeting (Advanced) → Allow livestreaming of meetings → Custom Live Streaming service</i>
                <br />
                <img  class="instructional-image" src={settingsEnableLiveStream} alt="Go to settings" ></img>
                <img  class="instructional-image" src={enableLiveStream} alt="Enable live stream"></img>
                <br />
                <strong><font size="5">2. Enter the following fields and confirm the stream has started:</font></strong>
                <br />
                <div id="code">
                <font size="4" color="green">
                    <strong>Streaming URL</strong>: <u>rtmp://stream-rtmp.alsabagtech.com:1935/livecaption</u>
                    <br />
                    <strong>Streaming key</strong>: <u>{this.props.meeting_id}</u>
                    <br />
                    <strong>Live streaming page URL</strong>: <u>https://zoom.us</u>
                </font>
                </div>
                <br />
                <strong><font size="5">3. Once complete press the button below!!!!</font></strong>
                <br />
                <button id="finalButton" type="submit" onClick={this.getResults}>Start Captioning!</button>
            </div>
        </div>
      );
    }
  }
  
  export default Popup;