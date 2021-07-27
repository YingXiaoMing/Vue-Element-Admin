<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="queryParams.code"
        placeholder="门店编码"
        clearable
        style="width: 110px"
      />
      <el-input
        v-model="queryParams.name"
        placeholder="名称"
        clearable
        style="width: 220px"
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
      width="686px"
      :visible.sync="dialogInfo.visible"
      @handleClick="handleClick"
    >
      <el-form ref="form" :model="form" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item prop="code" label="体检中心编码:">
              <el-input v-model="form.code" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="name" label="名称:">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="areaName" label="地区:">
              <el-select v-model="form.areaName" style="width: 100%">
                <el-option value="北京市石景山区" label="北京市石景山区" />
                <el-option value="辽宁省本溪市平山区" label="辽宁省本溪市平山区" />
                <el-option value="江西省宜春市高安市" label="江西省宜春市高安市" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="pinyin" label="拼音码:">
              <el-input v-model="form.pinyin" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="phone" label="联系方式:">
              <el-input v-model="form.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="note" label="说明:">
              <el-input v-model="form.note" type="textarea" :rows="4" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="tags" label="删除标记:">
              <el-radio-group v-model="form.tags">
                <el-radio label="正常">正常</el-radio>
                <el-radio label="禁用">禁用</el-radio>
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
        code: '',
        name: '',
        areaName: '',
        pinyin: '',
        phone: '',
        tags: '正常',
        note: ''
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
          code: '10000001',
          name: '体检中心',
          areaName: '北京市石景山区',
          areaCode: '110107',
          pinyin: 'TJZX',
          phone: '2154115',
          note: '',
          tags: '正常'
        }, {
          code: '10000002',
          name: '体检中心66',
          areaName: '北京市石景山区',
          areaCode: '110108',
          pinyin: 'TJZX',
          phone: '2154115',
          note: '',
          tags: '禁用'
        }],
        tr: [{
          id: '1',
          label: '体检中心编码',
          prop: 'code'
        }, {
          id: '2',
          label: '名称',
          prop: 'name'
        }, {
          id: '3',
          label: '区域名称',
          prop: 'areaName'
        }, {
          id: '4',
          label: '地区编码',
          prop: 'areaCode'
        }, {
          id: '5',
          label: '拼音码',
          prop: 'pinyin'
        }, {
          id: '6',
          label: '联系方式',
          prop: 'phone'
        }, {
          id: '7',
          label: '删除标记',
          prop: 'tags',
          show: 'template'
        }, {
          id: '8',
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
            code: data.code,
            name: data.name,
            areaName: data.areaName,
            pinyin: data.pinyin,
            phone: data.phone,
            tags: data.tags,
            note: data.note
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

