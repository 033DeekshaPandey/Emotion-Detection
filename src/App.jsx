import React, { useState, useEffect, useCallback } from 'react';
import { loadModels } from './utils/LoadModels';
import { detectEmotion } from './utils/DetectEmotion';
import CameraComponent from './components/CameraComponent';
import EmotionDisplay from './components/EmotionDisplay';
import './App.css';

function App() {
  const [emotion, setEmotion] = useState('');
  const [expressions, setExpressions] = useState({});

  const handleVideoOnPlay = useCallback(() => {
    const video = document.querySelector('video');
    const canvas = document.querySelector('canvas');

    const interval = setInterval(async () => {
      if (!video || video.readyState !== 4) return;

      const { dominantEmotion, expressions } = await detectEmotion(video, canvas);
      if (dominantEmotion) {
        setEmotion(dominantEmotion);
        setExpressions(expressions);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    loadModels().then(() => {
      console.log('Models loaded successfully');
    });
  }, []);

  return (
    <div className="app-container">
      <h1>Facial Emotion Detection</h1>
      <div className="video-container">
        <CameraComponent onPlay={handleVideoOnPlay} />
        <canvas className="canvas-overlay" />
      </div>
      <EmotionDisplay emotion={emotion} expressions={expressions} />
    </div>
  );
}

export default App;
