# CLAPE Dataset Code Repository

This repository provides the implementation of the CLAPE dataset generation pipeline.

## Components

### 1. Pupil Detection
- MediaPipe FaceMesh for iris landmarks
- OpenCV.js for pupil segmentation

### 2. Signal Processing
- Normalized pupil ratio
- Exponential smoothing
- Baseline calibration
- Change percentage computation

### 3. Feature Extraction
- Normalized ratio
- Baseline
- Change %
- Timestamp

### 4. Dataset Generation
- Data stored in Firebase Realtime Database

### 5. Teacher Dashboard
- Aggregates engagement duration
- Exports results to Excel

## Reproducibility

The pipeline enables conversion of raw webcam video into structured multimodal engagement data.
