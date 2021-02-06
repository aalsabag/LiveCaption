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

    // Makes API call to fetch bacteria results
    getResults() {
        var searchParams = new URLSearchParams(this.currentSelected)

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };

        fetch(this.url + "health").then(response => response.json()).then(json=>{
            console.log("Making an API call")
          })
    }


    render() {
        return(
          <div id="full-section">
            <Formik id="full-form"
            initialValues={{ meeting_id: '', api_token: '', meeting_length:'' }}
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
                    type="text"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.api_token}
                    name="api_token"
                    placeholder="CC API Token"
                />
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


                {props.errors.name && <div id="feedback">{props.errors.name}</div>}
                
                <Popup trigger={<button type="submit">Submit</button>} position="top center">
                  <div className="modal">
                    <div className="header"><font size="7">You are almost there!</font> </div>
                    <div className="content">

                      <strong><font size="5">1. Start Custom Live Streaming on your meeting:</font></strong>
                      <br />
                      <img src={startLiveStream} alt="Start the live stream" width="77%" height="22%"></img>
                          <br />
                          <i>a. If you don't see this button you must enable it by going to https://zoom.us/signin -> Settings -> In Meeting (Advanced) -> Allow livestreaming of meetings -> Custom Live Streaming service</i>
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
                      <button type="submit" action={this.getResults()}>Start Captioning!</button>
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