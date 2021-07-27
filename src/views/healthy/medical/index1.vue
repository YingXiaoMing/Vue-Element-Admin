<template>
  <div class="app-container">
    <el-button
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
      style="width: 99.9%"
      :show-header="false"
      :height="tableHeight"
      :span-method="arraySpanMethod"
      :row-class-name="tableRowClassName"
    >
      <el-table-column align="center" prop="param1" label="1">
        <template slot-scope="scope">
          <el-input v-if="scope.row.param1 === ''" v-model="scope.row.param1" />
          <span v-else>{{ scope.row.param1 }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="param2" label="2">
        <template slot-scope="scope">
          <el-input v-if="scope.row.param2 === ''" v-model="scope.row.param2" />
          <span v-else>{{ scope.row.param2 }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="param3" label="3">
        <template slot-scope="scope">
          <img v-if="scope.row.param3.url" :src="scope.row.param3.url">
          <el-input v-else-if="scope.row.param3 === ''" v-model="scope.row.param3" />
          <span v-else>{{ scope.row.param3 }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="param4" label="4">
        <template slot-scope="scope">
          <el-input v-if="scope.row.param4 === ''" v-model="scope.row.param4" />
          <span v-else>{{ scope.row.param4 }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="param5" label="5">
        <template slot-scope="scope">
          <el-input v-if="scope.row.param5 === ''" v-model="scope.row.param5" />
          <span v-else>{{ scope.row.param5 }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="param6" label="6">
        <template slot-scope="scope">
          <el-input v-if="scope.row.param6 === ''" v-model="scope.row.param6" />
          <el-date-picker
            v-else-if="scope.row.param6 !== null && scope.row.param6.type && scope.row.param6.type === 'date'"
            v-model="scope.row.param6[scope.row.param6.prop]"
            type="date"
            placeholder="选择日期"
          />
          <span v-else>{{ scope.row.param6 }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="param7" label="7">
        <template slot-scope="scope">
          <el-input v-if="scope.row.param7 === ''" v-model="scope.row.param7" />
          <span v-else>{{ scope.row.param7 }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="param8" label="8">
        <template slot-scope="scope">
          <el-input v-if="scope.row.param8 === ''" v-model="scope.row.param8" />
          <span v-else>{{ scope.row.param8 }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { export_table_to_excel } from '@/vendor/Export2Excel'
import ElInput from '../../../../node_modules/element-ui/packages/input/src/input'
export default {
  name: 'Index',
  components: { ElInput },
  data() {
    return {
      printObj: {
        id: 'printTableMedical',
        popTitle: '体检报告'
      },
      dataList: [
        { className: '', param1: null, param2: null, param3: { url: require('@/assets/title.png') }, param4: '', param5: '', param6: '', param7: null, param8: null, rowCols: [[1, 1], [1, 1], [1, 4], [0, 0], [0, 0], [0, 0], [1, 1], [1, 1]] },
        { className: '', param1: '学号', param2: '', param3: '建档日期', param4: '', param5: '体检日期', param6: { type: 'date', prop: 'param61' }, param7: '', param8: '', rowCols: [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 3], [0, 0], [0, 0]] },
        { className: '', param1: '姓名', param2: '', param3: '性别', param4: '', param5: '年龄', param6: '', param7: '出生日期', param8: '', rowCols: [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1]] },
        { className: '', param1: '父母', param2: '', param3: '联系电话', param4: '', param5: '身高', param6: '', param7: '体重', param8: '', rowCols: [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1]] },
        { className: '', param1: '学校', param2: '', param3: '', param4: '', param5: '年级', param6: '', param7: '班级', param8: '', rowCols: [[1, 1], [1, 3], [0, 0], [0, 0], [1, 1], [1, 1], [1, 1], [1, 1]] },
        { className: '', param1: '裸眼视力', param2: 'OD(右眼)', param3: '', param4: '', param5: 'OS(左眼)', param6: '', param7: '', param8: '', rowCols: [[1, 1], [1, 1], [1, 2], [0, 0], [1, 1], [1, 3], [0, 0], [0, 0]] },
        { className: '', param1: '戴镜视力', param2: 'OD(右眼)', param3: '', param4: '', param5: 'OS(左眼)', param6: '', param7: '', param8: '', rowCols: [[1, 1], [1, 1], [1, 2], [0, 0], [1, 1], [1, 3], [0, 0], [0, 0]] },
        { className: '', param1: '综合验光参数', param2: '右眼', param3: '', param4: '', param5: '', param6: '', param7: 'PD瞳距', param8: '', rowCols: [[2, 1], [1, 1], [1, 4], [0, 0], [0, 0], [0, 0], [1, 1], [1, 1]] },
        { className: '', param1: '', param2: '左眼', param3: '', param4: '', param5: '', param6: '', param7: '', param8: '', rowCols: [[0, 0], [1, 1], [1, 4], [0, 0], [0, 0], [0, 0], [1, 1], [1, 1]] },
        { className: '', param1: '视功能', param2: 'Worth四点测试', param3: '', param4: '', param5: '色盲', param6: '', param7: '屈光层差', param8: '', rowCols: [[1, 1], [1, 2], [0, 0], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1]] },
        { className: 'moreHeight', param1: '视力情况区分', param2: '', param3: '', param4: '', param5: '', param6: '', param7: '', param8: '', rowCols: [[1, 1], [1, 7], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]] },
        { className: 'moreHeight', param1: '预警提示', param2: '', param3: '', param4: '', param5: '', param6: '', param7: '', param8: '', rowCols: [[1, 1], [1, 7], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]] },
        { className: 'moreHeight', param1: '温馨提示', param2: '', param3: '', param4: '', param5: '', param6: '', param7: '', param8: '', rowCols: [[1, 1], [1, 7], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]] },
        { className: '', param1: '', param2: '', param3: { url: require('@/assets/title2.png') }, param4: '', param5: '', param6: '', param7: '', param8: '', rowCols: [[1, 1], [1, 1], [1, 4], [0, 0], [0, 0], [0, 0], [1, 1], [1, 1]] }
      ],
      tableHeight: document.documentElement.clientHeight - 200
    }
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      return row.className
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      return row.rowCols[columnIndex]
    },
    exportExcel() {
      export_table_to_excel('printTableMedical')
    },
    openInfo() {

    }
  }
}
</script>

<style scoped>
.el-table ::v-deep .moreHeight {
    height: 120px !important;
}
</style>
