# JustStreamIt
JustStreamIt est une plateforme de streaming de films inspirée par Netflix, construite avec Django, JavaScript, HTML et CSS. Elle offre une interface utilisateur attrayante où les utilisateurs peuvent parcourir une sélection de films, et obtenir des détails supplémentaires sur chaque film dans une modale en cliquant sur l'image du film ou sur le bouton "Play" dans la bannière principale.

# Caractéristiques
Navigation de Films : Affichage d'une variété de films dans un format de grille facile à naviguer.
Bannière Principale : Met en avant un film sélectionné avec un bouton "Play" pour visualiser les détails.
Modales de Détails : Fournit des informations supplémentaires sur chaque film.
Conception Réactive : Adaptée aux différents appareils et tailles d'écran.
Design Moderne : Interface utilisateur fluide et esthétique.

# Technologies Utilisées
Backend : Django
Frontend : HTML, CSS, JavaScript
Base de Données : SQLite (par défaut avec Django)

# Cloner le Dépôt

git clone https://github.com/AurelienAllenic/justStreamIt-p6-OP
cd justStreamIt

# Configurer l'Environnement Virtuel
python -m venv venv
source venv/bin/activate  # Sur Windows, utilisez `venv\Scripts\activate`

# Installer les Dépendances
pip install -r requirements.txt

# Lancer le serveur depuis l'Api locale
Lancer l'api locale

# Lancer le Serveur de Développement
python manage.py runserver

# Accéder à l'Application
Ouvrez votre navigateur et allez sur http://localhost:8001/.

# Utilisation
Parcourez la liste des films disponibles sur la page d'accueil. Cliquez sur un film pour afficher des détails supplémentaires dans une modale, ou utilisez le bouton "Play" dans la bannière principale pour en savoir plus sur le film mis en avant.