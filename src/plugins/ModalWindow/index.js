export default {
    install(Vue) {
        if (this.installed) {
            return
        }

        this.installed = true

        Vue.prototype.$modal = {
            EventBus: new Vue(),
            showModal(name, setting) {
                this.EventBus.$emit('showModal', {name, ...setting})
                console.log('Shown!')
            },
            hideModal() {
                this.EventBus.$emit('hideModal')
                console.log('Hidden!')
            }
        }
    }
}