import React, { useState } from 'react';
import axios from 'axios';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import Dropzone from 'react-dropzone';
import './App.css';
import ThreeCanvas from './ThreeCanvas'; // Import ThreeCanvas component

function App() {
  const [materialImage, setMaterialImage] = useState(null);
  const [customerImage, setCustomerImage] = useState(null);
  const [combinedImage, setCombinedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onDropMaterial = (acceptedFiles) => {
    setLoading(true);
    setError('');

    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('image', file);

    axios.post('/api/upload/material', formData)
      .then(response => {
        setMaterialImage(response.data.imageUrl);
      })
      .catch(err => {
        setError('Error uploading material image');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onDropCustomer = (acceptedFiles) => {
    setLoading(true);
    setError('');

    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('image', file);

    axios.post('/api/upload/customer', formData)
      .then(response => {
        setCustomerImage(response.data.imageUrl);
      })
      .catch(err => {
        setError('Error uploading customer image');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const combineImages = () => {
    setLoading(true);
    setError('');

    axios.post('/api/combine-images', { materialImage, customerImage })
      .then(response => {
        setCombinedImage(response.data.imageUrl);
      })
      .catch(err => {
        setError('Error combining images');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <h1 style={{ textAlign: 'center' }}>Tailor App</h1>
      
      <Dropzone onDrop={onDropMaterial} className="dropzone">
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drop material image here</p>
          </div>
        )}
      </Dropzone>

      <Dropzone onDrop={onDropCustomer} className="dropzone">
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drop customer image here</p>
          </div>
        )}
      </Dropzone>

      <button onClick={combineImages}>Combine Images</button>

      {loading && <p style={{ textAlign: 'center', marginTop: '10px' }}>Uploading image...</p>}
      {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</p>}

      {/* Replace the Canvas component with ThreeCanvas component */}
      <div style={{ marginTop: '20px' }}>
        <ThreeCanvas combinedImage={combinedImage} />
      </div>
    </div>
  );
}

export default App;