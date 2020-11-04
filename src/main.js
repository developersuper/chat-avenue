import Vue from 'vue'
import $ from 'jquery'

/**
 * ELEMENT UI
 */
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'

/**
 * FONT AWESOME
 */
import fontawesome from '@fortawesome/fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'
import solid from '@fortawesome/fontawesome-free-solid'
import regular from '@fortawesome/fontawesome-free-regular'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

/**
 * QUILL EDITOR
 */
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import App from './App'
import router from './router'
import store from './store'

Vue.use(ElementUI, { locale })
Vue.component('icon', FontAwesomeIcon)
Vue.use(VueQuillEditor)

Vue.config.productionTip = false
fontawesome.library.add(brands, solid, regular)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

$.fn.extend({
    animateCss: function (animationName, callback) {
        var animationEnd = (function (el) {
            var animations = {
                animation: 'animationend',
                OAnimation: 'oAnimationEnd',
                MozAnimation: 'mozAnimationEnd',
                WebkitAnimation: 'webkitAnimationEnd'
            }

            for (var t in animations) {
                if (el.style[t] !== undefined) {
                    return animations[t]
                }
            }
        })(document.createElement('div'))

        this.addClass('animated ' + animationName).one(animationEnd, function () {
            $(this).removeClass('animated ' + animationName)

            if (typeof callback === 'function') callback()
        })

        return this
    }
})
