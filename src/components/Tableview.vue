<template>
    <div>
        <bootstrap/>
        <table class="table table-sm">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">platform/平台</th>
            <th scope="col">title/商品名称</th>
            <th scope="col">price/价格</th>
            <th scope="col">link/链接</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in $store.state.itemList" :key="index">
            <th scope="row">{{index}}</th>
            <td>{{item.platform}}</td>
            <td>{{item.title}}</td>
            <td>{{item.price}}</td>
            <a :href="item.url" target="_blank"><td>open/去到官网</td></a>
            </tr>
        </tbody>
        </table>

    </div>
</template>

<script>
import bootstrap from './stylesheet'
export default {

  data: function () {
    return {}
  },

  created: function () {
    //
    /*
    bus.$on('sortByPrice', this.sortByPrice)
    bus.$on('searchItem', (userinput) => {
      this.websites.forEach((item, index) => {
        item.data.apikey = this.apikey
        item.data.keyword = userinput
        this.getdata(item)
      })
    })
    */
  },

  methods: {
  },

  components: {
    bootstrap: bootstrap
  }
}
</script>
