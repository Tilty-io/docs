> **Version** : 0.11.17

# Une approche respectueuse du HTML

Tilty Attributes, ou *TyAttr*, est un système d’attributs HTML conçu pour injecter des données dynamiques dans vos pages web sans jamais compromettre leur validité ou leur structure. Il permet de transformer une page HTML statique en une page dynamique et éditable, sans avoir à écrire une seule ligne de code JavaScript ou PHP.

Son objectif est simple : **permettre aux designers, intégrateurs ou agences de rendre une page HTML éditable, vivante et connectée à une base de données, sans quitter leur environnement habituel.**

Fidèle à son nom, TyAttr s’appuie **exclusivement sur des attributs HTML**, sans introduire de balises spécifiques ni de syntaxe propriétaire. À l’inverse des frameworks comme Angular, Vue, React, ou des moteurs de templates PHP (comme ceux de WordPress), il ne nécessite aucun moteur de rendu complexe : il s'intègre directement dans le HTML existant.

On y retrouve certaines logiques proches de frameworks comme Vue.js ou React, mais avec une philosophie radicalement différente : **TyAttr génère du HTML à partir de HTML**. Autrement dit, il ne vous éloigne jamais du langage de base du web.

Cette approche permet une **compatibilité totale avec les éditeurs visuels** comme Webflow. Vous pouvez non seulement concevoir vos interfaces graphiques dans Webflow, mais également **saisir directement les attributs TyAttr** dans l’interface — via les champs "Custom Attributes" ou les éléments HTML personnalisés — afin de connecter vos designs à une base de données Tilty.

Pourquoi complexifier quand on peut faire simple ?  
 **TyAttr est un pont entre le HTML statique et le CMS dynamique, tout en restant fidèle aux standards du web.**

## Pourquoi TyAttr utilise-t-il uniquement des attributs HTML ?

L’utilisation exclusive des attributs HTML dans TyAttr n’est pas un hasard : c’est un choix technique et philosophique fort, basé sur plusieurs avantages concrets.

#### Compatibilité totale avec le HTML natif

En se limitant aux attributs, TyAttr garantit que le code HTML reste valide et lisible, même en dehors du cadre de Tilty. Cela signifie que votre page peut toujours être affichée dans n’importe quel navigateur, sans erreur ni comportement inattendu.

#### 2. Intégration fluide avec les éditeurs visuels

Les éditeurs comme Webflow, Pinegrow ou encore les CMS Headless acceptent facilement l’ajout d’attributs personnalisés. Il est donc possible de préparer des pages dynamiques sans écrire de JavaScript ni toucher au backend, directement dans ces outils.

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


