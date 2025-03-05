<template>
    <div>
        <!-- <h1 v-if="h1Display" v-custom:parameter.click="message"> {{ message }}</h1>
        <button @click="updateEl()">更新</button>
        <button v-focus @click="unmountEl()">销毁</button>
        <div>
            <input placeholder="Without focus" />
            <input v-focus placeholder="With focus" />
        </div> -->
        <input
            v-model="test"
            v-debounce="{ func: newInput, delay: 3000 }" />
        <input placeholder="With limit" v-model="test" v-limit:9 />
    </div>
    <hr />
    <div>
        <input v-model="who" placeholder="请输入人员身份" />
        <table border="1">
            <thead>
                <tr>
                    <th v-for="(column, key) in studentInfoKeys" :key="key">
                        {{ column }}({{ key }})
                    </th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="studentInfo in studentInfos" :key="studentInfo.id">
                    <td v-for="(column, key) in studentInfoKeys" :key="key">
                        <span v-if="column == '成绩'">
                            <span v-show="studentInfo[key] >= 60">及格</span>
                            <span v-show="studentInfo[key] < 60">挂科</span>
                        </span>
                        <span v-else>
                            {{ studentInfo[key] }}
                        </span>
                    </td>
                    <td>
                        <!-- <button v-permission="who">查看</button>
                        <button v-permission="who" style="color: blue;">修改</button>
                        <button v-permission="who" style="color: red;">删除</button> -->
                        <button v-auth="who">查看</button>
                        <button v-auth="who" style="color: blue;">修改</button>
                        <button v-auth="who" style="color: red;">删除</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { onBeforeUpdate, onUpdated } from 'vue'

export default{
    setup() {
        const who = ref('')
        const studentInfos = reactive([
            { id: 2005001, name: '张三', live: '一善书院', score: 90 },
            { id: 2005002, name: '李四', live: '双馨书院', score: 85 },
            { id: 2005003, name: '王五', live: '三创书院', score: 61 },
            { id: 2005004, name: '周六', live: '四实书院', score: 59 },
            { id: 2005005, name: '郑七', live: '八方书院', score: 35 },
            { id: 2005006, name: '王八', live: '拾德书院', score: 66 }
        ])
        const studentInfoKeys = reactive({
            id: '学号',
            name: '姓名',
            live: '宿舍',
            score: '成绩'
        })

        const message = ref('Hello! My directive! ')
        const h1Display = ref(true)
        const test = ref('')
        var timeout = null // 不需要响应式

        function newInput() {
            // if (timeout) {
            //     clearTimeout(timeout)
            //     timeout = null
            //     return
            // }
            // timeout = setTimeout(() => {
            //     console.log(test.value)
            // }, 2000);
            console.log(test.value)
        }

        function updateEl() {
            message.value += '!'
        }

        function unmountEl() {
            h1Display.value = !h1Display.value
        }
        return {
            who,
            studentInfos,
            studentInfoKeys,
            test,
            newInput
        }
    },
    directives: {
        auth: (el, binding) => {
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
        }
    }
}

</script>