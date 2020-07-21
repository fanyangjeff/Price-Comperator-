<template>
  <div id="app">
    <navbar ref='mynavbar'></navbar>
    <tableview ref="mytableview"></tableview>
    <p>{{this.$store.state.data}}</p>
  </div>
</template>

<script>
import navbar from './components/Navbar'
import tableview from './components/Tableview'
export default {
  data: function () {
    return {
    }
  },

  components: {
    navbar: navbar,
    tableview: tableview
  },

  methods: {
  }

}
</script>
