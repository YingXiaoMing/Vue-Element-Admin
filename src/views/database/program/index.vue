<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="queryParams.code"
        placeholder="地区编码"
        clearable
        style="width: 110px"
      />
      <el-input
        v-model="queryParams.name"
        placeholder="地区名称"
        clearable
        style="width: 110px"
      />
      <el-input
        v-model="queryParams.pinyin"
        placeholder="拼音码"
        clearable
        style="width: 130px"
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
      width="540px"
      :visible.sync="dialogInfo.visible"
      @handleClick="handleClick"
    >
      <el-form ref="form" :model="form" label-width="88px">
        <el-row :gutter="24">
          <el-col :span="18">
            <el-form-item v-if="dialogInfo.type === 1" prop="num" label="编号:">
              <span>{{ form.num }}</span>
            </el-form-item>
            <el-form-item prop="pinyin" label="拼音码:">
              <el-input v-model="form.pinyin" />
            </el-form-item>
            <el-form-item prop="name" label="名称:">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item prop="note" label="说明:">
              <el-input v-model="form.note" type="textarea" :rows="4" />
            </el-form-item>
            <el-form-item prop="deleteTags" label="删除标记:">
              <el-radio-group v-model="form.deleteTags">
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
  name: 'Program',
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
        num: '222',
        name: '',
        pinyin: '',
        note: '',
        deleteTags: '正常'
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
          num: '00001',
          pinyin: 'ZTSL',
          name: '左眼视力',
          tags: '正常',
          note: '222'
        }, {
          num: '00002',
          pinyin: 'YTSL',
          name: '右眼视力',
          tags: '正常',
          note: '333'
        }],
        tr: [{
          id: '1',
          label: '编号',
          prop: 'num'
        }, {
          id: '2',
          label: '拼音码',
          prop: 'pinyin'
        }, {
          id: '3',
          label: '名称',
          prop: 'name'
        }, {
          id: '4',
          label: '说明',
          prop: 'note'
        }, {
          id: '5',
          label: '删除标记',
          prop: 'tags',
          show: 'template'
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
            num: data.num,
            name: data.name,
            pinyin: data.pinyin,
            note: data.note,
            deleteTags: data.tags
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
