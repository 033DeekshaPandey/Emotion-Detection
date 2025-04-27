import * as faceapi from 'face-api.js';

export const detectEmotion = async (video, canvas) => {
  const displaySize = {
    width: video.videoWidth,
    height: video.videoHeight,
  };

  faceapi.matchDimensions(canvas, displaySize);

  const detections = await faceapi
    .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
    .withFaceExpressions();

  const resizedDetections = faceapi.resizeResults(detections, displaySize);

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (resizedDetections) {
    const box = resizedDetections.detection.box;
    const drawBox = new faceapi.draw.DrawBox(box, { label: '', boxColor: '#4e9f47' });
    drawBox.draw(canvas);

    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

    const expressions = resizedDetections.expressions;
    const maxValue = Math.max(...Object.values(expressions));
    const dominantEmotion = Object.keys(expressions).find(
      (key) => expressions[key] === maxValue
    );

    return { dominantEmotion, expressions };
  }
  return { dominantEmotion: null, expressions: null };
};
