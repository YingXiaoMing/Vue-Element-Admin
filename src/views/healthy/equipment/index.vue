<template>
  <div class="app-container">
    <div class="filter-container">
      未使用天数<el-input v-model.number="queryParams.noDiff" style="width:110px;" placeholder="未使用天数" />
      快到期天数<el-input v-model.number="queryParams.diff" style="width:110px;" placeholder="快到期天数" />
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="onSearch"
      >查询</el-button>
    </div>
    <el-table
      id="printTableExamination"
      :data="dataList"
      fit
      border
      highlight-current-row
      style="width: 99.9%"
      :height="tableHeight"
    >
      <el-table-column type="index" width="60" label="序号" />
      <el-table-column align="center" prop="sn0" label="超过N天未使用的设备" />
      <el-table-column align="center" prop="sn" label="快到期的设备" />
    </el-table>
    <div class="pagination-container">
      <el-pagination
        v-show="pageOption.total > 0"
        :current-page="pageOption.pageIndex"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pageOption.pageSize"
        :total="pageOption.total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="onSizeChange"
        @current-change="getCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import userManageAction from '@/services/userManage.js'
import { export_table_to_excel } from '@/vendor/Export2Excel'
export default {
  name: 'Index',
  data() {
    return {
      queryParams: {
        noDiff: 3,
        diff: 10
      },
      pageOption: {
        pageIndex: 0,
        pageSize: 10,
        total: 0
      },
      printObj: {
        id: 'printTableEquipment',
        popTitle: '体检报告'
      },
      dataList: [],
      tableHeight: document.documentElement.clientHeight - 200
    }
  },
  methods: {
    onSearch() {
      userManageAction.getFetchDeviceExpire(this.queryParams).then(res => {
        this.dataList = []
        if (res.code === 1) {
          const lg = res.data.noneUseDevices.length > res.data.almostExpireDevices.length ? res.data.noneUseDevices.length : res.data.almostExpireDevices.length
          for (let item = 0; item < lg; item++) {
            const sn0 = res.data.noneUseDevices.length > item ? res.data.noneUseDevices[item] : ''
            const sn = res.data.almostExpireDevices.length > item ? res.data.almostExpireDevices[item] : ''
            this.dataList.push({ sn0: sn0, sn: sn })
          }
        }
      })
    },
    exportExcel() {
      export_table_to_excel('printTableEquipment')
    },
    openInfo() {

    },
    onSizeChange() {

    },
    getCurrentChange() {

    }
  }
}
</script>

<style scoped>

</style>
