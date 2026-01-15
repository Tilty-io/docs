> **Version** : 0.14.0

# Raccourcis clavier

#### 

| Touches                                                                                | Action                                  | Rôles       |             |                |
|:---------------------------------------------------------------------------------------|:----------------------------------------|:------------|:------------|:---------------|
|                                                                                        |                                         | **Lecteur** | **Editeur** | **Architecte** |
| <kbd>ENTER</kbd>                                                                       | Valide l'action active (ex: formulaire) | x           | x           | x              |
| <kbd>ESC</kbd>                                                                         | Ferme la fenêtre active                 | x           | x           | x              |
| <kbd>M</kbd>                                                                           | maximise ou minimise la fenêtre active  | x           | x           | x              |
| <kbd>X</kbd> enfoncé                                                                   | Désactive l'édition WYSIWYG             |             | x           | x              |
| <kbd>X</kbd> relâché                                                                   | Réactive l'édition WYSIWYG              |             | x           | x              |
| <kbd>CTRL</kbd> + <kbd>D</kbd>                                                         | Duplique l'élément sélectionné          |             | x           | x              |
| Fonctionne sur                                                                         | page / list-item                        |             | x           | x              |
|                                                                                        | atomic data                             |             | x           | x              |
|                                                                                        | atomic structure                        |             |             | x              |
| <kbd>CTRL</kbd> + <kbd>C</kbd>                                                         | Copie  l'élément sélectionné            |             | x           | x              |
| Fonctionne sur                                                                         | page                                    |             | x           | x              |
|                                                                                        | atomic data / list-item                 |             | x           | x              |
|                                                                                        | atomic structure                        |             |             | x              |
| <kbd>CTRL</kbd> + <kbd>V</kbd>                                                         | Colle l'élément sélectionné             |             | x           | x              |
| Fonctionne sur                                                                         | page                                    |             | x           | x              |
|                                                                                        | atomic data / list                      |             | x           | x              |
|                                                                                        | atomic structure                        |             |             | x              |
| <kbd>DELETE</kbd> / <kbd>SUPPR</kbd>                                                   | Supprime l'élément sélectionné          |             | x           | x              |
| Fonctionne sur                                                                         | page                                    |             | x           | x              |
|                                                                                        | atomic data                             |             | x           | x              |
|                                                                                        | atomic structure                        |             |             | x              |
|                                                                                        | media                                   |             | x           | x              |
| <kbd>CTRL</kbd> + <kbd>Z</kbd>                                                         | Annuler la modification (contenu)       |             | x           | x              |
| <kbd>CTRL</kbd> + <kbd>Y</kbd> (ou <kbd>CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>Z</kbd> ) | Rétablir la modification                |             | x           | x              |


> [!IMPORTANT]
> L'historique (Undo/Redo) concerne uniquement les modifications de **contenu** au sein de la page ou de l'élément en cours d'édition. Les actions de structure (création/suppression d'enregistrements, modification de modèles) ne sont pas incluses dans cet historique.

> [!WARNING]
> **Fonctionnalité expérimentale** : Le système d'annulation est en cours de développement. Son fonctionnement n'est pas garanti et peut varier selon le contexte d'édition.
