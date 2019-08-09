<style src="./test.css"></style>
<template>
    <div class="test">
        test111
    </div>
</template>
<script>
export default {
  mounted () {
    import('./test.js').then(res => {
      res.default()
    })
  }
}
</script>
