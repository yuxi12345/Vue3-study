<template>
    <div>
        <!-- 模板语法 文本插值 -->
        <h1>{{ message }}</h1>
        <!-- 模板语法 原始HTML -->
        <!-- 模板语法 指令 v-show为例子 -->
        <p v-show="true">使用文本插值： {{ rawHtml }}</p>
        <p v-show="true">
            使用原始HTML：
            <span v-html="rawHtml"></span>
        </p>
        <!-- 指令：动态参数   v-bind指令  属性绑定 -->
        <a :href="url">跳转学校官网</a>
        <!-- v-on指令 dom事件 -->
        <button @click="adjust()">调整</button>
        <!-- v-bind指令  双大括号不可用于标签属性 -->
        <div v-bind:id="apperance">Hello div</div>
        <!-- 计数器 -->
        <h1>{{ number }}</h1>
        <button @click="calculate(1)">+1</button>
        <button @click="calculate(2)">+2</button>
        <button @click="calculate(-1)">-1</button>
        <!-- 第三节课 -->
        <!-- 使用js表达式 -->
        <div>
            {{ movieA.name }} 是
            {{
                movieA.shouzhong == '很广' && movieA.juqing == '有趣' && movieA.texiao == '绚丽'
                    ? '成功的'
                    : '一般的'
            }}
        </div>
        <!-- 使用计算属性 -->
        <div>{{ movieA.name }} 是 {{ movieEvaluation }}</div>
        <!-- 使用方法 -->
        <div>{{ movieA.name }} 是 {{ movieEvaluationFunc() }}</div>
        <!-- 展示票房 -->
        <h1>{{ movieA.piaofang }}</h1>
        <!-- 调整按钮 -->
        <button @click="movieA.piaofang = 200">调整1</button>
        <button @click="movieA.shouzhong = '小朋友'">调整2</button>
        <!-- 双向绑定 -->
        <h1>{{ message }}</h1>
        <input v-model="message" />
        <!-- 习题 -->
        <p>
            语文：
            <input type="number" v-model="chinese" />
        </p>
        <p>
            数学：
            <input type="number" v-model="math" />
        </p>
        <p>
            英语：
            <input type="number" v-model="english" />
        </p>
        <p>总分：{{ computedSummary }}</p>
        <p>平均分：{{ computedAverage }}</p>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import {
    onBeforeMount,
    onMounted,
    onBeforeUpdate,
    onUpdated,
    onBeforeUnmount,
    onUnmounted
} from 'vue'
console.log('创建相关：setup')
onBeforeMount(() => {
    console.log('挂载之前...')
})

onMounted(() => {
    console.log('挂载完成之后...')
})

onBeforeUpdate(() => {
    console.log('更新之前...')
})

onUpdated(() => {
    console.log('更新之后')
})

onBeforeUnmount(() => {
    console.log('卸载销毁之前')
})

onUnmounted(() => {
    console.log('卸载销毁之后')
})

const computedSummary = computed(() => {
    return chinese.value + math.value + english.value
})

const computedAverage = computed(() => {
    return (chinese.value + math.value + english.value) / 3
})

const chinese = ref(0)
const math = ref(0)
const english = ref(0)
const message = ref('Hello world')
const rawHtml = ref('<span style="color: red">红色字体<span>')
const url = ref('https://qvtu.edu.cn')
const apperance = ref('handsome')
const number = ref(0)
const movieA = reactive({
    name: '哪吒之魔童闹海',
    shouzhong: '很广',
    juqing: '有趣',
    texiao: '绚丽',
    piaofang: 100
})

const movieEvaluation = computed(() => {
    console.log('计算属性被调用')
    return movieA.shouzhong == '很广' && movieA.juqing == '有趣' && movieA.texiao == '绚丽'
        ? '成功的'
        : '一般的'
})

function movieEvaluationFunc() {
    console.log('方法被调用')
    return movieA.shouzhong == '很广' && movieA.juqing == '有趣' && movieA.texiao == '绚丽'
        ? '成功的'
        : '一般的'
}

console.log(movieEvaluation)
console.log(movieEvaluation.value)

// reactive声明响应式【非原始值】
const originObj = {
    student: 'qvtu',
    year: 2024,
    study: 'vue'
}
const originObjReactive = reactive(originObj)
const originObjRef = ref(originObj)
// console.log(originObj)
// console.log(originObjReactive)
// console.log(originObjRef)
// console.log(originObjRef.value)
// console.log(originObj == originObjReactive)

// console.log(message)
// console.log(message.value)

function adjust() {
    url.value = 'http://www.baidu.com'
}

function calculate(delta) {
    number.value += delta
}
</script>

<style scoped></style>
