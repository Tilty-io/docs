> **Version** : 0.11.17

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
