<template>
  <div class="lr-box">
    <i :class="icon" class="fa lr-menu-item-icon" />
    <span class="lr-menu-item-text">{{ title }}</span>
  </div>
</template>
<script>
export default {
  name: 'MenuItem',
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss">
.lr-menu-item {
  .lr-box {
    display: flex;
    flex-direction: column;
    .lr-menu-item-icon {
      display: block;
      height: 40px;
      width: 40px;
      background-color: #3398dc;
      line-height: 40px;
      text-align: center;
      border-radius: 5px;
      color: #fff;
      margin: 0 auto;
      margin-bottom: 7px;
      font-size: 20px;
    }
    .lr-menu-item-text {
      display: block;
      font-size: 12px;
      height: 16px;
      line-height: 16px;
      color: #f8f8f8;
      text-align: center;
    }
  }
}
</style>

