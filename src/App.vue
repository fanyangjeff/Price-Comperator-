<template>
  <div id="app">
    <navbar ref='mynavbar'></navbar>
    <tableview ref="mytableview"></tableview>
  </div>
</template>

<script>
import navbar from './components/Navbar'
import tableview from './components/Tableview'

export default {
  data: function () {
    return {
      userinput: '',
      websites: ['https://api03.6bqb.com/alibaba/app/search']
    }
  },

  components: {
    navbar: navbar,
    tableview: tableview
  },

  methods: {
    update_search: function () {
      this.userinput = this.$refs.mynavbar.getUserInput()
      console.log(this.$refs.mynavbar.getUserInput())
    },

    sortbyprice: function () {

    }
  }
}
</script>
