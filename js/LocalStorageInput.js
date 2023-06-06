class LocalStorageInput {
    $element
    key

    constructor(prefix, id) {
        this.$element = document.getElementById(id)
        this.key = `${prefix}[${id}]`
        this.setValue(localStorage.getItem(this.key) || '')
        this.$element.addEventListener('keyup', () => this.setValue(this.$element.value))
    }

    setValue(value) {
        localStorage.setItem(this.key, value)
        this.$element.value = value
    }
}
