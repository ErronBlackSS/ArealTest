<template>
  <div class="home">
    <currencies></currencies>
  </div>
</template>
<script>

import currencies from "@/components/currencies";

export default {
  name: 'home',
  data () {
    return {
      title: 'home'
    }
  },
  components: {
    currencies
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  width: 20%;
  background: beige;
  padding-top: 1%;
  padding-left: 40%;
  padding-right: 40%;
  border: 1px solid black;
}
</style>