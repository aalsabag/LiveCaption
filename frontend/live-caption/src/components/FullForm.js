import React, { Component } from 'react';
import { Field, Form, Formik } from 'formik';
import Popup from 'reactjs-popup';
import enableLiveStream from '../resources/enable-live-stream.png';
import settingsEnableLiveStream from '../resources/settings-enable-live-stream.png';
import startLiveStream from '../resources/start-live-stream.png';
import './FullForm.css';

export default class FullForm extends Component {
    
    constructor(props) {
        super(props)
        this.getResults = this.getResults.bind(this);

        this.state = {
            meeting_id : '',
            api_token : '',
            meeting_length : .5,
            messageShown: false,
            resultList: []
        };
        this.currentSelected = new Map()
        this.url = process.env.REACT_APP_BACKEND_URL + "/"
        this.resultList = "hello"
    }


    getResults() {
      var captionButton = document.getElementById("finalButton")
      captionButton.style.backgroundColor = "yellow";
      captionButton.innerHTML = "Loading...";
      var formData = new FormData()
      formData.append('api_token', this.state.api_token)
      formData.append('meeting_id', this.state.meeting_id)
      formData.append('meeting_length', this.state.meeting_length)

      var requestOptions = {
          method: 'POST',
          redirect: 'follow',
          body: formData
        };

      // fetch(this.url + "health", requestOptions).then(response => response.json()).then(json=>{
      //     console.log("Making an API call")
      //   })
      fetch(this.url + "process", requestOptions).then(function(response){
        captionButton.style.backgroundColor = "blue";
        captionButton.innerHTML = "Captioning Started!!!";
        console.log("captioning started")
      })
    }


    render() {
        return(
          <div id="full-section">
            <Formik id="full-form"
            initialValues={{ meeting_id: '', api_token: '', meeting_length:'' }}
            validate={values => {
              const errors = {};
              if (values.meeting_id.includes(' ')){
                errors.meeting_id = "No spaces in the meeting id"
              }
              return errors;
            }}
            onSubmit={(values, actions) => {
                setTimeout(() => {
                this.state.meeting_id = values.meeting_id
                this.state.api_token = values.api_token
                this.state.meeting_id = parseInt(values.meeting_length)
                
               
                actions.setSubmitting(false);
                }, 1000);
            }}
            >
            {props => (
                <Form>
                <Field
                    type="text"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.meeting_id}
                    name="meeting_id"
                    placeholder="Zoom Meeting ID"
                />
                <Field
                    id="api_token"
                    type="text"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.api_token}
                    name="api_token"
                    placeholder="CC API Token"
                />
                <div class="hide">This can be found at the bottom of the meeting. Click "Closed Caption" at the bottom of the meeting and then click "Copy the API Token"</div>
                <Field
                    id="select_field" 
                    as="select"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.meeting_length}
                    name="meeting_length"
                    placeholder="Length of Meeting"
                >

                    <option id="meeting_length" value="" disabled="disabled" selected="selected">Meeting Length</option>
                    <option value=".5">.5 hrs</option>
                    <option value="1">1 hrs</option>
                    <option value="1.5">1.5 hrs</option>
                    <option value="2">2 hrs</option>
                </Field>


                {props.errors.meeting_id && <div id="feedback">{props.errors.meeting_id}</div>}
                
                <Popup trigger={<button type="submit">Submit</button>} position="top center">
                  <div className="modal">
                    <div className="header"><font size="7">You are almost there!</font> </div>
                    <div className="content">

                      <strong><font size="5">1. Start Custom Live Streaming on your meeting:</font></strong>
                      <br />
                      <img src={startLiveStream} alt="Start the live stream" width="77%" height="22%"></img>
                          <br />
                          <i>a. If you don't see this button you must enable it by going to https://zoom.us/signin → Settings → In Meeting (Advanced) → Allow livestreaming of meetings → Custom Live Streaming service</i>
                          <br />
                          <img src={settingsEnableLiveStream} alt="Go to settings" width="40%" height="10%"></img>
                          <img src={enableLiveStream} alt="Enable live stream" width="40%" height="10%"></img>
                      <br />
                      <strong><font size="5">2. Enter the following fields and confirm the stream has started:</font></strong>
                      <br />
                      <div id="code">
                        <font size="4" color="green">
                          <strong>Streaming URL</strong>: <u>rtmp://stream-rtmp.alsabagtech.com:1935/livecaption</u>
                          <br />
                          <strong>Streaming key</strong>: <u>{props.values.meeting_id}</u>
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

                </Popup>
                </Form>
            )}
            </Formik>
          </div>
        )
      }
}