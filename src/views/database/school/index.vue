<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="queryParams.code"
        placeholder="学校代码"
        clearable
        style="width: 110px"
      />
      <el-input
        v-model="queryParams.name"
        placeholder="学校名称"
        clearable
        style="width: 110px"
      />
      <el-input
        v-model="queryParams.pinyin"
        placeholder="拼音码"
        clearable
        style="width: 110px"
      />
      <el-button type="primary" icon="el-icon-search">查询</el-button>
      <el-button type="primary" icon="el-icon-circle-plus" @click="addData">添加</el-button>
      <el-button v-print="printObj" type="primary" icon="el-icon-printer">打印</el-button>
    </div>
    <page-table :table="dataTable" @handleEvent="handleEvent">
      <template slot="tags" slot-scope="props">
        <el-tag v-if="props.obj.row.tags === '正常'" type="success" effect="dark">正常</el-tag>
        <el-tag v-if="props.obj.row.tags === '禁用'" type="danger" effect="dark">禁用</el-tag>
      </template>
    </page-table>
    <page-dialog
      :title="dialogInfo.title"
      :b-list="dialogInfo.bList"
      width="626px"
      :visible.sync="dialogInfo.visible"
      @handleClick="handleClick"
    >
      <el-form ref="form" :model="form" label-width="96px">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item prop="name" label="学校名称:">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="pinyin" label="拼音码:">
              <el-input v-model="form.pinyin" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="areaName" label="区域名称:">
              <el-select v-model="form.areaName">
                <el-option value="北京市东城区" label="北京市东城区" />
                <el-option value="辽宁省本溪市平山区" label="辽宁省本溪市平山区" />
                <el-option value="江西省宜春市高安市" label="江西省宜春市高安市" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="year" label="年度:">
              <el-input v-model="form.year" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="sort" label="排序:">
              <el-input v-model="form.sort" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="sort" label="说明:">
              <el-input v-model="form.sort" type="textarea" :rows="4" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="tags" label="删除标记:">
              <el-radio-group v-model="form.tags">
                <el-radio label="正常">正常</el-radio>
                <el-radio label="删除">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </page-dialog>
    <print-page id="printTableExam" :prop-data="dataTable.data" />
  </div>
</template>
<script>
import PageTable from '@/components/PageTable'
import PageDialog from '@/components/PageDialog'
import PrintPage from './page'
export default {
  name: 'School',
  components: {
    PageTable,
    PageDialog,
    PrintPage
  },
  data() {
    return {
      queryParams: {
        code: '',
        name: '',
        pinyin: ''
      },
      form: {
        name: '',
        pinyin: '',
        areaName: '',
        year: '',
        sort: '',
        note: '',
        tags: '正常'
      },
      printObj: {
        id: 'printTableExam',
        popTitle: '体检项目'
      },
      dialogInfo: {
        title: '添加',
        visible: false,
        type: 0,
        bList: [
          { label: '关闭', show: true, event: 'close' },
          { label: '保存', show: true, event: 'save' }
        ]
      },
      dataTable: {
        border: true,
        query: {},
        loading: false,
        hasOperation: true,
        operation: {
          label: '操作',
          width: '200',
          className: '',
          data: [
            { label: '编辑', event: 'editData' },
            { label: '删除', event: 'deleteData' }
          ]
        },
        refresh: 1, // 刷新
        data: [{
          num: '000001',
          code: '1102001',
          name: '北京小学',
          pinyin: 'BJXX',
          areaName: '北京市东城区',
          areaCode: '110101',
          year: '2019',
          tags: '正常',
          note: ''
        }, {
          num: '000002',
          code: '1102002',
          name: '本溪市实验小学',
          pinyin: 'BXSSYXX',
          areaName: '辽宁省本溪市平山区',
          areaCode: '110102',
          year: '2019',
          tags: '正常',
          note: ''
        }, {
          num: '000003',
          code: '1102003',
          name: '江西省宜春高安市第六小学',
          pinyin: 'JXSYCGASDLXX',
          areaName: '江西省宜春市高安市',
          areaCode: '110103',
          year: '2020',
          tags: '正常',
          note: ''
        }],
        tr: [{
          id: '1',
          label: '学校流水号',
          prop: 'num'
        }, {
          id: '2',
          label: '学校代码',
          prop: 'code'
        }, {
          id: '3',
          label: '学校名称',
          prop: 'name'
        }, {
          id: '4',
          label: '拼音码',
          prop: 'pinyin'
        }, {
          id: '5',
          label: '区域名称',
          prop: 'areaName'
        }, {
          id: '6',
          label: '区域代码',
          prop: 'areaCode'
        }, {
          id: '7',
          label: '年度',
          prop: 'year'
        }, {
          id: '8',
          label: '删除标记',
          prop: 'tags',
          show: 'template'
        }, {
          id: '9',
          label: '说明',
          prop: 'note'
        }]
      }
    }
  },
  methods: {
    addData() {
      this.dialogInfo.visible = true
      this.dialogInfo.title = '新增'
      this.dialogInfo.type = 0
    },
    handleEvent(event, data) {
      switch (event) {
        case 'editData':
          this.form = {
            name: data.name,
            pinyin: data.pinyin,
            areaName: data.areaName,
            year: data.year,
            sort: '102',
            note: data.note,
            tags: '正常'
          }
          this.dialogInfo.title = '编辑'
          this.dialogInfo.type = 1
          this.dialogInfo.visible = true
          break
        default:
          break
      }
    },
    handleClick(event, data) {
      switch (event) {
        case 'close':
          this.dialogInfo.visible = false
          break
        case 'save':
          this.dialogInfo.visible = false
          break
        default:
          break
      }
    }
  }
}
</script>

