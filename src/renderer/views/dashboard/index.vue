<template>
  <div class="dashboard-container">
    <div class="dashboard-text">登录用户:{{name}}</div>
    <div class="dashboard-text">登录角色:<span v-for='role in roles' :key='role'>{{role}}</span></div>
    <div class="dashboard-text">部署更新</div>
	  <el-button type="primary" @click="ping">ping</el-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { sendMessage } from '../../utils/ipcUtil'

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  methods: {
    ping() {
      var result = sendMessage()
      alert(result)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
