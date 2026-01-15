# EXAMPLES & COUNTER-EXAMPLES (FEW-SHOT TRAINING)

This section provides explicit examples of **correct** versus **incorrect** usage of Tilty attributes ("Tiltyfication").
Study these carefully to understand the expected behavior.

## 1. Hallucinations (Strict Syntax)

### 📄 INPUT (Original HTML)
```html
<img src="img.jpg">
<a href="#">Link</a>
<div class="content">Content</div>
```

### ❌ BAD (Hallucinated Attributes)
The agent invents attributes that "sound right" but do not exist in the spec.
```html
<!-- INCORRECT -->
<img ty-image="hero" src="img.jpg">
<a ty-link="url" href="#">Link</a>
<div ty-show="isVisible" class="content">Content</div>
```

### ✅ GOOD (Strict Spec Compliance)
The agent uses ONLY the whitelisted `ty-*` attributes or falls back to `ty-attr`.
```html
<!-- CORRECT -->
<img ty-src="hero" src="img.jpg">
<a ty-href="url" href="#">Link</a>
<div ty-if="isVisible" class="content">Content</div>
```

---

## 2. Standard Attributes Binding

### 📄 INPUT (Original HTML)
```html
<button aria-label="Label">Click me</button>
<div data-id="123">Project</div>
```

### ❌ BAD (Direct Injection)
The agent tries to invent `ty-aria-label` or `ty-data-id`.
```html
<!-- INCORRECT -->
<button ty-aria-label="btnLabel" aria-label="Label">Click me</button>
<div ty-data-id="projectId" data-id="123">Project</div>
```

### ✅ GOOD (Using `ty-attr`)
The agent uses the generic `ty-attr` for non-standard attributes.
```html
<!-- CORRECT -->
<button ty-attr="aria-label:btnLabel" aria-label="Label">Click me</button> <!-- attribute:variable -->
<div ty-attr="data-id:projectId" data-id="123">Project</div>
```

---

## 3. HTML Preservation

### 📄 INPUT (Original HTML)
The user provides a static mockup with multiple items.
```html
<ul class="menu">
  <li>Home</li>
  <li>About</li>
  <li>Contact</li>
</ul>
```

### ❌ BAD (Deleting Content)
The agent deletes the examples from the mockup to "clean up" the code.
```html
<!-- INCORRECT: The structure is lost -->
<ul ty-list="menu">
  <li ty-list-item="item" ty-text="label">Home</li>
</ul>
```

### ✅ GOOD (Using `ty-ignore`)
The agent keeps the original mockup elements but marks them as ignored.
```html
<!-- CORRECT: The DOM structure is preserved for the designer -->
<ul ty-list="menu">
  <li ty-list-item="item" ty-text="label">Home</li>
  <li ty-list-item="ignore">About</li>
  <li ty-list-item="ignore">Contact</li>
</ul>
```

---

## 4. Semantic Naming

### 📄 INPUT (Original HTML)
```html
<div class="article">
  <h1>Title</h1>
  <img src="..." alt="...">
</div>
```

### ❌ BAD (Generic Names)
The agent uses generic names that do not reflect the content.
```html
<!-- INCORRECT -->
<div class="article">
  <h1 ty-text="text1">Title</h1>
  <img ty-src="img1" ty-alt="text2" src="..." alt="...">
</div>
```

### ✅ GOOD (Semantic Names)
The agent infers meaning from the HTML.
```html
<!-- CORRECT -->
<div class="article">
  <h1 ty-text="articleTitle">Title</h1>
  <img ty-src="heroImage.resize(800,600)" ty-alt="heroAlt" src="..." alt="...">
</div>
```

---

## 5. Polymorphism (Page Builders)

### 📄 INPUT (Original HTML)
Multiple sections with different designs.
```html
<div class="page-builder">
  <section class="hero"><h1>Hero</h1></section>
  <section class="text"><p>Some text</p></section>
  <section class="hero"><h1>Another Hero</h1></section>
</div>
```

### ❌ BAD (Flat Structure)
The agent treats them as fixed static content.
```html
<!-- INCORRECT: Not flexible -->
<div class="page-builder">
  <section class="hero" ty-scope="hero1"><h1 ty-text="title">Hero</h1></section>
  <section class="text" ty-scope="text1"><p ty-text="content">Some text</p></section>
  <section class="hero" ty-scope="hero2"><h1 ty-text="title">Another Hero</h1></section>
</div>
```

### ✅ GOOD (Polymorphic List)
The agent identifies a list of potentially reorderable components.
```html
<!-- CORRECT: User can add/order/mix blocks -->
<div class="page-builder" ty-list="sections">
  <section class="hero" ty-list-item="heroBlock"><h1 ty-text="title">Hero</h1></section>
  <section class="text" ty-list-item="textBlock"><p ty-html="value">Some text</p></section>
  <!-- The third section is ignored because it's a duplicate visualization of heroBlock -->
  <section class="hero" ty-list-item="ignore"><h1>Another Hero</h1></section>
</div>
```

---

## 6. Scopes (Structured Data)

### 📄 INPUT (Original HTML)
Nested data structure (e.g. an Author card).
```html
<div class="author-card">
  <img src="avatar.jpg">
  <h3>John Doe</h3>
</div>
```

### ❌ BAD (Flat Naming)
The agent flattens variable names, cluttering the root scope.
```html
<!-- INCORRECT -->
<div class="author-card">
  <img ty-src="authorAvatar" src="avatar.jpg">
  <h3 ty-text="authorName">John Doe</h3>
</div>
```

### ✅ GOOD (Using `ty-scope`)
The agent groups data logically using `ty-scope`.
```html
<!-- CORRECT -->
<div class="author-card" ty-scope="author">
  <img ty-src="avatar" src="avatar.jpg">
  <h3 ty-text="name">John Doe</h3>
</div>
```

---

## 7. Conditional Logic (`ty-if`)

### 📄 INPUT (Original HTML)
An element that should only appear under certain conditions (e.g. a "Sale" badge).
```html
<span class="badge">SALE!</span>
```

### ❌ BAD (Hallucinations / Framework leaking)
The agent uses Vue/React syntax or invents attributes.
```html
<!-- INCORRECT -->
<span class="badge" ty-show="isOnSale">SALE!</span>
<span class="badge" v-if="isOnSale">SALE!</span>
```

### ✅ GOOD (Using `ty-if`)
The agent uses the correct `ty-if` attribute.
```html
<!-- CORRECT -->
<span class="badge" ty-if="isOnSale">SALE!</span>
```

---

## 8. List with Duplicates (Simple List)

### 📄 INPUT (Original HTML)
A simple list of redundant items.
```html
<ul>
  <li>hello</li>
  <li>world</li>
</ul>
```

### ❌ BAD (Redundant Definitions)
The agent defines the template twice on identical items.
```html
<!-- INCORRECT: Defines 'text' template twice -->
<ul ty-list="items">
  <li ty-list-item="text" ty-text="value">hello</li>
  <li ty-list-item="text" ty-text="value">world</li>
</ul>
```

### ✅ GOOD (Unique Definition)
The agent defines the schema ONCE and ignores the rest.
```html
<!-- CORRECT: First item is the template, others are ignored placeholders -->
<ul ty-list="items">
  <li ty-list-item="text" ty-text="value">hello</li>
  <li ty-list-item="ignore">world</li>
</ul>
```

---

## 9. Variable Naming Rules (Keys must be identifiers)

### 📄 INPUT (Original HTML)
```html
<h1>Welcome to our website</h1>
<a href="https://google.com">Google</a>
```

### ❌ BAD (Using Content/Value as Key)
The agent mistakenly uses the text content or the literal URL as the variable name.
**Variable names must be camelCase identifiers, NOT sentences or URLs.**
```html
<!-- INCORRECT -->
<h1 ty-text="Welcome to our website">Welcome to our website</h1>
<a ty-href="https://google.com">Google</a>
```

### ✅ GOOD (Semantic CamelCase Keys)
The agent chooses a short, descriptive identifier for the data key.
```html
<!-- CORRECT -->
<h1 ty-text="heroTitle">Welcome to our website</h1>
<a ty-href="externalLink" ty-text="linkLabel">Google</a>
```
