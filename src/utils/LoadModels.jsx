import * as faceapi from 'face-api.js';

export const loadModels = async () => {
  const MODEL_URL = '/models';
  await faceapi.nets.tinyFaceDetector.loadFromUri(
    `${MODEL_URL}/tiny_face_detector_model`
  );
  await faceapi.nets.faceExpressionNet.loadFromUri(
    `${MODEL_URL}/face_expression_model`
  );
};
