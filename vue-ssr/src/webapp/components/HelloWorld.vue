<template>
  <div>
    <button @click="add">加一</button>
    <button @click="reduce">减一</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    add () {
      console.log('加一')
    },
    reduce () {
      console.log('减一')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
