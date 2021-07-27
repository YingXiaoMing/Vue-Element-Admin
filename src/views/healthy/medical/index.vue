<template>
  <div class="app-container">
    <el-button
      v-if="false"
      type="primary"
      icon="el-icon-document"
      @click="exportExcel"
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
      id="printTableMedical"
      :data="dataList"
      fit
      border
      highlight-current-row
      style="width: 21cm"
      :show-header="false"
      :span-method="arraySpanMethod"
      :row-class-name="tableRowClassName"
      :cell-class-name="tableCellClassName"
    >
      <el-table-column align="center" prop="param1" label="1">
        <template slot-scope="scope">
          <img v-if="typeof(scope.row.param1) === 'object' && scope.row.param1.url !== undefined" :src="scope.row.param1.url">
          <span v-else>{{ scope.row.param1 }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="param2" label="2">
        <template slot-scope="scope">
          <div v-if="scope.row.paramData === 'qufen'">
            <p v-for="item in qufen" style="margin: 0;text-align: left;">{{ item }}</p>
          </div>
          <div v-if="scope.row.paramData === 'yujing'">
            <p v-for="item in yujing" style="margin: 0;text-align: left;">{{ item }}</p>
          </div>
          <div v-if="scope.row.paramData === 'wenxin'">
            <p v-for="item in wenxin" style="margin: 0;text-align: left;">{{ item }}</p>
          </div>
          <span v-else>{{ scope.row.param2 }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="param3" label="3" />
      <el-table-column align="center" prop="param4" label="4" />
      <el-table-column align="center" prop="param5" label="5" />
      <el-table-column align="center" prop="param6" label="6" />
      <el-table-column align="center" prop="param7" label="7" />
      <el-table-column align="center" prop="param8" label="8" />
    </el-table>
  </div>
</template>

<script>
import userManageAction from '@/services/userManage.js'
import { export_table_to_excel } from '@/vendor/Export2Excel'
import * as env from '@/utils/env'
export default {
  name: 'Index',
  data() {
    return {
      downUrl: '',
      printObj: {
        id: 'printTableMedical',
        popTitle: '体检报告'
      },
      queryParams: null,
      dataList: [
        { className: '', paramData: '', param1: { url: require('@/assets/title.png') }, param2: '', param3: '', param4: '', param5: '', param6: '', param7: '', param8: '', rowCols: [[1, 8], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]] },
        { className: '', paramData: '', param1: '学号', param2: '', param3: '建档日期', param4: '', param5: '体检日期', param6: '', param7: '', param8: '', rowCols: [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 3], [0, 0], [0, 0]] },
        { className: '', paramData: '', param1: '姓名', param2: '', param3: '性别', param4: '', param5: '年龄', param6: '', param7: '出生日期', param8: '', rowCols: [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1]] },
        { className: '', paramData: '', param1: '父母', param2: '', param3: '联系电话', param4: '', param5: '身高', param6: '', param7: '体重', param8: '', rowCols: [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1]] },
        { className: '', paramData: '', param1: '学校', param2: '', param3: '', param4: '', param5: '年级', param6: '', param7: '班级', param8: '', rowCols: [[1, 1], [1, 3], [0, 0], [0, 0], [1, 1], [1, 1], [1, 1], [1, 1]] },
        { className: '', paramData: '', param1: '裸眼视力', param2: 'OD(右眼)', param3: '', param4: '', param5: 'OS(左眼)', param6: '', param7: '', param8: '', rowCols: [[1, 1], [1, 1], [1, 2], [0, 0], [1, 1], [1, 3], [0, 0], [0, 0]] },
        { className: '', paramData: '', param1: '戴镜视力', param2: 'OD(右眼)', param3: '', param4: '', param5: 'OS(左眼)', param6: '', param7: '', param8: '', rowCols: [[1, 1], [1, 1], [1, 2], [0, 0], [1, 1], [1, 3], [0, 0], [0, 0]] },
        { className: '', paramData: '', param1: '综合验光参数', param2: '右眼', param3: '', param4: '', param5: '', param6: '', param7: 'PD瞳距', param8: '', rowCols: [[2, 1], [1, 1], [1, 4], [0, 0], [0, 0], [0, 0], [2, 1], [1, 1]] },
        { className: '', paramData: '', param1: '', param2: '左眼', param3: '', param4: '', param5: '', param6: '', param7: '', param8: '', rowCols: [[0, 0], [1, 1], [1, 4], [0, 0], [0, 0], [0, 0], [0, 0], [1, 1]] },
        { className: '', paramData: '', param1: '视功能', param2: 'Worth四点测试', param3: '正常', param4: '', param5: '色盲', param6: '', param7: '屈光层差', param8: '', rowCols: [[1, 1], [1, 2], [0, 0], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1]] },
        { className: 'moreHeight', paramData: 'qufen', param1: '视力情况区分', param2: '', param3: '', param4: '', param5: '', param6: '', param7: '', param8: '', rowCols: [[1, 1], [1, 7], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]] },
        { className: 'moreHeight', paramData: 'yujing', param1: '预警提示', param2: '', param3: '', param4: '', param5: '', param6: '', param7: '', param8: '', rowCols: [[1, 1], [1, 7], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]] },
        { className: 'moreHeight', paramData: 'wenxin', param1: '温馨提示', param2: '', param3: '', param4: '', param5: '', param6: '', param7: '', param8: '', rowCols: [[1, 1], [1, 7], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]] },
        { className: '', paramData: '', param1: { url: require('@/assets/title2.png') }, param2: '', param3: '', param4: '', param5: '', param6: '', param7: '', param8: '', rowCols: [[1, 8], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]] }
      ],
      qufen: [
        '5.0（1.0）-5.3(2.0)视力良好',
        '4.8（0.6）-4.9（0.9）轻度视力不良',
        '4.5（0.3）-4.7（0.5）中度视力不良',
        '4.3（0.25）-4.0（0.1）高度视力不良',
        '低于4.0（0.1）视力极差'
      ],
      yujing: [],
      yujing1: [
        '三级：度数严重',
        '需进行视力矫正训练，同时注意多吃有益于眼健康的营养膳食、增加户外运动、控制电子产品的使用，使视力达到健康状态。'
      ],
      yujing2: [
        '二级：轻微近视',
        '需做好视力防控，多补充维生素A、维生素B、以及叶黄素，同时注意正确的用眼习惯，定期进行验光检查，防止度数加深。'
      ],
      yujing3: [
        '一级：视力健康',
        '目前无视力问题，说明用眼习惯良好，请继续保持正确的读写姿势、每学习四十分钟休息远眺10分钟、以及充足的营养和睡眠'
      ],
      wenxin: [],
      tableHeight: document.documentElement.clientHeight - 250
    }
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      return row.className
    },
    tableCellClassName({ row, column, rowIndex, columnIndex }) {
      const blackCells = [[1, 0], [1, 2], [1, 4], [2, 0], [2, 2], [2, 4], [2, 6], [3, 0], [3, 2], [3, 4], [3, 6], [4, 0], [4, 4], [4, 6], [5, 0], [5, 1], [5, 4], [6, 0], [6, 1], [6, 4], [7, 0], [7, 1], [7, 6], [8, 1], [9, 0], [9, 1], [9, 4], [9, 6], [10, 0], [11, 0], [12, 0]]
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
    exportExcel() {
      //        export_table_to_excel('printTableMedical')
      userManageAction.getExportExcelReport(this.queryParams).then(res => {
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
    queryInfo(perData) {
      this.queryParams = { sId: perData.f_sid, term: perData.f_ywrq }
      //        this.downUrl = env.VUE_APP_ADMIN_API + '/api​/Exam​/ExportExcelReport?sId=' + perData.f_sid + '&term=' + ''
      userManageAction.getReportInfo(this.queryParams).then(res => {
        if (res.code === 1) {
          this.openInfo(perData, res.data)
        } else {
          this.dataList = [
            { className: '', paramData: '', param1: { url: require('@/assets/title.png') }, param2: '', param3: '', param4: '', param5: '', param6: '', param7: '', param8: '', rowCols: [[1, 8], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]] },
            { className: '', paramData: '', param1: '学号', param2: '', param3: '建档日期', param4: '', param5: '体检日期', param6: '', param7: '', param8: '', rowCols: [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 3], [0, 0], [0, 0]] },
            { className: '', paramData: '', param1: '姓名', param2: '', param3: '性别', param4: '', param5: '年龄', param6: '', param7: '出生日期', param8: '', rowCols: [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1]] },
            { className: '', paramData: '', param1: '父母', param2: '', param3: '联系电话', param4: '', param5: '身高', param6: '', param7: '体重', param8: '', rowCols: [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1]] },
            { className: '', paramData: '', param1: '学校', param2: '', param3: '', param4: '', param5: '年级', param6: '', param7: '班级', param8: '', rowCols: [[1, 1], [1, 3], [0, 0], [0, 0], [1, 1], [1, 1], [1, 1], [1, 1]] },
            { className: '', paramData: '', param1: '裸眼视力', param2: 'OD(右眼)', param3: '', param4: '', param5: 'OS(左眼)', param6: '', param7: '', param8: '', rowCols: [[1, 1], [1, 1], [1, 2], [0, 0], [1, 1], [1, 3], [0, 0], [0, 0]] },
            { className: '', paramData: '', param1: '戴镜视力', param2: 'OD(右眼)', param3: '', param4: '', param5: 'OS(左眼)', param6: '', param7: '', param8: '', rowCols: [[1, 1], [1, 1], [1, 2], [0, 0], [1, 1], [1, 3], [0, 0], [0, 0]] },
            { className: '', paramData: '', param1: '综合验光参数', param2: '右眼', param3: '', param4: '', param5: '', param6: '', param7: 'PD瞳距', param8: '', rowCols: [[2, 1], [1, 1], [1, 4], [0, 0], [0, 0], [0, 0], [2, 1], [1, 1]] },
            { className: '', paramData: '', param1: '', param2: '左眼', param3: '', param4: '', param5: '', param6: '', param7: '', param8: '', rowCols: [[0, 0], [1, 1], [1, 4], [0, 0], [0, 0], [0, 0], [0, 0], [1, 1]] },
            { className: '', paramData: '', param1: '视功能', param2: 'Worth四点测试', param3: '', param4: '正常', param5: '色盲', param6: '', param7: '屈光层差', param8: '', rowCols: [[1, 1], [1, 2], [0, 0], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1]] },
            { className: 'moreHeight', paramData: 'qufen', param1: '视力情况区分', param2: '', param3: '', param4: '', param5: '', param6: '', param7: '', param8: '', rowCols: [[1, 1], [1, 7], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]] },
            { className: 'moreHeight', paramData: 'yujing', param1: '预警提示', param2: '', param3: '', param4: '', param5: '', param6: '', param7: '', param8: '', rowCols: [[1, 1], [1, 7], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]] },
            { className: 'moreHeight', paramData: 'wenxin', param1: '温馨提示', param2: '', param3: '', param4: '', param5: '', param6: '', param7: '', param8: '', rowCols: [[1, 1], [1, 7], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]] },
            { className: '', paramData: '', param1: { url: require('@/assets/title2.png') }, param2: '', param3: '', param4: '', param5: '', param6: '', param7: '', param8: '', rowCols: [[1, 8], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]] }
          ]
        }
      })
    },
    openInfo(perData, data) {
      this.dataList[1].param2 = data.studentCode
      this.dataList[1].param4 = data.createtime
      this.dataList[1].param6 = data.examtime

      this.dataList[2].param2 = data.name
      this.dataList[2].param4 = data.sex
      this.dataList[2].param6 = data.age
      this.dataList[2].param8 = data.birth

      this.dataList[3].param2 = data.parent
      this.dataList[3].param4 = data.phone
      this.dataList[3].param6 = data.height
      this.dataList[3].param8 = data.weight

      this.dataList[4].param2 = data.school
      this.dataList[4].param6 = data.grade
      this.dataList[4].param8 = data.class

      this.dataList[5].param3 = data.a
      this.dataList[5].param6 = data.b

      this.dataList[6].param3 = Number(data.c) < 5 ? data.c : '无'
      this.dataList[6].param6 = Number(data.d) < 5 ? data.d : '无'

      this.dataList[7].param3 = data.e
      this.dataList[7].param8 = data.g

      this.dataList[8].param3 = data.f
      this.dataList[8].param8 = data.h

      this.dataList[9].param4 = data.i !== '' ? data.i : '正常'
      this.dataList[9].param6 = data.j
      this.dataList[9].param8 = data.k

      let level = '一'
      if (Number(data.a) <= 4.7) {
        level = '三'
        this.yujing = this.yujing1
      } else if (Number(data.a) > 4.7 && Number(data.a) < 5) {
        level = '二'
        this.yujing = this.yujing2
      } else {
        level = '一'
        this.yujing = this.yujing3
      }
      this.wenxin = ['亲爱的同学你的视力检查结果如下：', '右眼：' + data.tips_r, '左眼：' + data.tips_l]
      if ((parseFloat(data.tips_l) < 0 && parseFloat(data.tips_r) > 0) || (parseFloat(data.tips_l) > 0 && parseFloat(data.tips_r) < 0)) {
        this.wenxin.push('您有严重屈光层差，需要及时处理。')
      }
      if (Math.abs(Math.abs(data.tips_l) - Math.abs(data.tips_r)) > 2) {
        this.wenxin.push('您的双眼缺失融像效果。')
      }
      this.wenxin.push(' 根据您的检测数据为' + level + '级预警，请尽快到附近的眼健中心或医疗机构检查视力，以便控制视力的发展，祝您视力早日恢复正常。')
    }
  }
}
</script>

<style scoped>
.app-container {
    padding: 0;
    padding-left: 13px;
}
.el-table ::v-deep .moreHeight {
    height: 120px !important;
}
.el-table ::v-deep .blackCell ::v-deep .cell {
    font-weight: bold;
}
.el-table ::v-deep .blackCell ::v-deep .cell span {
    font-weight: bold;
}
</style>
