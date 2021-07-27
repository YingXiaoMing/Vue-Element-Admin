<template>
  <div class="app-container">
    <div class="managerLeft">
      <el-input
        v-model="filterText"
        placeholder="输入关键字进行过滤"
      />

      <el-tree
        ref="tree"
        class="filter-tree"
        :data="treeData"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        @current-change="currentChange"
      />
    </div>
    <div class="managerTopRight">
      <el-input
        v-model="queryOption.lesseeName"
        placeholder="承租人"
        clearable
        style="width: 110px"
      />
      <el-input
        v-model="queryOption.sn"
        placeholder="设备序列号"
        clearable
        readonly
        style="width: 150px"
      />
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="queryDataList"
      >查询</el-button>
      <el-button
        size="mini"
        type="primary"
        @click="openRentInfo(1)"
      >添加</el-button>
      <el-button
        size="mini"
        type="primary"
        @click="openRentInfo(2)"
      >编辑</el-button>
      <el-button
        size="mini"
        type="primary"
        @click="openRentInfo(3)"
      >审核</el-button>
      <el-table
        id="printTableExamination"
        :data="dataList"
        fit
        border
        highlight-current-row
        @current-change="handleCurrentChange"
      >
        <el-table-column type="index" width="60" label="序号" />
        <el-table-column align="center" prop="lesseeName" label="租赁人" />
        <el-table-column align="center" prop="rentingDate" label="租赁时间" />
        <el-table-column align="center" prop="rent" label="租金" />
        <el-table-column align="center" prop="cashPledge" label="押金" />
        <el-table-column align="center" prop="phone" label="联系电话" />
      </el-table>
      <el-pagination
        v-if="queryOption.total > 0"
        :current-page="queryOption.pageIndex"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="queryOption.pageSize"
        :total="queryOption.total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="sizeChange"
        @current-change="pageChange"
      />
    </div>
    <el-dialog :visible.sync="showRentInfo" :title="myTitle" width="22cm" top="0" append-to-body>
      <div class="managerBottom">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" class="demo-ruleForm">
          <el-row class="borderRow">
            <p class="rowp">租赁情况</p>
            <el-col :span="6">
              <el-form-item label="租赁人" prop="lesseeName">
                <el-input v-model="ruleForm.lesseeName" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="起始日期" prop="rentingDate">
                <!--<el-input v-model="ruleForm.rentingDate"></el-input>-->
                <el-date-picker
                  v-model="ruleForm.rentingDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="起始日期"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="截止日期" prop="rentingEndDate">
                <!--<el-input v-model="ruleForm.rentingEndDate"></el-input>-->
                <el-date-picker
                  v-model="ruleForm.rentingEndDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="截止日期"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="租赁天数" prop="rentDays">
                <el-input v-model="ruleForm.rentDays" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="租金" prop="rent">
                <el-input v-model="ruleForm.rent" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="押金" prop="cashPledge">
                <el-input v-model="ruleForm.cashPledge" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="联系电话" prop="phone">
                <el-input v-model="ruleForm.phone" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="rentStatus === 'sh'" class="borderRow">
            <p class="rowp">扣款情况</p>
            <el-col :span="12">
              <el-form-item label="外壳套">
                <el-input-number v-model="ruleForm.rentChargeOptions[0].count" style="width: 80px;" placeholder="面数" :controls="false" @change="change1" />x
                <el-input-number v-model="ruleForm.rentChargeOptions[0].dj" style="width: 80px;" :controls="false" @change="change1" />元=
                <el-input-number v-model="ruleForm.rentChargeOptions[0].charge" style="width: 80px;" placeholder="最高500元" :controls="false" :max="500" />元
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="镜头">
                <el-input-number v-model="ruleForm.rentChargeOptions[1].count" style="width: 80px;" placeholder="厘米" :controls="false" @change="change3" />x
                <el-input-number v-model="ruleForm.rentChargeOptions[1].dj" style="width: 80px;" :controls="false" @change="change3" />元=
                <el-input-number v-model="ruleForm.rentChargeOptions[1].charge" style="width: 80px;" placeholder="最高1500元" :controls="false" :max="1500" />元
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="海绵面">
                <el-input-number v-model="ruleForm.rentChargeOptions[2].charge" :controls="false" :max="300" placeholder="最高扣款300元" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="松紧带">
                <el-select
                  v-model="ruleForm.sjd"
                  style="width:110px;"
                  @change="changeSjd"
                >
                  <el-option
                    v-for="item in sjds"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
                <el-input-number v-model="ruleForm.rentChargeOptions[3].charge" :controls="false" style="width:110px;" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="拆机">
                <el-input-number v-model="ruleForm.rentChargeOptions[4].charge" style="width: 111px;" :controls="false" placeholder="照价赔偿" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="押金退还" prop="enableRetureCashPledge">
                <!--<el-input v-model="ruleForm.enableRetureCashPledge"></el-input>-->
                <el-select
                  v-model="ruleForm.enableRetureCashPledge"
                  placeholder="押金退还"
                  style="width:100%;"
                  clearable
                >
                  <el-option
                    v-for="item in enableRetureCashPledges"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="退回押金" prop="returedCashPledge">
                <el-input v-model="ruleForm.returedCashPledge" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审核时间" prop="auditDate">
                <!--<el-input v-model="ruleForm.auditDate"></el-input>-->
                <el-date-picker
                  v-model="ruleForm.auditDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="审核时间"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审核人员" prop="userName">
                <el-input v-model="ruleForm.userName" />
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="审计说明" prop="auditInstruction">
                <el-input v-model="ruleForm.auditInstruction" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <p class="rowp">对比情况</p>
            <el-col :span="2" style="text-align: center;">
              <span>租前</span>
            </el-col>
            <el-col :span="22" style="margin-bottom: 10px;">
              <cust-img-upload
                ckey="img1"
                :action="actionUrl"
                :file-list="ruleForm.rentingPictures"
                @imgUpload="imgUpload"
              />
            </el-col>
          </el-row>
          <el-row v-if="rentStatus === 'sh'">
            <el-col :span="2" style="text-align: center;">
              <span>租后</span>
            </el-col>
            <el-col :span="22" style="margin-bottom: 10px;">
              <cust-img-upload
                ckey="img2"
                :action="actionUrl"
                :file-list="ruleForm.returedPictures"
                @imgUpload="imgUpload"
              />
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" style="text-align: center;">
              <el-button
                size="mini"
                type="primary"
                @click.native="saveRent"
              >保存</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as env from '@/utils/env'
import * as local from '@/utils/local'
import userManageAction from '@/services/userManage.js'
import { export_table_to_excel } from '@/vendor/Export2Excel'
import { Message, MessageBox } from 'element-ui'
import axios from 'axios'
import CustImgUpload from '@/components/customElement/uploadImg3'
export default {
  name: 'Index',
  components: {
    CustImgUpload
  },
  data() {
    return {
      rentStatus: 'xz', // 新增 xz 编辑 bj 审核 sh
      filterText: '',
      defaultProps: {
        children: 'sub',
        label: 'accountName'
      },
      treeData: [],
      dataList: [],
      myTitle: '',
      fileList: [],
      tableHeight: document.documentElement.clientHeight - 200,
      showRentInfo: false,
      currentRow: null,
      actionUrl: env.VUE_APP_ADMIN_API + 'api/Api/FileWrite',
      sjds: [
        { label: '破损', value: 50 },
        { label: '断裂', value: 100 },
        { label: '扣断', value: 200 }
      ],
      ruleForm: {
        deviceId: '',
        sn: '',
        lesseeName: '',
        rentingDate: '',
        rentingEndDate: '',
        rentDays: '',
        rent: '',
        cashPledge: '',
        phone: '',
        rentingPictures: [],
        rentingPicture1: '',
        rentingPicture2: '',
        rentingPicture3: '',
        rentingPicture4: '',
        rentingPicture5: '',
        id: '',
        enableRetureCashPledge: true,
        returedCashPledge: 0,
        returedPictures: [],
        returedPicture1: '',
        returedPicture2: '',
        returedPicture3: '',
        returedPicture4: '',
        returedPicture5: '',
        auditInstruction: '',
        auditDate: new Date(),
        userName: '',
        rentChargeOptions: [
          { position: '外壳套', count: 0, dj: 100, unit: '面', charge: 0, comment: '' },
          { position: '镜头', count: 0, dj: 300, unit: '厘米', charge: 0, comment: '' },
          { position: '海绵面', count: 0, unit: null, charge: 0, comment: '' },
          { position: '松紧带', count: 0, unit: null, charge: 0, comment: '' },
          { position: '拆机', count: 0, unit: null, charge: 0, comment: '' }
        ]
      },
      queryOption: {
        lesseeName: '',
        sn: '',
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      enableRetureCashPledges: [
        { label: '是', value: true },
        { label: '否', value: false }
      ],
      rules: {
        lesseeName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        rentingDate: [
          { required: true, message: '请输入租赁开始日期', trigger: 'blur' }
        ],
        rentingEndDate: [
          { required: true, message: '请选择租赁结束日期', trigger: 'change' }
        ],
        rentDays: [
          { required: true, message: '请选择租赁天数', trigger: 'change' }
        ],
        rent: [
          { required: true, message: '请输入租金', trigger: 'blur' }
        ],
        cashPledge: [
          { required: true, message: '请输入押金', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      userManageAction.getFetchDeviceTree().then(res => {
        if (res.code === 1) {
          this.bornTree(res.data[0])
        }
      })
    },
    bornTree(deviceData) {
      deviceData.sns.forEach(item => {
        deviceData.sub.push({ accountName: item.sn, deviceId: item.deviceId, type: 'sub' })
      })
      deviceData.sub.forEach(item => {
        if (item.sub !== undefined && item.sub.length > 0) {
          this.bornTree(item)
        }
      })
      this.treeData = [deviceData]
    },
    filterNode(value, data) {
      if (!value) return true
      return data.accountName.indexOf(value) !== -1
    },
    currentChange(data, node) {
      this.queryOption.pageIndex = 1
      if (data.type === 'sub') {
        this.ruleForm.deviceId = data.deviceId
        this.ruleForm.sn = data.accountName
        this.queryOption.sn = data.accountName
      } else {
        this.ruleForm.deviceId = ''
        this.ruleForm.sn = ''
        this.queryOption.sn = ''
      }
      //        this.queryDataList()
    },
    queryDataList() {
      userManageAction.getFetchDeviceRent(this.queryOption).then(res => {
        if (res.code === 1) {
          this.dataList = res.data.items
          this.queryOption.total = res.data.totalCount
        }
      })
    },
    sizeChange(size) {
      this.queryOption.pageSize = size
      this.queryOption.pageIndex = 1
      this.queryDataList()
    },
    pageChange(page) {
      this.queryOption.pageIndex = page
      this.queryDataList()
    },
    saveRent() {
      switch (this.rentStatus) {
        case 'xz':
        case 'bj':
          userManageAction.postDevice(this.ruleForm).then(res => {
            if (res.code === 1) {
              MessageBox({
                title: '提示',
                message: '保存成功！',
                type: 'info',
                showCancelButton: false
              }).then(({ value }) => {
                this.showRentInfo = false
              })
            }
          })
          break
        case 'sh':
          userManageAction.postDeviceAudit(this.ruleForm).then(res => {
            if (res.code === 1) {
              MessageBox({
                title: '提示',
                message: res.data,
                type: 'info',
                showCancelButton: false
              }).then(({ value }) => {
                this.showRentInfo = false
              })
            }
          })
          break
      }
    },
    handleCurrentChange(val) {
      this.currentRow = val
    },
    submitUpload(event) {
      const file = event.target.files
      const formData = new FormData()
      formData.append('file', file[0])
      axios({
        method: 'POST',
        url: 'http://122.51.159.61:90/api/Api/FileWrite',
        data: formData
      }).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
      /* userManageAction.postFileWrit(formData).then(res => {
          if (res.code === 1) {
          }
        })*/
    },
    imgUpload(key, imgList) {
      switch (key) {
        case 'img1':
          this.$set(this.ruleForm, 'rentingPictures', imgList)
          if (imgList[0]) {
            this.$set(this.ruleForm, 'rentingPicture1', imgList[0].imgId)
          }
          if (imgList[1]) {
            this.$set(this.ruleForm, 'rentingPicture2', imgList[1].imgId)
          }
          if (imgList[2]) {
            this.$set(this.ruleForm, 'rentingPicture3', imgList[2].imgId)
          }
          if (imgList[3]) {
            this.$set(this.ruleForm, 'rentingPicture4', imgList[3].imgId)
          }
          if (imgList[4]) {
            this.$set(this.ruleForm, 'rentingPicture5', imgList[4].imgId)
          }
          break
        case 'img2':
          this.$set(this.ruleForm, 'returedPictures', imgList)
          if (imgList[0]) {
            this.$set(this.ruleForm, 'returedPicture1', imgList[0].imgId)
          }
          if (imgList[1]) {
            this.$set(this.ruleForm, 'returedPicture2', imgList[1].imgId)
          }
          if (imgList[2]) {
            this.$set(this.ruleForm, 'returedPicture3', imgList[2].imgId)
          }
          if (imgList[3]) {
            this.$set(this.ruleForm, 'returedPicture4', imgList[3].imgId)
          }
          if (imgList[4]) {
            this.$set(this.ruleForm, 'returedPicture5', imgList[4].imgId)
          }
          break
        default:
          break
      }
    },
    changeSjd(data) {
      this.ruleForm.rentChargeOptions[3].charge = data
    },
    openRentInfo(num) {
      switch (num) {
        case 1:
          if (this.ruleForm.deviceId !== '') {
            this.myTitle = '新增'
            this.rentStatus = 'xz'
            this.showRentInfo = true
            this.$refs.ruleForm.resetFields()
            this.ruleForm.lesseeName = ''
            this.ruleForm.rentingDate = ''
            this.ruleForm.rentingEndDate = ''
            this.ruleForm.rentDays = ''
            this.ruleForm.rent = ''
            this.ruleForm.cashPledge = ''
            this.ruleForm.phone = ''
            this.ruleForm.rentingPicture1 = ''
            this.ruleForm.rentingPicture2 = ''
            this.ruleForm.rentingPicture3 = ''
            this.ruleForm.rentingPicture4 = ''
            this.ruleForm.rentingPicture5 = ''
            this.ruleForm.enableRetureCashPledge = true
            this.ruleForm.returedPicture1 = ''
            this.ruleForm.returedPicture2 = ''
            this.ruleForm.returedPicture3 = ''
            this.ruleForm.returedPicture4 = ''
            this.ruleForm.returedPicture5 = ''
            this.ruleForm.auditInstruction = ''
            this.ruleForm.auditDate = ''
            this.ruleForm.userName = ''
            this.ruleForm.rentingPictures = []
            this.ruleForm.returedPictures = []
          } else {
            MessageBox({
              title: '提示',
              message: '请选择要出租的设备！',
              type: 'info',
              showCancelButton: false
            })
          }
          break
        case 2:
          if (this.currentRow !== null) {
            this.myTitle = '编辑'
            this.rentStatus = 'bj'
            this.showRentInfo = true
            userManageAction.getDevice(this.currentRow.id).then(res => {
              if (res.code === 1) {
                this.ruleForm = res.data
                this.ruleForm.rentingPictures = []
                if (this.ruleForm.rentingPicture1 !== '' && this.ruleForm.rentingPicture1 !== null) {
                  this.ruleForm.rentingPictures.push({ imgId: this.ruleForm.rentingPicture1, url: env.VUE_APP_ADMIN_API + 'api/Api/FileRead/' + this.ruleForm.rentingPicture1 })
                }
                if (this.ruleForm.rentingPicture2 !== '' && this.ruleForm.rentingPicture2 !== null) {
                  this.ruleForm.rentingPictures.push({ imgId: this.ruleForm.rentingPicture2, url: env.VUE_APP_ADMIN_API + 'api/Api/FileRead/' + this.ruleForm.rentingPicture2 })
                }
                if (this.ruleForm.rentingPicture3 !== '' && this.ruleForm.rentingPicture3 !== null) {
                  this.ruleForm.rentingPictures.push({ imgId: this.ruleForm.rentingPicture3, url: env.VUE_APP_ADMIN_API + 'api/Api/FileRead/' + this.ruleForm.rentingPicture3 })
                }
                if (this.ruleForm.rentingPicture4 !== '' && this.ruleForm.rentingPicture4 !== null) {
                  this.ruleForm.rentingPictures.push({ imgId: this.ruleForm.rentingPicture4, url: env.VUE_APP_ADMIN_API + 'api/Api/FileRead/' + this.ruleForm.rentingPicture4 })
                }
                if (this.ruleForm.rentingPicture5 !== '' && this.ruleForm.rentingPicture5 !== null) {
                  this.ruleForm.rentingPictures.push({ imgId: this.ruleForm.rentingPicture5, url: env.VUE_APP_ADMIN_API + 'api/Api/FileRead/' + this.ruleForm.rentingPicture5 })
                }
              }
            })
          } else {
            MessageBox({
              title: '提示',
              message: '请选择要编辑的行！',
              type: 'info',
              showCancelButton: false
            })
          }
          break
        case 3:
          if (this.currentRow !== null) {
            this.myTitle = '审核'
            this.rentStatus = 'sh'
            this.showRentInfo = true
            userManageAction.getDevice(this.currentRow.id).then(res => {
              if (res.code === 1) {
                this.ruleForm = res.data
                this.ruleForm.auditDate = new Date()
                this.ruleForm.userName = local.get('auth_userName')
                this.ruleForm.rentChargeOptions = [
                  { position: '外壳套', count: '', dj: 100, unit: '面', charge: '', comment: '' },
                  { position: '镜头', count: '', dj: 300, unit: '厘米', charge: '', comment: '' },
                  { position: '海绵面', count: 0, unit: null, charge: '', comment: '' },
                  { position: '松紧带', count: 0, unit: null, charge: '', comment: '' },
                  { position: '拆机', count: 0, unit: null, charge: '', comment: '' }
                ]
                this.ruleForm.rentingPictures = []
                this.ruleForm.returedPictures = []
                if (this.ruleForm.rentingPicture1 !== '' && this.ruleForm.rentingPicture1 !== null) {
                  this.ruleForm.rentingPictures.push({ imgId: this.ruleForm.rentingPicture1, url: env.VUE_APP_ADMIN_API + 'api/Api/FileRead/' + this.ruleForm.rentingPicture1 })
                }
                if (this.ruleForm.rentingPicture2 !== '' && this.ruleForm.rentingPicture2 !== null) {
                  this.ruleForm.rentingPictures.push({ imgId: this.ruleForm.rentingPicture2, url: env.VUE_APP_ADMIN_API + 'api/Api/FileRead/' + this.ruleForm.rentingPicture2 })
                }
                if (this.ruleForm.rentingPicture3 !== '' && this.ruleForm.rentingPicture3 !== null) {
                  this.ruleForm.rentingPictures.push({ imgId: this.ruleForm.rentingPicture3, url: env.VUE_APP_ADMIN_API + 'api/Api/FileRead/' + this.ruleForm.rentingPicture3 })
                }
                if (this.ruleForm.rentingPicture4 !== '' && this.ruleForm.rentingPicture4 !== null) {
                  this.ruleForm.rentingPictures.push({ imgId: this.ruleForm.rentingPicture4, url: env.VUE_APP_ADMIN_API + 'api/Api/FileRead/' + this.ruleForm.rentingPicture4 })
                }
                if (this.ruleForm.rentingPicture5 !== '' && this.ruleForm.rentingPicture5 !== null) {
                  this.ruleForm.rentingPictures.push({ imgId: this.ruleForm.rentingPicture5, url: env.VUE_APP_ADMIN_API + 'api/Api/FileRead/' + this.ruleForm.rentingPicture5 })
                }
                if (this.ruleForm.returedPicture1 !== '' && this.ruleForm.returedPicture1 !== null) {
                  this.ruleForm.returedPictures.push({ imgId: this.ruleForm.returedPicture1, url: env.VUE_APP_ADMIN_API + 'api/Api/FileRead/' + this.ruleForm.returedPicture1 })
                }
                if (this.ruleForm.returedPicture2 !== '' && this.ruleForm.returedPicture2 !== null) {
                  this.ruleForm.returedPictures.push({ imgId: this.ruleForm.returedPicture2, url: env.VUE_APP_ADMIN_API + 'api/Api/FileRead/' + this.ruleForm.returedPicture2 })
                }
                if (this.ruleForm.returedPicture3 !== '' && this.ruleForm.returedPicture3 !== null) {
                  this.ruleForm.returedPictures.push({ imgId: this.ruleForm.returedPicture3, url: env.VUE_APP_ADMIN_API + 'api/Api/FileRead/' + this.ruleForm.returedPicture3 })
                }
                if (this.ruleForm.returedPicture4 !== '' && this.ruleForm.returedPicture4 !== null) {
                  this.ruleForm.returedPictures.push({ imgId: this.ruleForm.returedPicture4, url: env.VUE_APP_ADMIN_API + 'api/Api/FileRead/' + this.ruleForm.returedPicture4 })
                }
                if (this.ruleForm.returedPicture5 !== '' && this.ruleForm.returedPicture5 !== null) {
                  this.ruleForm.returedPictures.push({ imgId: this.ruleForm.returedPicture5, url: env.VUE_APP_ADMIN_API + 'api/Api/FileRead/' + this.ruleForm.returedPicture5 })
                }
              }
            })
          } else {
            MessageBox({
              title: '提示',
              message: '请选择要审核的行！',
              type: 'info',
              showCancelButton: false
            })
          }
          break
      }
    },
    change1(currentValue) {
      this.ruleForm.rentChargeOptions[0].charge = this.ruleForm.rentChargeOptions[0].count * this.ruleForm.rentChargeOptions[0].dj
    },
    change3(currentValue) {
      this.ruleForm.rentChargeOptions[1].charge = this.ruleForm.rentChargeOptions[1].count * this.ruleForm.rentChargeOptions[1].dj
    }
  }
}
</script>

<style>
.el-dialog__body {
    padding-left: 18px !important;
    padding-top: 5px !important;
}
</style>
<style scoped>
.managerLeft {
    width: 300px;
    height: calc(100vh - 110px);
    overflow: auto;
    float: left;
}
.managerTopRight {
    width: calc(100% - 320px);
    float: right;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #999999;
}
.managerRight {
    width: calc(100% - 320px);
    height: 100%;
    float: right;
    padding: 10px;
    margin-bottom: 30px;
    border: 1px solid #999999;
}
.managerBottom {
    width: 21cm;
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #999999;
}
.el-table {
    margin-top: 10px;
}
.el-pagination {
    text-align: center;
}
.borderRow {
    border: 1px solid #ccb7b7;
    margin-bottom: 5px;
    padding: 2px;
}
.rowp {
    padding-left: 20px;
}
</style>
