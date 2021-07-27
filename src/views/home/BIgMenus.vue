<template>
  <div>
    <el-row>
      <el-col v-for="(menu, idx) in menus" :key="idx" class="menu" :class="menu.className">
        <i v-if="menu.iconClass !== null" class="menuImg" :class="menu.iconClass" />
        <img v-else class="menuImg" :class="menu.imgClass" :src="menu.imgUrl">
        <div class="menuRight">
          <span>{{ menu.num }}</span><br>
          <span>{{ menu.name }}</span>
        </div>
        <div class="menuBottom">
          <span class="menuSpan">查看更多<i class="el-icon-right" /></span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'BIgMenus',
  data() {
    return {
      menus: [
        { className: '', imgClass: '', iconClass: 'el-icon-s-data', imgUrl: require('../../assets/timg.jpg'), num: '10', name: '代理商数量' },
        { className: '', imgClass: '', iconClass: 'el-icon-s-data', imgUrl: require('../../assets/timg.jpg'), num: '10', name: '用户数量' },
        { className: '', imgClass: '', iconClass: 'el-icon-s-data', imgUrl: require('../../assets/timg.jpg'), num: '10', name: '设备数量' },
        { className: '', imgClass: '', iconClass: 'el-icon-s-data', imgUrl: require('../../assets/timg.jpg'), num: '10', name: '本年收费金额' },
        { className: '', imgClass: '', iconClass: 'el-icon-s-data', imgUrl: require('../../assets/timg.jpg'), num: '10', name: '本月收费金额' },
        { className: '', imgClass: '', iconClass: 'el-icon-s-data', imgUrl: require('../../assets/timg.jpg'), num: '10', name: '在租设备数' },
        { className: '', imgClass: '', iconClass: 'el-icon-s-data', imgUrl: require('../../assets/timg.jpg'), num: '10', name: '到期设备数' },
        { className: '', imgClass: '', iconClass: 'el-icon-s-data', imgUrl: require('../../assets/timg.jpg'), num: '10', name: '超三天未使用机器数' },
        { className: '', imgClass: '', iconClass: 'el-icon-s-data', imgUrl: require('../../assets/timg.jpg'), num: '10', name: '设备的信息' }
      ]
    }
  }
}
</script>

<style scoped>
.el-col {
    margin: 20px;
}
.el-col:hover {
    margin: 15px;
}
.menu {
    background: #00a0ea;
    width: 250px;
    height: 250px;
    border-radius: 10px;
}
.menu:hover {
    background: #2991ff;
    width: 260px;
    height: 260px;
    border-radius: 10px;
    border: 5px solid #457ce6;
}
.menuImg {
    float: left;
    width: 60px;
    height: 60px;
    margin: 20px;
}
.el-icon-s-data {
  font-size: 60px;
  color: greenyellow;
}
.el-icon-right {
  float: right;
  padding-right: 12px;
  cursor: pointer;
}
.menuRight {
    height: calc(100% - 40px);
    padding-top: 12%;
}
.menuBottom {
    height: 40px;
    padding-top: 10px;
    background: #1963f3;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}
.menuSpan {
    margin-left: 10px;
}
</style>
