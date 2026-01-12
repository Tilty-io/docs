> **Version** : undefined

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
