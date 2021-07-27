<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="queryParams.address"
        placeholder="体检地址"
        clearable
        style="width: 110px"
      />
      <el-input
        v-model="queryParams.name"
        placeholder="顾客姓名"
        clearable
        style="width: 110px"
      />
      <el-select
        v-model="queryParams.sex"
        placeholder="性别"
        style="width:110px;"
      >
        <el-option
          v-for="item in sexes"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-input
        v-model="queryParams.contact"
        placeholder="联系方式"
        clearable
        style="width: 110px"
      />
      <el-input
        v-model="queryParams.conclusion"
        placeholder="结论"
        clearable
        style="width: 110px"
      />
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="onSearch"
      >查询</el-button>
      <el-button
        type="primary"
        icon="el-icon-circle-plus"
        @click="addReport"
      >添加</el-button>
      <el-button
        type="primary"
        icon="el-icon-circle-plus"
        @click="deleteReport"
      >删除</el-button>
      <el-button
        v-if="false"
        type="primary"
        icon="el-icon-circle-plus"
        @click="openVisionReport"
      >报告</el-button>
    </div>
    <el-table
      id="printTableVision"
      :data="dataList"
      fit
      border
      highlight-current-row
      style="width: 99.9%"
      :height="tableHeight"
    >
      <!--<el-table-column type="selection" width="60" />-->
      <el-table-column type="index" width="60" label="序号" />
      <el-table-column width="250" align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="downInfo(scope.row)"
          >查看</el-button>
          <el-button
            size="mini"
            type="success"
            @click="editReport(scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="success"
            @click="openVisionReport(scope.row)"
          >报告</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="date" label="检测日期" />
      <el-table-column align="center" prop="examAddress" label="体检中心" />
      <el-table-column align="center" prop="name" label="顾客姓名" />
      <el-table-column align="center" prop="sex" label="性别" />
      <el-table-column align="center" prop="age" label="年龄" />
      <el-table-column align="center" prop="profession" label="职业" />
      <el-table-column align="center" prop="phone" label="联系方式" />
      <el-table-column align="center" prop="conclusion" label="检测结论" />
    </el-table>
    <div class="pagination-container">
      <el-pagination
        v-show="queryParams.total > 0"
        :current-page="queryParams.pageIndex"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="queryParams.pageSize"
        :total="queryParams.total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="onSizeChange"
        @current-change="getCurrentChange"
      />
    </div>
    <el-dialog :visible.sync="showDialog" :title="dialogTitle" width="22cm" top="0" append-to-body>
      <component :is="currentComp" ref="currentCompRef" />
    </el-dialog>
  </div>
</template>

<script>
import userManageAction from '@/services/userManage.js'
import { export_table_to_excel } from '@/vendor/Export2Excel'
import VisionReport from './VisionReport'
import AddVision from './AddVision'
export default {
  name: 'Index',
  components: {
    VisionReport,
    AddVision
  },
  data() {
    return {
      showDialog: false,
      dialogTitle: '',
      currentComp: '',
      sexes: [
        '男', '女'
      ],
      queryParams: {
        address: '',
        name: '',
        sex: '',
        contact: '',
        conclusion: '',
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      printObj: {
        id: 'printTableVision',
        popTitle: '体检报告'
      },
      dataList: [],
      tableHeight: document.documentElement.clientHeight - 250
    }
  },
  methods: {
    onSearch() {
      userManageAction.getVisionFetchReport(this.queryParams).then(res => {
        this.dataList = res.data.items
        this.queryParams.total = res.data.totalCount
      })
    },
    openVisionReport(row) {
      this.showDialog = true
      this.dialogTitle = '视力综合报告'
      this.currentComp = VisionReport
      this.$nextTick(() => {
        this.$refs.currentCompRef.openInfo(row)
      })
    },
    addReport() {
      this.showDialog = true
      this.dialogTitle = '视力综合信息添加'
      this.currentComp = AddVision
      this.$nextTick(() => {
        this.$refs.currentCompRef.init('add')
      })
    },
    editReport(row) {
      this.showDialog = true
      this.dialogTitle = '视力综合信息编辑'
      this.currentComp = AddVision
      this.$nextTick(() => {
        this.$refs.currentCompRef.openVision('edit', row)
      })
    },
    deleteReport() {

    },
    downInfo(row) {
      this.showDialog = true
      this.dialogTitle = '视力综合信息'
      this.currentComp = AddVision
      this.$nextTick(() => {
        this.$refs.currentCompRef.openVision('info', row)
      })
    },
    onSizeChange(size) {
      this.queryParams.pageSize = size
      this.onSearch()
    },
    getCurrentChange(page) {
      this.queryParams.pageIndex = page
      this.onSearch()
    }
  }
}
</script>

<style>
    .el-dialog__body {
        padding: 5px !important;
    }
</style>
<style scoped>
.pagination-container {
    text-align: center;
}
</style>
