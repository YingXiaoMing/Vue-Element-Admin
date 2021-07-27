<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="queryParams.code"
        placeholder="指标编码"
        clearable
        style="width: 110px"
      />
      <el-input
        v-model="queryParams.name"
        placeholder="名称"
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
      width="880px"
      :visible.sync="dialogInfo.visible"
      @handleClick="handleClick"
    >
      <el-form ref="form" :model="form" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="num" label="流水号:">
              <el-input v-model="form.num" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="code" label="指标编码:">
              <el-input v-model="form.code" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="name" label="名称:">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item prop="gender" label="性别:">
              <el-radio-group v-model="form.gender" style="width: 120px">
                <el-radio label="男">男</el-radio>
                <el-radio label="女">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="ageUp" label="年龄上限:">
              <el-input v-model="form.ageUp" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="ageDown" label="年龄下限:">
              <el-input v-model="form.ageDown" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="optionUp" label="视力/身高上限:">
              <el-input v-model="form.optionUp" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="optionDown" label="视力/身高下限:">
              <el-input v-model="form.optionDown" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="weightUp" label="体重上限:">
              <el-input v-model="form.weightUp" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="weightDown" label="体重下限:">
              <el-input v-model="form.weightDown" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="BMIUp" label="BMI上限:">
              <el-input v-model="form.BMIUp" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="BMIDown" label="BMI下限:">
              <el-input v-model="form.BMIDown" />
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
  name: 'Target',
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
        num: '',
        code: '',
        name: '',
        gender: '男',
        ageUp: '',
        ageDown: '',
        optionUp: '',
        optionDown: '',
        weightUp: '',
        weightDown: '',
        BMIUp: '',
        BMIDown: '',
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
          num: '0000001',
          code: '0000001',
          name: '陈晓晓',
          gender: '男',
          ageUp: '20',
          ageDown: '6',
          optionUp: '200',
          optionDown: '100',
          weightUp: '80',
          weightDown: '40',
          BMIUp: '50',
          BMIDown: '15',
          tags: '正常',
          note: '正常'
        }, {
          num: '0000002',
          code: '0000002',
          name: '吴亦凡',
          gender: '女',
          ageUp: '21',
          ageDown: '6',
          optionUp: '200',
          optionDown: '100',
          weightUp: '80',
          weightDown: '40',
          BMIUp: '50',
          BMIDown: '15',
          tags: '正常',
          note: '正常'
        }],
        tr: [{
          id: '1',
          label: '流水号',
          prop: 'num'
        }, {
          id: '2',
          label: '指标编码',
          prop: 'code'
        }, {
          id: '3',
          label: '名称',
          prop: 'name'
        }, {
          id: '4',
          label: '性别',
          prop: 'gender'
        }, {
          id: '5',
          label: '年龄上限',
          prop: 'ageUp'
        }, {
          id: '6',
          label: '年龄下限',
          prop: 'ageDown'
        }, {
          id: '7',
          label: '视力/身高上限',
          prop: 'optionUp'
        }, {
          id: '8',
          label: '视力/身高下限',
          prop: 'optionDown'
        }, {
          id: '9',
          label: '体重上限',
          prop: 'weightUp'
        }, {
          id: '10',
          label: '体重下限',
          prop: 'weightDown'
        }, {
          id: '11',
          label: 'BMI上限',
          prop: 'BMIUp'
        }, {
          id: '12',
          label: 'BMI下限',
          prop: 'BMIDown'
        }, {
          id: '13',
          label: '删除标记',
          prop: 'tags',
          show: 'template'
        }, {
          id: '14',
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
            num: data.num,
            code: data.code,
            name: data.name,
            gender: data.gender,
            ageUp: data.ageUp,
            ageDown: data.ageDown,
            optionUp: data.optionUp,
            optionDown: data.optionDown,
            weightUp: data.weightUp,
            weightDown: data.weightDown,
            BMIUp: data.BMIUp,
            BMIDown: data.BMIDown,
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

