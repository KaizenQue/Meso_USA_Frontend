const express = require('express');
const multer = require('multer');
const { BlobServiceClient } = require('@azure/storage-blob');
const app = express();
require('dotenv').config();

// Configure multer for in-memory file handling
const upload = multer({ storage: multer.memoryStorage() });

// Azure Storage configuration
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = 'audio-container';

// Initialize Azure Blob Service Client
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(containerName);

// Ensure container exists
async function initializeContainer() {
  try {
    await containerClient.createIfNotExists();
    console.log('Azure container ready');
  } catch (error) {
    console.error('Error initializing Azure container:', error);
  }
}
initializeContainer();

// Upload endpoint
app.post('/upload', upload.single('audio'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No audio file provided' });
  }

  try {
    // Create a unique blob name
    const blobName = `audio_${Date.now()}.wav`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Upload the audio file
    await blockBlobClient.upload(req.file.buffer, req.file.size);
    
    // Get the URL of the uploaded file
    const audioUrl = blockBlobClient.url;

    res.status(200).json({
      message: 'Audio uploaded successfully',
      audioUrl: audioUrl
    });
  } catch (error) {
    console.error('Error uploading to Azure:', error);
    res.status(500).json({ error: 'Failed to upload audio' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});