<template>
  <div class="app-container">
    <el-button
      v-if="false"
      type="primary"
      icon="el-icon-document"
      @click="exportWord"
    >导出Word</el-button>
    <el-button
      type="primary"
      icon="el-icon-s-grid"
      @click="exportExcel"
    >导出Excel</el-button>
    <el-button
      v-print="printObj"
      type="primary"
      icon="el-icon-printer"
    >生成报告</el-button>
    <el-table
      id="printTableVisionReport"
      :data="dataList"
      fit
      border
      highlight-current-row
      style="width: 21cm"
      :show-header="false"
      :height="tableHeight"
      :span-method="arraySpanMethod"
      :cell-class-name="tableCellClassName"
    >
      <el-table-column align="center" prop="param1" label="1" />
      <el-table-column align="center" prop="param2" label="2" />
      <el-table-column align="center" prop="param3" label="3" />
      <el-table-column align="center" prop="param4" label="4" />
      <el-table-column align="center" prop="param5" label="5" />
      <el-table-column align="center" prop="param6" label="6" />
      <el-table-column align="center" prop="param7" label="7" />
      <el-table-column align="center" prop="param8" label="8" />
      <el-table-column align="center" prop="param9" label="9" />
      <el-table-column align="center" prop="param10" label="10" />
    </el-table>
  </div>
</template>

<script>
import { export_table_to_excel } from '@/vendor/Export2Excel'
import * as env from '@/utils/env'
export default {
  name: 'VisionReport',
  data() {
    return {
      downUrl: '',
      printObj: {
        id: 'printTableVisionReport',
        popTitle: '体检报告'
      },
      queryParams: null,
      dataList: [
        { param1: '视力综合报告', param2: '', param3: '', param4: '检测地址', param5: '', param6: '', param7: '', param8: '', param9: '', param10: '', rowCols: [[2, 3], [0, 0], [0, 0], [1, 1], [1, 4], [0, 0], [0, 0], [0, 0], [1, 2], [0, 0]] },
        { param1: '', param2: '', param3: '', param4: '顾客姓名', param5: '', param6: '', param7: '', param8: '', param9: '年龄:', param10: '', rowCols: [[0, 0], [0, 0], [0, 0], [1, 1], [1, 4], [0, 0], [0, 0], [0, 0], [1, 1], [1, 1]] },
        { param1: '检测日期', param2: '', param3: '', param4: '关联信息', param5: '', param6: '', param7: '', param8: '', param9: 'OS____________DS____________', param10: '', rowCols: [[1, 1], [1, 2], [0, 0], [1, 1], [1, 4], [0, 0], [0, 0], [0, 0], [1, 2], [0, 0]] },
        { param1: '主理验光师', param2: '', param3: '', param4: '性别', param5: '', param6: '职业', param7: '', param8: '联系方式', param9: '', param10: '', rowCols: [[1, 1], [1, 2], [0, 0], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 2], [0, 0]] },
        { param1: '戴镜史', param2: '无□', param3: '', param4: '疾病史', param5: '角膜炎□', param6: '', param7: '', param8: '视功能检查部分', param9: '', param10: '', rowCols: [[4, 1], [1, 2], [0, 0], [3, 1], [1, 3], [0, 0], [0, 0], [2, 3], [0, 0], [0, 0]] },
        { param1: '', param2: '半年到一年□', param3: '', param4: '', param5: '意外受伤□', param6: '', param7: '', param8: '', param9: '', param10: '', rowCols: [[0, 0], [1, 2], [0, 0], [0, 0], [1, 3], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]] },
        { param1: '', param2: '一年□', param3: '', param4: '', param5: '无□', param6: '', param7: '', param8: 'Worth四点测试', param9: '', param10: '正常□', rowCols: [[0, 0], [1, 2], [0, 0], [0, 0], [1, 3], [0, 0], [0, 0], [2, 2], [0, 0], [1, 1]] },
        { param1: '', param2: '两年以上□', param3: '', param4: '配镜目的', param5: '近用、看书报□', param6: '', param7: '', param8: '', param9: '', param10: '异常□', rowCols: [[0, 0], [1, 2], [0, 0], [7, 1], [1, 3], [0, 0], [0, 0], [0, 0], [0, 0], [1, 1]] },
        { param1: '手术史', param2: '有□', param3: '', param4: '', param5: '电脑□', param6: '', param7: '', param8: '色盲检查', param9: '', param10: '正常□', rowCols: [[2, 1], [1, 2], [0, 0], [0, 0], [1, 3], [0, 0], [0, 0], [2, 2], [0, 0], [1, 1]] },
        { param1: '', param2: '无□', param3: '', param4: '', param5: '学习与阅读□', param6: '', param7: '', param8: '', param9: '', param10: '异常□', rowCols: [[0, 0], [1, 2], [0, 0], [0, 0], [1, 3], [0, 0], [0, 0], [0, 0], [0, 0], [1, 1]] },
        { param1: '家族史', param2: '无□', param3: '', param4: '', param5: '看电视□', param6: '', param7: '', param8: '屈光层差', param9: '', param10: '严重□', rowCols: [[4, 1], [1, 2], [0, 0], [0, 0], [1, 3], [0, 0], [0, 0], [2, 2], [0, 0], [1, 1]] },
        { param1: '', param2: '父亲□', param3: '', param4: '', param5: '室内工作□', param6: '', param7: '', param8: '', param9: '', param10: '一般□   无□', rowCols: [[0, 0], [1, 2], [0, 0], [0, 0], [1, 3], [0, 0], [0, 0], [0, 0], [0, 0], [1, 1]] },
        { param1: '', param2: '母亲□', param3: '', param4: '', param5: '运动□', param6: '', param7: '', param8: '右眼近远视趋势', param9: '', param10: '是□     否□', rowCols: [[0, 0], [1, 2], [0, 0], [0, 0], [1, 3], [0, 0], [0, 0], [1, 2], [0, 0], [1, 1]] },
        { param1: '', param2: '兄弟姐妹□', param3: '', param4: '', param5: '防护□', param6: '', param7: '', param8: '左眼近远视趋势', param9: '', param10: '是□     否□', rowCols: [[0, 0], [1, 2], [0, 0], [0, 0], [1, 3], [0, 0], [0, 0], [1, 2], [0, 0], [1, 1]] },
        { param1: '注：以上为一些主要内容，请验光师以关爱的方式与顾客沟通，在相应的在相应的中打', param2: '', param3: '', param4: '', param5: '', param6: '', param7: '', param8: '', param9: '', param10: '', rowCols: [[1, 10], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]] },
        { param1: '使用目的', param2: 'SPH', param3: 'CYL', param4: 'AXI', param5: 'PD', param6: '', param7: 'ADD', param8: 'PH', param9: 'V', param10: '远用□', rowCols: [[2, 1], [1, 1], [1, 1], [1, 1], [1, 2], [0, 0], [1, 1], [1, 1], [1, 1], [1, 1]] },
        { param1: '', param2: '球镜', param3: '柱镜', param4: '轴向', param5: '瞳距', param6: '', param7: '下加光', param8: '瞳高', param9: '纠正视力', param10: '近用□', rowCols: [[0, 0], [1, 1], [1, 1], [1, 1], [1, 2], [0, 0], [1, 1], [1, 1], [1, 1], [1, 1]] },
        { param1: 'R (右)', param2: '', param3: '', param4: '', param5: '', param6: '', param7: '', param8: '', param9: '', param10: '', rowCols: [[1, 1], [1, 1], [1, 1], [1, 1], [1, 2], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1]] },
        { param1: 'L (左)', param2: '', param3: '', param4: '', param5: '', param6: '', param7: '', param8: '', param9: '', param10: '', rowCols: [[1, 1], [1, 1], [1, 1], [1, 1], [1, 2], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1]] },
        { param1: '检测结论', param2: '', param3: '', param4: '', param5: '', param6: '', param7: '', param8: '', param9: '', param10: '', rowCols: [[1, 1], [1, 9], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]] }
      ],
      tableHeight: document.documentElement.clientHeight - 200
    }
  },
  methods: {
    tableCellClassName({ row, column, rowIndex, columnIndex }) {
      const blackCells = [[0, 0], [0, 3], [1, 3], [1, 8], [2, 0], [2, 3], [3, 0], [3, 3], [3, 5], [3, 7], [4, 0], [4, 3], [4, 7], [8, 0], [7, 3], [6, 7], [8, 7], [10, 7], [12, 7], [13, 7], [15, 0], [17, 0], [18, 0], [19, 0]]
      let className = ''
      blackCells.find((cell) => {
        if (cell[0] === rowIndex && cell[1] === columnIndex) {
          className = 'blackCell'
        }
      })
      return className
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      return row.rowCols[columnIndex]
    },
    exportWord() {

    },
    exportExcel() {
      userManageAction.getVisionExportExcelReport(this.queryParams).then(res => {
        const blob = res
        const url = window.URL.createObjectURL(new Blob([res], { type: 'application/vnd.ms-excel' }))
        if ('download' in document.createElement('a')) { // 非IE下载
          const elink = document.createElement('a')
          elink.download = '体检报告'
          elink.style.display = 'none'
          elink.href = url
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
        } else { // IE10+下载
          navigator.msSaveBlob(blob, '体检报告')
        }
      })
    },
    openInfo(data) {
      this.queryParams = { id: data.id }
      //        this.downUrl = env.VUE_APP_ADMIN_API + '/api/Vision/ExportExcelReport?id=' + data.id
      this.dataList[0].param5 = data.examAddress

      this.dataList[1].param5 = data.name
      this.dataList[1].param10 = data.age

      this.dataList[2].param2 = data.date
      this.dataList[2].param5 = data.statement

      this.dataList[3].param2 = data.optometrist
      this.dataList[3].param5 = data.sex
      this.dataList[3].param7 = data.profession
      this.dataList[3].param9 = data.phone

      this.dataList[4].param2 = '无□'
      this.dataList[5].param2 = '半年到一年□'
      this.dataList[6].param2 = '一年□'
      this.dataList[7].param2 = '两年以上□'
      switch (data.glassesHistory) {
        case 0:
          this.dataList[4].param2 = '√无□'
          break
        case 1:
          this.dataList[5].param2 = '√半年到一年□'
          break
        case 2:
          this.dataList[6].param2 = '√一年□'
          break
        case 3:
          this.dataList[7].param2 = '√两年以上□'
          break
      }

      this.dataList[4].param5 = '角膜炎□'
      this.dataList[5].param5 = '意外受伤□'
      this.dataList[6].param5 = '无□'
      switch (data.diseaseHistory) {
        case '角膜炎':
          this.dataList[4].param5 = '√角膜炎□'
          break
        case '意外受伤':
          this.dataList[5].param5 = '√意外受伤□'
          break
        case '无':
          this.dataList[6].param5 = '√无□'
          break
      }

      this.dataList[8].param2 = '无□'
      this.dataList[9].param2 = '有□'
      switch (data.surgeryHistory) {
        case false:
          this.dataList[8].param2 = '√无□'
          break
        case true:
          this.dataList[9].param2 = '√有□'
          break
      }

      this.dataList[5].param10 = '正常□'
      this.dataList[6].param10 = '异常□'
      switch (data.worth4PointTest) {
        case true:
          this.dataList[5].param10 = '√正常□'
          break
        case false:
          this.dataList[6].param10 = '√异常□'
          break
      }

      this.dataList[7].param10 = '正常□'
      this.dataList[8].param10 = '异常□'
      switch (data.colorBindTest) {
        case true:
          this.dataList[7].param10 = '√正常□'
          break
        case false:
          this.dataList[8].param10 = '√异常□'
          break
      }

      this.dataList[9].param10 = '严重□'
      this.dataList[10].param10 = '一般□   无□'
      switch (data.quGuangChenCha) {
        case 0:
          this.dataList[10].param10 = '一般□  √无□'
          break
        case 1:
          this.dataList[10].param10 = '√一般□  无□'
          break
        case 2:
          this.dataList[9].param10 = '√严重□'
          break
      }

      this.dataList[11].param10 = '是□     否□'
      switch (data.rightTrend) {
        case true:
          this.dataList[11].param10 = '√是□     否□'
          break
        case false:
          this.dataList[11].param10 = '是□     √否□'
          break
      }

      this.dataList[12].param10 = '是□     否□'
      switch (data.leftTrend) {
        case true:
          this.dataList[12].param10 = '√是□     否□'
          break
        case false:
          this.dataList[12].param10 = '是□     √否□'
          break
      }

      this.dataList[10].param2 = '无□'
      this.dataList[11].param2 = '父亲□'
      this.dataList[12].param2 = '母亲□'
      this.dataList[13].param2 = '兄弟姐妹□'
      switch (data.familyHistory) {
        case '无':
          this.dataList[10].param2 = '√无□'
          break
        case '父亲':
          this.dataList[11].param2 = '√父亲□'
          break
        case '母亲':
          this.dataList[12].param2 = '√母亲□'
          break
        case '兄弟姐妹':
          this.dataList[13].param2 = '√兄弟姐妹□'
          break
      }

      this.dataList[7].param5 = '近用、看书报□'
      this.dataList[8].param5 = '电脑□'
      this.dataList[9].param5 = '学习与阅读□'
      this.dataList[10].param5 = '看电视□'
      this.dataList[11].param5 = '室内工作□'
      this.dataList[12].param5 = '运动□'
      this.dataList[13].param5 = '防护□'
      switch (data.glassesPurpose) {
        case '近用':
          this.dataList[7].param5 = '√近用、看书报□'
          break
        case '看书报':
          this.dataList[7].param5 = '近用、√看书报□'
          break
        case '电脑':
          this.dataList[8].param5 = '√电脑□'
          break
        case '学习与阅读':
          this.dataList[9].param5 = '√学习与阅读□'
          break
        case '看电视':
          this.dataList[10].param5 = '√看电视□'
          break
        case '室内工作':
          this.dataList[11].param5 = '√室内工作□'
          break
        case '运动':
          this.dataList[12].param5 = '√运动□'
          break
        case '防护':
          this.dataList[13].param2 = '√防护□'
          break
      }

      this.dataList[17].param2 = data.spH_R
      this.dataList[17].param3 = data.cyL_R
      this.dataList[17].param4 = data.axI_R
      this.dataList[17].param5 = data.pD_R
      this.dataList[17].param7 = data.adD_R
      this.dataList[17].param8 = data.pH_R
      this.dataList[17].param9 = data.v_R
      this.dataList[17].param10 = data.farUse

      this.dataList[18].param2 = data.spH_L
      this.dataList[18].param3 = data.cyL_L
      this.dataList[18].param4 = data.axI_L
      this.dataList[18].param5 = data.pD_L
      this.dataList[18].param7 = data.adD_L
      this.dataList[18].param8 = data.pH_L
      this.dataList[18].param9 = data.v_L
      this.dataList[18].param10 = data.nearUse

      this.dataList[19].param2 = data.conclusion
    }
  }
}
</script>

<style>
.el-table--scrollable-x .el-table__body-wrapper {
    overflow-x: hidden !important;
}
</style>
<style scoped>
.el-table ::v-deep .blackCell ::v-deep .cell {
    font-weight: bold;
}
</style>
