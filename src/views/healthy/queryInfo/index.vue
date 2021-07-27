<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select
        v-model="queryParams.p1"
        placeholder="租赁人"
        style="width:110px;"
        clearable
      >
        <el-option
          v-for="item in 12"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-select
        v-model="queryParams.p2"
        placeholder="机器名称"
        style="width:110px;"
        clearable
      >
        <el-option
          v-for="item in 12"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
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
      <el-table-column align="center" prop="vouchDate" label="租赁人" />
      <el-table-column align="center" prop="vouchNO" label="机器名称" />
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
import { export_table_to_excel } from '@/vendor/Export2Excel'
export default {
  name: 'Index',
  data() {
    return {
      queryParams: {
        p1: '',
        p2: '',
        p3: '',
        p4: '',
        p5: '',
        p6: '',
        p7: ''
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
