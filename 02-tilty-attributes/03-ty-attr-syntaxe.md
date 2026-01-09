> **Version** : 0.11.12

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

> Consultez la [fiche Modèles de Données](04-ty-attr-modeles.md) pour voir toutes les propriétés disponibles pour les Images, Fichiers, Liens et Pages.
