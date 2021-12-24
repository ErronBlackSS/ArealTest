<template>
  <div class="about">
    <converter></converter>
  </div>
</template>

<script>
import converter from "@/components/converter";

export default {
  name: "Conversion",
  data () {
    return {
      title: 'Conversion'
    }
  },
  components: {
    'converter': converter
  }
}
</script>

<style scoped>

</style>