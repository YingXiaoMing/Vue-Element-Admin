<template>
    <div class="app-container">
        <div class="filter-container">
            <el-form :model="queryParams" inline>
                <el-form-item label="学校编码:" prop="code">
                    <el-input v-model="queryParams.code"></el-input>
                </el-form-item>
                <el-form-item label="学校名称:" prop="code">
                    <el-select v-model="queryParams.name">
                        <el-option v-for="item in schoolOption" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级编码:" prop="classCode">
                    <el-input v-model="queryParams.classCode"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search">查询</el-button>
                    <el-button type="primary" icon="el-icon-circle-plus" @click="addData">添加</el-button>
                    <el-button v-print="printObj" type="primary" icon="el-icon-printer">打印</el-button>
                </el-form-item>
            </el-form>
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
                        <el-form-item prop="schoolName" label="学校名称:">
                            <el-select v-model="form.schoolName">
                                <el-option v-for="item in schoolOption" :label="item" :value="item"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="className" label="班级名称:">
                            <el-select v-model="form.className">
                                <el-option v-for="item in classOption" :label="item" :value="item"></el-option>
                            </el-select>
                        </el-form-item>
                         <el-form-item prop="level" label="学制:">
                            <el-input v-model="form.level"></el-input>
                        </el-form-item>
                        <el-form-item prop="year" label="入学年度:">
                            <el-input v-model="form.year"></el-input>
                        </el-form-item>
                        <el-form-item prop="wj" label="往届:">
                            <el-radio-group v-model="form.wj">
                                <el-radio label="是">是</el-radio>
                                <el-radio label="否">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item prop="sort" label="排序:">
                            <el-input v-model="form.sort"></el-input>
                        </el-form-item>
                        <el-form-item prop="wj" label="往届:">
                            <el-radio-group v-model="form.wj">
                                <el-radio label="正常">正常</el-radio>
                                <el-radio label="删除">删除</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item prop="note" label="说明:">
                            <el-input v-model="form.note" :rows="4"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </page-dialog>
        <PrintPage id="printTableExam" :prop-data="dataTable.data" />
    </div>  
</template>
<script>
import PageTable from '@/components/PageTable'
import PageDialog from '@/components/PageDialog'
import PrintPage from './page'


export default {
    name: 'Banji',
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
                classCode: ''
            },
            printObj: {
                id: 'printTableExam',
                popTitle: '学校班级'
            },
            form: {
                schoolName: '',
                className: '',
                level: '',
                year: '',
                wj: '',
                note: ''
            },
            schoolOption: ["本溪市实验小学","本溪市平山区第二实验小学","北京小学","南昌体验店"],
            classOption: ["一年一班","一年二班","一年三班","二年一班","二年二班"],
            dialogInfo: {
                title: '添加',
                visible: false,
                type: 0, // 0代表新增  1 代表编辑
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
                    suyin: '000000014',
                    classCode: '3601010042019010',
                    className: '一年一班',
                    schoolCode: '360101004',
                    schoolName: '南昌体验店',
                    pinyin: 'YNYB',
                    level: '3',
                    year: '2019',
                    wj: '是',
                    tags: '正常'
                }],
                tr: [{
                        id: '1',
                        label: '学校班级索引',
                        prop: 'suyin'
                    }, {
                        id: '2',
                        label: '班级编码',
                        prop: 'classCode'
                    }, {
                        id: '3',
                        label: '班级名称',
                        prop: 'className'
                    }, {
                        id: '4',
                        label: '学校编码',
                        prop: 'schoolCode'
                    }, {
                        id: '5',
                        label: '学校名称',
                        prop: 'schoolName'
                    }, {
                        id: '6',
                        label: '班级拼音码',
                        prop: 'pinyin'
                    }, {
                        id: '7',
                        label: '学制',
                        prop: 'level'
                    }, {
                        id: '8',
                        label: '入学年度',
                        prop: 'year'
                    }, {
                        id: '9',
                        label: '往届',
                        prop: 'wj'
                    }, {
                        id: '10',
                        label: '删除标记',
                        prop: 'tags',
                        show: 'template'
                    }]
            }
        }
    },
    methods: {
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
        },
        handleEvent(event, data) {
            switch (event) {
                case 'editData':
                    this.form = {
                        schoolName: data.schoolName,
                        className: data.className,
                        level: data.level,
                        year: data.year,
                        wj: data.wj,
                        note: data.note
                    };
                    this.dialogInfo.title = '编辑'
                    this.dialogInfo.type = 1
                    this.dialogInfo.visible = true
                    break;
                default:
                    break;
            }
        },
        addData() {
            this.dialogInfo.visible = true
            this.dialogInfo.title = '新增'
            this.dialogInfo.type = 0
        }
    }
}
</script>
<style lang="scss">
.row_list {
    margin-bottom: 20px;
    position: relative;
    width: 100%;
    padding: 20px 5px 5px 5px;
}
</style>


