> **Version** : 0.12.0

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

# Tilty-wysiwyg (ty-wy)

Conjointement à Tilty Attributes, un mécanisme WYSIWYG se met en place afin de faciliter l'édition de contenu.   
Automatiquement sur tous les éléments ty-attributes déclarés s'installent des éléments utilisateurs qui permettent de 

# Le WYSIWYG dans Tilty

![](images/wysiwyg_editor.png)  
TODO rédiger

## Pourquoi utiliser un système WYSIWYG ?

Tilty offre un contrôle très fin des données, ce qui conduit souvent à des arbres de données complexes et à une édition potentiellement fastidieuse. Avec une approche WYSIWYG by design, l’interface HTML — naturellement compréhensible par l’utilisateur — devient le point d’entrée. 

Grâce aux Tilty Attributes appliqués à votre HTML, la mise en page est directement liée aux données : vous modifiez le contenu là où il s’affiche. Résultat : accès plus rapide aux données, moins de friction, et une édition qui suit l’évidence ergonomique du design HTML.

# Mise en oeuvre du WYSIWYG

Par défaut si vous utilisez des Tilty Attributes, le wysiwyg est automatiquement activé.  
Ce qui suit sert à améliorer la gestion automatique du WYSIWYG

| Attributs pour limiter le WYSIWYG |                                                                               |
|:----------------------------------|:------------------------------------------------------------------------------|
| `ty-wy-ignore="children"`         | Le wysiwyg est désactivé sur les éléments HTML enfants                        |
| `ty-wy-ignore="self"`             | Le wysiwyg est désactivé sur l'élément HTML mais pas sur les éléments enfants |
