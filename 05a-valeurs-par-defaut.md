> **Version** : 0.11.4

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
