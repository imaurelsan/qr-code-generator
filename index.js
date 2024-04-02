const express = require('express');
const qr = require('qrcode');
const path = require('path');

const app = express();
const port = 3000;

// Définition du dossier public pour servir les fichiers statiques
app.use(express.static('public'));

// Endpoint pour générer le QR code
app.get('/generate', async (req, res) => {
  const dataToEncode = req.query.data || 'Hello, QR Code!';
  const options = {
    color: {
      dark: '#000',
      light: '#fff'
    }
  };

  try {
    const qrImage = await qr.toDataURL(dataToEncode, options);
    res.send(`<img src="${qrImage}" alt="QR Code">`);
  } catch (error) {
    console.error('Error generating QR code:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Charger la page HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
