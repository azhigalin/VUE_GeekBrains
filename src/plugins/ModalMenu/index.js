export default {
    install(Vue) {
        if (this.installed) {
            return
        }

        this.installed = true
        this.caller = null

        Vue.prototype.$modalMenu = {
            EventBus: new Vue(),

            openMenu({event, items}) {
                const caller = event.target
                if (caller !== this.caller) {
                    this.caller = caller
                    this.EventBus.$emit('openMenu', {items, caller})
                } else {
                   this.closeMenu()
                }
            },
            closeMenu() {
                this.caller = null
                this.EventBus.$emit('closeMenu')
            }
        }
    }
}