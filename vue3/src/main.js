import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.directive('custom', {
    beforeMount(el, binding) {
        console.log('beforeMount')
    },
    mounted(el, binding) {
        // 指令挂载完成后续操作...
        console.log(el)
        console.log(binding)
        console.log('mounted')
    },
    beforeUpdate(el, binding, vnode) {
        console.log('beforeUpdate')
        console.log(el)
        console.log(vnode)
    },
    updated(el, binding, vnode) {
        // 当元素被更新后续操作...
        console.log('updated')
        console.log(el)
        console.log(vnode)
    },
    beforeUnmount(el, binding) {
        console.log('beforeUnmount')
    },
    unmounted(el, binding) {
        // 指令从元素中移除（卸载）后续操作...
        console.log('unmounted')
    }
})

app.directive('focus', (el, binding) => {
    console.log(el)
    console.log(binding)
})

app.directive('debounce', {
    mounted(el, binding) {
        let myTimeout = null
        el.addEventListener('input', () => {
            if (myTimeout) {
                clearTimeout(myTimeout)
                myTimeout = null
            }
            myTimeout = setTimeout(() => {
                binding.value.func()
            }, parseInt(binding.value.delay) || 2000);
            // 如果传值指令参数 则以参数为准，否则默认2000ms即2s
        })
    }
})

app.directive('limit', {
    mounted(el, binding) {
        const limitLength = parseInt(binding.arg) || 10
        el.addEventListener('input', () => {
            const value = el.value
            const valueLength = value.length
            if (value.length > limitLength) {
                el.value = value.slice(0, limitLength)
                // el.value = value.slice(valueLength - 10, valueLength)
            }
        })
    }
})

app.directive('permission', (el, binding) => {
    const human = binding.value
    const buttonType = el.innerText
    if (human != 'teacher' && human != 'admin') {
        // 非admin  非teacher 权限最低
        if (buttonType == '修改' || buttonType == '删除') {
            // el.style.display = 'none'
            el.remove()
        }
    } else if (human == 'teacher') {
        // teacher 权限有修改权限，无删除权限
        if (buttonType == '删除') {
            // el.style.display = 'none'
            el.remove()
        }
        if (buttonType == '修改') {
            el.style.display = ''
        }
    } else {
        // admin 拥有最高权限
        el.style.display = ''
    }
})

app.mount('#app')

// window.app = app