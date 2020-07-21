import Vue from 'vue'
import Vuex from 'vuex'
import { ajaxFetch } from './ajax'
import { APIKEY as apikey, WEBSITES as websites } from './websites'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    itemList: [],
    searchedItemMap: new Map(),
    userinput: ''
  },
  mutations: {
    setItemList: function (state, data) {
      const info = data.info
      const platform = data.platform
      for (var i = 0; i < info.length; i++) {
        let d = info[i]
        if (platform === '苏宁') {
          d = info[i][0]
        }
        state.itemList.push({
          platform,
          title: d.title,
          url: d.shopUrl,
          price: d.price
        })
      }
    },

    reorderByPrice: function (state, data) {
      state.itemList.sort((item1, item2) => {
        return item1.price - item2.price
      })
    }
  },
  actions: {
    searchItem: function (store) {
      websites.forEach(website => {
        ajaxFetch({
          method: 'post',
          url: website.baseUrl,
          data: {
            apikey,
            keyword: store.state.userinput,
            page: 1,
            order: 'default'
          },
          resolve: function (response) {
            store.commit('setItemList', { info: JSON.parse(response).data, platform: website.platform })
          }
        })
      })
    }
  },
  modules: {

  }
})
