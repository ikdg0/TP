const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const db = require('./database/database')
const app = express();
app.use(express.json());
app.use(cors());

const utilisateur = require('./routes/Utilisateur')
const commentaire = require('./routes/commentaires')
const technologie = require('./routes/technologie')


app.get('/utilisateurs', utilisateur);

app.post('/commentaires', commentaire);

app.post('/technologie', technologie);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});