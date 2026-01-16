
# SYSTEM CONTEXT: Tilty CMS Documentation
This document is a concatenation of the official documentation for Tilty CMS.
It is designed to provide comprehensive context for an AI Agent assisting with Tilty development.

## CRITICAL INSTRUCTIONS FOR AI AGENTS

### 0. MANDATORY PROTOCOL
- **ALWAYS START YOUR RESPONSE** with the following line on its own:
  > Tilty v0.15.0
  (This ensures the user knows which version of the documentation you are using).

### 1. SYNTAX REFERENCE (TypeScript)
The following interface defines the ONLY valid attributes you may use.
```typescript
/**
 * Tilty Template Attributes
 * These attributes govern how data is bound to the HTML.
 */
interface TiltyAttributes {
    /** Binds the innerHTML of the element to the variable */
    'ty-html'?: string;
    /** Binds the innerText of the element to the variable */
    'ty-text'?: string;

    /** Binds distinct attributes */
    'ty-title'?: string;
    'ty-src'?: string; // Automatically handles image resizing if function is used e.g. "img.resize(w,h)"
    'ty-alt'?: string;
    'ty-target'?: string;
    'ty-href'?: string;
    'ty-width'?: string;
    'ty-height'?: string;
    'ty-placeholder'?: string;
    'ty-value'?: string;
    'ty-content'?: string; // <meta content="...">
    'ty-id'?: string;

    /** Boolean attributes (removed if false/null) */
    'ty-checked'?: string;

    /** CSS Classes */
    'ty-class'?: string;      // Replaces the class attribute
    'ty-add-class'?: string;  // Appends to the class attribute

    /** Logic & Control Flow */
    'ty-if'?: string;         // Shows element only if truthy
    'ty-list'?: string;       // Iterates over a list
    'ty-list-item'?: 'ignore' | (string & {}); // "templateName" OR "ignore"
    'ty-scope'?: string;      // Scopes variables to an object

    /** 
     * Escape hatch for other attributes 
     * Syntax: "attribute:variable;attr2:var2"
     * Example: ty-attr="aria-label:myLabel;data-id:id"
     */
    'ty-attr'?: string;

    /** Developer utility to ignore an element during parsing */
    'ty-ignore'?: boolean;
}

```

### 2. STRICT SYNTAX ENFORCEMENT
- **NO HALLUCINATIONS**: If it's not in `TiltyAttributes` above, IT DOES NOT EXIST.
- **WHITELIST**:
   - binding: `ty-html`, `ty-text`
   - attributes: `ty-title`, `ty-src`, `ty-alt`, `ty-target`, `ty-href`, `ty-width`, `ty-height`, `ty-placeholder`, `ty-value`, `ty-content`, `ty-id`, `ty-checked`, `ty-class`, `ty-add-class`
   - logic: `ty-if`, `ty-list`, `ty-list-item`, `ty-scope`
   - special: `ty-attr` (use this for any other HTML attribute not listed above, e.g. `ty-attr="aria-label:myVar"`)
   - dev: `ty-ignore`
- **Fallback**: If you need to bind a standard HTML attribute that has no dedicated `ty-*` equivalent, YOU MUST USE `ty-attr`.

### 3. YOUR ROLE: "TILTYFICATION"
Your primary goal is often to transform static HTML into dynamic Tilty templates ("Tiltyfication").
- **Semantic Understanding**: Analyze the HTML to deduce the *meaning* (Is it a title? A list? A background image?).
- **Smart Naming**: Choose variable names that describe the content semantically (e.g., `articleTitle`, `featuresList`, `heroImage`).
- **Polymorphism**: If you see a section with mixed content types (like a Page Builder), use `ty-list` with multiple `ty-list-item` templates.
- **Strictness**: Channel your "imagination" through the strict rigor of the `ty-*` attributes. Do not deviate from the spec.

### 4. PRESERVE HTML STRUCTURE (CRITICAL)
- **DO NOT DELETE CODE**: You must NEVER delete tags from the user's HTML. The goal is to make the existing HTML dynamic, not to refactor or clean it up.
- **Use ty-ignore**: If a list in the HTML contains multiple examples (e.g. 3 lines of a list), keep ALL of them to preserve the visual mockup.
    - Tag the first one as the template (e.g., `ty-list-item="myTemplate"`).
    - Tag the others with `ty-list-item="ignore"` or `ty-ignore`.

(See "FEW-SHOT TRAINING" section at the end of this document for explicit examples).




 < !--SOURCE_FILE: README -->


# Index de l'aide

## Introduction
- [Tilty en résumé](see 01-tilty-en-resume)
- [Historique des versions](see 11-changelog)

## Concepts
- [Tilty Attributes (ty-*)](see 02-tilty-attributes/README)
  - [Liste des attributs](see 02-tilty-attributes/02-ty-attr-list)
  - [Syntaxe des expressions](see 02-tilty-attributes/03-ty-attr-syntaxe)
  - [Modèles de données](see 02-tilty-attributes/04-ty-attr-modeles)
- [Le multilingue](see 04-le-multilingue)
- [La publication](see 03-la-publication)
- [Les redirections](see 13-les-redirections)

## Utilisation de l'interface
- [Présentation de l'Admin](see 07-presentation-admin)
- [Présentation du Dashboard](see 08-presentation-dashboard)
- [Mode Editeur](see 06-mode-editeur)
- [Raccourcis clavier](see 10-hotkeys)

## Architecture & Configuration
- [Mode Architecte](see 05-mode-architecte)
- [Valeurs par défaut](see 05a-valeurs-par-defaut)
- [Conventions de nommage](see 05b-conventions-nommage)
- [Suggestions de types](see 05c-suggestions-champs)
- [Agents IA](see 12-agents-ia)

## Extensions
- [Tilty Kiosk](see 09-tilty-kiosk)

## Technique / Développement
- [Notes de développement](see 98-notes-dev)
- [Dépendances](see 99-dependances)


---


 < !--SOURCE_FILE: 01-tilty-en-resume -->


**Qu'est-ce que Tilty ?**

Tilty se définit avant tout comme un **outil**. Plus qu'un simple framework ou une solution SaaS, c'est un environnement de travail conçu pour la sobriété et l'efficacité. Il prône une approche minimaliste : aller à l'essentiel, avec élégance.

**Pour qui ?**

Si Tilty peut être utilisé par des agences, des webmasters ou des architectes du web, il a été pensé et conçu avant tout pour les **webdesigners**.

**Pour quoi faire ?**

L'objectif est limpide : **donner vie à un site statique**.
Tilty permet de transformer n'importe quelle maquette HTML en un site administrable (CMS) et dynamique. Il comble le fossé entre la création statique et la gestion de contenu, permettant de "rendre éditable" n'importe quelle page HTML existante.

**La philosophie**

La force de Tilty réside dans sa simplicité d'exécution. Il permet de réaliser ces transformations **sans écrire une seule ligne de code** de programmation complexe. Tout se fait rapidement, simplement, et "sans se prendre la tête". C'est la promesse d'un développement web économique, efficace et joyeux.

---

> "Tilty est un outil sobre et efficace à destination des webdesigners qui souhaitent donner vie à un site statique sans écrire une ligne de code."
> — **David**

> "Tilty est une solution à destination des webdesigners qui souhaitent rendre dynamique des pages statiques sans écrire une ligne de code."
> — **Juliette**


---


 < !--SOURCE_FILE: 02-tilty-attributes/README -->


# Tilty attributes

- [Généralités](see 01-ty-attr-generalites)  
  Présentation des objectifs des attributs ty-*, du vocabulaire et des cas d'usage.

- [Liste des attributs (ty-html, ty-src...)](see 02-ty-attr-list)  
  Référence complète des attributs disponibles (ty-text, ty-class, ty-placeholder...).

- [Accéder aux données (syntaxe et expressions)](see 03-ty-attr-syntaxe)  
  Guide sur la syntaxe des expressions, accès aux variables (`title`, `user.name`) et bonnes pratiques.

- [Modèles de données (Page, Lien, Fichier)](see 04-ty-attr-modeles)  
  Détail des propriétés pour les objets complexes : Pages (SEO), Liens et Fichiers/Médias.

- [Boucles (ty-list)](see 06-ty-attr-boucles)  
  Afficher des listes d'éléments dynamiquement.

- [Conditions (ty-if)](see 05-ty-attr-conditions)  
  Contrôler l'affichage des éléments en fonction de conditions.

- [Optimiser les images](see 08-ty-attr-images)  
  Gestion des formats, redimensionnement et performance des images.

- [Fonctionnalités avancées](see 07-ty-attr-avance)  
  Techniques avancées : hooks, transformations et exemples complexes.

- [Fine-tuning WYSIWYG](see 09-fine-tuning-wysiwyg)  
  Maitriser l'éditeur visuel : ignorer des éléments, positionner les boutons et personnaliser l'expérience d'édition.


---


 < !--SOURCE_FILE: 02-tilty-attributes/01-ty-attr-generalites -->


# Une approche respectueuse du HTML

Tilty Attributes, ou *TyAttr*, est un système d’attributs HTML conçu pour injecter des données dynamiques dans vos pages web sans jamais compromettre leur validité ou leur structure. Il permet de transformer une page HTML statique en une page dynamique et éditable, sans avoir à écrire une seule ligne de code JavaScript ou PHP.

Son objectif est simple : **permettre aux designers, intégrateurs ou agences de rendre une page HTML éditable, vivante et connectée à une base de données, sans quitter leur environnement habituel.**

Fidèle à son nom, TyAttr s’appuie **exclusivement sur des attributs HTML**, sans introduire de balises spécifiques ni de syntaxe propriétaire. À l’inverse des frameworks comme Angular, Vue, React, ou des moteurs de templates PHP (comme ceux de WordPress), il ne nécessite aucun moteur de rendu complexe : il s'intègre directement dans le HTML existant.

On y retrouve certaines logiques proches de frameworks comme Vue.js ou React, mais avec une philosophie radicalement différente : **TyAttr génère du HTML à partir de HTML**. Autrement dit, il ne vous éloigne jamais du langage de base du web.

Cette approche permet une **compatibilité totale avec les éditeurs visuels** comme Webflow. Vous pouvez non seulement concevoir vos interfaces graphiques dans Webflow, mais également **saisir directement les attributs TyAttr** dans l’interface — via les champs "Custom Attributes" ou les éléments HTML personnalisés — afin de connecter vos designs à une base de données Tilty.

Pourquoi complexifier quand on peut faire simple ?  
 **TyAttr est un pont entre le HTML statique et le CMS dynamique, tout en restant fidèle aux standards du web.**

> [!TIP]
> Tilty peut analyser vos attributs `ty-*` pour **créer automatiquement les champs** dans l'administration. Découvrez comment fonctionnent les **[Suggestions Automatiques](see ../05c-suggestions-champs)**.

## Pourquoi TyAttr utilise-t-il uniquement des attributs HTML ?

L’utilisation exclusive des attributs HTML dans TyAttr n’est pas un hasard : c’est un choix technique et philosophique fort, basé sur plusieurs avantages concrets.

#### Compatibilité totale avec le HTML natif

En se limitant aux attributs, TyAttr garantit que le code HTML reste valide et lisible, même en dehors du cadre de Tilty. Cela signifie que votre page peut toujours être affichée dans n’importe quel navigateur, sans erreur ni comportement inattendu.

#### 2. Intégration fluide avec les éditeurs visuels

Les éditeurs comme Webflow ou Pinegrow acceptent facilement l’ajout d’attributs personnalisés. Il est donc possible de préparer des pages dynamiques sans écrire de JavaScript ni toucher au backend, directement dans ces outils.

#### 3. Aucune pollution du DOM

Contrairement aux frameworks qui injectent des balises supplémentaires ou du code inline, TyAttr ne modifie pas la structure de la page. Le DOM reste propre, simple, facile à maintenir — idéal pour des projets où la lisibilité et la performance comptent.

#### 4. Courbe d’apprentissage quasi nulle

Pas besoin d’apprendre une nouvelle syntaxe ou un langage de template. Si vous connaissez le HTML, vous savez déjà utiliser TyAttr. Un attribut comme `ty-html="titre"` parle de lui-même.

#### 5. Séparation claire entre données et design

Les attributs permettent de lier proprement la donnée au design sans entremêler logique et mise en forme. Cela simplifie la maintenance, favorise la collaboration entre profils créa et dev, et réduit les bugs liés à l’interprétation.

# Utilisation des données tilty dans votre code html

L'exemple suivant va afficher dans la balise H1 la valeur de titre

```html
<h1 ty-html="titre">...</h1>
```

L'exemple suivant va afficher dans la balise H1 la valeur de `titre` du record `page@99`

```html
<h1 ty-html="db(page@99).titre">...</h1>
```




---


 < !--SOURCE_FILE: 02-tilty-attributes/02-ty-attr-list -->


# Liste des attributs Tilty

| Gestion du contenu des balises                                            |                                                                                                                                                     | Multi-Exp. |
|:--------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------|:----------:|
| `ty-html`                                                                 | insère la valeur dans le html de la balise                                                                                                          |     ✅      |
| `ty-text`                                                                 | insère la valeur dans le corps html de la balise sous forme de texte                                                                                |     ✅      |
| **Gestion des attributs courants**                                        |                                                                                                                                                     |            |
| `ty-title`                                                                | insère la valeur dans l'attribut title                                                                                                              |     ✅      |
| `ty-src`                                                                  | insère la valeur dans l'attribut src                                                                                                                |     ❌      |
| `ty-alt`                                                                  | insère la valeur dans l'attribut alt                                                                                                                |     ✅      |
| `ty-target`                                                               | insère la valeur dans l'attribut target                                                                                                             |     ❌      |
| `ty-href`                                                                 | insère la valeur dans l'attribut href (peut avoir une incidence sur l'attribut target)                                                              |     ❌      |
| `ty-width`                                                                | insère la valeur dans l'attribut width                                                                                                              |     ❌      |
| `ty-height`                                                               | insère la valeur dans l'attribut height                                                                                                             |     ❌      |
| `ty-placeholder`                                                          | insère la valeur dans l'attribut `placeholder`                                                                                                      |     ✅      |
| `ty-value`                                                                | insère la valeur dans l'attribut `value`                                                                                                            |     ❌      |
| `ty-content`                                                              | insère la valeur dans l'attribut content                                                                                                            |     ❌      |
| `ty-id`                                                                   | insère la valeur dans l'attribut id.  **N'insère rien si l'id est vide.**                                                                           |     ❌      |
| **Attributs booléens (n'est pas intégré si la valeur est null ou false)** |                                                                                                                                                     |            |
| `ty-checked`                                                              | insère la valeur dans l'attribut checked ou supprime l'attribut si la valeur est null ou false                                                      |     ❌      |
| **Attributs custom**                                                      |                                                                                                                                                     |            |
| `ty-attr`                                                                 | Pour gérer les attributs qui ne sont pas listés plus haut                                                                                           |     ❌      |
| **Gestion attributs spéciaux**                                            |                                                                                                                                                     |            |
| `ty-class`                                                                | remplace l'attribut class par la valeur                                                                                                             |     ✅      |
| `ty-add-class`                                                            | ajoute la valeur à l'attribut class existant                                                                                                        |     ✅      |
| `ty-style`                                                                | **<span><strong><code style="background-color:#f00;color;#fff;">TODO</code></strong></span>**                                                       |     ❌      |
| **Attributs de boucle**                                                   |                                                                                                                                                     |
| `ty-list`                                                                 | Permet de boucler sur des listes                                                                                                                    |
| `ty-list-item`                                                            | Au sein d'une boucle `ty-list` permet de sélectionner les items html à utiliser.                                                                    |
| **Attributs d'objet**                                                     |                                                                                                                                                     |
| `ty-scope`                                                                | Permet de définir la racine d'un objet. Les enfants de cet élément DOM seront scopé et il ne sera pas nécessaire de répéter la variable de l'objet. |
| **Conditionner l'insertion d'une balise**                                 |                                                                                                                                                     |
| `ty-if`                                                                   | Permet d'afficher une balise en fonction de la valeur d'un champ                                                                                    |
| `ty-ignore`                                                               | ignore et supprime la balise                                                                                                                        |
| `ty-list-item="ignore"`                                                   | ignore et supprime la balise                                                                                                                        |


---


 < !--SOURCE_FILE: 02-tilty-attributes/03-ty-attr-syntaxe -->


# Accéder aux données

Tilty Attributes vous permet d'injecter vos données dynamiques directement dans vos templates HTML.
Ce guide vous explique comment cibler précisément les informations dont vous avez besoin.

## La base : Notation par point

Les données Tilty sont structurées comme des objets (arborescence). Pour descendre dans la hiérarchie, on utilise simplement le point `.`.

```html
<!-- Affiche le nom de l'utilisateur -->
<h1 ty-text="user.name"></h1>

<!-- Affiche la ville de l'adresse de l'utilisateur -->
<p ty-text="user.address.city"></p>

<!-- Affiche le titre en anglais explicitement (si champ multilingue) -->
<span ty-text="title.en"></span>
```

## Le Contexte : `ty-scope`

L'attribut `ty-scope` est **fondamental**. Il permet de définir un "contexte" pour un élément HTML et tous ses enfants. Cela vous évite de répéter le chemin complet à chaque fois.

**Sans scope (répétitif) :**
```html
<div>
    <h2 ty-text="user.name"></h2>
    <p  ty-text="user.email"></p>
</div>
```

**Avec scope (plus propre) :**
```html
<div ty-scope="user">
    <!-- Ici, tout part de "user" -->
    <h2 ty-text="name"></h2>
    <p  ty-text="email"></p>
</div>
```
> [!TIP]
> Si le chemin défini dans `ty-scope` est introuvable ou vide, **tout le bloc HTML est supprimé du rendu**. C'est un moyen très efficace de cacher des sections entières s'il n'y a pas de données.

Vous pouvez imbriquer les scopes autant que nécessaire :
```html
<div ty-scope="user">
    <h2 ty-text="name"></h2>
    
    <div ty-scope="address">
        <!-- Ici on est dans user.address -->
        <p ty-text="city"></p>
    </div>
</div>
```

## Accéder à d'autres sources de données

Par défaut, Tilty cherche dans les données de la page courante. Mais vous pouvez aller chercher ailleurs.

### Données Globales avec `var()`
Pour accéder à des variables définies globalement (configuration du site, menu principal...), utilisez `var()`.

```html
<footer ty-scope="var().siteConfig">
    <img ty-src="logo" />
    <p ty-text="legalMention"></p>
</footer>
```

### Autres Pages avec `db()`
Pour accéder aux données d'une autre page spécifique, utilisez `db(htmlpage@ID)`.

```html
<!-- Affiche le titre de la page avec l'ID 99 -->
<a ty-href="db(htmlpage@99).meta.href" ty-text="db(htmlpage@99).seo.title">
    Lien vers la page 99
</a>
```

## Expressions Multiples (Concaténation)

Vous pouvez combiner plusieurs expressions dans un même attribut en les séparant par des **espaces**. Tilty va évaluer chaque partie et les concaténer.

C'est très utile pour construire des phrases ou des valeurs complexes.

### Texte et Variables

Tilty ajoute automatiquement une espace entre chaque élément concaténé.

```html
<!-- 1. Une variable simple -->
<!-- Affiche : "Jean" -->
<span ty-text="user.firstname"></span>

<!-- 2. Deux variables (ajout d'espace automatique) -->
<!-- Affiche : "Jean Dupont" -->
<span ty-text="user.firstname user.lastname"></span>

<!-- 3. Mix texte et variables -->
<!-- Affiche : "Bonjour Jean Dupont !" -->
<h1 ty-text="'Bonjour' user.firstname user.lastname '!'"></h1>

<!-- Exemple avec métadonnées de page -->
<!-- Affiche : "Article #42 : Mon Titre" -->
<h2 ty-text="'Article #' meta.id ':' meta.name"></h2>
```



> [!WARNING]
> Pour afficher du texte statique contenant des espaces, entourez-le de guillemets simples `'`.

## Gestion des attributs HTML avec `ty-attr`

Si aucun attribut `ty-something` n'existe pour votre besoin (ex: `data-id`, `aria-label`...), utilisez `ty-attr`.

**Syntaxe :** `ty-attr="attribut:valeur"`

```html
<!-- Génère <div data-id="123"> -->
<div ty-attr="data-id:user.id">...</div>
```

Pour définir plusieurs attributs, séparez-les par des points-virgules `;` :
```html
<div ty-attr="data-id:user.id;aria-label:user.name">...</div>
```

## Gestion des CSS

### Remplacer les classes (`ty-class`)
Remplace **toutes** les classes existantes.
```html
<!-- La classe "initial" sera perdue -->
<div class="initial" ty-class="user.theme"></div>
```

### Ajouter des classes (`ty-add-class`)
Ajoute des classes sans toucher aux existantes. C'est le choix le plus courant.
```html
<!-- La classe "btn" est conservée, et 'btn-primary' est ajoutée -->
<button class="btn" ty-add-class="theme.buttonStyle">Click</button>
```

## Propriétés Spécifiques

Parfois, un objet (comme un Lien ou une Image) contient plus que sa simple valeur. Vous pouvez accéder à ses propriétés spécifiques avec la notation par point `.`.

```html
<!-- Utilisation des propriétés d'un fichier vidéo -->
<video controls>
    <source ty-src="maVideo.href" ty-type="maVideo.mime">
</video>
```

> Consultez la [fiche Modèles de Données](see 04-ty-attr-modeles) pour voir toutes les propriétés disponibles pour les Images, Fichiers, Liens et Pages.


---


 < !--SOURCE_FILE: 02-tilty-attributes/04-ty-attr-modeles -->


# Modèles de Données

Retrouvez ici le détail des propriétés disponibles pour les différents types d'objets Tilty.

## HtmlPage (Page)

Les métadonnées d'une page sont accessibles via `db(htmlpage@id).meta` ou dans l'objet page courant.

| Meta                  | Type                                        | Explication                                                       |
|:----------------------|:--------------------------------------------|:------------------------------------------------------------------|
| **`uid`**             | `String`                                    | identifiant unique **`htmlpage@id`**                              |
| **`type`**            | `'htmlpage'`                                | type de la page (toujours 'htmlpage')                             |
| **`id`**              | `Number`                                    | identifiant numérique                                             |
| **`name`**            | `String`                                    | Le nom de la page (interne)                                       |
| **`href`**            | `String (localized)`                        | L'URL vers la page (localisée)                                    |
| **`datecreated`**     | `String` (YYYY-MM-DD hh:mm:ss)              | Date de création de la page                                       |
| **`datemodified`**    | `String` (YYYY-MM-DD hh:mm:ss)              | Date de la dernière modification                                  |
| **`template`**        | `String`                                    | Nom du template.html associé                                      |
| **`data`**            | `Object`                                    | Les données de la page (dépend du template)                       |

### Exemple d'utilisation (Page)
```html
<article>
    <h1>Page #<span ty-text="meta.id"></span> : <span ty-text="meta.name"></span></h1>
    <p>Créée le <time ty-text="meta.datecreated"></time></p>
    <a ty-href="meta.href">Lien permanent</a>
</article>
```

### SEO (HtmlPage)

Accessibles via `page.seo` ou `meta.seo`.

| Propriété             | Type                                        | Explication                                                       |
|:----------------------|:--------------------------------------------|:------------------------------------------------------------------|
| **`priority`**        | `Number`                                    | Priorité sitemap (0.0 à 1.0)                                      |
| **`changefreq`**      | `String`                                    | Fréquence sitemap (yearly, monthly, etc.)                         |
| **`noindex`**         | `Bool`                                      | Si true, la page est marquée "no-index" pour les robots           |
| **`href`**            | `String (localized)`                        | URL canonique                                                     |
| **`title`**           | `String (localized)`                        | Titre de la page (balise title)                                   |
| **`description`**     | `String (localized)`                        | Description (meta description)                                    |

### Exemple d'utilisation (SEO)
```html
<!-- Utiliser le titre SEO pour le titre principal -->
<h1 ty-text="meta.seo.title"></h1>

<!-- Utiliser la description SEO comme intro -->
<p class="intro" ty-text="meta.seo.description"></p>
```


## Liens (Link)

Certains types de données comme les liens possèdent des propriétés spécifiques accessibles via `variable.propriété`.

| Propriété      | Type                                | Explication                                                                                                            |
|:---------------|:------------------------------------|:-----------------------------------------------------------------------------------------------------------------------|
| **`value`**    | `String`                            | La valeur brute (URL, email, tel, etc.)                                                                                |
| **`linkType`** | `'url','email','tel','page','file'` | Le type de lien                                                                                                        |
| **`target`**   | `'_blank'` ou `null`                | La cible (`_blank` pour nouvel onglet)                                                                                 |

### Formatage automatique selon linkType

Si vous utilisez la variable directement (`ty-href="monLien"`), Tilty l'adapte :

| Type de lien | Exemple                               | Résultat généré                           |
|:-------------|:--------------------------------------|:------------------------------------------|
| `url`        | https://wikipedia.org                 | `https://wikipedia.org`                   |
| `email`      | contact@email.com                     | `mailto:contact@email.com`                |
| `tel`        | 0606060606                            | `tel:0606060606`                          |
| `file`       | .../x2b12.zip                         | URL brute du fichier                      |
| `page`       | .../mapage.p15                        | URL absolue de la page                    |

### Exemple d'utilisation (Lien)
```html
<!-- Afficher la valeur brute d'un lien (ex: le no de téléphone) -->
<span ty-text="monLien.value"></span>

<!-- Vérifier le type de lien -->
<div ty-if="monLien.linkType == 'tel'">C'est un téléphone !</div>
```

## Fichiers (File)

Propriétés d'un champ fichier/média.

| Propriété       | Type             | Explication                                                                                                                         |
|:----------------|:-----------------|:------------------------------------------------------------------------------------------------------------------------------------|
| **`href`**      | `String`         | L'URL directe vers le fichier (https://...)                                                                                         |
| **`size`**      | `Number`         | Poids en octets                                                                                                                     |
| **`mime`**      | `String`         | Type MIME (ex: 'image/jpeg')                                                                                                        |
| **`type`**      | `String`         | Identique à mime                                                                                                                    |
| **`mediaType`** | `String`         | 'document', 'image', 'video', ou 'audio'                                                                                            |
| **`name`**      | `String`         | Nom du fichier original                                                                                                             |
| **`width`**     | `Number`         | Largeur (si image/vidéo)                                                                                                            |
| **`height`**    | `Number`         | Hauteur (si image/vidéo)                                                                                                            |
| **`duration`**  | `Number (float)` | Durée en secondes (si audio/vidéo)                                                                                                  |
| **`id3`**       | `Object`         | Métadonnées ID3 (Titre, Artiste, Album...) pour l'audio                                                                             |

### Exemple d'utilisation (Fichier)
```html
<!-- Lecteur Audio -->
<audio controls>
  <source ty-src="monSon.href" ty-type="monSon.mime">
</audio>
<p>Durée : <span ty-text="monSon.duration"></span> secondes</p>

<!-- Lien de téléchargement avec le poids -->
<a ty-href="monFichier.href" download>
  Télécharger (<span ty-text="monFichier.size"></span> octets)
</a>
```


---


 < !--SOURCE_FILE: 02-tilty-attributes/05-ty-attr-conditions -->


# Les conditions `ty-if`

L'exemple ci-dessous illustre une problématique courante.

```html
<!-- Problème : cette balise s'affichera toujours, même si le champ monImage est vide -->
<img ty-src="monImage.resize(50,50)" alt="image 1">

<!-- Solution : cette balise ne s'affichera que si le champ monImage est renseigné -->
<img ty-if="monImage" ty-src="monImage.resize(50,50)" alt="image 1">
```

On peut pousser un peu plus loin l'exemple avec une card qui ne s'affiche que si `user.lastName` est renseigné

```html
<div class="card" ty-if="user.lastName">
    <img src="monImage.resize(50,50)" alt="portait">
    <h1 ty-text="user.firstname">Jonh</h1>
    <h2 ty-text="user.lastname">Smith</h2>
</div>
```

On peut aussi conditionner l'affichage à un booléen `user.active` 

```html
<div class="card" ty-if="user.active">
    <img src="monImage.resize(50,50)" alt="portait">
    <h1 ty-text="user.firstname">Jonh</h1>
    <h2 ty-text="user.lastname">Smith</h2>
</div>
```

### L'inverse de `ty-if` (spoiler: ce n'est pas ty-else)

```html
<div class="card" ty-if="user.active">
    <img src="monImage.resize(50,50)" alt="portait">
    <h1 ty-text="user.firstname">Jonh</h1>
    <h2 ty-text="user.lastname">Smith</h2>
</div>

<div class="card" ty-if="!user.active">
    <span class="alert">Cet utilisateur n'a pas activé son compte !</span>
    <img src="img/placeholders/user.jpg" alt="portait">
    <h1>Utilisateur</h1>
    <h2>Inactif</h2>
</div>
```

### Utiliser les Comparaisons

En plus de vérifier si une donnée existe, `ty-if` permet d'écrire des expressions de comparaison.

#### Comparer une valeur

**Problème**   
Vous souhaitez afficher un élément uniquement si une variable a une valeur précise (ex: le type de média est 'video').

**Solution**   
Vous pouvez utiliser l'opérateur `==` pour tester l'égalité.

```html
<!-- S'affiche uniquement si le type est 'video' -->
<div class="video-player" ty-if="media.type == 'video'">
   <video src="..."></video>
</div>
```

Vous pouvez aussi utiliser `!=` pour l'inverse :

```html
<!-- S'affiche pour tout sauf les vidéos -->
<div class="thumbnail" ty-if="media.type != 'video'">
  <img ty-src="media.image" alt="cover">
</div>
```

#### Comparer des nombres

**Problème**   
Vous voulez conditionner l'affichage selon une quantité ou un score.

**Solution**   
Les opérateurs classiques `>`, `<`, `>=`, `<=` sont supportés.

```html
<!-- S'affiche si le produit est en stock faible -->
<span class="warning" ty-if="product.stock < 5">
   Attention, bientôt épuisé !
</span>

<!-- S'affiche si l'utilisateur est majeur -->
<div class="content" ty-if="user.age >= 18">
   Contenu restreint
</div>
```

#### Comparer avec le contexte (ex: Langue)

**Problème**   
Vous voulez afficher un bloc uniquement sur la version française du site.

**Solution**   
Vous pouvez utiliser la fonction locale() directement dans la condition.

```html
<!-- Ne s'affiche que sur la version FR du site -->
<div class="cocorico" ty-if="locale() == 'fr'">
   Fabrication Française 🇫🇷
</div>
```

#### Combiner avec l'inverse (!)

**Problème**   
Vous voulez inverser le résultat d'une comparaison.

**Solution**  
Comme pour les booléens, vous pouvez préfixer toute l'expression par `!` pour en inverser le résultat.

```html
<!-- S'affiche si le prix n'est PAS supérieur à 100 -->
<div class="promo" ty-if="!product.price > 100">
   Petit prix !
</div>
```

#### Résumé des opérateurs supportés		

| Opérateur | Description       | Exemple          |
|:----------|:------------------|:-----------------|
| **`==`**  | Égal à            | `type == 'news'` |
| **`!=`**  | Différent de      | `type != 'ad'`   |
| **`>`**   | Supérieur strict  | `count > 10`     |
| **`<`**   | Inférieur strict	 | `count < 0`      |
| **`>=`**  | Supérieur ou égal | `age >= 18`      |
| **`<=`**  | Inférieur ou égal | `rank <= 3`      |


---


 < !--SOURCE_FILE: 02-tilty-attributes/06-ty-attr-boucles -->


# Les boucles `ty-list`

L'attribut `ty-list` est l'outil indispensable pour itérer sur des collections de données.
Il couvre trois besoins essentiels :

1.  **Listes Éditoriales** : Afficher une collection d'éléments gérés manuellement par l'éditeur (ex: Galerie photos, Menu de navigation, Slider manuel).
2.  **Listes Dynamiques (Query)** : Afficher le résultat d'une requête en base de données (ex: Les 3 derniers articles de blog, Les produits de la catégorie "Été").
3.  **Polymorphisme** : Gérer des listes hétérogènes où chaque élément peut avoir un design différent (ex: Un flux d'actualité mélangeant Articles, Vidéos et Publicités).

## Le concept de Polymorphisme

Dans Tilty, les champs de type "liste" sont polymorphes : cela signifie qu’une seule liste peut contenir différents types de contenus. Par exemple, un pied de page peut contenir à la fois des liens, des séparateurs ou encore du texte statique.

## Syntaxe et fonctionnement

Une boucle **`ty-list`** s’applique directement sur un conteneur HTML, typiquement une balise `<ul>`, `<div>`, etc.

À l’intérieur de ce conteneur, chaque type d’élément doit avoir un attribut `ty-list-item="nomDuType"`. Cela permet de définir quel bloc HTML utiliser selon le type d'item.

### Un exemple, deux possibilités de syntaxe

Voici ci-dessous deux exemples de syntaxe de la même liste qui comporte deux types d'item:

-  un objet qui contient lui même deux champs texte   
- et un fichier (une image)

#### Version complète

```html
<ul ty-list="$element in liste">
    <li ty-list-item="titleAndTextObject">
        <h2 ty-html="$element.titre">...</p>
        <p ty-html="$element.texte">...</p>
    </li>
    <li ty-list-item="image">
        <img ty-src="$element"/>
    </li>
</ul>
```

#### Version simplifiée

Pour plus de lisibilité, vous pouvez utiliser la forme simplifiée `ty-list="liste"`, sans variable (`$quelqueChose`). Dans ce cas, chaque `ty-list-item` a pour contexte l'élément lui-même, et non plus une variable intermédiaire.

```html
<ul ty-list="liste">
    <li ty-list-item="titleAndTextObject">
        <h2 ty-html="titre">...</p>
        <p ty-html="texte">...</p>
    </li>
    <li ty-list-item="image">
        <img ty-src="value"/>
    </li>
</ul>
```

Le mot-clé `value` sert ici à faire référence à la donnée brute de l’item (utile pour les fichiers, pages, titres, paragraphes, etc.).

### Pourquoi cette complexité ?

Parce que Tilty ne fait pas de supposition sur les types présents dans vos listes. Vous êtes libre d’y mélanger du texte, des liens, des fichiers, etc.

Cette souplesse implique une rigueur dans le balisage, mais vous donne un contrôle total sur la structure HTML générée.

## Boucles issues de queries

```html 
<ul ty-for="$record in db(@@{type:htmlpage;category:légumes})">
	<li>
		<img src="$record.image.href"/>
        <h2 ty-html="$record.titre">...</p>
        <p ty-html="$record.texte">...</p>
    </li>
</ul>
```


---


 < !--SOURCE_FILE: 02-tilty-attributes/07-ty-attr-avance -->


# Transmettre des variables à javascript via Tilty-json.

Parfois, il est nécessaire de pouvoir récupérer au sein de javascript des variables qui proviennent de la base de données Tilty.

| `TODO` | ty-json |
|:-------|:--------|

```html
<script ty-json>
{
homeHref:"db(htmlpage@1).meta.href"
}
</script>
```

# L'assistant Tilty Attributes

Cet outil uniquement destiné aux architectes permet d'intégrer et débugger les tilty attributes.

# Créer des champs manquants

Vous permet de **créer rapidement** les champs déclarés dans votre HTML mais **qui ne sont pas déclarés** dans Tilty.  
L'outil offre deux options pour chaque champ:

- vous pouvez créer le champ directement avec les options choisies par Tilty  
- vous pouvez modifier le champ avant de le créer.

## Comment fonctionne l'outil de création de champs ?

Pour opérer sa magie, l'outil tente de déterminer à partir de votre code HTML le type de champ le plus approprié, texte, fichier, liste, etc…  
Analysons quelques exemples:

##### Exemple Fichier / Image

```html
<img ty-src="monImage.resize(50,50)"/>
```

Dans ce cas, le champ sera de type **fichier / image** sans trop d'hésitation car on est sur un attribut ty-src d'une balise img et le champ contient la fonction [resize](#la-fonction-resize\(...\)-sur-les-images).  
Enfin, par défaut les champs fichier ne sont pas traduits.

##### Exemple Fichier / Vidéo

```html
<video ty-src="maVideo"/>
```

Dans ce cas, le champ sera de type **fichier / vidéo** sans trop d'hésitation non plus car on est sur un attribut ty-src d'une balise video.  
Enfin, par défaut les champs fichier ne sont pas traduits.

##### Exemple Texte enrichi

```html
<h1 ty-html="monTitre">    Hello <i>world</i> </h1>
```

Ici, le champ sera de type **texte / enrichi** et sera **traduit**.  
La balise étant H1 et le contenu de la balise dans le template comportant du code HTML on en déduit facilement qu'il s'agit d'un texte avec options de formatage.  
Enfin, par défaut les champs texte sont traduits.

##### Exemple Texte simple

```html
<h1 ty-html="monTitre">    Hello world </h1>
```

Par contre ici, le champ sera de type **texte / simple** et sera toujours **traduit**.  
La balise étant H1 et le contenu de la balise dans le template ne comportant pas de code HTML on en déduit facilement qu'il s'agit d'un texte sans options de formatage.  
Enfin, et comme précédemment, par défaut les champs texte sont traduits.

## Bonnes pratiques

Ainsi, vous l'aurez compris, plus votre template HTML sera précis, plus l'outil de création de champ sera en mesure de déterminer automatiquement quel type de champ il faut générer.

# Notes à garder en tête lors de l'intégration des ty-attributes.

## Champs texte enrichi

Chaque CMS a ses propres limites quand on parle de texte enrichi. Tilty n'échappe pas à la règle. 

### Balises inline uniquement dans les éléments inline

Lorsque vous configurez un champ comme texte enrichi, l'utilisateur peut saisir du contenu formaté qui génère du HTML (gras, italique, liens, etc.). Cependant, si ce champ est affiché dans une balise inline (comme `<span>`, `<a>`, `<strong>`) via `ty-html`, Tilty doit respecter les règles HTML : pas de balises bloc (`<h1>`, `<p>`, `<div>`) dans les éléments inline. Les balises de bloc sont automatiquement supprimées et remplacées par des `<br>` pour préserver les sauts de ligne.

##### ❌ Ce que vous écrivez dans l'éditeur :

```html
<span ty-html="description">  <!-- description contient: "<h1>Titre</h1><p>Paragraphe</p>" --> </span>
```

##### ✅ Ce que Tilty génère (HTML valide) :

```html
<span>Titre<br>Paragraphe</span>
```

### Pas de liens imbriqués

Si vous affichez un champ texte enrichi dans une balise `<a>` via `ty-html`, et que l'utilisateur a saisi des liens dans l'éditeur enrichi, Tilty doit respecter les standards HTML qui interdisent les balises `<a>` imbriquées. Les liens contenus dans le texte enrichi sont automatiquement supprimés, seul le texte cliquable est conservé.

##### Ce que l'utilisateur saisit dans l'éditeur enrichi :

```html
<a ty-html="description">  <!-- L'utilisateur a saisi: "Visitez <a href='https://example.com'>notre site</a>" --> </a>
```

#####  Ce que Tilty génère (HTML valide) :

```html
<a>Visitez notre site</a>
```

# 

# Tips & Tricks

# Comprendre les contextes d’exécution de votre code HTML dans Tilty

Lorsque vous travaillez avec Tilty, votre code HTML, CSS ou JavaScript peut être exécuté dans différents environnements. Il est essentiel de comprendre dans quel contexte votre code sera interprété pour garantir un comportement adapté.

### Les différents contextes

#### 1. Template HTML

Votre code est encore brut : il n’a pas encore été traité par Tilty. Aucun lien n’existe à ce stade avec le CMS.

#### 2. Éditeur de contenu (CMS)

Le code HTML est enrichi dynamiquement avec les données du CMS. Les éditeurs peuvent interagir avec le contenu en temps réel.

#### 3. Version “Next”

Identique au mode CMS, mais sans les outils d’édition. Elle permet de prévisualiser le rendu final de manière isolée.

#### 4. Version publiée (Published)

Il s’agit de la version publique de votre page, celle visible par tous après publication.

---

### Adapter le comportement selon le contexte

Dans certains cas, vous souhaiterez que votre code réagisse différemment selon le contexte d’exécution. Par exemple, il peut être pertinent de désactiver certaines animations en mode CMS pour améliorer les performances ou l’ergonomie.

Pour ce faire, Tilty met à votre disposition :

* une variable JavaScript : `window.tyHtmlContext`  
* un attribut HTML sur la balise `<body>` : `ty-html-context`

Voici les valeurs associées selon le contexte :

| Contexte  | JavaScript                           | Attribut HTML                        |
|-----------|--------------------------------------|--------------------------------------|
| Template  | *non défini*                         | *non défini*                         |
| CMS       | `window.tyHtmlContext = "cms"`       | `<body ty-html-context="cms">`       |
| Next      | `window.tyHtmlContext = "next"`      | `<body ty-html-context="next">`      |
| Published | `window.tyHtmlContext = "published"` | `<body ty-html-context="published">` |

**Remarque** : Dans le contexte “Template”, aucune variable JavaScript ni attribut HTML n’est présent, car le code n’est pas encore interprété par Tilty.

---

### Sélecteurs CSS d’attribut : exemples pratiques

Pour adapter vos styles en fonction du contexte, vous pouvez utiliser des **sélecteurs CSS d’attribut** comme illustré ci-dessous :

```css
/* Styles spécifiques au mode CMS */
body[ty-html-context="cms"] {
  /* Par exemple : désactiver les animations */
  animation: none !important;
}

/* Styles spécifiques au mode Next (prévisualisation sans édition) */
body[ty-html-context="next"] {
  /* Par exemple : forcer un fond blanc */
  background-color: white;
}

/* Styles spécifiques à la version publiée */
body[ty-html-context="published"] {
  /* Par exemple : activer les effets visuels finaux */
  transition: all 0.3s ease;
}
```

💡 Ce type de sélecteur est particulièrement utile pour adapter finement votre design et vos interactions selon l’environnement d’exécution de votre code HTML.

# Sous le capot

## Comment fonctionne Tilty attributes ?

Tilty attribute fonctionne exclusivement au sein de tilty.app.  
Tilty attributes utilise les templates conjointement avec la base de données afin de modifier le html et ainsi générer des pages statiques.

Ordre d'exécution de tilty attributes sur une page HTML donnée.

* Supprime les ty-ignore et ty-name="ignore"  
* isole le contexte du html  
  * Traite les ty-for un après l'autre  
  * Génère les blocs issus des ty-name  
    * isole le contexte des ty-name générés  
    * Traite les ty-for un après l'autre  
      * etc récursivement…

| Attributs techniques |                            |                                                       |
|:---------------------|:---------------------------|:------------------------------------------------------|
| `ty-iid-xxxx`        | `ty-iid =  intégration id` | correspond à une injection d'une donnée dans un nœud. 
xxxx correspond à l'id d'un champ ce qui permet de retrouver les intégrations d'un champ dans la page html. 
 L'utilisation d'attributs et non de valeurs d'attributs permet de cibler plusieurs champs sur le même noeud html.  |
|  |  |  |
|  |  |  |




---


 < !--SOURCE_FILE: 02-tilty-attributes/08-ty-attr-images -->


# Les images

Tilty permet de lier une image à un élément HTML en utilisant des attributs standards comme `src` pour n'en citer qu'un. 
Pour garantir des performances optimales et une expérience utilisateur fluide, il est essentiel d'optimiser ces images.

Par exemple si vous faites un `html ty-src="monImage"` mais que l'image saisie par un éditeur pèse 10 Mo, cela va ralentir le chargement de la page et impacter négativement l'expérience utilisateur.

Pour éviter cela c'est très simple au lieu de faire:

```html
<!-- pas bueno -->
<img ty-src="monImage" alt="Image non optimisée">
```
Faites plutôt:
```html
<!-- bueno -->
<img ty-src="monImage.resize(800,800)" alt="Image qui mesure au maximum 800x800 pixels au format webp">
```

### La fonction `resize(...)` sur les images

Sur les champs de type `file` et lorsque celui-ci est une image, la fonction `image.resize(...)` permet de générer automatiquement une version redimensionnée d’une image, avec les dimensions, le mode, la compression et le format de votre choix.

Exemple d'utilisation

```html
<img ty-src="image.resize(800, 600, contain, ff0000, 80, webp)" src="placeholder.jpg">
```

#### Signification des paramètres

1. **Largeur (`800`)**  
    La largeur maximale souhaitée de l’image, en pixels.

2. **Hauteur (`600`)**  
    La hauteur maximale souhaitée de l’image, en pixels.

3. **Mode de redimensionnement (`contain`)**  
    Indique comment l’image doit s’adapter à ces dimensions (voir la liste des modes ci-dessous).

4. **Couleur de fond (`ff0000`)**  
    Couleur utilisée si l’image ne remplit pas tout l’espace ou que l'image d'origine comporte de la transparence. 

5. **Qualité (80)**  
    Une valeur entre 1 (qualité faible) et 100 (qualité maximale). Influence le poids du fichier.  
   N'a de sens que sur les formats `jpg` et `webp` 

6. **Format (webp)**  
    Format de sortie de l’image : `jpg`, `png`, `webp` ou `gif`.

---

#### Modes disponibles

* **resize** : Redimensionne exactement à la taille demandée, même si cela déforme l’image.

* **resizedown** : Comme resize, mais sans jamais agrandir l’image d’origine.

* **scale** : Redimensionne en conservant les proportions de l’image.

* **scaledown** : Comme scale, mais sans agrandissement.

* **cover** : L’image remplit entièrement la zone, quitte à être rognée.

* **coverdown** : Comme cover, mais ne dépasse jamais la taille originale.

* **pad** : Centre l’image et ajoute un fond si elle ne remplit pas tout l’espace.

* **contain** : Comme pad, mais peut aussi agrandir l’image si besoin.

---

#### Couleurs acceptées

* `transparent` : pour ne pas avoir de fond

* Un code hexadécimal comme `#ffffff` (blanc),

* Un code hexadécimal comme  `#00000088` (noir semi-transparent)

* `FF0000` fonctionne aussi

---

#### Formats d’image supportés

* **jpg** : format classique, sans transparence

* **png** : qualité élevée, supporte la transparence

* **webp** : format moderne, léger, idéal pour le web

* **gif** : pour des images animées simples

#### Exemples

Une image WebP redimensionnée à `800×800px` maximum, avec fond transparent, qualité 80 :

```html
<img ty-src="image.resize(800,800)" src="placeholder.jpg">
```

Une image WebP redimensionnée à `800×800px`, rognée pour couvrir entièrement la zone, fond transparent, qualité 50 :

```html
<img ty-src="image.resize(800,800,'cover','transparent',50,'webp')" src="placeholder.jpg">
```

Une image PNG redimensionnée à `300×200px`, avec ajout de marges pour respecter le ratio (pad), fond rouge semi-transparent `#ff000088`, qualité 40 :

```html
<img ty-src="image.resize(300,200,'pad','#ff000088',40,'png')" src="placeholder.jpg">
```

### Url des images

Les images sont stockées sur le serveur sans perte de qualité, cependant ce même serveur peut distribuer des images optimisées à la demande.

`//           src       w       h        mode     background  quality  ext`  
`$reg="/^im\/(.*)\/im-([0-9]+)x([0-9]+)-([a-z]+)-([A-Za-z0-9]+)-([0-9]+)\.([a-z]+)/";`

`im/[path]/im-[width]x[height]-[mode]-[background]-[quality].[extension]`

| Paramètre          | Exemple              | Description                                                                                              |
|:-------------------|:---------------------|:---------------------------------------------------------------------------------------------------------|
| `[path]`           | `fs/up/bidule.png`   | `url relative de l’image source`                                                                         |
| `[width]x[height]` |                      | `Largeur et hauteur max de l’image de sortie souhaitée. Il est à noter qu'aucune image ne sera agrandie` |
| `[mode]`           | `cover contain`      | `mode de redimensionnement`                                                                              |
| `[background]`     | `transparent FF0033` | `Couleur de fond`                                                                                        |
| `[quality]`        | `50`                 | `qualité de 0 à 100 applicable sur jpg et webp`                                                          |
| `[extension]`      | `jpg png webp`       |                                                                                                          |


---


 < !--SOURCE_FILE: 02-tilty-attributes/09-fine-tuning-wysiwyg -->


# Tilty-wysiwyg (ty-wy)

Parce que personne n'a envie d'apprendre le JSON pour mettre à jour son site web.

Conjointement à Tilty Attributes, le mécanisme WYSIWYG s'invite à la fête pour transformer votre HTML statique en véritable interface d'édition. 
Automatiquement, comme par magie (ou presque), des éléments d'interface viennent se greffer sur vos balises `ty-*` pour permettre à vos utilisateurs de tout casser... pardon, de tout éditer avec grâce.

# Le WYSIWYG dans Tilty

![wysiwyg-ui-example.png](../images/wysiwyg-ui-example.png)

## Pourquoi utiliser un système WYSIWYG ?

Tilty offre un contrôle chirurgical des données, ce qui est génial pour votre base de données mais peut transformer l'édition en une séance de torture administrative. Avec une approche WYSIWYG *by design*, l’interface HTML — que tout le monde comprend (ou croit comprendre) — devient le point d'entrée. 

Vous modifiez le contenu là où il s'affiche. C'est intuitif, c'est rapide, et ça évite les allers-retours frustrants entre un formulaire obscur et "F5" sur la page.

# Mise en oeuvre du WYSIWYG

Par défaut, si vous utilisez des Tilty Attributes, le wysiwyg est activé. Tilty suppose que vous voulez éditer ce que vous affichez. Audacieux, non ?
Mais parfois, Tilty est un peu trop enthousiaste. Voici comment le calmer.

## Référence des attributs ty-wy

| Attribut | Élément cible | Valeurs possibles | Description |
|:---|:---|:---|:---|
| `ty-wy-ignore` |Tout élément | `(vide)`, `children`, `self` | **"Touche pas à ça"**. <br>`(vide)`: Tilty boude et ignore tout (élément et enfants).<br>`children`: Tilty ignore les enfants de cet élément.<br>`self`: Tilty ignore cet élément (le plus subtil). |
| `ty-wy-align` | `ty-list`, `ty-list-item` | `top`, `middle`, `bottom`<br>`left`, `center`, `right`| **"Bouge de là"**.<br>Définit où ces maudits boutons d'action doivent s'afficher pour ne pas gâcher votre design.<br>Défaut : `top right` (là où ça gêne souvent). |
| `ty-wy-direction` | `ty-list` | `x`, `y` | **"Vers l'infini et..."**.<br>`y` (défaut) : Liste verticale (Monter/Descendre).<br>`x` : Liste horizontale (Gauche/Droite), parce que le scroll horizontal existe aussi. |

## Personnalisation des contrôles de liste

Quand vous créez des listes (`ty-list`), Tilty parsème joyeusement des boutons (ajouter, monter, descendre...) un peu partout. C'est pratique, sauf quand ça cache votre superbe mise en page.

Heureusement, vous pouvez reprendre le contrôle.

### Positionnement des boutons (`ty-wy-align`)

L'attribut `ty-wy-align` se place :
- Sur l'élément **`ty-list-item`** pour un positionnement individuel.
- Sur l'élément **`ty-list`** pour définir un positionnement par défaut pour tous les items de la liste.

Il accepte une combinaison de positions verticales et horizontales.

**Valeurs possibles :**
- Vertical : `top` (défaut), `middle`, `bottom`
- Horizontal : `left`, `center`, `right` (défaut)

**Exemples :**

```html
<!-- Boutons centrés au milieu de l'élément, parce que vous aimez le chaos -->
<div ty-list-item ty-wy-align="middle center">...</div>

<!-- Boutons en bas à gauche, discret, presque invisible -->
<div ty-list-item ty-wy-align="bottom left">...</div>
```

### Orientation de la liste (`ty-wy-direction`)

L'attribut `ty-wy-direction` se place sur l'élément conteneur **`ty-list`**. Il indique l'orientation visuelle de votre liste, ce qui permet à Tilty de comprendre que "Monter" dans une liste horizontale signifie "Aller à gauche" (et inversement).

**Valeurs possibles :**
- `y` (défaut) : Liste verticale. Les flèches pointent vers le haut (Monter) et le bas (Descendre). Classique.
- `x` : Liste horizontale. Les flèches sont pivotées pour pointer vers la gauche (Précédent) et la droite (Suivant). Révolutionnaire.

**Exemple :**

```html
<div ty-list class="flex-row" ty-wy-direction="x">
    <!-- J'hérite de la direction horizontale wouw -->
    <div ty-list-item ty-wy-align="top center">Item 1</div>
    <div ty-list-item ty-wy-align="top center">Item 2</div>
</div>
```

### Ignorer le WYSIWYG (`ty-wy-ignore`)

Parfois, vous voulez juste que Tilty vous laisse tranquille sur certains blocs. L'attribut `ty-wy-ignore` est là pour ça.

Il s'utilise selon une gradation de "laissez-moi tranquille" :

**1. Tout ignorer (Bourrin)**
L'attribut vide (ou n'importe quelle valeur inconnue) dit à Tilty : "Cet élément n'existe pas pour toi, ni lui, ni ce qu'il contient".
C'est radical.

```html
<!-- "user-card" est totalement ignoré. Tilty ne voit rien, comme si ce bloc était statique. Impossible de l'éditer, le déplacer ou modifier ses enfants -->
<div class="user-card" ty-wy-ignore ty-scope="user">
   <h2 ty-text="firstname">John</h2>
   <h2 ty-text="lastname">Doe</h2>
</div>
```

**2. Ignorer les enfants (Protecteur)**
Vous appliquez ce réglage sur un élément parent (ex: une carte utilisateur) que vous voulez rendre éditable globalement (ex: pour changer une couleur de fond via un champ), tout en interdisant l'édition directe de son contenu texte.

```html
<!-- On peut cliquer sur la "user-card" pour l'éditer, mais ses enfants (John, Doe) ignorent le clic -->
<div class="user-card" ty-wy-ignore="children" ty-scope="user">
   <h2 ty-text="firstname">John</h2>
   <h2 ty-text="lastname">Doe</h2>
</div>
```

**3. Ignorer soi-même (Subtil)**
À l'inverse, ici le conteneur devient "transparent" pour le WYSIWYG. Il est impossible de sélectionner le bloc "user-card" lui-même, en revanche ses enfants sont accessibles et éditables individuellement.

```html
<!-- La "user-card" est intouchable (le clic passe au travers), par contre on peut cliquer et éditer John et Doe -->
<div class="user-card" ty-wy-ignore="self" ty-scope="user">
   <h2 ty-text="firstname">John</h2>
   <h2 ty-text="lastname">Doe</h2>
</div>
```


---


 < !--SOURCE_FILE: 04-le-multilingue -->


# Implémentation du multilingue pour les architectes dans le code HTML.

## Le menu de choix de langue

![](../images/multilingual_menu.png)

### Enregistrer les préférences utilisateur

Quand l'utilisateur change de langue volontairement alors il est conseillé d'enregistrer sa préférence afin que le site sache le rediriger vers cette langue ultérieurement. On stocke la langue préférée de l'utilisateur dans le local storage "`chosen-lang`".   
Ainsi on aura selon les cas `chosen-lang="fr"` ou par exemple `chosen-lang="it".`

![](../images/multilingual_prefs.png)

# Détection de la langue de l'utilisateur

Plus d'informations sur [la page index dans le cadre de la publication](#index).

# Gestion des langues dans Tilty App

## Le menu de langue dans la barre de navigation

![](../images/multilingual_menu.png)  
Ce menu permet de sélectionner la langue utilisée dans la preview du site.

## Le menu de langue dans les préférences

![](../images/multilingual_prefs.png)  
A partir de ce menu vous pouvez:

* Ajouter une langue au projet

* 👀Choisir la langue affichée en preview

* 🚀 Sélectionner quelles langues seront publiées ou non au moment des publications

* ♥️ Choisir la langue par défaut du projet, par exemple quelle langue est affichée quand l'utilisateur va sur [mon-site.com](http://mon-site.com) au lieu d'aller du [mon-site.com/fr](http://mon-site.com/fr) ou [mon-site.com/en](http://mon-site.com/en)

* 🗑️ enfin vous pouvez supprimer une langue

## Le menu de langue dans les champs d'édition.

![](../images/multilingual_fields.png)  
Il permet de choisir quelles langues sont affichées ou non dans la fenêtre d'édition.  
Cette option est utile si vous souhaitez vous focaliser sur une seule langue ou à l'inverse si vous souhaitez avoir toutes les traductions à portée de main.


---


 < !--SOURCE_FILE: 13-les-redirections -->


# Les redirections

Parce que personne n'aime les erreurs 404, surtout Google. La fenêtre **Redirections** est là pour dire "J'ai déménagé" proprement.

> [!IMPORTANT]
> **Patience** : Les redirections ne s'activent qu'après la **publication**. Ne cherchez pas à tester tant que vous n'avez pas cliqué sur le bouton qui fait peur.

## En bref
*   **301** (Défaut) : Déménagement définitif. La nouvelle adresse remplace l'ancienne dans l'historique de tout le monde.
*   **302** : "Je teste un truc". Temporaire. À utiliser seulement si vous savez pourquoi.

## Configuration
Sélectionnez une redirection ou créez-en une **(+)** pour ouvrir le panneau d'édition.

| Champ | Explication & Nuances |
| :--- | :--- |
| **Source** | L'URL d'origine qui ne doit plus exister.<br><br>• **Relative** (ex: `/vieux-truc`) : <br>Standard. Marche partout, tout le temps.<br><br>• **Absolue** (ex: `https://.../vieux-truc`) : <br>Strict. Ne marche que si le domaine correspond *exactement*. |
| **Cible** | Où est-ce qu'on va ?<br><br>• **Page interne** (Recommandé) : <br>Vous sélectionnez une page du site. Si vous la renommez demain, le lien suit. Magique.<br><br>• **URL Personnalisée** : <br>Pour renvoyer vers `.google.com`.<br>⚠️ **Attention** : Si vous mettez une URL relative ici (`/ma-page`), profitez bien de votre erreur 404 future quand vous changerez la structure du site. |
| **Locale** | *Uniquement pour cible "Page interne"*<br><br>• **Vide** (Recommandé) : Le système choisira la meilleure langue pour le visiteur.<br>• **Définie** : Force la redirection vers cette langue précise, qu'il pleuve ou qu'il vente. |
| **Code** | 301. Sauf si vous avez un doctorat en SEO qui vous dit le contraire. |

> [!TIP]
> **Source** : Le système se fiche que vous mettiez `/fr/vieux-truc` ou `/vieux-truc`. Il redirigera l'adresse exacte demandée. La prise en charge des redirection se fait avant même qu'on n'ait déterminé la langue du visiteur.

## Astuce de pro : URLs "Marketing" (Short links)
Vous pouvez utiliser les redirections pour créer des liens courts et faciles à retenir pour vos campagnes.
Exemple : Créez une redirection de `/promo` vers `/produits/collection-ete/promo-speciale-2024`.
C'est propre, c'est court, et ça marche parfaitement.

## Selon le serveur de publication
Selon votre hébergement, Tilty gère les redirections différemment :

**Serveur Tilty ou serveur avec prise en charge de PHP** : Pas de sujet, les redirections sont gérées avec de vrais en-têtes HTTP (Headers). C'est rapide, invisible et **parfait pour le SEO** (Google adore).

**Export Statique (HTML)** :
Pour assurer une compatibilité maximale (Apache, IIS, Statique pur, etc.), Tilty génère désormais une stratégie de redirection "ceinture et bretelles".
Pour chaque redirection, un dossier physique est créé contenant :
1.  `index.php` (Header 301) : Prioritaire si PHP est dispo.
2.  `.htaccess` (Apache) : Redirection native 301 si Apache est utilisé.
3.  `web.config` (IIS) : Redirection native pour les serveurs Windows.
4.  `index.html` (Meta Refresh + JS) : Fallback ultime si rien d'autre ne marche.

> [!NOTE]
> **SEO** : Grâce à cette stratégie hybride, même sur un export statique, vous bénéficiez le plus souvent d'une vraie redirection 301 (via `.htaccess` ou `web.config`), ce qui est optimal pour le SEO. Le fallback HTML/JS assure juste que l'utilisateur n'est jamais perdu.


---


 < !--SOURCE_FILE: 05-mode-architecte -->


# 📏 Mode Architecte

#### 

## Les sources HTML 

Cette section de l'application n'est disponible que si vous êtes Architecte.

Cet outil vous permet de gérer les sources statiques de votre projet à savoir les fichiers HTML, CSS, Javascript et autres assets.   
Les pages html qui se trouvent dans cette section serviront de modèles pour générer les pages de votre site.

### Synchronisation des fichiers temps réel

Le workflow de Tilty se fait sans avoir à recourir à un FTP ou a des lignes de commandes.   
Tilty se charge de synchroniser automatiquement les fichiers sources sur votre ordinateur avec le serveur.  
![](../images/sync_status.png)  
Dans la navigation principale une iconographie affiche soit un dossier soit un zip en fonction de ce qui est synchronisé en local

Un point de couleur donne l'état global :  
- rouge si  il n'y a pas de dossier sur le serveur  
- gris si aucun dossier ou zip local n'est synchronisé mais qu'il y a bien des fichiers sur le serveur.  
- orange si des fichiers sont à synchroniser ou si la synchronisation est en cours  
- vert si tout est synchronisé entre votre ordinateur et le serveur.

Un clignotement (ou pas) nous informe sur la synchronisation  
- le clignotement est inexistant si la synchronisation automatique est désactivé  
- le clignotement est lent si la synchronisation automatique est activée et qu'il n'y a rien à synchroniser.  
- le clignotement est rapide si une synchronisation de fichiers est en cours

TODO rédiger

### Travailler avec des sources zippées

Si vous utilisez un builder html tel que webflow, vos sources sont téléchargées sous forme de zip.

TODO impression d'écran export webflow

Afin de vous éviter de dézipper manuellement votre export à chaque fois, Tilty vous offre la possibilité de sélectionner le fichier zip directement. Quand vous remplacerez le fichier zip par un autre (il faut donc qu'il conserve le même nom) le zip sera automatiquement uploadé sur Tilty puis décompressé.

### Certains fichiers sont ignorés

Tilty prend en charge les formats de fichiers statiques.   
Les fichiers `.php, .asp, .htaccess, .sh` etc... sont ignorés.  
Les dossiers tels que `node_modules, .git, .idea` etc qui sont connus pour être des répertoires de sources sont ignorés 

### Ignorer volontairement des fichiers

Si vous souhaitez ne pas synchroniser certains fichiers, faites un click droit dessus et choisissez "ignorer"

TODO rédiger

## Éditer la structure des données dans Tilty.app

### Ajouter, supprimer et réorganiser des champs.

TODO rédiger

### Les différents types de champs
> [!TIP]
> **Gagnez du temps !** Utilisez les **[Suggestions Automatiques](see 05c-suggestions-champs)** pour que Tilty crée vos champs intelligemment à partir de votre code HTML (plus rapide que la création manuelle).


![](../images/field_types.png)  
Chaque donnée est caractérisée par ce que l'on appelle un type.   
De la même manière que dans une page HTML une balise \<img\> n'a pas le même rôle qu'une balise \<h1\>, un champ "Fichier" dans Tilty n'aura pas la même utilité qu'un champ "Texte". Chaque type présente des caractéristiques différentes.

#### Les champs Texte

TODO rédiger

#### Les champs Nombre

TODO rédiger

#### Les champs Booléens (oui ou non)

TODO rédiger

#### Les champs Lien

TODO rédiger

#### Les champs Fichier

TODO rédiger

#### Les champs Objet

TODO rédiger

#### Les champs Liste (blocks)

TODO rédiger

### Des champs  traduits (ou pas)

#### Textes, nombres, liens, images, vidéos… To translate or not to translate, that is the question.

![](../images/translatable_fields.png)  
![](../images/translatable_fields_detail.png)

La plupart des types de champs peuvent être traduits dans les différentes langues de votre projet.  
Pour certains champs, comme les champs texte, la question ne se pose pas trop: généralement, ils doivent être traduits à moins qu'ils s'agissent de références produits ou de termes techniques qui sont identiques dans toutes les langues.  
Quand il s'agit de fichiers cela peut dépendre, une vidéo ou un audio peut avoir différentes versions linguistiques tout comme une image si elle contient du texte. Mais vous conviendrez que dans la plupart des cas, les images d'illustration n'ont pas à différer selon si le site est en français ou en anglais.

#### Les objet et les listes ne peuvent être traduits

Les objets sont là pour organiser les données et ils ne sont pas modifiables en soit, Il n'y a pas de sens à traduire des données qui n'existent pas.

Les listes par contre pourraient être traduites, c'est vrai. Selon la langue on pourrait ainsi construire des pages radicalement différentes ou encore des menus de navigation qui diffèrent d'une langue à l'autre . Si cette possibilité est séduisante sur le papier, en pratique elle s'avère complexifier l'édition et devenir ingérable. Un éditeur dans ce cas de figure devrait créer, réorganiser et modifier le contenu de chaque page dans chaque langue. C'est d'ailleurs le choix fait par la plupart des CMS et c'est une des raisons pour laquelle nous avons créé Tilty.

Dans 99% des cas, nous avons constaté qu'une page en anglais ou en français devait conserver la même structure. Quand on rajoute une image ou une section dans une page en anglais, il n'y a pas de raison que la modification ne se reporte pas sur la version française.

### Options ergonomiques

Quand vous éditez  les propriétés d'une donnée, vous pouvez lui conférer des options ergonomiques qui ne vont pas réellement changer son fonctionnement mais vont améliorer son utilisation pour les éditeurs

#### Afficher la valeur dans l'arborescence.

![](../images/tree_view_values.png)

Cette option à utiliser avec parcimonie permet d'afficher dans l'arborescence de données la valeur d'un champ au lieu de son nom. C'est parfois une bonne idée et parfois non, à vous de voir 🙂.   
Si la donnée est traduite, la valeur la plus adéquate sera affichée. Si la donnée n'est pas renseignée, l'option n'aura pas d'effet.   
Enfin, selon le type de donnée, la valeur affichée va différer. Pour un fichier c'est le nom du fichier qui sera affiché alors que pour un lien ce pourra être l'url, le nom de la page ou encore l' adresse email selon le cas.  
**Astuce**: Quand l'option est activée, le champ s'affiche en italique dans l'arborescence de données.

Concernant les Objets, ils n'ont pas de valeur à proprement parler. Si vous souhaitez  rendre leur nom dynamique dans l'arborescence, il vous faudra alors sélectionner un champ enfant qui servira de source.

Dans l'exemple ci-dessous l'objet ***Vidéo*** est configuré pour prendre le nom de son fichier vidéo.  
![](../images/video_object_config_1.png)  
![](../images/video_object_config_2.png)

# Titre

## ***Documentation Utilisateur 2025***

# Titre 1

## Titre2

### Titre 3

#### Titre 4


---


 < !--SOURCE_FILE: 05a-valeurs-par-defaut -->


# Les valeurs par défaut

Dans le mode **Architecte** (accessible via la barre de navigation), il est possible de définir une **valeur par défaut** pour chaque champ de vos modèles de données.

## Intérêt pour l'intégrateur

L'objectif principal est de garantir que vos templates HTML ne se cassent pas ou n'affichent pas de zones vides disgracieuses lorsqu'un nouveau contenu est créé.

Une structure bien configurée permet d'avoir un rendu prévisible dès la création d'une page ou d'un bloc, sans obliger le contributeur à remplir 12 champs avant de voir un résultat correct.

### Cas concret : La liste de témoignages

Imaginez que vous intégrez un carrousel de témoignages clients. Votre HTML ressemble à ceci :

```html
<div class="testimonial-card">
    <!-- Si pas de photo, mon CSS va pleurer -->
    <img ty-src="photo" alt="Client photo" class="rounded-full w-32 h-32">
    
    <h3 ty-html="name" class="font-bold"></h3>
    <p ty-html="job_title" class="text-gray-500"></p>
    
    <blockquote ty-html="quote"></blockquote>
</div>
```

Si vous configurez des valeurs par défaut pertinentes dans l'architecte :
*   **Photo** : Une image générique de silhouette ou un placeholder adorable de chaton.
*   **Nom** : "Jean-Michel Default"
*   **Quote** : "Ce produit a changé ma vie, surtout le mardi."

Dès que l'éditeur cliquera sur "Ajouter un témoignage", le bloc apparaitra dans la liste pré-rempli avec ces valeurs. Le layout est préservé, et l'éditeur comprend immédiatement où il doit écrire quoi.

### Cas concret : Le booléen "Nouveau !"

Vous ajoutez un badge "Nouveau" sur vos produits, piloté par un booléen.

```html
<div class="product-card">
    <span ty-if="isNew" class="badge-new">NEW !</span>
    <h2 ty-html="title"></h2>
</div>
```

Si vous définissez la valeur par défaut à `true` (parce que bon, si on crée un produit, il est probablement nouveau), le badge s'affichera automatiquement sur tous les futurs produits créés, sans action supplémentaire.

## Configuration

La définition se fait simplement dans l'interface d'architecture :
1.  Sélectionnez le champ à configurer.
2.  Allez dans l'onglet **"Valeur par défaut"**.
3.  Remplissez le champ comme si vous étiez dans l'éditeur de contenu.

## Comportement technique

La logique est la suivante au moment du rendu de la page :

1.  Tilty cherche une valeur enregistrée en base pour ce champ.
2.  **Si elle existe**, elle est utilisée (même si c'est une chaine vide).
3.  **Si elle n'existe pas** (champ jamais touché/sauvegardé), Tilty injecte la **Valeur par défaut**.

> [!IMPORTANT]
> **Nuance importante sur la sauvegarde**
> Dès qu'une page est ouverte et **enregistrée** par un contributeur, tous les champs présents reçoivent une valeur (même vide) en base de données.
> La "Valeur par défaut" ne sert donc que pour l'initialisation. Elle ne s'applique pas rétroactivement sur des pages déjà sauvegardées, sauf si vous ajoutez un tout nouveau champ à votre modèle après coup.


---


 < !--SOURCE_FILE: 05b-conventions-nommage -->


# Conventions de Nommage

Dans Tilty, chaque champ de données (texte, image, objet...) est identifié par un **Nom de variable**. C'est ce nom que vous utiliserez dans votre code HTML pour afficher le contenu (ex: `ty-html="monTitre"`).

Pour garantir que tout fonctionne correctement entre le stockage (base de données) et l'affichage (HTML), certaines règles strictes s'appliquent.

Ces règles garantissent également la **compatibilité de vos données** avec d'autres systèmes, services externes ou APIs (JSON) qui pourraient consommer votre contenu à l'avenir.

## Le CamelCase

La convention utilisée est le **camelCase**.

> [!NOTE]
> **Qu'est-ce que le camelCase ?**
> C'est une façon d'écrire sans espaces où chaque nouveau mot commence par une majuscule, sauf le tout premier.
> *   ✅ Bon : `titrePage`, `imagePrincipale`, `datePublication`
> *   ❌ Mauvais : `TitrePage` (PascalCase), `titre_page` (snake_case), `titre-page` (kebab-case)

### Normalisation automatique
Lorsque vous créez un champ dans le mode Architecte, Tilty vous aide en "nettoyant" automatiquement votre saisie :
*   Les espaces sont supprimés.
*   Les accents sont retirés (`é` devient `e`).
*   Le tout est converti en camelCase.

*Exemple : Si vous tapez "Date de début", Tilty créera la variable `dateDeDebut`.*

## Règles techniques strictes

Si vous essayez de contourner la normalisation ou de renommer des variables manuellement, sachez que le moteur bloquera tout nom qui ne respecte pas ces critères :

1.  **Caractères autorisés** : Uniquement des lettres (a-z, A-Z), des chiffres (0-9) et l'underscore (`_`).
2.  **Premier caractère** : Doit obligatoirement être une lettre ou un underscore. **Interdit de commencer par un chiffre**.
3.  **Pas d'espaces**, pas de tirets `-`, pas de caractères spéciaux (`@`, `#`, `$`, etc.).

### Mots réservés
Certains mots sont utilisés par le système interne de Tilty et ne peuvent pas être utilisés comme noms de variables :
`value`, `global`, `$current`, `$root`, `meta`, `json`.

## Recommandations pour l'intégrateur

Pour vous y retrouver dans vos templates HTML, essayez de rester cohérent :

*   **Booléens** : Préfixez par `is` ou `has` (ex: `isVisible`, `hasLogo`). Cela rend les conditions `ty-if` très lisibles : `<div ty-if="hasLogo">`.
*   **Dates** : Préfixez par `date` (ex: `dateEvent`).
*   **Fichiers** : Soyez explicite (ex: `imageCover`, `pdfDoc`).

```html
<!-- Exemple de code lisible grâce au bon nommage -->
<div class="card" ty-if="isActive">
    <img ty-src="imageThumbnail">
    <h2 ty-html="titreProduit"></h2>
</div>
```


---


 < !--SOURCE_FILE: 05c-suggestions-champs -->


# Suggestions automatiques de types de champs

Cette fonctionnalité, destinée aux **architectes**, permet à Tilty de *tenter* de déduire le type de champ à créer dans l'app en analysant votre code HTML et vos attributs `ty-*`.

> [!TIP]
> C'est la méthode recommandée pour construire votre structure de données : elle est **beaucoup plus rapide** (environ 10x) que de créer chaque champ manuellement dans l'interface d'administration.

## Fonctionnement général

Lorsque vous intégrez de nouveaux champs dans vos templates HTML sans les avoir créés au préalable, Tilty détecte ces champs manquants.

Dans l'interface d'édition, un **Assistant** (une boîte d'alerte) apparaît pour signaler ces champs manquants.
- Il analyse le contexte (balise HTML, attribut ciblé, nom de la variable).
- Il propose de **créer automatiquement** le champ avec ce qu'il estime être le type le plus approprié.
- Il fournit une explication ("Pourquoi cette suggestion ?") que vous pouvez consulter en dépliant les détails de la suggestion.

Si vous acceptez la suggestion, le champ est créé instantanément dans la structure de données avec la configuration proposée.

![Assistant qui montre des suggestion de champs](../images/suggestion-assistant-alert.png)

### Et si la suggestion ne me convient pas ?

C'est un processus automatique, et il peut arriver que Tilty se trompe ou que vous ayez des besoins spécifiques. Vous gardez la main :

1.  **Modifier le champ avant création :**
    Cliquez sur le bouton **Modifier**. Cela ouvrira l'éditeur de structure pré-rempli avec la suggestion. Vous pourrez alors changer manuellement le type de champ, ses labels, ou ses options avant de le valider.

![Éditeur de structure avec suggestion](../images/suggestion-edit-dialog.png)

2.  **Corriger votre code HTML :**
    Si la suggestion est incohérente (par exemple une Liste au lieu d'un Texte), vérifiez s'il n'y a pas d'ambiguïté dans votre code.

```html
<!-- ERREUR : ty-list suggère une Liste -->
<h2 ty-list="titre">Mon Titre</h2>

<!-- CORRECTION : ty-html suggère du Texte -->
<h2 ty-html="titre">Mon Titre</h2>
```

3.  **Ignorer la suggestion :**
    Si vous ne souhaitez pas créer ce champ, n'appuyez tout simplement pas sur "Ajouter".

## Détermination des typologies

Le moteur d'analyse utilise une série d'indices pour *deviner* le type de champ. Ce ne sont pas des règles absolues, mais des heuristiques qui fonctionnent dans la plupart des cas courants et font gagner une temps de développement considérable.

> [!NOTE]
> **Pas d'IA ici ! (ni autre part dans le moteur de Tilty)** Bien que ce comportement puisse paraître "intelligent", il ne fait appel à aucune Intelligence Artificielle. Il s'agit d'un moteur de règles logiques exécuté localement.

### 1. Images avec Redimensionnement (`.resize()`)
Si votre variable est utilisée avec la fonction magique `.resize(w, h)`, elle sera considérée comme une **Image**.
*   *Exemple :* `monImage.resize(800, 600)` → Type **Fichier (Image)**.

### 2. Liste d'objets ou de valeurs (`ty-list`)
La présence de l'attribut `ty-list` indique généralement une **Liste**.
*   *Exemple :* `<div ty-list="mesProjets">` → Type **Liste**.

### 3. Items de Liste (`ty-list-item`)
Le comportement dépend du contenu :
*   **Contenu Riche :** S'il y a d'autres attributs `ty-*` à l'intérieur, c'est probablement un **Objet** complexe.
*   **Contenu Simple :** Si la balise porte elle-même un attribut `ty-*` (ex: `ty-src`), on s'en inspire pour déduire le type (Fichier, Lien, etc.).
*   **Par défaut :** Sans autre indice, cela crée un **Objet** générique, sauf si le nom de la variable évoque clairement du texte.

### 4. Conventions de Nommage
Certains noms de variables orientent fortement la décision vers du **Texte** pour éviter les confusions.
*   **Texte Simple :** `title`, `titre`, `subtitle`, `nom`, `name`, `label`, `btn`, `slug`, `copyright`...
    *   → Type **Texte (Input)**.
*   **Texte Multiligne/Riche :** `description`, `legende`, `intro`, `summary`, `resume`...
    *   → Type **Texte (Multiligne)**, souvent localisé par défaut.

### 5. Objets (`object`)
L'utilisation de la notation par point (parent de propriétés) suggère un **Objet**.
*   *Exemple :* `client.adresse` → `client` est un type **Objet**.
*   *Note :* `ty-scope` pointe aussi souvent vers un objet.

### 6. Fichiers et Médias (`file`)
On devine un fichier selon la balise ou des mots-clés évocateurs.
*   **Balises HTML :** `<img src="...">`, `<video src="...">`, `<audio src="...">`.
*   **Mots-clés :** `image`, `photo`, `logo`, `icon`, `video`, `audio`, `doc`, `pdf`...

### 7. Liens (`link`)
Détecté principalement si on cible `href` sur un lien (`<a>`) ou via des mots-clés comme `link`, `lien`, `url`...

### 8. Numérique (`numeric`)
*   **Calculs :** Utilisation d'opérateurs de comparaison dans un `ty-if`.
*   **Mots-clés :** `nombre`, `number`.

### 9. Booléen (`bool`)
Souvent détecté dans les conditions `ty-if` avec des mots-clés comme `bool`, `check`, `active`, `actif`.

### 10. Pages (`page`)
Si le nom contient "page" sans autre indice contradictoire (comme un attribut src).

### 11. Texte par défaut (`text`)
Si aucune règle ne matche, on se rabat sur du **Texte**.
*   **Éditeur HTML :** Si le contenu par défaut contient des balises ou si le contexte (balise `div`, `article`...) suggère du contenu riche.
*   **Input Simple :** Dans les autres cas.


---


 < !--SOURCE_FILE: 12-agents-ia -->


# Intégration avec les Agents IA

> [!NOTE]
> **Vision Prospective**
> Ce document décrit la vision à long terme de la **collaboration entre Tilty et les Agents IA**. Bien qu'il soit rédigé au présent pour des raisons de fluidité, certaines fonctionnalités ou comportements décrits ici reflètent ce que l'écosystème Tilty **deviendra** dans les mois à venir, et non nécessairement son état actuel.

Autant le dire d'emblée et une fois pour toutes : **non, Tilty n'est pas et ne sera jamais une IA**. Fidèle à sa philosophie frugale, il n'embarque aucun réseau de neurones, ne rêve pas de moutons électriques et ne tentera pas de dominer le monde.

Tilty reste un système **léger, simple et autonome**. Son génie réside ailleurs : il fournit une structure sémantique tellement claire que les Agents IA (ChatGPT, Claude, etc.) peuvent la comprendre et la manipuler avec une efficacité redoutable. **Tilty n'est pas l'intelligence, il est un terrain de jeu idéal pour l'intelligence.**

Enfin, clarifions une chose : Tilty ne se réclame pas de ces *"outils magiques"* où il suffit de prompter *"Fabrique-moi un site"* pour obtenir un résultat qui fonctionne "comme par magie" (tant que vous ne touchez à rien 😅). Tilty s'adresse à un **public de professionnels** qui exigent un contrôle total sur leur code source. Nous sommes ici à l'exact opposé du *Vibe Coding* : avec Tilty, l'humain reste le pilote, l'IA n'est que le copilote qui gère les tâches répétitives.

C'est pourquoi Tilty est **foncièrement agnostique**. Nous ne voulons pas vous enfermer dans un écosystème d'IA propriétaire. Que vous utilisiez ChatGPT, Claude, Mistral ou un modèle local open-source tournant sur votre machine, Tilty reste simplement du HTML bien structuré couplé à un CMS très typé. **Vous êtes libre de choisir votre intelligence.**

## Domaines d'intervention

On distingue deux grands cas d'usage où l'IA peut assister le créateur Tilty :

1.  **La Création ("Tiltyfication")** : Transformer du HTML statique en modèles Tilty.
2.  **L'Édition (Contenu et Sémantique)** : Générer, traduire ou optimiser le contenu.

Pour réaliser ces tâches, l'IA s'appuie sur un ensemble d'outils et de contextes (Documentation, Assistants de code, API) qui servent de **pont** entre votre intention et le système Tilty.

---

## 1. Création : La "Tiltyfication"

Le domaine où les agents IA excellent avec Tilty est la **Tiltyfication** : l'action de transformer une page HTML statique en un modèle dynamique géré par Tilty.

### Pourquoi ça marche ?
Contrairement à d'autres CMS qui nécessitent d'apprendre des syntaxes complexes ou des structures de fichiers propriétaires, Tilty utilise de simples attributs HTML (`ty-*`). 

Un agent IA peut analyser une maquette HTML existante et y ajouter les attributs nécessaires pour :
1. **Identifier les zones éditables** (`ty-html`).
2. **Détecter les listes répétitives** (`ty-list`).
3. **Mapper les sources d'images** (`ty-src`).
4. **etc...**

### Exemple de transformation automatique

Imaginez que vous donniez ce code HTML à une IA :

```html
<article>
  <h1>Pourquoi les chats dominent le monde</h1>
  <div class="content">
    <p>Une étude sérieuse sur leur <strong>complot</strong> mondial.</p>
  </div>
</article>
```

L'IA est capable de comprendre le rôle de ces éléments et de les "Tiltyfier" automatiquement :

```html
<article>
  <h1 ty-text="title">Pourquoi les chats dominent le monde</h1>
  <div class="content" ty-html="articleBody">
    <p>Une étude sérieuse sur leur <strong>complot</strong> mondial.</p>
  </div>
</article>
```

Dans cet exemple, l'agent a pris plusieurs décisions logiques :
- **Choix du type de champ** : 
    - Pour le `h1`, elle choisit **`ty-text`** car c'est un titre (texte brut).
    - Pour la `div.content`, elle choisit **`ty-html`** car elle détecte des balises HTML (`<p>`, `<strong>`) à l'intérieur, indiquant un besoin d'éditeur riche (WYSIWYG).
- **Nommage sémantique** : Elle nomme les variables `title` et `articleBody` en se basant sur la structure HTML.
- **Traduction** : Elle identifie que ces contenus sont du texte naturel destiné aux visiteurs, donc des variables localisables.

> **Référence** : [01-ty-text-et-ty-html.md](see 02-tilty-attributes/01-ty-text-et-ty-html)

### Pourquoi un simple algorithme ne suffirait pas ?
On pourrait penser qu'un simple script ou une Regex pourrait faire ce travail. C'est faux.
Un algorithme classique ne voit que des balises : il ne comprend pas le **sens**. Il ne sait pas distinguer une phrase sarcastique sur des chats (qui nécessite peut-être un traitement spécial) d'un titre juridique.

C'est ici que la magie opère : **la rigueur de Tilty canalise l'imagination de l'IA**.
- **L'IA** apporte la compréhension sémantique : "Ceci ressemble à une liste de fonctionnalités", "Cette image est purement décorative".
- **Tilty** offre le cadre strict (`ty-list`, `ty-src`) pour transformer cette intuition en code robuste et fonctionnel.
Ce duo de choc permet de lier la souplesse de l'intelligence artificielle à la fiabilité d'une structure d'ingénierie.

### Autres exemples de déductions

Voici comment une IA peut interpréter d'autres éléments HTML courants :

#### 1. Une image
**Avant (Statique)**
```html
<img src="/img/chat-piano.jpg" width="800" height="600" alt="Chat jouant du Rachmaninov">
```
**Après (Tiltyfié)**
```html
<img ty-src="catPhoto.resize(800,600,'cover')" ty-alt="catPhotoAlt" src="/img/chat-piano.jpg" width="800" height="600" alt="Chat jouant du Rachmaninov">
```
> **Déduction IA** : 
> - **Variables** : Elle crée `catPhoto` et `catPhotoAlt`.
> - **Optimisation** : Elle détecte des dimensions fixées (`800x600`). Elle applique `.resize(800,600,'cover')` pour garantir que l'image générée remplisse exactement cette zone (mode `cover`) sans déformation, quelle que soit la taille de l'image originale uploadée.
>
> **Référence** : [08-ty-attr-images.md](see 02-tilty-attributes/08-ty-attr-images)

#### 2. Une liste répétitive
**Avant (Statique)**
```html
<ul class="features">
  <li>Café illimité</li>
  <li>Siestes obligatoires</li>
  <li>Licornes fournies</li>
</ul>
```
**Après (Tiltyfié)**
```html
<ul class="features" ty-list="featuresList">
  <li ty-list-item="feature" ty-text="description">Café illimité</li>
  <li ty-list-item="ignore">Siestes obligatoires</li>
  <li ty-list-item="ignore">Licornes fournies</li>
</ul>
```
> **Déduction IA** : 
> 1. **Repérage de modèle** : L'IA identifie que les éléments `<li>` partagent la même structure. Elle définit le premier comme modèle (`ty-list-item="feature"`).
> 2. **Traduction** : Elle détecte que le contenu "Café illimité" est du texte utilisateur et configure la variable `description` comme **traduite**.
> 3. **Nettoyage intelligent** : Elle comprend que les items suivants ("Siestes obligatoires", "Licornes fournies") ne sont que des exemples visuels. Plutôt que de les supprimer, elle leur applique `ty-list-item="ignore"` pour préserver l'aspect de la maquette originale sans polluer les données Tilty.
>
> **Référence** : [02-ty-list.md](see 02-tilty-attributes/02-ty-list)

#### 3. Une vidéo avec sous-titres
**Avant (Statique)**
```html
<video controls>
  <source src="demo.mp4" type="video/mp4">
  <track src="subs_fr.vtt" kind="subtitles" srclang="fr" label="Français">
</video>
```
**Après (Tiltyfié)**
```html
<video controls>
  <source ty-src="demoClip" src="demo.mp4" type="video/mp4">
  <track ty-src="subsFr" src="subs_fr.vtt" kind="subtitles" srclang="fr" label="Français">
  <track ty-src="subsEn" src="subs_en.vtt" kind="subtitles" srclang="en" label="English">
  <track ty-src="subsEs" src="subs_es.vtt" kind="subtitles" srclang="es" label="Español">
</video>
```
> **Déduction IA** : L'IA comprend que la présence de sous-titres implique la possibilité, voire la volonté de traduire ces contenus. Elle prend l'initiative de générer des pistes pour chaque langue du projet, créant des variables `ty-src` dédiées pour permettre une gestion indépendante des fichiers `.vtt`.

**Nuance :** Si l'IA détecte une structure répétable potentielle (même s'il n'y a qu'un seul élément au départ), elle peut choisir de créer une **liste** pour plus de flexibilité.

*Exemple avec une seule piste au départ :*
```html
<video controls src="demo.mp4">
  <track src="subs_fr.vtt" srclang="fr" label="Français">
</video>
```

*Résultat "Liste" anticipé par l'IA :*
```html
<video controls ty-src="videoClip" ty-list="subtitlesList">
   <track ty-list-item="subtitleTrack" ty-src="file" ty-attr="srclang:lang;label:label">
</video>
```
> **Déduction IA** : Plutôt que de créer une variable unique par langue, l'IA anticipe que vous voudrez peut-être ajouter N langues. Elle place `ty-list` sur le conteneur parent (`<video>`) et définit un modèle d'item (`ty-list-item`) sur la balise `<track>`, rendant l'ajout de nouvelles langues infini et administrable. `ty-attr` permet de mapper les attributs spécifiques (`srclang`, `label`).
>
> **Références** : [03-ty-attr-syntaxe.md](see 02-tilty-attributes/03-ty-attr-syntaxe) (pour `ty-attr`) et [02-ty-list.md](see 02-tilty-attributes/02-ty-list)

#### 4. Une liste polymorphe (Page Builders)
C'est le cas le plus impressionnant. Imaginez une "landing page" composée de sections très différentes.

**Avant (Statique)**
```html
<main>
  <!-- Un bloc Hero -->
  <section class="hero">
     <h1>L'application qui fait le café</h1>
  </section>
  
  <!-- Un bloc Features -->
  <section class="features">
     <h2>Pourquoi on est géniaux</h2>
  </section>

  <!-- Un bloc Média + Texte -->
  <section class="media-text">
     <img src="otter.jpg" alt="Une loutre mignonne">
     <p>Regardez cette loutre, elle est incroyable.</p>
  </section>

  <!-- Un bloc Call to Action -->
  <section class="cta">
     <a href="/buy">Prendre mon argent</a>
  </section>
</main>
```

**Après (Tiltyfié)**
```html
<main ty-list="sections">
  <!-- Template pour le Hero -->
  <section class="hero" ty-list-item="heroBlock">
     <h1 ty-text="title">L'application qui fait le café</h1>
  </section>
  
  <!-- Template pour les Features -->
  <section class="features" ty-list-item="featuresBlock">
     <h2 ty-text="title">Pourquoi on est géniaux</h2>
  </section>

  <!-- Template Média + Texte -->
  <section class="media-text" ty-list-item="mediaTextBlock">
     <img ty-src="image.resize(600,400,'cover')" ty-alt="imageAlt" src="otter.jpg" alt="Une loutre mignonne">
     <p ty-html="content">Regardez cette loutre, elle est incroyable.</p>
  </section>

  <!-- Template pour le CTA -->
  <section class="cta" ty-list-item="ctaBlock">
     <a ty-href="link" ty-text="label">Prendre mon argent</a>
  </section>
</main>
```
> **Déduction IA** : L'IA identifie une structure de type "Page Builder" où des sections hétérogènes se succèdent. Elle choisit de tout regrouper dans une seule liste `sections`, mais définit **plusieurs templates** (`ty-list-item="heroBlock"`, `featuresBlock`, `mediaTextBlock`, `ctaBlock`). Cela permet à l'utilisateur final d'ajouter et de réordonner ces blocs à volonté, tout en mélangeant les types de contenu.
>
> **Référence** : [06-ty-attr-boucles.md](see 02-tilty-attributes/06-ty-attr-boucles)


### Assistant Tilty Attr GPT (Work in progress)
Un assistant GPT spécialisé est en cours de développement pour faciliter cette tâche :
[Tilty Attr Assistant](https://chatgpt.com/g/g-67e0e94380d08191ad8c18edaa2ba981-tilty-attr)

Cet agent connaît la grammaire des attributs `ty-*` et peut vous aider à préparer vos fichiers HTML ou à résoudre des problèmes de syntaxe complexes.

![Aperçu de l'assistant Tilty Attr](../images/tilty-ai-assistant.png)


## 2. Édition : Contenu et Sémantique

### Pourquoi les IA aiment Tilty ?
La force de Tilty réside dans l'utilisation des attributs `ty-*`. Ces attributs ne sont pas seulement des instructions techniques ; ils agissent comme des **métadonnées sémantiques précises** (un peu comme des micro-données `itemprop`) qui aident une IA à comprendre la structure et l'intention de votre contenu.

Au-delà de ces attributs, les données Tilty sont organisées dans une **architecture structurée** (un arbre de données). Chaque champ est **typé** et **décrit**, offrant à l'IA une carte précise du contenu disponible, bien plus riche qu'une simple liste de variables "à plat".


### Aide à la rédaction
Un agent IA peut être utilisé pour remplir automatiquement les variables Tilty à partir de vos modèles de données.

### Traduction automatisée
Grâce à la gestion native du multilingue, un agent peut traiter vos fichiers de données pour proposer des traductions contextuelles et précises.

---

## Les Outils (Le Pont Technique)

Tout comme les agents GPT, les outils de développement ne sont pas une finalité mais des moyens d'accéder plus efficacement à Tilty. Ils agissent comme un **pont** entre l'utilisateur et la structure du projet.

### 1. Le Contexte (Documentation)
Pour être efficace, une IA a besoin de contexte. Tilty lui en fournit via sa documentation et ses nombreux exemples.

> **Astuce** : Dès que vous commencez à saisir des `ty-attributes` à la main dans vos templates, les outils d'autocomplétion (VS Code, WebStorm), nourris par ce contexte, sauront naturellement vous suggérer d'autres attributs.

La documentation est rédigée au format **Markdown (.md)** et disponible publiquement sur GitHub sur [https://github.com/Tilty-io/docs](https://github.com/Tilty-io/docs). Elle est conçue pour être aussi **lisible par une machine que par un humain**, permettant aux LLM de respecter votre syntaxe précise.

> [!IMPORTANT]
> **Nouveau : Le AI Toolkit** 🚀
> Pour faciliter encore plus la vie des développeurs, Tilty inclut désormais un **AI Toolkit** prêt à l'emploi.
> Situé dans le dossier `client/public/doc/ai-toolkit/` (ou directement à la racine de la documentation si vous l'avez téléchargée), il contient :
> *   `AGENT_CONTEXT.md` : Un fichier "Master" optimisé contenant toute la documentation, les règles strictes et les définitions TypeScript. **C'est le fichier à donner à votre IA.**
> *   `examples.md` : Un dataset d'entraînement "Few-Shot" avec des exemples "Before/After".
> *   `ty-attributes.d.ts` : Les définitions de type officielles pour l'autocomplétion.
>
> 👉 **Conseil Pro** : Si vous utilisez Cursor ou Windsurf, ajoutez simplement le fichier `AGENT_CONTEXT.md` à votre contexte global pour transformer votre IDE en expert Tilty instantané.

### 2. Les Assistants de Code (Copilot, Cursor, Antigravity...)
Les outils de développement modernes (dont l'excellent **Antigravity** propulsé par **Gemini**, qu'on aime beaucoup par ici 😉) offrent une compréhension contextuelle profonde. Ils permettent déjà :
- **L'autocomplétion intelligente** des attributs `ty-*`.
- **La détection d'erreurs** en temps réel.
- **La "Tiltyfication" à la volée** directement dans l'IDE.

### 3. Le Futur Standard : Le protocole MCP
Pour aller plus loin, Tilty adopte le **Model Context Protocol (MCP)**.
Chaque projet Tilty agit comme un "Serveur MCP" qui expose ses données et actions à n'importe quelle IA compatible (Claude, IDEs, etc.), sans bricolage spécifique.

- **Resources (Lecture)** : L'IA lit l'arborescence (`tilty://pages`), la documentation (`tilty://doc`) ou le schéma (`tilty://schema`).
- **Tools (Action)** : L'IA exécute des tâches techniques (création de pages, traduction, relecture, validation syntaxique).
- **Prompts (Guidage)** : Tilty fournit ses propres instructions système ("Respecte les conventions...").

Cela s'aligne avec notre philosophie agnostique : nous exposons un standard ouvert, vous connectez l'intelligence de votre choix.

### 4. L'API (Experimental)
Tilty dispose également d'une API REST (ouverte courant 2027) pour permettre aux agents de lire la structure, proposer des modifications ou s'interfacer avec le workflow de publication.

*Cette API est actuellement en cours de définition et évoluera avec les futures versions. Restez connectés !*


---


 < !--SOURCE_FILE: ai-toolkit/README -->


# 🤖 Tilty AI Toolkit

This directory contains resources specifically designed to assist AI Agents (Cursor, Windsurf, GitHub Copilot, ChatGPT, Claude, etc.) in understanding and working with Tilty CMS.
**(See on [GitHub](https://github.com/Tilty-io/docs/tree/main/ai-toolkit))**

## 📄 The Main File: `AGENT_CONTEXT.md`

This is the **Reference Document** for any AI interaction.
It acts as a "Single Source of Truth" containing:
1.  **Strict Syntax Rules** (No hallucinations allowed).
2.  **TypeScript Definitions** for `ty-*` attributes.
3.  **Few-Shot Training** (Examples of Good/Bad code).
4.  **Technical Documentation** (Architecture, Multilingual, etc.).

### 🚀 How to use it?

#### 1. In AI Editors (Cursor, Windsurf, Copilot)
When you start a coding session involving Tilty templates:
1.  Open `AGENT_CONTEXT.md` in a tab (or pin it to context).
2.  The AI will automatically "read" the definitions and examples.
3.  Ask your question (e.g. *"Create a polymorphic list for a hero section"*).

#### 2. With ChatBots (ChatGPT, Claude, Gemini)
1.  **Upload** the `AGENT_CONTEXT.md` file to the chat.
2.  Use the following prompt:
    > "You are an expert Tilty Developer. I have uploaded the `AGENT_CONTEXT.md` file which contains the strict syntax and rules you must follow. Read it carefully before answering. Start by confirming the Tilty version."

#### 3. Creating Custom GPTs
If you are building a custom GPT or Assistant:
1.  Upload `AGENT_CONTEXT.md` to its **Knowledge Base**.
2.  In the System Instructions, add:
    > "Always refer to `AGENT_CONTEXT.md` for syntax validation. Never invent conventions not listed in that file."

---

## 🛠️ Maintenance

**⚠️ Note:** This toolkit is automatically generated during the Tilty release process.
The source files (`examples.md`, `ty-attributes.d.ts`) and the generation script reside in the private Tilty Core repository.

**Do not edit `AGENT_CONTEXT.md` manually**, as your changes will be overwritten by the next release.


---


 < !--SOURCE_FILE: 98-notes-dev -->


# Notes de développement

Cette section est destinées aux développeurs de l'équipe Tilty (à David et Juliette en gros)

api

# draft david

j'ai eu une réflexion intéressante de la part de Manu, le frère de Juju. Je voulais vous la partager car ça permet de positionner l'audience de Tilty.














# Notes de développement Tilty Kiosk

Le projet est développé avec les libs suivantes
[https://www.electronforge.io/](https://www.electronforge.io/)
[https://getbootstrap.com/docs/5.3](https://getbootstrap.com/docs/5.3)


---


> **Version** : 0.15.0

# EXAMPLES & COUNTER-EXAMPLES (FEW-SHOT TRAINING)

This section provides explicit examples of **correct** versus **incorrect** usage of Tilty attributes ("Tiltyfication").
Study these carefully to understand the expected behavior.

## 1. Hallucinations (Strict Syntax)

### 📄 INPUT (Original HTML)
```html
<img src="img.jpg">
<a href="#">Link</a>
<div class="content">Content</div>
```

### ❌ BAD (Hallucinated Attributes)
The agent invents attributes that "sound right" but do not exist in the spec.
```html
<!-- INCORRECT -->
<img ty-image="hero" src="img.jpg">
<a ty-link="url" href="#">Link</a>
<div ty-show="isVisible" class="content">Content</div>
```

### ✅ GOOD (Strict Spec Compliance)
The agent uses ONLY the whitelisted `ty-*` attributes or falls back to `ty-attr`.
```html
<!-- CORRECT -->
<img ty-src="hero" src="img.jpg">
<a ty-href="url" href="#">Link</a>
<div ty-if="isVisible" class="content">Content</div>
```

---

## 2. Standard Attributes Binding

### 📄 INPUT (Original HTML)
```html
<button aria-label="Label">Click me</button>
<div data-id="123">Project</div>
```

### ❌ BAD (Direct Injection)
The agent tries to invent `ty-aria-label` or `ty-data-id`.
```html
<!-- INCORRECT -->
<button ty-aria-label="btnLabel" aria-label="Label">Click me</button>
<div ty-data-id="projectId" data-id="123">Project</div>
```

### ✅ GOOD (Using `ty-attr`)
The agent uses the generic `ty-attr` for non-standard attributes.
```html
<!-- CORRECT -->
<button ty-attr="aria-label:btnLabel" aria-label="Label">Click me</button> <!-- attribute:variable -->
<div ty-attr="data-id:projectId" data-id="123">Project</div>
```

---

## 3. HTML Preservation

### 📄 INPUT (Original HTML)
The user provides a static mockup with multiple items.
```html
<ul class="menu">
  <li>Home</li>
  <li>About</li>
  <li>Contact</li>
</ul>
```

### ❌ BAD (Deleting Content)
The agent deletes the examples from the mockup to "clean up" the code.
```html
<!-- INCORRECT: The structure is lost -->
<ul ty-list="menu">
  <li ty-list-item="item" ty-text="label">Home</li>
</ul>
```

### ✅ GOOD (Using `ty-ignore`)
The agent keeps the original mockup elements but marks them as ignored.
```html
<!-- CORRECT: The DOM structure is preserved for the designer -->
<ul ty-list="menu">
  <li ty-list-item="item" ty-text="label">Home</li>
  <li ty-list-item="ignore">About</li>
  <li ty-list-item="ignore">Contact</li>
</ul>
```

---

## 4. Semantic Naming

### 📄 INPUT (Original HTML)
```html
<div class="article">
  <h1>Title</h1>
  <img src="..." alt="...">
</div>
```

### ❌ BAD (Generic Names)
The agent uses generic names that do not reflect the content.
```html
<!-- INCORRECT -->
<div class="article">
  <h1 ty-text="text1">Title</h1>
  <img ty-src="img1" ty-alt="text2" src="..." alt="...">
</div>
```

### ✅ GOOD (Semantic Names)
The agent infers meaning from the HTML.
```html
<!-- CORRECT -->
<div class="article">
  <h1 ty-text="articleTitle">Title</h1>
  <img ty-src="heroImage.resize(800,600)" ty-alt="heroAlt" src="..." alt="...">
</div>
```

---

## 5. Polymorphism (Page Builders)

### 📄 INPUT (Original HTML)
Multiple sections with different designs.
```html
<div class="page-builder">
  <section class="hero"><h1>Hero</h1></section>
  <section class="text"><p>Some text</p></section>
  <section class="hero"><h1>Another Hero</h1></section>
</div>
```

### ❌ BAD (Flat Structure)
The agent treats them as fixed static content.
```html
<!-- INCORRECT: Not flexible -->
<div class="page-builder">
  <section class="hero" ty-scope="hero1"><h1 ty-text="title">Hero</h1></section>
  <section class="text" ty-scope="text1"><p ty-text="content">Some text</p></section>
  <section class="hero" ty-scope="hero2"><h1 ty-text="title">Another Hero</h1></section>
</div>
```

### ✅ GOOD (Polymorphic List)
The agent identifies a list of potentially reorderable components.
```html
<!-- CORRECT: User can add/order/mix blocks -->
<div class="page-builder" ty-list="sections">
  <section class="hero" ty-list-item="heroBlock"><h1 ty-text="title">Hero</h1></section>
  <section class="text" ty-list-item="textBlock"><p ty-html="value">Some text</p></section>
  <!-- The third section is ignored because it's a duplicate visualization of heroBlock -->
  <section class="hero" ty-list-item="ignore"><h1>Another Hero</h1></section>
</div>
```

---

## 6. Scopes (Structured Data)

### 📄 INPUT (Original HTML)
Nested data structure (e.g. an Author card).
```html
<div class="author-card">
  <img src="avatar.jpg">
  <h3>John Doe</h3>
</div>
```

### ❌ BAD (Flat Naming)
The agent flattens variable names, cluttering the root scope.
```html
<!-- INCORRECT -->
<div class="author-card">
  <img ty-src="authorAvatar" src="avatar.jpg">
  <h3 ty-text="authorName">John Doe</h3>
</div>
```

### ✅ GOOD (Using `ty-scope`)
The agent groups data logically using `ty-scope`.
```html
<!-- CORRECT -->
<div class="author-card" ty-scope="author">
  <img ty-src="avatar" src="avatar.jpg">
  <h3 ty-text="name">John Doe</h3>
</div>
```

---

## 7. Conditional Logic (`ty-if`)

### 📄 INPUT (Original HTML)
An element that should only appear under certain conditions (e.g. a "Sale" badge).
```html
<span class="badge">SALE!</span>
```

### ❌ BAD (Hallucinations / Framework leaking)
The agent uses Vue/React syntax or invents attributes.
```html
<!-- INCORRECT -->
<span class="badge" ty-show="isOnSale">SALE!</span>
<span class="badge" v-if="isOnSale">SALE!</span>
```

### ✅ GOOD (Using `ty-if`)
The agent uses the correct `ty-if` attribute.
```html
<!-- CORRECT -->
<span class="badge" ty-if="isOnSale">SALE!</span>
```

---

## 8. List with Duplicates (Simple List)

### 📄 INPUT (Original HTML)
A simple list of redundant items.
```html
<ul>
  <li>hello</li>
  <li>world</li>
</ul>
```

### ❌ BAD (Redundant Definitions)
The agent defines the template twice on identical items.
```html
<!-- INCORRECT: Defines 'text' template twice -->
<ul ty-list="items">
  <li ty-list-item="text" ty-text="value">hello</li>
  <li ty-list-item="text" ty-text="value">world</li>
</ul>
```

### ✅ GOOD (Unique Definition)
The agent defines the schema ONCE and ignores the rest.
```html
<!-- CORRECT: First item is the template, others are ignored placeholders -->
<ul ty-list="items">
  <li ty-list-item="text" ty-text="value">hello</li>
  <li ty-list-item="ignore">world</li>
</ul>
```

---

## 9. Variable Naming Rules (Keys must be identifiers)

### 📄 INPUT (Original HTML)
```html
<h1>Welcome to our website</h1>
<a href="https://google.com">Google</a>
```

### ❌ BAD (Using Content/Value as Key)
The agent mistakenly uses the text content or the literal URL as the variable name.
**Variable names must be camelCase identifiers, NOT sentences or URLs.**
```html
<!-- INCORRECT -->
<h1 ty-text="Welcome to our website">Welcome to our website</h1>
<a ty-href="https://google.com">Google</a>
```

### ✅ GOOD (Semantic CamelCase Keys)
The agent chooses a short, descriptive identifier for the data key.
```html
<!-- CORRECT -->
<h1 ty-text="heroTitle">Welcome to our website</h1>
<a ty-href="externalLink" ty-text="linkLabel">Google</a>
```
