<template>
    <div>
      <bootstrap/>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home<span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="reorder">Pricing/按价格排行</a>
            </li>
          </ul>
          <div class="form-check-inline">
            <input v-model="$store.state.userinput" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            <button @click="updateSearch" class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </div>
        </div>
      </nav>
    </div>
</template>

<style lang="scss" scoped>
.nav-item{
  margin-left: 50px;
}

.form-check-inline{
  margin-left: 50px;
}
</style>

<script>
import bootstrap from './stylesheet'

export default {
  data: function () {
    return {
    }
  },

  methods: {
    reorder: function () {
      // bus.$emit('sortByPrice')
      this.$store.commit('reorderByPrice')
    },

    updateSearch: function () {
      this.$store.state.itemList = []
      if (this.$store.state.itemList.length === 0) {
        this.$store.dispatch('searchItem')
      } else {
        console.log(this.$store.state.itemList)
        this.$store.dispatch('searchItem')
      }
    }

  },
  components: {
    bootstrap: bootstrap
  }
}
</script>
