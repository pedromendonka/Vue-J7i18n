# J7i18n
## Vue i18n Plugin by Jera7
### Yet another simple i18n plugin for VueJS with no complications

_____________________________________________

## Why another i18n plugin for VueJS?

**J7i18n** is _not the most powerfull and complete i18n solution_ out there and it is not the goal of it.<br>
This plugin tries to achieve just a **simple solution for simple translations**.

**The plugin is to be used with Vue Components**

## Features

* Small footprint
* Simple install and configuration
* Component scoped translations
* Common/global translations
* Same usage for common and scoped translations
* Single Directive
* Simple methods:
  * Current language computed property
  * changeLanguage()
  * createTranslations()
* 0 dependencies

_______________

## Installation

```
npm install vue-j7i18n --save
```
OR

**Download it and put somewhere inside your src folder**

> yourAppFolder

> src

> plugins

> vue-j7i18n

> index.js

__________________

## Register Plugin

``` javascript
// Import it in your Main.js
import J7i18n from 'vue-j7i18n'
// OR
import J7i18n from './plugins/vue-j7-i18n'

Vue.use(J7i18n)
```
________________

## Configuration

### Common/Global translations
Just pass an object as the second param with the common/global translations accessible by all components

``` javascript
// Main.js

Vue.use(J7i18n, {
  company: {
    en: 'Company Name',
    pt: 'Nome da Empresa'
    fr: '...'
  }
})
```

### Scoped translations

Create translations on component Created Hook.<br>
Use the *createTranslations()* method passing an object

``` javascript
// myComponent.js or Component.vue

export default {
  name: 'myComponent',
  created () {
    this.createTranslations({
      title: {
        en: 'Title',
        pt: 'Título',
        fr: '...'
      },
      description: {
        en: 'A simple description',
        pt: 'Uma descrição simples',
        fr: '...'
      }
    })
  }
}

```
________

## Usage

### Define the container

Can be the component root element or another one.<br>
This just creates the necessary reactivity when we change the language.<br><br>
For that we use the _```.language```_  *modifier* passing the expression: _```currentLanguage```_ to i18n directive

``` html
<template>
  <!-- Use the i18n directive with modifier language -->
  <div id="myComponent-container" v-i18n.language="currentLanguage">

  </div>
</template>
```

### Define elements to be translated

We can define elements to be translated using i18n directive passing the key as an argument.<br>
Common/global translations or scoped translations are used exacly the same way.

``` html
<template>
  <!-- Use the i18n directive with modifier language -->
  <div id="myComponent-container" v-i18n.language="currentLanguage">
    <!-- Common/global key -->
    <h1 v-i18n:company></h1>
    <!-- Scoped key -->
    <h2 v-i18n:title></h2>
    <p v-i18n:description></p>

  </div>
</template>
```

### Change Language

The initial language is the client/browser default language.<br>
After that, the plugin stores the user preference in browser's local storage

``` html
<template>
  <!-- Use the i18n directive with modifier language -->
  <div id="myComponent-container" v-i18n.language="currentLanguage">
    <!-- Common/global key -->
    (...)
    <!-- Scoped key -->
    (...)
    <button @changeLanguage('en')>EN</button>
    <button @changeLanguage('pt')>PT</button>
    <button @changeLanguage('fr')>FR</button>

  </div>
</template>
```

