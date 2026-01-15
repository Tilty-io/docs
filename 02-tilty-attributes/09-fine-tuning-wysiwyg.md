> **Version** : 0.13.1

# Tilty-wysiwyg (ty-wy)

Parce que personne n'a envie d'apprendre le JSON pour mettre à jour son site web.

Conjointement à Tilty Attributes, le mécanisme WYSIWYG s'invite à la fête pour transformer votre HTML statique en véritable interface d'édition. 
Automatiquement, comme par magie (ou presque), des éléments d'interface viennent se greffer sur vos balises `ty-*` pour permettre à vos utilisateurs de tout casser... pardon, de tout éditer avec grâce.

# Le WYSIWYG dans Tilty

![](images/wysiwyg_editor.png)

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
<!-- Ni ce div, ni le titre ne seront éditables -->
<div ty-wy-ignore>
    <h1 ty-html="title">Titre intouchable</h1>
</div>
```

**2. Ignorer les enfants (Protecteur)**
Vous voulez éditer le conteneur (ex: changer une image de fond), mais pas touche au contenu complexe qu'il héberge.

```html
<!-- Ce div est éditable, mais tout ce qui est dedans est ignoré -->
<div ty-img="bg" ty-wy-ignore="children">
   <complex-widget>...</complex-widget>
</div>
```

**3. Ignorer soi-même (Subtil)**
C'est le plus difficile à appréhender. Vous voulez que le conteneur soit transparent pour le WYSIWYG (pas de cadre bleu au survol), mais que ses enfants restent éditables individuellement.
Utile pour les wrappers de mise en page qui ne portent pas de données.

```html
<!-- Ce div est ignoré (pas de cadre), mais le h1 reste éditable ! -->
<div class="wrapper-inutile" ty-wy-ignore="self">
    <h1 ty-html="title">Titre éditable</h1>
</div>
```
