# Test technique BALYO - backend

Ce repo contient la partie backend du test technique pour Balyo

Il contient une app node avec express et mongoose pour se connecter a MongoDB que vous pouvez installer avec la commande suivante une fois le repo fork et clone:

```bash
npm install
```

Une fois les dependances installees, vous pouvez lancer le Docker compose si vous avez Docker et compose sur votre PC, voici les liens et manuels d'installation:

https://docs.docker.com/get-docker/ pour Docker

https://docs.docker.com/compose/install/ pour Docker compose

Une fois les 2 installes, vous pouvez lancer cette commande pour lancer la DB en local:
```bash
docker-compose -f compose.yaml up
```

Si jamais vous n'avez pas Docker et Docker compose, il vous est possible de modifier l'URL de connection a la DB et les credentials dans le ``app.ts``

Pour lancer l'application, il vous suffit de lancer la commande suivante dans le repertoire du projet:
```bash
npm run dev
```

___

Pour la partie backend, les attentes du test sont:

- Avoir une route pour pouvoir supprimer une todo
- Avoir une route pour pouvoir modifier un todo (title / description)
- Avoir une route pour pouvoir passer un todo en 'DONE'
- De la validation au niveau de la creation ou modification d'un todo pour autoriser seulement la creation si le 'title' contient 8 caracteres minimum et la description peut etre vide
- Des tests unitaires ou d'integration utilisant le framework de votre choix

Les attentes sont classes par ordre de priorite, il n'est pas necessaire de tout faire mais en fonction de votre temps, sentez vous libre.

Pensez a noter si vous avez rencontre des problemes et n'hesitez pas a m'envoyer un mail si jamais vous etes sur un point bloquant ou bien vous avez des questions.

Good luck and happy learning