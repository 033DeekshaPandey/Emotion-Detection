import React from 'react';

const EmotionDisplay = ({ emotion, expressions }) => {
  return (
    <div className="emotion-display-container">
      <h2 className="emotion-title">Detected Emotion: {emotion}</h2>
      <div className="emotion-bars-container">
        {expressions &&
          Object.entries(expressions).map(([key, value]) => (
            <div key={key} className="emotion-bar-item">
              <div className="emotion-bar-title">{key}</div>
              <div className="emotion-bar">
                <div
                  className="emotion-bar-fill"
                  style={{ width: `${(value * 100).toFixed(1)}%` }}
                ></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default EmotionDisplay;
