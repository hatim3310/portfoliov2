# System Architecture & Design System — Portfolio v2 (2026)

Document de référence décrivant la direction artistique, les principes d'expérience utilisateur (UI/UX) et les composants clés de la plateforme.

---

## 1. Direction Artistique & Charte Graphique

### Palette de Couleurs (Monochrome Strict & Luxe Minimaliste)
- **Noir Absolu (`#000000` / `#0A0A0C`)** : Fond principal immersif et profond.
- **Blanc Pur (`#FFFFFF`)** : Titres géants (`H1`, `H2`), typographie d'impact, et éléments actifs.
- **Platine (`#ECECEE`)** : Descriptions, sous-titres, composants interactifs au repos, et boutons d'action.
- **Translucides & Verre Dépoli** :
  - `bg-white/10` & `bg-white/15` : Cartes et badges en verre poli.
  - `border-white/20` & `border-white/30` : Bordures sub-pixel haute définition.

### Typographie
- **Font Heading** : ExtraBold / Black, tracking très serré (`tracking-tighter`), casse en majuscules (`uppercase`).
- **Font Mono** : Pour la numérotation (`01 / 03`), les balises de technologies (`tags`), les métadonnées et la barre de progression.
- **Font Body** : Ultra-lisible avec hauteur de ligne aérée (`leading-relaxed`).

---

## 2. Architecture des Composants Principaux

### A. Hero Section (Ultra Luxe Editorial)
- **Fond Ambiant** : Vidéo d'ambiance en boucle sous filtre de contraste et vignette progressive (`contrast-125 brightness-90`).
- **Composant `TrueFocus` (ReactBits)** :
  - Effet de focus dynamique sur `"FULL STACK ENGINEER"`.
  - **Desktop (`pointer: fine`)** : Suivi dynamique du curseur de la souris sur chaque mot.
  - **Mobile / Tactile (`pointer: coarse`)** : Défilement automatique continu en boucle.

### B. Selected Works — ScrollyTelling Video Scroll
- **Format** : Section épinglée en plein écran (`100vh / 100vw`) contrôlée par GSAP `ScrollTrigger`.
- **Transitions Vidéo (Crossfade)** : Fondu croisé imperceptible entre les vidéos en arrière-plan au fil du scroll.
- **Text Reveal Mot-par-Mot** : Titres et descriptions découpés en `<span>` animés en cascade (`stagger: 0.05s`).
- **Indicateurs de Progression** :
  - **Ambient Slide Number** : Numéro géant en filigrane (`01`, `02`, `03`) avec très faible opacité (`opacity: 0.06`).
  - **Progress Bar & Dots** : Barre verticale latérale avec remplissage progressif et points indicateurs.

### C. Expertise & Architecture — Bento Grid (4 Cartes)
Grille Bento asymétrique sur 3 colonnes avec vidéos d'arrière-plan IA génératives en boucle et effet Spotlight au survol :
1. **Full Stack Engineering (`01`)** : Carte étendue 2 colonnes (`video: /assets/expertise-fullstack.mp4`).
2. **AI & Data Science (`02`)** : Carte 1 colonne (`video: /assets/expertise-ai.mp4`).
3. **Cloud & DevOps Infrastructure (`03`)** : Carte 1 colonne (`video: /assets/expertise-devops.mp4`).
4. **UI/UX & Motion Design (`04`)** : Carte étendue 2 colonnes (`video: /assets/expertise-design.mp4`).

### D. Certifications & Credentials — Interactive Matrix
Grille 2 colonnes interactive avec système de filtrage instantané par organisme certificateur :
- **Organismes** : IBM, Anthropic Academy, Google, ALX.
- **Filtrage Dynamique** : Boutons pilules interactifs (All, Anthropic, IBM, Google, ALX).
### F. GSAP Footer Bounce — Contact & Dynamic Reveal
Footer dynamique avec effet d'entrée physique élastique inspiré de la démo officielle GSAP Footer Bounce :
- **ScrollTrigger Elastic Timeline (`bounce.out` & `back.out(2)`)** : Déclenchement à 85% de la vue avec rebond fluide sur la bannière typographique géante `"HATIM LAMARTI"` et les boutons d'action.
- **Card E-mail Interactive** : Copie de l'e-mail en un clic (`hatimlamarti3@gmail.com`) avec notification toast instantanée et état survolé réactif.
- **Badges Sociaux Magnétiques** : Boutons GitHub, LinkedIn et Instagram avec effet d'élévation et icônes d'orientation.

---

## 3. Cartographie des Fichiers Médias (`public/assets/`)

| Composant | Fichier Média | Description Visuelle |
| :--- | :--- | :--- |
| **Hero Background** | `hero-bg.mp4` | Vidéo d'ambiance principale du portfolio |
| **Project 01** | `bde-efet-hub-showcase.mp4` | Démo plateforme BDE EFET Hub |
| **Project 02** | `f1-analytics-dashboard.mp4` | Démo plateforme F1 Analytics |
| **Project 03** | `explainer-flow.mp4` | Démo plateforme DataInsight AI |
| **Bento 01 (Full Stack)** | `expertise-fullstack.mp4` | Animation 3D grille spatiale & code |
| **Bento 02 (AI)** | `expertise-ai.mp4` | Animation réseau neuronal & particules |
| **Bento 03 (DevOps)** | `expertise-devops.mp4` | Animation cubes de verre isométriques |
| **Bento 04 (UI/UX)** | `expertise-design.mp4` | Animation fluide verre dépoli |

---

## 4. Micro-Interactions & Motion Design

1. **GSAP ScrollTrigger & Timeline** : Synchronisation précise du scroll avec la vidéo et la typographie.
2. **Glassmorphic Hover States** : Élévation subtile des cartes (`hover:border-white/30`), lueurs radiales au curseur.
3. **Responsive Adaptive Logic** : Gestion intelligente des événements tactiles vs pointeur physique.
