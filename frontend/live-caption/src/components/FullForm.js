import React, { Component } from 'react';
import { Field, Form, Formik } from 'formik';
// import Popup from 'reactjs-popup';
import Popup from './Popup.js';
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
            resultList: [],
            showPopup: false
        };
        this.currentSelected = new Map()
        this.url = process.env.REACT_APP_BACKEND_URL + "/"
        this.resultList = "hello"
    }

    togglePopup() {
      this.setState({
        showPopup: !this.state.showPopup
      });
    }

    getResults() {
      var captionButton = document.getElementById("finalButton")
      captionButton.style.backgroundColor = "lightyellow";
      captionButton.style.color = "black";
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
        captionButton.style.backgroundColor = "lightblue";
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
                
                <button type="submit" onClick={this.togglePopup.bind(this)}>Submit</button>
                {this.state.showPopup ?
                  <Popup
                    api_token={props.values.api_token}
                    meeting_id={props.values.meeting_id}
                    meeting_length={props.values.meeting_length}
                    closePopup={this.togglePopup.bind(this)}
                  />
                  : null
                }

                </Form>
            )}
            </Formik>
          </div>
        )
      }
}