> **Version** : 0.15.0

# Historique des versions

## Série v0.15

### v0.15.0 (2026-01-16)
#### 🔀 Gestion des Redirections
Une version majeure introduisant un système complet de gestion des redirections, compatible avec tous les environnements.

*   **Redirections** :
    *   **Interface Admin** : Nouvelle fenêtre dédiée pour gérer vos codes 301 et 302.
    *   **Flexibilité** : Support des redirections vers des pages internes (résistantes au renommage) ou des URLs personnalisées.
    *   **Publication Hybride** : Le moteur de publication génère désormais une stratégie "ceinture et bretelles" pour chaque redirection :
        1.  `index.php` (Header 301) pour les serveurs dynamiques.
        2.  `.htaccess` (Apache) et `web.config` (IIS) pour une gestion serveur native.
        3.  `index.html` (Meta Refresh + JS) comme fallback universel pour le statique pur.
    *   **SEO** : Optimisation maximale pour les moteurs de recherche grâce aux headers 301 réels.

*   **Correctifs & Améliorations** :
    *   **Serveur** : Correction d'erreurs 403 sur les URLs contenant des espaces ou caractères spéciaux (Flag `[B]` Apache).
    *   **Hotkeys** : Amélioration du support des raccourcis clavier contextuels dans les fenêtres modales.

## Série v0.14

### v0.14.0 (2026-01-15)
#### ✨ Tilty-wysiwyg & Documentation IA
Une mise à jour majeure axée sur la documentation et le contrôle fin de l'édition WYSIWYG.

*   **Tilty-wysiwyg (`ty-wy`)** : Contrôle total sur l'interface d'édition.
    *   **`ty-wy-ignore`** : Nouveaux modes `children` et `self` pour un contrôle précis de ce qui est éditable (conteneur vs enfants).
    *   **`ty-wy-align`** : Positionnement flexible des boutons d'édition (top, bottom, left, center, right).
    *   **`ty-wy-direction`** : Support des listes horizontales (`x`) avec adaptation automatique des icônes.

*   **Documentation & IA** :
    *   **Nouvelle page** : "Fine-tuning WYSIWYG" avec exemples unifiés pour une meilleure compréhension.
    *   **AI Context** : Le fichier contextuel pour les agents IA (`AGENT_CONTEXT.md`) est maintenant 100% généré par script, garantissant une synchro parfaite avec le code.
    *   **Zéro Hallucination** : Nettoyage des attributs inexistants dans la doc (ex: `ty-img`).

*   **Correctifs** :
    *   **Help Dialog** : Correction de la résolution des chemins d'images relatifs dans l'aide en ligne.
    *   **UI** : Correction z-index des tooltips et regression du bouton `+`.

## Série v0.13

### v0.13.1 (2026-01-14)
*   **Documentation** : Ajout de la page "Intégration avec les Agents IA" (Vision, MCP, Agnosticisme, Exemples polymorphes).
*   **Documentation** : Ajout de la coloration syntaxique spécifique pour les attributs `ty-*` dans les exemples de code.
*   **UI/Help** : Amélioration de la navigation dans l'aide avec une coloration hiérarchique des chapitres (H1/H2/H3) et ajout de bordures pour les images dans la documentation.

### v0.13.0 (2026-01-13)
#### ↩️ Système d'annulation (Undo/Redo) - [EXPÉRIMENTAL]
Cette version apporte une souplesse d'édition accrue avec la gestion de l'historique des modifications.

*   **Undo / Redo** :
    *   **Portée** : Support complet des annulations/rétablissements sur les modifications de contenu (textes, images, liens, etc.) au sein d'une page.
    *   **Raccourcis** : <kbd>CTRL</kbd> + <kbd>Z</kbd> pour annuler, <kbd>CTRL</kbd> + <kbd>Y</kbd> ou <kbd>CTRL</kbd> + <kbd>MAJ</kbd> + <kbd>Z</kbd> pour rétablir.
    *   **Précision** : L'historique se concentre sur le confort d'édition du contenu (les actions de structure comme la suppression ou création d'enregistrements restent définitives).

> [!WARNING]
> Cette fonctionnalité est actuellement en phase **expérimentale**. Son fonctionnement n'est pas garanti à 100% pour le moment et peut présenter des comportements imprévus selon la complexité des données.

*   **Barre de navigation personnalisable** :
    *   **Visibilité à la carte** : Choisissez quelles fenêtres s'affichent directement dans la barre d'outils.
    *   **Accès rapide** : Clic droit sur n'importe quel bouton pour ouvrir le menu de configuration.
    *   **Centralisation** : Options disponibles dans les **Paramètres > Fenêtres**.

## Série v0.12

### v0.12.0 (2026-01-12)
#### 🚀 Refonte moteur de publication & Robustesse
Cette version introduit une refonte de la robustesse du moteur de publication.

*   **Zéro échec de publication** : La publication est désormais **résiliente aux pannes**.
    *   **Auto-réparation** : Si des images générées sont manquantes (cache vide ou fichier supprimé), le moteur les **régénère automatiquement à la volée** pendant l'export, sans erreur.
    *   **Anti-Timeout** : Le processus de copie des fichiers est désormais **découpé en "chunks" intelligents** (paquets de 4 secondes). Cela permet de publier des projets contenant des milliers de fichiers sans jamais atteindre les limites de temps du serveur.
    *   **Tolérance aux erreurs** : Correction des crashs liés aux dossiers vides ou inexistants.

*   **Extraction de médias contextuelle** :
    *   Le moteur détecte désormais les fichiers cités dans le **HTML** (articles, descriptions, textes, code, json, etc.) et non plus seulement dans les attributs `src` ou `href`.
    *   Logs détaillés et avertissements explicites en cas de fichier introuvable (au lieu d'échecs silencieux).

## Série v0.11

### v0.11.18 (2026-01-12)
*   *(Version interne)* : Amélioration du workflow de versioning et de déploiement.

### v0.11.17 (2026-01-12)
*   **Media** : Correction du crash lors de l'upload de GIFs (bypass getID3).
*   **Media Dialog** : Réinitialisation de l'input fichier après sélection pour permettre la ré-upload du même fichier.
*   **API** : Correction des headers CORS pour le téléchargement de fichiers (`dwd-file.php`).

### v0.11.8 (2026-01-09)
*   **Hotkeys** : Refonte de la gestion des raccourcis clavier.
    *   Gestion contextuelle améliorée des touches **Enter** et **Escape** (scopes).

### v0.11.7 (2026-01-09)
*   **ty-attributes** : Amélioration de la logique de suggestion des champs manquants.
    *   Les champs nommés `title`, `titre`, `subtitle`, `alt`, `name`, `nom`... sont maintenant suggérés comme **Texte Simple**.
    *   Les champs nommés `description`, `legende`, `caption`, `intro`, `summary`... sont maintenant suggérés comme **Texte Multiligne**.

### v0.11.6 (2026-01-09)
*   **UX** : Amélioration générale de l'interface des fenêtres (Média, Architecture, Édition, Synchro).
*   **Docs** : Recentralisation des tooltips d'aide dans le repo de documentation.

### v0.11.5 (2026-01-07)
*   **Fix** : Correction de l'upload de GIFs animés de grande taille qui échouait.

### v0.11.4 (2026-01-07)
*   **Dev** : Migration de la documentation vers un [repo Git dédié.](https://github.com/Tilty-io/docs)

### v0.11.3 (2026-01-07)
*   *(Version interne)* : Ajustements techniques liés à la migration de la documentation.

### v0.11.2 (2026-01-07)
*   Correction de l'index de l'aide en ligne : réparation des liens brisés et réorganisation des rubriques.

### v0.11.0 (2026-01-07)
*   **Documentation** : Ajout du guide sur les "Conventions de nommage".
*   **Documentation** : Précisions sur l'utilisation des valeurs par défaut pour les intégrateurs.

## Versions antérieures (v0.10.x)
*   Mise en place initiale de Tilty et de la documentation.
