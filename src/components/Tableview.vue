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
            <tr v-for="(item, index) in dataList" :key="index">
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
import { bus } from '../main.js'
export default {

  data: function () {
    return {
      dataList: [],
      apikey: 'C420B3BCEE231811341841E858EDBC50',
      websites: [{ platform: '苏宁', baseUrl: 'https://api03.6bqb.com/suning/search', data: { apikey: '', keyword: '', page: 1, order: 'default' } },

        { platform: '阿里巴巴', baseUrl: 'https://api03.6bqb.com/alibaba/app/search', data: { apikey: '', keyword: '', page: 1 } }
      ]
    }
  },

  created: function () {
    bus.$on('sortByPrice', this.sortByPrice)
    bus.$on('searchItem', (userinput) => {
      this.websites.forEach((item, index) => {
        item.data.apikey = this.apikey
        item.data.keyword = userinput
        this.getdata(item)
      })
    })
  },

  methods: {
    sortByPrice: function () {
      this.dataList.sort((item1, item2) => {
        return item1.price - item2.price
      })
    },

    getdata: function (item) {
      const _this = this
      _this.dataList = []
      this.ajaxFetch({
        method: 'post',
        url: item.baseUrl,
        data: item.data,
        resolve: function (response) {
          const data = JSON.parse(response).data
          for (var i = 0; i < data.length; i++) {
            let d = data[i]
            if (item.platform === '苏宁') {
              d = data[i][0]
            }
            _this.dataList.push({
              platform: item.platform,
              title: d.title,
              url: d.shopUrl,
              price: d.price
            })
          }
        },
        reject: function (error) {
          alert(error)
        }
      })
    },

    ajaxFetch: function ({ method = 'get', url, data, resolve, reject }) {
      var xhr = new XMLHttpRequest()
      if (method === 'get') {
        if (data) {
          url = url + '?' + this.querifyObject(data)
        }
        xhr.open('get', url, true)
        xhr.send()
      } else {
        xhr.open('post', url, true)
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
        if (data) {
          xhr.send(this.querifyObject(data))
        } else {
          xhr.send()
        }
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            if (resolve) { resolve(xhr.responseText) }
          } else {
            if (reject) { reject('Error: ' + xhr.status) }
          }
        }
      }
    },

    querifyObject: function (data) {
      var str = ''
      for (const [key, value] of Object.entries(data)) {
        str += key + '=' + value + '&'
      }

      return str.substr(0, str.length - 1)
    }
  },

  components: {
    bootstrap: bootstrap
  }
}
</script>
