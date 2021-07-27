<template>
    <div class="app-container">
        <el-row :gutter="24" class="row_list">
            <div class="lr_item">
              <div class="lr_item_start">
                <div class="visual">
                  <i class="el-icon-picture-outline-round"></i>
                </div>
                <div class="details">
                  <div class="number">15</div>
                  <div class="desc">代理商数量</div>
                </div>
              </div>
            </div>
            <div class="lr_item">
              <div class="lr_item_start lr_2">
                <div class="visual">
                  <i class="el-icon-s-custom"></i>
                </div>
                <div class="details">
                  <div class="number">51</div>
                  <div class="desc">用户数量</div>
                </div>
              </div>
            </div>
            <div class="lr_item">
              <div class="lr_item_start lr_3">
                <div class="visual">
                  <i class="el-icon-s-tools"></i>
                </div>
                <div class="details">
                  <div class="number">70</div>
                  <div class="desc">设备数量</div>
                </div>
              </div>
            </div>
            <div class="lr_item">
              <div class="lr_item_start lr_4">
                <div class="visual">
                  <i class="el-icon-star-on"></i>
                </div>
                <div class="details">
                  <div class="number">13647.30</div>
                  <div class="desc">本年收费金额</div>
                </div>
              </div>
            </div>
            <div class="lr_item">
              <div class="lr_item_start lr_5">
                <div class="visual">
                  <i class="el-icon-price-tag"></i>
                </div>
                <div class="details">
                  <div class="number">0.00</div>
                  <div class="desc">本月收费金额</div>
                </div>
              </div>
            </div>
        </el-row>
    </div>
</template>
<script>
export default {
    name: 'Home',
}
</script>
<style lang="scss">
.row_list {
    margin-bottom: 20px;
    position: relative;
    width: 100%;
    padding: 5px 5px 5px 5px;
    .lr_item {
      position: relative;
      width: 20%;
      float: left;
      padding: 10px;
      
      .lr_item_start {
        position: relative;
        height: 88px;
        width: 100%;
        border-radius: 5px;
        overflow: hidden;
        color: #fff;
        font-family: "Open Sans",sans-serif;
        background-color: #578ebe;
        &.lr_2 {
          background-color: #e04a49;
        }
        &.lr_3 {
          background-color: #3598dc;
        }
        &.lr_4 {
          background-color: #44b6ae;
        }
        &.lr_5 {
          background-color: #8775a7;
        }
        .visual {
          position: absolute;
          top: 0;
          left: 0;
          padding: 10px 0 0 10px;
          i {
            font-size: 60px;
            line-height: 65px;
            opacity: .4;
            color: #fff;
          }
        }
        .details {
          position: absolute;
          right: 10px;
          top: 10px;
          .number {
            text-align: right;
            font-size: 32px;
            line-height: 36px;
            letter-spacing: -1px;
            margin-bottom: 0;
            font-weight: 300;
          }
          .desc {
            text-align: right;
            font-size: 15px;
            padding-top: 5px;
          }
        }
      }
    }
}
</style>


