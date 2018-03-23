/*
//////////////
// JERA7 i18n
//////////////////////////////////////
// Vue Internationalization Plugin
// With common and scoped translations
//////////////////////////////////////
// writen by pedromendonka
//////////////////////////
*/
export default {
  install (Vue, commonTranslations) {
    // Setting common Translations on plugin installation
    if (commonTranslations) {
      try {
        if (typeof commonTranslations === 'object') {
          Vue.i18nTranslations = commonTranslations
        } else {
          throw new Error('Common Translations must be an Object like { hello: {en: "hello world", pt: "olá mundo"} }')
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      Vue.i18nTranslations = {}
    }
    // Setting Starting Language
    // If no language set on local storage, set it from browser language
    if (!localStorage.getItem('i18nLang')) {
      localStorage.setItem('i18nLang', (navigator.language || navigator.userLanguage).split('-')[0])
    }
    // Directive for translations
    Vue.directive('i18n', {
      bind (el, binding) {
        try {
          let lang = localStorage.getItem('i18nLang')
          let key = binding.arg
          let modLanguage = binding.modifiers.language
          let expression = binding.expression
          // Checking if directive has argument -> translation key
          if (key) {
            // Checking if translations have been created
            if (Vue.i18nTranslations) {
              // Checking available keys in translations
              if (!(key in Vue.i18nTranslations)) {
                throw new Error(`There is no translation for key >>> ${key} <<<`)
              }
              // Checking available languages in translation key
              if (!(lang in Vue.i18nTranslations[key])) {
                throw new Error(`There is no translation for language >>> ${lang} <<<`)
              }
              // Initial translation
              el.innerHTML = Vue.i18nTranslations[key][lang]
            } else {
              throw new Error(`Seems that No translations have been created. Use this.createTranslations() on Created Hook inside your component.`)
            }
          } else {
            // If no key check if has the modifier language
            // This modifier must create a binding to currentLanguage computed property for reactivity
            if (modLanguage) {
              // Check if expression is currentLanguage -> computed property for data's i18nLanguage
              if (expression !== 'currentLanguage') {
                throw new Error(`The expression for i18n.language must be v-i18n.language="currentLanguage" and not >>> ${expression} <<<`)
              }
            } else {
              throw new Error('Directive i18n has no translation key => v-i18n:translationKey')
            }
          }
        } catch (error) {
          el.innerHTML = `J7i18n ERROR ( <span>${error}</span> )`
          el.style.cssText = 'font-size: 1em;'
          el.getElementsByTagName('span')[0]
            .style
            .cssText = 'color: red; text-decoration: underline;'
          throw error
        }
      },
      componentUpdated (el, binding) {
        let key = binding.arg
        let lang = localStorage.getItem('i18nLang')
        if (key) {
          el.innerHTML = Vue.i18nTranslations[key][lang]
        }
      }
    })
    // MIXINS
    Vue.mixin({
      data () {
        return {
          i18nLanguage: ''
        }
      },
      methods: {
        changeLanguage (lang) {
          this.i18nLanguage = lang
          localStorage.setItem('i18nLang', lang)
        },
        createTranslations (scopedTranslations) {
          try {
            if (typeof scopedTranslations === 'object') {
              Vue.i18nTranslations = Object.assign(Vue.i18nTranslations, scopedTranslations)
              console.log(Vue.i18nTranslations)
            } else {
              throw new Error('Translations must be an Object like { hello: {en: "hello world", pt: "olá mundo"} }')
            }
          } catch (error) {
            console.log(error)
          }
        }
      },
      computed: {
        currentLanguage () {
          return this.i18nLanguage
        }
      },
      created () {
        this.i18nLanguage = localStorage.getItem('i18nLang')
      }
    })
  }
}