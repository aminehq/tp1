# Documentation Backend pour Frontend

Ce projet contient deux backends Node.js/Express :

1. Une API principale de gestion de concerts, artistes et stages.
2. Une architecture microservices `auth-service`, `product-service`, `order-service` avec RabbitMQ pour la communication asynchrone.

Cette documentation explique les endpoints, les formats JSON et les règles importantes pour construire un frontend.

## Technologies

- Node.js
- Express.js
- MongoDB avec Mongoose
- JWT pour l'authentification
- RabbitMQ pour les événements de commande
- CORS activé dans les microservices

## Authentification

Les routes protégées utilisent un token JWT dans le header :

```http
Authorization: Bearer <token>
```

Deux rôles existent :

- `user` : utilisateur normal
- `admin` : peut créer, modifier et supprimer certaines ressources

Pour le frontend :

- stocker le token après login
- envoyer le token dans les requêtes protégées
- cacher les boutons `Créer`, `Modifier`, `Supprimer` si l'utilisateur n'est pas admin

## API Principale Concerts

Base URL par défaut :

```txt
http://localhost:3000
```
### Auth

Base route :

```txt
/api/auth
```

#### POST `/api/auth/register`

Créer un utilisateur.

Body :

```json
{
  "name": "Amine",
  "email": "amine@test.com",
  "password": "123456"
}
```

Réponse :

```json
{
  "success": true,
  "user": {
    "_id": "...",
    "name": "Amine",
    "email": "amine@test.com",
    "role": "user"
  }
}
```

#### POST `/api/auth/login`

Connecter un utilisateur.

Body :

```json
{
  "email": "amine@test.com",
  "password": "123456"
}
```

Réponse :

```json
{
  "success": true,
  "token": "jwt_token"
}
```

### Stages

Base route :

```txt
/stages
```

Modèle :

```json
{
  "_id": "...",
  "name": "Scène Nahda",
  "city": "Rabat",
  "capacity": 10000
}
```

Endpoints :

| Méthode | URL | Auth | Rôle | Description |
|---|---|---|---|---|
| GET | `/stages` | Oui | user/admin | Liste des stages |
| GET | `/stages/:id` | Oui | user/admin | Détail d'un stage |
| GET | `/stages/:id/artists` | Oui | user/admin | Artistes d'un stage |
| POST | `/stages` | Oui | admin | Créer un stage |
| PUT | `/stages/:id` | Oui | admin | Modifier un stage |
| DELETE | `/stages/:id` | Oui | admin | Supprimer un stage |

Body création/modification :

```json
{
  "name": "Scène OLM Souissi",
  "city": "Rabat",
  "capacity": 20000
}
```

### Artists

Base route :

```txt
/artists
```

Modèle :

```json
{
  "_id": "...",
  "name": "Artist Name",
  "genre": "Pop",
  "country": "Morocco",
  "stageId": "stage_id"
}
```

Endpoints :

| Méthode | URL | Auth | Rôle | Description |
|---|---|---|---|---|
| GET | `/artists` | Oui | user/admin | Liste des artistes |
| GET | `/artists?genre=Pop` | Oui | user/admin | Filtrer par genre |
| GET | `/artists?stageId=<id>` | Oui | user/admin | Filtrer par stage |
| GET | `/artists/search?name=artist` | Oui | user/admin | Chercher par nom |
| GET | `/artists/:id` | Oui | user/admin | Détail d'un artiste |
| GET | `/artists/:id/concerts` | Oui | user/admin | Concerts d'un artiste |
| POST | `/artists` | Oui | admin | Créer un artiste |
| PUT | `/artists/:id` | Oui | admin | Modifier un artiste |
| DELETE | `/artists/:id` | Oui | admin | Supprimer un artiste |

Body création/modification :

```json
{
  "name": "Artist Name",
  "genre": "Pop",
  "country": "Morocco",
  "stageId": "stage_id"
}
```

### Concerts

Base route :

```txt
/concerts
```

Modèle :

```json
{
  "_id": "...",
  "title": "Opening Show",
  "date": "2026-05-20T00:00:00.000Z",
  "time": "21:00",
  "duration": 90,
  "artistId": "artist_id"
}
```

Endpoints :

| Méthode | URL | Auth | Rôle | Description |
|---|---|---|---|---|
| GET | `/concerts` | Oui | user/admin | Liste des concerts |
| GET | `/concerts/:id` | Oui | user/admin | Détail d'un concert |
| POST | `/concerts` | Oui | admin | Créer un concert |
| PUT | `/concerts/:id` | Oui | admin | Modifier un concert |
| DELETE | `/concerts/:id` | Oui | admin | Supprimer un concert |

Body création/modification :

```json
{
  "title": "Opening Show",
  "date": "2026-05-20",
  "time": "21:00",
  "duration": 90,
  "artistId": "artist_id"
}
```

## Microservices E-commerce

Les microservices sont dans :

```txt
microservices-app/
```

Ports par défaut :

| Service | URL |
|---|---|
| Auth service | `http://localhost:5000` |
| Product service | `http://localhost:5001` |
| Order service | `http://localhost:5002` |
### Auth Service

Base URL :

```txt
http://localhost:5000/api/auth
```

#### POST `/api/auth/register`

Body :

```json
{
  "name": "Admin",
  "email": "admin@test.com",
  "password": "123456",
  "role": "admin"
}
```

`role` est optionnel. Si absent, le backend met `user`.

Réponse :

```json
{
  "message": "Inscription réussie",
  "user": {
    "id": "...",
    "name": "Admin",
    "email": "admin@test.com",
    "role": "admin"
  }
}
```

#### POST `/api/auth/login`

Body :

```json
{
  "email": "admin@test.com",
  "password": "123456"
}
```

Réponse :

```json
{
  "message": "Connexion réussie",
  "token": "jwt_token"
}
```

Le token contient :

```json
{
  "userId": "...",
  "email": "admin@test.com",
  "role": "admin"
}
```

### Product Service

Base URL :

```txt
http://localhost:5001/api/products
```

Modèle :

```json
{
  "_id": "...",
  "name": "T-shirt",
  "description": "Produit officiel",
  "price": 120,
  "stock": 30,
  "createdAt": "...",
  "updatedAt": "..."
}
```

Endpoints :

| Méthode | URL | Auth | Rôle | Description |
|---|---|---|---|---|
| GET | `/api/products` | Non | public | Liste des produits |
| GET | `/api/products/:id` | Non | public | Détail d'un produit |
| POST | `/api/products` | Oui | admin | Créer un produit |
| PUT | `/api/products/:id` | Oui | admin | Modifier un produit |
| DELETE | `/api/products/:id` | Oui | admin | Supprimer un produit |

Body création/modification :

```json
{
  "name": "T-shirt",
  "description": "Produit officiel",
  "price": 120,
  "stock": 30
}
```

### Order Service

Base URL :

```txt
http://localhost:5002/api/orders
```

Modèle :

```json
{
  "_id": "...",
  "userId": "user_id",
  "productId": "product_id",
  "quantity": 2,
  "status": "pending",
  "createdAt": "...",
  "updatedAt": "..."
}
```

Endpoints :

| Méthode | URL | Auth | Rôle | Description |
|---|---|---|---|---|
| POST | `/api/orders` | Oui | user/admin | Créer une commande |
| GET | `/api/orders` | Oui | user/admin | Liste de toutes les commandes |
| GET | `/api/orders/me` | Oui | user/admin | Commandes de l'utilisateur connecté |

Body création :

```json
{
  "productId": "product_id",
  "quantity": 2
}
```

Réponse création :

```json
{
  "success": true,
  "message": "Commande créée avec succès",
  "data": {
    "order": {
      "_id": "...",
      "userId": "...",
      "productId": "...",
      "quantity": 2,
      "status": "pending"
    },
    "product": {
      "_id": "...",
      "name": "T-shirt",
      "price": 120,
      "stock": 30
    }
  }
}
```

## Flux RabbitMQ

Quand le frontend crée une commande :

1. Le frontend appelle `POST http://localhost:5002/api/orders`.
2. `order-service` vérifie que le produit existe dans `product-service`.
3. `order-service` vérifie le stock.
4. `order-service` crée la commande en base MongoDB.
5. `order-service` publie un événement dans RabbitMQ.
6. `product-service` consomme l'événement.
7. `product-service` décrémente automatiquement le stock.

Le frontend n'appelle pas RabbitMQ directement.

## Gestion des erreurs côté frontend

Réponses fréquentes :

| Code | Signification | Action frontend conseillée |
|---|---|---|
| 400 | Données invalides | Afficher le message sous le formulaire |
| 401 | Token absent/invalide | Rediriger vers login |
| 403 | Accès refusé | Masquer l'action ou afficher accès refusé |
| 404 | Ressource introuvable | Afficher une page/alerte non trouvé |
| 500 | Erreur serveur | Afficher un message général |

Exemples de messages :

```json
{
  "message": "Token manquant"
}
```

```json
{
  "success": false,
  "message": "Stock insuffisant"
}
```

## Exemple Axios

```js
import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "http://localhost:5001",
});

api.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

Créer une commande :

```js
await axios.post(
  "http://localhost:5002/api/orders",
  {
    productId: product._id,
    quantity: 2,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
```

## Pages Frontend Conseillées

Pour l'API concerts :

- Login
- Register
- Liste des stages
- Détail stage avec artistes
- Liste des artistes avec recherche et filtres
- Détail artiste avec ses concerts
- Liste des concerts
- Dashboard admin pour CRUD stages/artists/concerts

Pour les microservices :

- Login/Register
- Liste des produits
- Détail produit
- Créer produit admin
- Modifier/supprimer produit admin
- Panier simple ou formulaire commande
- Mes commandes
- Liste commandes

## Lancement Backend

API principale :

```bash
npm install
npm run dev
```

Microservices :

```bash
cd microservices-app/auth-service
npm install
npm run dev
```

```bash
cd microservices-app/product-service
npm install
npm run dev
```

```bash
cd microservices-app/order-service
npm install
npm run dev
```

Services nécessaires :

- MongoDB local actif
- RabbitMQ local actif pour les commandes microservices

## Notes importantes pour le frontend

- Le frontend doit utiliser le token du service avec le même `JWT_SECRET`.
- Pour les microservices, connecte-toi via `auth-service` sur le port `5000`.
- Pour l'API concerts, connecte-toi via l'API principale sur le port `3000`.
- Les deux systèmes d'auth sont séparés même s'ils utilisent JWT.
- Après création d'une commande, recharge le produit pour voir le stock mis à jour.
- Les routes admin doivent être protégées côté interface, mais la vraie sécurité reste côté backend.
