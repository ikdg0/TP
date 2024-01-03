require('dotenv').config();
const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


/*             DataBase              */
const db = mysql.createConnection({
    host: 'localhost',
    database: "tp",
    user: 'root',
    password: '',
    port: 3307

});
/*             DataBase              */

app.post('/add/utilisateurs', (req, res) => {
    const { nom, prenom, email } = req.body;

    // Requête d'insertion dans la base de données
    const query = 'INSERT INTO utilisateur (nom, prenom, email) VALUES (?, ?, ?)';
    db.query(query, [nom, prenom, email], (err, result) => {
        if (err) {
            console.error(err);
            return res.send('Erreur lors de l\'ajout de l\'utilisateur.');
        }
        res.status(200).send('Utilisateur ajouté avec succès.');
    });
});

app.get('/utilisateurs', (req, res) => {
    db.query('SELECT * FROM utilisateur', (err, result) => {
        if (err) {
            return res.status(500).send('Erreur lors de la récupération des utilisateurs.');
        }
        res.status(200).json(result);
    });
});

app.get('/utilisateurs/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM utilisateur WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).send('Erreur lors de la récupération de l\'utilisateur.');
        }
        res.status(200).json(result);
    });
});

app.put('/utilisateurs/add/:id', (req, res) => {
    const id = req.params.id;
    const { nom, prenom, email } = req.body;
    db.query(
        'UPDATE utilisateur SET nom = ?, prenom = ?, email = ? WHERE id = ?',
        [nom, prenom, email, id],
        (err, result) => {
            if (err) {
                return res.status(500).send('Erreur lors de la mise à jour de l\'utilisateur.');
            }
            res.status(200).send('Utilisateur mis à jour avec succès.');
        }
    );
});

app.delete('/utilisateurs/remove/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM utilisateur WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).send('Erreur lors de la suppression de l\'utilisateur.');
        }
        res.status(200).send('Utilisateur supprimé avec succès.');
    });
});

app.post('/commentaires', (req, res) => {
    const { utilisateur_id, technologie_id, contenu } = req.body;
    db.query(
        'INSERT INTO commentaire (utilisateur_id, technologie_id, contenu) VALUES (?, ?, ?)',
        [utilisateur_id, technologie_id, contenu],
        (err, result) => {
            if (err) {
                return res.status(500).send('Erreur lors de l\'ajout du commentaire.');
            }
            res.status(201).send('Commentaire ajouté avec succès.');
        }
    );
});

app.get('/commentaires/technologie/:technologieId', (req, res) => {
    const technologieId = req.params.technologieId;
    db.query(
        'SELECT * FROM commentaire WHERE technologie_id = ?',
        [technologieId],
        (err, result) => {
            if (err) {
                return res.status(500).send('Erreur lors de la récupération des commentaires.');
            }
            res.status(200).json(result);
        }
    );
});

app.get('/commentaires/utilisateur/:utilisateurId', (req, res) => {
    const utilisateurId = req.params.utilisateurId;
    db.query(
        'SELECT * FROM commentaire WHERE utilisateur_id = ?',
        [utilisateurId],
        (err, result) => {
            if (err) {
                return res.status(500).send('Erreur lors de la récupération des commentaires.');
            }
            res.status(200).json(result);
        }
    );
});


app.get('/commentaires/avant/:date', (req, res) => {
    const date = req.params.date;
    db.query(
        'SELECT * FROM commentaire WHERE date_creation_commentaire < ?',
        [date],
        (err, result) => {
            if (err) {
                return res.status(500).send('Erreur lors de la récupération des commentaires.');
            }
            res.status(200).json(result);
        }
    );
});




const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});