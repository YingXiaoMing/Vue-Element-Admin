<template>
    <div class="app-container">
        <div class="filter-container">
            <el-form :model="queryParams" inline>
                <el-form-item label="学生姓名:" prop="name">
                    <el-input v-model="queryParams.name"></el-input>
                </el-form-item>
                <el-form-item label="身份证号码:" prop="num">
                    <el-input v-model="queryParams.num"></el-input>
                </el-form-item>
                <el-form-item label="联系手机:" prop="tel">
                    <el-input v-model="queryParams.tel"></el-input>
                </el-form-item>
                <el-form-item label="拼音码:" prop="pinyin">
                    <el-input v-model="queryParams.pinyin"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search">查询</el-button>
                    <el-button type="primary" icon="el-icon-circle-plus" @click="addData">添加</el-button>
                    <el-button type="primary" v-print="printObj" icon="el-icon-printer">打印</el-button>
                    <el-button type="primary" icon="el-icon-upload" @click="importStudent">学生导入</el-button>
                    <el-button type="primary" icon="el-icon-download" @click="exportStudent">学生导出</el-button>
                </el-form-item>
            </el-form>
        </div>
        <page-table :table="dataTable" @handleEvent="handleEvent">
            <template slot="tags" slot-scope="props">
                <el-tag v-if="props.obj.row.tags === '正常'" type="success" effect="dark">正常</el-tag>
                <el-tag v-if="props.obj.row.tags === '禁用'" type="danger" effect="dark">禁用</el-tag>
            </template>
        </page-table>
        <page-dialog :title="importDialog.title"
        :b-list="importDialog.bList"
        width="558px"
        :visible.sync="importDialog.visible"
        @handleClick="handleImportStudentClick"
        >
            <el-row :gutter="24">
                <el-col :span="24" style="marginBottom: 10px">
                    <div class="right">
                        <el-button>下载学生模板</el-button>
                    </div>
                </el-col> 
                <el-col :span="24" class="student_upload">
                    <el-upload class="upload-demo"
                    drag>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-col>
            </el-row>
            
        </page-dialog>
        <page-dialog :title="exportDialog.title"
        :b-list="dialogInfo.bList"
        width="558px"
        :visible.sync="exportDialog.visible"
        @handleClick="handleExportStudentClick"
        >
            <el-row :gutter="24">
                <el-col :span="24">
                    <div class="c_alert alert_danger">
                        <i class="fa fa-question-circle"></i>
                        注：请勾选需要导出的字段
                    </div>
                </el-col>
                <el-col :span="24" style="marginBottom: 10px">
                    <ul class="sys_spec_text">
                        <li v-for="(item, index) in exportStudentData" :class="item.checked ? 'active' : ''" @click="clickExcelData(item,index)"><a>{{ item.name }}</a></li>
                    </ul>
                </el-col>
            </el-row>
            
        </page-dialog>
        <page-dialog :title="dialogInfo.title"
        :b-list="dialogInfo.bList"
        width="865px"
        :visible.sync="dialogInfo.visible"
        @handleClick="handleClick"
        >
            <el-form ref="form" :model="form" label-width="108px" class="s_form">
                <el-row :gutter="24">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item prop="code" label="学生索引号:">
                                <el-input v-model="form.syh" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="code" label="学生健康卡号:">
                                <el-input v-model="form.jhh" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item prop="code" label="电子学籍号:">
                                <el-input v-model="form.xjh" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item  label="学号:">
                                <el-input v-model="form.xh" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="学生姓名:">
                                <el-input v-model="form.name" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item  label="出生年月:">
                                <el-date-picker v-model="form.birthDay"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item  label="拼音码:">
                                <el-input v-model="form.pinyin" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="code" label="性别:">
                                <el-radio-group v-model="form.gender">
                                    <el-radio label="男">男</el-radio>
                                    <el-radio label="女">女</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item prop="code" label="SIM卡号:">
                                <el-input v-model="form.SIMNumber" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="code" label="身份证号码:">
                                <el-input v-model="form.code" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item prop="code" label="体检卡号:">
                                <el-input v-model="form.cardNumber" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                         <el-col :span="12">
                            <el-form-item prop="code" label="籍贯:">
                                <el-input v-model="form.jg" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="code" label="联系手机:">
                                <el-input v-model="form.tel" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                                <el-form-item prop="code" label="微信:">
                                    <el-input v-model="form.wx" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item prop="code" label="QQ号:">
                                    <el-input v-model="form.qq" />
                                </el-form-item>
                            </el-col>
                    </el-row>
                    <el-row>
                         <el-col :span="12">
                            <el-form-item prop="code" label="家庭住址编码:">
                                <el-input v-model="form.addressCode" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="code" label="家庭住址:">
                                <el-input v-model="form.address" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                   
                    <el-col :span="12">
                        <el-form-item prop="code" label="父亲姓名:">
                            <el-input v-model="form.fatherName" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="code" label="父亲联系方式:">
                            <el-input v-model="form.fatherTel" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item prop="code" label="父亲工作单位:">
                            <el-input v-model="form.fatherWorkplace" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="code" label="母亲姓名:">
                            <el-input v-model="form.motherName" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="code" label="母亲联系方式:">
                            <el-input v-model="form.motherTel" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="code" label="母亲工作单位:">
                            <el-input v-model="form.motherWorkplace" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item prop="code" label="删除标记:">
                            <el-radio-group v-model="form.deleteTags">
                                <el-radio label="正常">正常</el-radio>
                                <el-radio label="禁用">禁用</el-radio>
                            </el-radio-group>
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
    name: 'Student',
    components: {
        PageTable,
        PageDialog,
        PrintPage
    },
    data() {
        return {
            queryParams: {
                name: '',
                num: '',
                tel: '',
                pinyin: ''
            },
            exportStudentData: [{
                name: '学生索引号',
                checked: true,
            }, {
                name: '学生健康卡号',
                checked: true
            }, {
                name: '学号',
                checked: true,
            }, {
                name: '学生姓名',
                checked: true
            }, {
                name: '性别',
                checked: true
            }, {
                name: '身份证号码',
                checked: true
            }, {
                name: '体检卡号',
                checked: true
            }, {
                name: '籍贯',
                checked: true
            }, {
                name: '联系手机',
                checked: true
            }, {
                name: '微信',
                checked: true
            }, {
                name: 'QQ号',
                checked: true
            }, {
                name: '删除标记',
                checked: true
            }],
            importDialog: {
                title: '学生导入',
                visible: false,
                bList: [
                    { label: '关闭', show: true, event: 'close' },
                    { label: '保存', show: true, event: 'save' }
                ]
            },
            exportDialog: {
                title: '导出Excel数据',
                visible: false,
                bList: [
                    { label: '关闭', show: true, event: 'close' },
                    { label: '保存', show: true, event: 'save' }
                ]
            },
            dialogInfo: {
                title: '添加',
                visible: false,
                type: 0, // 0代表新增  1 代表编辑
                bList: [
                { label: '关闭', show: true, event: 'close' },
                { label: '保存', show: true, event: 'save' }
                ]
            },
            printObj: {
                id: 'printTableExam',
                popTitle: '学生索引'
            },
            form: {
                syh: '',
                jhh: '',
                xjh: '',
                xh: '',
                name: '',
                birthDay: '',
                pinyin: '',
                gender: '男',
                SIMNumber: '',
                code: '',
                cardNumber: '',
                jg: '',
                tel: '',
                wx: '',
                qq: '',
                addressCode: '',
                address: '',
                fatherName: '',
                fatherTel: '',
                fatherWorkplace: '',
                motherName: '',
                motherTel: '',
                motherWorkplace: '',
                deleteTags: '正常'
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
                    num1: '060697849990',
                    num2: '',
                    num3: '531672214132',
                    name: '黄慧敏',
                    gender: '',
                    num: '',
                    cardNum: '',
                    jg: '',
                    tel: '',
                    weixin: '',
                    qq: '',
                    tags: '禁用'
                }],
                tr: [{
                        id: '1',
                        label: '学生索引号',
                        prop: 'num1'
                    }, {
                        id: '2',
                        label: '学生健康卡号',
                        prop: 'num2'
                    }, {
                        id: '3',
                        label: '学号',
                        prop: 'num3'
                    }, {
                        id: '4',
                        label: '学生姓名',
                        prop: 'name'
                    }, {
                        id: '5',
                        label: '性别',
                        prop: 'gender'
                    }, {
                        id: '6',
                        label: '身份证号码',
                        prop: 'num'
                    }, {
                        id: '7',
                        label: '推荐卡号',
                        prop: 'cardNum'
                    }, {
                        id: '8',
                        label: '籍贯',
                        prop: 'jg'
                    }, {
                        id: '9',
                        label: '联系手机',
                        prop: 'tel'
                    }, {
                        id: '10',
                        label: '微信',
                        prop: 'weixin'
                    }, {
                        id: '11',
                        label: 'QQ号',
                        prop: 'qq'
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
        addData() {
            this.dialogInfo.visible = true
            this.dialogInfo.title = '新增'
            this.dialogInfo.type = 0
        },
        exportStudent() {
            this.exportDialog.visible = true;
        },
        importStudent() {
            this.importDialog.visible = true;
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
        },
        handleEvent() {

        },
        clickExcelData(item, index) {
            this.exportStudentData[index]["checked"] = !item.checked;
        },
        handleImportStudentClick(event, data) {
            switch (event) {
                case 'close':
                    this.importDialog.visible = false
                    break
                case 'save':
                    this.importDialog.visible = false
                    break
                default:
                    break
            }
        },
        handleExportStudentClick(event, data) {
            switch (event) {
                case 'close':
                    this.exportDialog.visible = false
                    break
                case 'save':
                    this.exportDialog.visible = false
                    break
                default:
                    break
            }
        }
    }
}
</script>

<style lang="scss">
.c_alert {
    padding: 15px;
    border: 1px solid transparent;
    border-radius: 4px;
    &.alert_danger {
        color: #a94442;
        background-color: #f2dede;
        border-color: #ebccd1;
    }
    i {
        top: 1px;
        font-size: 15px;
        padding-right: 5px;
    }
}
.sys_spec_text {
    padding-left: 15px;
    user-select: none;
    list-style: none;
    li {
        position: relative;
        float: left;
        margin: 10px 10px 0 0;
        outline: 0;
        height: 46px;
        list-style: none;
        &.active {
            a {
                color: #ff5d5b;
                border: 1px solid #ff5d5b;
                padding: 0;
                background: url(~@/assets/selected_red.png) right top no-repeat
            }
            
        }
        a {
            cursor: pointer;
            width: 100px;
            height: 39px;
            line-height: 38px;
            text-align: center;
            word-break: keep-all;
            vertical-align: middle;
            white-space: nowrap;
            text-align: center;
            outline: 0;
            display: inline-block;
            border: 1px solid #ccc;
            border-radius: 3px;
            
        }
    }

}
.student_upload {
    .el-upload-dragger {
        width: 522px;
    }
}
.s_form {
    .el-form-item {
        margin-bottom: 4px;
    }
}
</style>
