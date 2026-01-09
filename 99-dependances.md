> **Version** : 0.11.9

# Dépendances Techniques

Voici la liste des principales bibliothèques utilisées dans le projet, classées par domaine d'utilisation.

## Core & Build
*   **[Vue 3](https://vuejs.org/)** : Framework JavaScript progressif pour la construction d'interfaces utilisateur.
*   **[Vite](https://vitejs.dev/)** : Outil de build nouvelle génération, rapide et léger.
*   **[TypeScript](https://www.typescriptlang.org/)** : Superset typé de JavaScript pour un code plus robuste.

## Interface Utilisateur (UI)
*   **[Vuetify](https://vuetifyjs.com/)** : Framework de composants Material Design pour Vue.
*   **[Phosphor Icons](https://phosphoricons.com/)** : Famille d'icônes flexible et cohérente via `@phosphor-icons/vue`.
*   **[Lucide](https://lucide.dev/)** : Bibliothèque d'icônes belle et cohérente via `lucide-vue-next`.
*   **[Floating UI](https://floating-ui.com/)** : Gestion du positionnement des éléments flottants (tooltips, popovers) via `@floating-ui/dom`.
*   **Animate.css** : Bibliothèque d'animations CSS prêtes à l'emploi.

## Éditeur de Texte & Code (Tek-Editor)
*   **[Tiptap](https://tiptap.dev/)** : Éditeur de texte riche "headless" basé sur ProseMirror.
    *   `@tiptap/core`, `@tiptap/starter-kit`, `@tiptap/vue-3`
    *   Extensions : `extension-link`, `extension-list`, `extension-text-style`, `extension-underline`
*   **[CodeMirror](https://codemirror.net/)** : Éditeur de code polyvalent pour le web.
    *   Utilisé via `vue-codemirror` et `@codemirror/*`.

## Données & Logique
*   **[Dexie.js](https://dexie.org/)** : Wrapper minimaliste pour IndexedDB, facilitant la gestion de la base de données locale.
*   **[EventEmitter3](https://github.com/primus/eventemitter3)** : Émetteur d'événements haute performance.
*   **Lodash Debounce** : Utilitaire pour limiter la fréquence d'exécution de fonctions coûteuses.

## Utils
*   **change-case** : Manipulation de casse de chaînes de caractères.
*   **client-zip** : Création d'archives ZIP côté client.
*   **html2canvas-pro** : Captures d'écran de pages web ou de parties de pages.
*   **Marked** : Parseur et compilateur Markdown.
