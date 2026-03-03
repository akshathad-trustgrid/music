# 🎵 Music Microservice – Audio Trim Service

A lightweight Node.js microservice that integrates with **Deezer API** to search tracks and trim 30-second preview audio using FFmpeg.

This service is independent and focused only on audio processing.

---

## 🚀 Features

* 🔍 Search music tracks via Deezer
* 🎧 Fetch 30s preview audio
* ✂️ Trim preview to custom duration
* ⚡ Fast processing using FFmpeg
* 🧩 Designed for microservice architecture

---

## 🏗️ Tech Stack

* Node.js
* Express.js
* FFmpeg
* fluent-ffmpeg
* Axios
* UUID

Music provider:

* Deezer Public API

---

## 📦 Installation

### 1️⃣ Clone repository

```bash
git clone <your-repo-url>
cd music-microservice
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Install FFmpeg

Make sure FFmpeg is installed on your machine:

#### Mac

```bash
brew install ffmpeg
```

#### Ubuntu

```bash
sudo apt install ffmpeg
```

#### Windows

Download from:
https://ffmpeg.org/download.html

Verify installation:

```bash
ffmpeg -version
```

---

## ▶️ Running the Service

```bash
node app.js
```

Default port:

```
http://localhost:5001
```

---

## 📡 API Endpoints

### 🔍 1. Search Music

**GET**

```
/api/music/search?q=melody
```

#### Example:

```
GET http://localhost:5001/api/music/search?q=love
```

#### Response:

```json
[
  {
    "id": "3135556",
    "title": "Track Title",
    "artist": "Artist Name",
    "preview": "https://cdns-preview-..."
  }
]
```

---

### ✂️ 2. Trim Audio Preview

**POST**

```
/api/music/trim
```

#### Request Body (JSON):

```json
{
  "trackId": "139470659",
  "startTime": 0,
  "duration": 10
}
```

#### Description

* `trackId` → Deezer track ID
* `startTime` → start position in seconds
* `duration` → length of trimmed audio in seconds (max 30)

#### Example using Postman

* Method: **POST**
* URL: `http://localhost:5001/api/music/trim`
* Body → raw → JSON

---

## 🔁 Processing Flow

1. Fetch track preview URL from Deezer
2. Download preview audio
3. Trim using FFmpeg
4. Return trimmed MP3 file

---

## 📁 Project Structure

```
music-microservice/
│
├── controllers/
│   ├── musicController.js
│   └── processController.js
│
├── services/
│   ├── deezerService.js
│   └── ffmpegService.js
│
├── routes/
│   └── musicRoutes.js
│
├── temp/
├── outputs/
├── app.js
└── package.json
```

---

## ⚠️ Important Notes

* Deezer preview is limited to 30 seconds.
* This service only trims the preview audio.
* It does not provide full song access.
* Do not store or redistribute copyrighted full tracks.

---

## 🧠 Future Improvements

* Fade in / fade out support
* Volume normalization
* Looping support
* Waveform generation
* Async job-based processing
* S3 / IPFS upload integration

---

## 🛠 Example cURL

```bash
curl -X POST http://localhost:5001/api/music/trim \
-H "Content-Type: application/json" \
-d '{"trackId":"139470659","startTime":0,"duration":10}' \
--output trimmed.mp3
```

---

## 📌 License

MIT License

---

## 👨‍💻 Author

Built as part of a modular microservice architecture.

```
```
