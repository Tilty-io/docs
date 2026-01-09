> **Version** : 0.11.14

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
