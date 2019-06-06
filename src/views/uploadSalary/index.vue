<template>
  <div class="app-container">
    uploadSalary
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
    }
  },
  methods:{
  }
}
</script>

<style lang="scss" scoped>
</style>
