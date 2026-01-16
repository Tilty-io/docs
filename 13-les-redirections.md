> **Version** : 0.15.0

# Les redirections

Parce que personne n'aime les erreurs 404, surtout Google. La fenêtre **Redirections** est là pour dire "J'ai déménagé" proprement.

> [!IMPORTANT]
> **Patience** : Les redirections ne s'activent qu'après la **publication**. Ne cherchez pas à tester tant que vous n'avez pas cliqué sur le bouton qui fait peur.

## En bref
*   **301** (Défaut) : Déménagement définitif. La nouvelle adresse remplace l'ancienne dans l'historique de tout le monde.
*   **302** : "Je teste un truc". Temporaire. À utiliser seulement si vous savez pourquoi.

## Configuration
Sélectionnez une redirection ou créez-en une **(+)** pour ouvrir le panneau d'édition.

| Champ | Explication & Nuances |
| :--- | :--- |
| **Source** | L'URL d'origine qui ne doit plus exister.<br><br>• **Relative** (ex: `/vieux-truc`) : <br>Standard. Marche partout, tout le temps.<br><br>• **Absolue** (ex: `https://.../vieux-truc`) : <br>Strict. Ne marche que si le domaine correspond *exactement*. |
| **Cible** | Où est-ce qu'on va ?<br><br>• **Page interne** (Recommandé) : <br>Vous sélectionnez une page du site. Si vous la renommez demain, le lien suit. Magique.<br><br>• **URL Personnalisée** : <br>Pour renvoyer vers `.google.com`.<br>⚠️ **Attention** : Si vous mettez une URL relative ici (`/ma-page`), profitez bien de votre erreur 404 future quand vous changerez la structure du site. |
| **Locale** | *Uniquement pour cible "Page interne"*<br><br>• **Vide** (Recommandé) : Le système choisira la meilleure langue pour le visiteur.<br>• **Définie** : Force la redirection vers cette langue précise, qu'il pleuve ou qu'il vente. |
| **Code** | 301. Sauf si vous avez un doctorat en SEO qui vous dit le contraire. |

> [!TIP]
> **Source** : Le système se fiche que vous mettiez `/fr/vieux-truc` ou `/vieux-truc`. Il redirigera l'adresse exacte demandée. La prise en charge des redirection se fait avant même qu'on n'ait déterminé la langue du visiteur.

## Astuce de pro : URLs "Marketing" (Short links)
Vous pouvez utiliser les redirections pour créer des liens courts et faciles à retenir pour vos campagnes.
Exemple : Créez une redirection de `/promo` vers `/produits/collection-ete/promo-speciale-2024`.
C'est propre, c'est court, et ça marche parfaitement.

## Selon le serveur de publication
Selon votre hébergement, Tilty gère les redirections différemment :

**Serveur Tilty ou serveur avec prise en charge de PHP** : Pas de sujet, les redirections sont gérées avec de vrais en-têtes HTTP (Headers). C'est rapide, invisible et **parfait pour le SEO** (Google adore).

**Export Statique (HTML)** :
Pour assurer une compatibilité maximale (Apache, IIS, Statique pur, etc.), Tilty génère désormais une stratégie de redirection "ceinture et bretelles".
Pour chaque redirection, un dossier physique est créé contenant :
1.  `index.php` (Header 301) : Prioritaire si PHP est dispo.
2.  `.htaccess` (Apache) : Redirection native 301 si Apache est utilisé.
3.  `web.config` (IIS) : Redirection native pour les serveurs Windows.
4.  `index.html` (Meta Refresh + JS) : Fallback ultime si rien d'autre ne marche.

> [!NOTE]
> **SEO** : Grâce à cette stratégie hybride, même sur un export statique, vous bénéficiez le plus souvent d'une vraie redirection 301 (via `.htaccess` ou `web.config`), ce qui est optimal pour le SEO. Le fallback HTML/JS assure juste que l'utilisateur n'est jamais perdu.
