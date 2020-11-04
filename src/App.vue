<template>
    <div 
        id="app"
        :data-safari="props.safari">
            <router-view/>
    </div>
</template>

<script>
    import $ from 'jquery'
    import { mapState } from 'vuex'

    export default {
        name: 'App',
        computed: {
            ...mapState([
                'props'
            ])
        },
        mounted () {
            if ($(window).width() < 768) {
                this.$store.commit('SET_PROP', { key: 'isMobile', value: true })
            }

            if (/iPad|iPhone|iPod/.test(navigator.platform)) {
                this.$store.commit('SET_PROP', { key: 'ios', value: true })
                if (navigator.userAgent.match(/Version\/[\d.]+.*Safari/)) {
                    this.$store.commit('SET_PROP', { key: 'safari', value: true })
                    $('#dashboard').css('min-height', '85vh')
                }
            }
        }
    }
</script>

<style lang="sass" src="./assets/sass/main.sass"></style>
