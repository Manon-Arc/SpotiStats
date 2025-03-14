FROM node:18

# Installer git et autres dépendances
RUN apt-get update && apt-get install -y \
    git \
    && rm -rf /var/lib/apt/lists/*

# Créer le répertoire de l'application
WORKDIR /app

# Copier les fichiers package pour un meilleur cache
COPY package*.json ./

# Installer les dépendances npm, y compris les types TypeScript
RUN npm install
RUN npm install --save-dev @types/react-native

# Utiliser la nouvelle méthode recommandée pour Expo CLI
RUN npm install --save-dev expo-cli

# Copier le reste de l'application
COPY . .

# Démarrer l'application
CMD ["npm", "start"]