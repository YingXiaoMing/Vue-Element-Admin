<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select
        v-model="queryParams.province"
        placeholder="==省份=="
        style="width:110px;"
        clearable
        @change="changeProvince"
      >
        <el-option
          v-for="item in provinces"
          :key="item.f_code"
          :label="item.f_name"
          :value="item.f_code"
        />
      </el-select>
      <el-select
        v-model="queryParams.city"
        placeholder="==城市=="
        style="width:110px;"
        clearable
        @change="changeCity"
      >
        <el-option
          v-for="item in cities"
          :key="item.f_code"
          :label="item.f_name"
          :value="item.f_code"
        />
      </el-select>
      <el-select
        v-model="queryParams.region"
        placeholder="==地区=="
        style="width:110px;"
        clearable
        @change="changeRegion"
      >
        <el-option
          v-for="item in regions"
          :key="item.f_code"
          :label="item.f_name"
          :value="item.f_code"
        />
      </el-select>
      <el-select
        v-model="queryParams.school"
        placeholder="==学校=="
        style="width:110px;"
        clearable
        @change="changeSchool"
      >
        <el-option
          v-for="item in schools"
          :key="item.f_SCHOOL_CODE"
          :label="item.f_NAME"
          :value="item.f_SCHOOL_CODE"
        />
      </el-select>
      <el-select
        v-model="queryParams.class"
        placeholder="==班级=="
        style="width:110px;"
        clearable
        @change="changeClass"
      >
        <el-option
          v-for="item in classs"
          :key="item.f_class_code"
          :label="item.f_class_name"
          :value="item.f_class_code"
        />
      </el-select>
      <el-input
        v-model="queryParams.sno"
        placeholder="学号"
        clearable
        style="width: 110px"
      />
      <el-select
        v-model="queryParams.name"
        placeholder="==学生=="
        style="width:110px;"
        clearable
        @change="changeStudent"
      >
        <el-option
          v-for="item in students"
          :key="item.f_sname"
          :label="item.f_sname"
          :value="item.f_sname"
        />
      </el-select>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="onSearch"
      >查询</el-button>
      <el-button
        v-print="printObj"
        type="primary"
        icon="el-icon-printer"
      >打印</el-button>
      <el-button
        type="primary"
        icon="el-icon-circle-plus"
        @click="exportExcel"
      >导出Excel</el-button>
      <el-button
        v-if="false"
        type="primary"
        icon="el-icon-circle-plus"
        @click="openMedical"
      >报告</el-button>
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
      <!--<el-table-column type="selection" width="60" />-->
      <el-table-column type="index" width="60" label="序号" />
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="openMedical(scope.row)"
          >报告</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="f_sid" label="学生唯一索引" />
      <el-table-column align="center" prop="f_ywrq" label="体检期数" />
      <el-table-column align="center" prop="f_code" label="学号" />
      <el-table-column align="center" prop="f_name" label="姓名" />
      <el-table-column align="center" prop="region" label="区域" />
      <el-table-column align="center" prop="f_school_name" label="学校" />
      <el-table-column align="center" prop="age" label="年龄">
        <template slot-scope="scope">
          <span>{{ new Date().getFullYear() - Number(scope.row.f_birth.substr(0, 4)) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="f_sex" label="性别" />
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
    <el-dialog :visible.sync="showDialog" custom-class="myDialog" width="22cm" top="0" append-to-body>
      <medical ref="medicalRef" />
    </el-dialog>
  </div>
</template>

<script>
import userManageAction from '@/services/userManage.js'
import { export_table_to_excel } from '@/vendor/Export2Excel'
import Medical from '../medical/index'
import * as env from '@/utils/env'
export default {
  name: 'Index',
  components: { Medical },
  data() {
    return {
      downUrl: '',
      provinces: [],
      cities: [],
      regions: [],
      schools: [],
      classs: [],
      students: [],
      showDialog: false,
      queryParams: {
        province: '',
        city: '',
        region: '',
        school: '',
        class: '',
        sno: '',
        name: '',
        pageIndex: 0,
        pageSize: 99999,
        total: 0
      },
      printObj: {
        id: 'printTableExamination',
        popTitle: '体检报告'
      },
      dataList: [],
      tableHeight: document.documentElement.clientHeight - 200
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      userManageAction.getProvince().then(res => {
        this.provinces = res.data
      })
    },
    changeProvince(data) {
      //        this.exportExcel()
      this.cities = []
      this.queryParams.city = ''
      this.regions = []
      this.queryParams.region = ''
      this.schools = []
      this.queryParams.school = ''
      this.classs = []
      this.queryParams.class = ''
      this.students = []
      this.queryParams.name = ''
      userManageAction.getCity(data).then(res => {
        this.cities = res.data
      })
    },
    changeCity(data) {
      //        this.exportExcel()
      this.regions = []
      this.queryParams.region = ''
      this.schools = []
      this.queryParams.school = ''
      this.classs = []
      this.queryParams.class = ''
      this.students = []
      this.queryParams.name = ''
      userManageAction.getRegion(data).then(res => {
        this.regions = res.data
      })
    },
    changeRegion(data) {
      //        this.exportExcel()
      this.schools = []
      this.queryParams.school = ''
      this.classs = []
      this.queryParams.class = ''
      this.students = []
      this.queryParams.name = ''
      userManageAction.getSchool(data).then(res => {
        this.schools = res.data
      })
    },
    changeSchool(data) {
      //        this.exportExcel()
      this.classs = []
      this.queryParams.class = ''
      this.students = []
      this.queryParams.name = ''
      userManageAction.getClass(data).then(res => {
        this.classs = res.data
      })
    },
    changeClass(data) {
      //        this.exportExcel()
      this.students = []
      this.queryParams.name = ''
      userManageAction.getStudent(data).then(res => {
        this.students = res.data
      })
    },
    changeStudent(data) {
      //        this.exportExcel()
    },
    onSearch() {
      userManageAction.getFetchReport(this.queryParams).then(res => {
        this.dataList = res.data
        this.queryParams.total = res.data.totalCount
      })
    },
    // 拼接参数
    formatParam(params) {
      if (!params) return ''
      let result = ''
      Object.keys(params).map((key, index) => {
        const val = params[key]
        if (typeof (val) !== 'undefined' && val !== null && val !== '') {
          result += result.length <= 0
            ? `?${key}=${val}`
            : `&${key}=${val}`
        }
      })

      return result
    },
    exportExcel() {
      //        const queryStr = this.formatParam(this.queryParams)
      //        this.downUrl = env.VUE_APP_ADMIN_API + '/api/Exam/ExportExcelList?' + queryStr
      userManageAction.getExportExcelList(this.queryParams).then(res => {
        const blob = res.data
        const ss = new Blob([res.data], { type: 'application/vnd.ms-excel' })
        const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/vnd.ms-excel' }))
        if ('download' in document.createElement('a')) { // 非IE下载
          const elink = document.createElement('a')
          elink.download = '体检'
          elink.style.display = 'none'
          elink.href = url
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
        } else { // IE10+下载
          navigator.msSaveBlob(blob, '体检')
        }
      })
    },
    openMedical(data) {
      this.showDialog = true
      this.$nextTick(() => {
        this.$refs.medicalRef.queryInfo(data)
      })
    },
    downInfo(row) {

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
