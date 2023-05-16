import React, { Component } from 'react';
import ParticlesBg from 'particles-bg'
import Clarifai from 'clarifai';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Logo from './components/Logo/Logo';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

const app = new Clarifai.App({
  apiKey: 'dda7b2852b6e48e1bf4d23bd2d7d72de'
 });

// function App() {
  class App extends Component {
    constructor() {
      super();
      this.state = {
        input:'',
        imageUrl:''
      }
    }

    onInputChange = (event) => {
      this.setState({input: event.target.value});
    }

    onButtonSubmit = () => {
      this.setState({imageUrl: this.state.input})
      console.log('click');
      app.models
      .predict(Clarifai.FACE_DETECT_MODEL, "https://samples.clarifai.com/face-det.jpg" )

      .then(function(response) {
      // Process the response containing face detection results
      var faces = response.outputs[0].data.regions;
      // Do something with the detected faces
      console.log(faces);
      })
      .catch(function(err) {
      // Handle error
      console.error(err);
      });
    }


    render() {
      return (
        <div className="App">
          <ParticlesBg color="#D9D8DF" num={150} type="cobweb" bg={true} />
          <Navigation />
          <Logo />
          <Rank />
          <ImageLinkForm 
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
          />
          <FaceRecognition imageUrl={this.state.imageUrl} />
        </div>
        );
      }
    }

export default App;
