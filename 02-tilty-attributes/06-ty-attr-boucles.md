> **Version** : undefined

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
