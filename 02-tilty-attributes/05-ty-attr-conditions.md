> **Version** : 0.13.1

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
