<template>
  <div style="margin-left:10px;">
    <div style="margin-top:20px;margin-bottom:10px;">
      <el-input
        v-model.number="regTaskFormData.regTaskName"
        placeholder="任务名称"
        clearable
        style="width: 140px"
      />
      <el-select
        v-model="regTaskFormData.carderId"
        placeholder="卡商名称"
        clearable
        style="width: 140px"
      >
        <el-option
          v-for="item in ksList"
          :key="item.carderId"
          :title="item.carderName"
          :label="item.carderName"
          :value="item.carderId"
        />
      </el-select>
      <el-select v-model="regTaskFormData.status" placeholder="任务状态" clearable style="width: 140px">
        <el-option
          v-for="item in statusList"
          :key="item.id"
          :title="item.chnName"
          :label="item.chnName"
          :value="item.id"
        />
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="onRegTaskSearch">搜索</el-button>
      <el-button type="primary" icon="el-icon-setting" @click="onRegTaskBatchStop">暂停任务</el-button>
      <el-button type="primary" icon="el-icon-setting" @click="onRegTaskBatchStart">开始任务</el-button>
      <el-button type="primary" icon="el-icon-setting" @click="onBatchRegTask">批量创建任务</el-button>
    </div>

    <el-table
      ref="regTaskTable"
      v-loading="regTaskListLoading"
      row-key="regTaskId"
      :data="regTaskDataList"
      fit
      border
      highlight-current-row
      :expand-row-keys="regTaskExpandIds"
      style="width: 99.9%;"
      @expand-change="regTaskExpand"
      @sort-change="regTaskSortChange"
      @selection-change="onregTaskSelect"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table
            v-loading="regMachineLoding"
            row-key="deviceId"
            :data="regMachineDataList"
            :expand-row-keys="regMachineExpandIds"
            fit
            border
            highlight-current-row
            style="width: 99.9%"
            @expand-change="regMachineExpand"
            @sort-change="regMachineSortChange"
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-table
                  v-loading="regTaskItemLoding"
                  :data="regTaskItemDataList"
                  fit
                  border
                  highlight-current-row
                  style="width: 99.9%"
                  @sort-change="regTaskItemSortChange"
                >
                  <el-table-column
                    prop="regTaskItemId"
                    label="子任务Id"
                    align="center"
                    sortable="custom"
                    width="100"
                  />
                  <el-table-column prop="mobile" label="绑定手机号" align="center" width="120" />
                  <el-table-column prop="taskName" label="绑定AW文件" align="center" width="100">
                    <template slot-scope="scope">
                      <el-button size="mini" type="success" @click="awFileClick(scope.row)">查看</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column prop="taskName" label="当前IP及归属地" align="center">
                    <template slot-scope="scope">
                      {{ scope.row.ip }}({{
                        (scope.row.region || "") + (scope.row.province || "")+ (scope.row.city || "")
                      }})
                    </template>
                  </el-table-column>
                  <el-table-column prop="createTime" label="创建时间" align="center" sortable="custom" />
                  <el-table-column prop="currentLogInfo" label="当前步骤说明" align="center" />
                  <el-table-column
                    prop="currentLogCreateTime"
                    label="当前步骤时间"
                    align="center"
                    sortable="custom"
                  />
                  <el-table-column prop="endResultText" label="最终结果" align="center" />
                  <el-table-column prop="endResultLog" label="最终结果说明" />
                  <el-table-column label="操作" width="120" align="center">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="success"
                        @click="regTaskJournalClick(scope.row)"
                      >注册日志</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="pagination-container">
                  <el-pagination
                    v-show="regTaskItemListTotal > 0"
                    :current-page="regTaskItemFormData.pageIndex"
                    :page-sizes="[10, 20, 30, 50]"
                    :page-size="regTaskItemFormData.pageSize"
                    :total="regTaskItemListTotal"
                    background
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="regTaskItemSizeChange"
                    @current-change="regTaskItemCurrentChange"
                  />
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="deviceNumber" label="注册机编号" align="center" sortable="custom" />
            <el-table-column prop="taskName" label="IP归属地" align="center">
              <template slot-scope="scope">{{ scope.row.ip }}({{ scope.row.region || "" }})</template>
            </el-table-column>
            <el-table-column prop="itemCount" label="已执行次数" align="center" sortable="custom" />
            <el-table-column prop="itemSuccessCount" label="成功次数" align="center" sortable="custom" />
            <el-table-column prop="itemFaildCount" label="失败次数" align="center" sortable="custom" />
            <el-table-column prop="lastExecutTime" label="最后执行时间" align="center" sortable="custom" />
            <el-table-column label="操作" width="120" align="center">
              <template slot-scope="scope">
                <el-button size="mini" type="success" @click="regTaskHistoryClick(scope.row)">历史数据</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination-container">
            <el-pagination
              v-show="regMachineListTotal > 0"
              :current-page="regMachineFormData.pageIndex"
              :page-sizes="[10, 20, 30, 50]"
              :page-size="regMachineFormData.pageSize"
              :total="regMachineListTotal"
              background
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="regMachineSizeChange"
              @current-change="regMachineCurrentChange"
            />
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="regTaskName" label="任务名称" align="center" />
      <el-table-column prop="carderName" label="卡商名称" align="center" />
      <el-table-column prop="taskName" label="注册归属地" align="center">
        <template slot-scope="scope">{{ (scope.row.province || "") + (scope.row.city || "") }}</template>
      </el-table-column>
      <el-table-column prop="processDateStart" label="执行日期" align="center" sortable="custom">
        <template slot-scope="scope">
          {{
            dateFormat(scope.row.processDateStart) +
              " ~ " +
              dateFormat(scope.row.processDateEnd)
          }}
        </template>
      </el-table-column>
      <el-table-column prop="processTimeStart" label="执行时间" align="center" sortable="custom">
        <template
          slot-scope="scope"
        >{{ scope.row.processTimeStart + " ~ " + scope.row.processTimeEnd }}</template>
      </el-table-column>
      <el-table-column prop="regTotal" label="目标执行次数" align="center" sortable="custom" />
      <el-table-column prop="itemCount" label="已执行数" align="center" sortable="custom" />
      <el-table-column prop="itemSuccessCount" label="成功次数" align="center" sortable="custom">
        <template
          slot-scope="scope"
        >{{ scope.row.itemSuccessCount }}/{{ scope.row.itemCount }}({{ (scope.row.itemSuccessPercent*100).toFixed(2)+"%" }})</template>
      </el-table-column>
      <el-table-column prop="itemFaildCount" label="失败次数" align="center" sortable="custom">
        <template
          slot-scope="scope"
        >{{ scope.row.itemFaildCount }}/{{ scope.row.itemCount }}({{ (scope.row.itemFaildPercent*100).toFixed(2)+"%" }})</template>
      </el-table-column>
      <el-table-column prop="statusText" label="任务状态" align="center" sortable="custom" />
      <el-table-column prop="createTime" label="创建时间" align="center" sortable="custom" />
      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="onRegTaskEdit(scope.row)">实时修改参数</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        v-show="regTaskListTotal > 0"
        :current-page="regTaskFormData.pageIndex"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="regTaskFormData.pageSize"
        :total="regTaskListTotal"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="regTaskSizeChange"
        @current-change="regTaskCurrentChange"
      />
    </div>

    <el-dialog
      :title="'注册任务批量编辑'"
      :visible.sync="regTaskBatchShow"
      width="765px"
      :close-on-click-modal="false"
      @close="regTaskBatchClose"
    >
      <el-form
        ref="regTaskBatchForm"
        :rules="regTaskBatchFormRules"
        :model="regTaskBatchFormModel"
        label-position="left"
        label-width="160px"
        style="margin-left:20px;"
      >
        <el-form-item label="任务名称" prop="regTaskName" :required="true">
          <el-input v-model="regTaskBatchFormModel.regTaskName" placeholder="任务名称" />
        </el-form-item>

        <el-form-item label="注册设备" prop="deviceIds" :required="true">
          <el-select
            v-model="regTaskBatchFormModel.deviceIds"
            placeholder="注册设备"
            filterable
            multiple
            clearable
            style="width: 100%"
          >
            <el-option
              v-for="item in deviceList"
              :key="item.deviceId"
              :title="item.deviceNumber"
              :label="item.deviceNumber"
              :value="item.deviceId"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="注册归属地" prop="province" :required="true">
          <el-row>
            <el-col :span="12">
              <el-form-item label-width="0px" prop="province" style="margin-bottom: 0">
                <el-select
                  v-model="regTaskBatchFormModel.province"
                  placeholder="省份"
                  filterable
                  clearable
                  style="width:100%"
                  @change="carderProvinceChange"
                >
                  <el-option
                    v-for="item in allProvince"
                    :key="item.cname"
                    :title="item.cname"
                    :label="item.cname"
                    :value="item.cname"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label-width="0px" prop="city" style="margin-bottom: 0">
                <el-select
                  v-model="regTaskBatchFormModel.city"
                  placeholder="城市"
                  filterable
                  clearable
                  style="width:100%"
                >
                  <el-option
                    v-for="item in curCitity"
                    :key="item.cname"
                    :title="item.cname"
                    :label="item.cname"
                    :value="item.cname"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="卡商" prop="carderId" :required="true">
          <el-select
            v-model="regTaskBatchFormModel.carderId"
            placeholder="卡商"
            filterable
            clearable
            style="width: 100%"
          >
            <el-option
              v-for="item in ksList"
              :key="item.carderId"
              :title="item.carderName"
              :label="item.carderName"
              :value="item.carderId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="执行日期" prop="processDateStart" :required="true">
          <el-row>
            <el-col :span="10">
              <el-form-item label-width="0px" prop="processDateStart" style="margin-bottom: 0">
                <el-date-picker
                  v-model="regTaskBatchFormModel.processDateStart"
                  type="date"
                  placeholder="开始日期"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
            <el-col :span="2" style="margin-left:15px;">至</el-col>
            <el-col :span="10">
              <el-form-item label-width="0px" prop="processDateEnd" style="margin-bottom: 0">
                <el-date-picker
                  v-model="regTaskBatchFormModel.processDateEnd"
                  type="date"
                  placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="执行时间" prop="processTimeStart" :required="true">
          <el-row>
            <el-col :span="10">
              <el-form-item label-width="0px" prop="processTimeStart" style="margin-bottom: 0">
                <el-time-picker
                  v-model="regTaskBatchFormModel.processTimeStart"
                  placeholder="开始时间"
                  :picker-options="{ selectableRange: '00:00:00 - 23:59:59' }"
                  value-format="HH:mm:ss"
                />
              </el-form-item>
            </el-col>
            <el-col :span="2" style="margin-left:15px;">至</el-col>
            <el-col :span="10">
              <el-form-item label-width="0px" prop="processTimeEnd" style="margin-bottom: 0">
                <el-time-picker
                  v-model="regTaskBatchFormModel.processTimeEnd"
                  placeholder="结束时间"
                  :picker-options="{ selectableRange: '00:00:00 - 23:59:59' }"
                  value-format="HH:mm:ss"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="累计执行次数" prop="regTotal" required style="float:left" min="1">
          <el-input
            v-model.number="regTaskBatchFormModel.regTotal"
            placeholder="累计执行次数"
            style="width: 150px;margin-right: 5px"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="regTaskBatchClose">取消</el-button>
        <el-button type="primary" @click="regTaskBatchSave">执行任务</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :title="'历史数据'"
      :visible.sync="regTaskHistoryShow"
      width="765px"
      :close-on-click-modal="false"
      @close="regTaskHistoryShow = false"
    >
      <el-table
        v-loading="regTaskHistoryLoding"
        row-key="regTaskHistoryId"
        :data="regTaskHistoryDataList"
        fit
        border
        highlight-current-row
        style="width: 99.9%"
      >
        <el-table-column prop="date" label="日期" align="center" />
        <el-table-column prop="itemCount" label="执行次数" align="center" />
        <el-table-column prop="itemSuccessCount" label="成功次数" align="center" />
        <el-table-column prop="itemFaildCount" label="失败次数" align="center" />
        <el-table-column prop="percent" label="成功率" align="center">
          <template slot-scope="scope">{{ (scope.row.percent*100).toFixed(2) }}%</template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          v-show="regTaskHistoryListTotal > 0"
          :current-page="regTaskHistoryFormData.pageIndex"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="regTaskHistoryFormData.pageSize"
          :total="regTaskHistoryListTotal"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="regTaskHistorySizeChange"
          @current-change="regTaskHistoryCurrentChange"
        />
      </div>
    </el-dialog>

    <el-dialog
      :title="'注册日志'"
      :visible.sync="regTaskJournalShow"
      width="765px"
      :close-on-click-modal="false"
      @close="regTaskJournalShow = false"
    >
      <el-table
        v-loading="regTaskJournalLoding"
        row-key="regTaskJournalId"
        :data="regTaskJournalDataList"
        fit
        border
        highlight-current-row
        style="width: 99.9%"
      >
        <el-table-column prop="createTime" label="日志时间" align="center" />
        <el-table-column prop="ip" label="当前IP及归属地" align="center">
          <template slot-scope="scope">
            {{ scope.row.ip }}({{
              (scope.row.region || "") + (scope.row.province || "")+ (scope.row.city || "")
            }})
          </template>
        </el-table-column>
        <el-table-column prop="logTypeText" label="日志类型" align="center" />
        <el-table-column prop="logInfo" label="日志说明" />
      </el-table>
      <div class="pagination-container">
        <el-pagination
          v-show="regTaskJournalListTotal > 0"
          :current-page="regTaskJournalFormData.pageIndex"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="regTaskJournalFormData.pageSize"
          :total="regTaskJournalListTotal"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="regTaskJournalSizeChange"
          @current-change="regTaskJournalCurrentChange"
        />
      </div>
    </el-dialog>

    <el-dialog
      :title="'AW文件展示'"
      :visible.sync="awFileShow"
      width="765px"
      :close-on-click-modal="false"
      @close="awFileShow = false"
    >
      <el-input
        type="textarea"
        :value="awFile"
        style="width:100%;height:100%"
        :autosize="{ minRows: 15, maxRows: 30 }"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="awFileCopy">复制</el-button>
        <el-button type="primary" @click="awFileDown">下载</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { Message, MessageBox } from 'element-ui'
import Vue from 'vue'
import * as utils from '@/utils'
import routeHelper from '@/layout/mixin/routeHelper'
import regTaskAction from '@/services/regTaskAction.js'
import carderAction from '@/services/carder.js'
import deviceAction from '@/services/device.js'

export default {
  name: 'RegTask',
  components: {},
  mixins: [routeHelper],
  data() {
    return {
      ksList: [],
      statusList: [],
      regTaskSelectIds: [],
      regTaskFormData: {
        regTaskName: '',
        carderId: '',
        status: '',
        pageIndex: 1,
        pageSize: 20
      },
      regTaskDataList: [],
      regTaskListLoading: false,
      regTaskListTotal: 0,
      regTaskExpandIds: [],

      regMachineFormData: {
        pageIndex: 1,
        pageSize: 20
      },
      regMachineDataList: [],
      regMachineLoding: false,
      regMachineListTotal: 0,
      regMachineExpandIds: [],

      regTaskItemFormData: {
        pageIndex: 1,
        pageSize: 20
      },
      regTaskItemLoding: false,
      regTaskItemDataList: [],
      regTaskItemListTotal: 0,

      regTaskBatchShow: false,
      deviceList: [],
      allProvince: [],
      allCitity: [],
      curCitity: [],
      regTaskBatchFormRules: {
        regTaskName: [{ required: true, message: '请输入任务名称' }],
        deviceIds: [{ required: true, message: '请选择注册设备' }],
        province: [{ required: true, message: '请选择注册归属地' }],
        city: [{ required: true, message: '请选择注册归属地' }],
        carderId: [{ required: true, message: '请选择卡商' }],
        processDateStart: [{ required: true, message: '请选择执行开始日期' }],
        processDateEnd: [{ required: true, message: '请选择执行结束日期' }],
        processTimeStart: [{ required: true, message: '请选择执行开始时间' }],
        processTimeEnd: [{ required: true, message: '请选择执行结束时间' }],
        regTotal: [{ required: true, message: '请输入累计执行次数' }]
      },
      regTaskBatchFormModel: {
        regTaskName: '',
        deviceIds: [],
        province: '',
        city: '',
        carderId: '',
        processDateStart: '',
        processDateEnd: '',
        processTimeStart: '',
        processTimeEnd: '',
        regTotal: 1
      },

      regTaskHistoryFormData: {
        pageIndex: 1,
        pageSize: 10
      },
      regTaskHistoryShow: false,
      regTaskHistoryLoding: false,
      regTaskHistoryDataList: [],
      regTaskHistoryListTotal: 0,

      regTaskJournalFormData: {
        pageIndex: 1,
        pageSize: 10
      },
      regTaskJournalShow: false,
      regTaskJournalLoding: false,
      regTaskJournalDataList: [],
      regTaskJournalListTotal: 0,

      awFileShow: false,
      awFile: ''
    }
  },
  computed: {},
  created() {
    this.cardAll()
    this.stateAllEnumList()
    this.regTaskByPage()
  },
  methods: {
    ...mapActions({
      getBaseDictEnumList: 'baseDict/getBaseDictEnumList'
    }),
    dateFormat(cellValue) {
      return utils.parseTime(cellValue, '{y}-{m}-{d}')
    },
    cardAll() {
      carderAction.getAll().then(res => {
        this.ksList = res.result
      })
    },
    stateAllEnumList() {
      this.getBaseDictEnumList({ enumName: '养号任务执行状态' }).then(res => {
        this.statusList = res
      })
    },
    deviceAll() {
      deviceAction.getAll().then(res => {
        this.deviceList = res.result
      })
    },
    addressInit() {
      this.$store.dispatch('bot/getAllProvince').then(res => {
        this.allProvince = res || []
      })
      this.$store.dispatch('bot/getAllCitity').then(res => {
        this.allCitity = res || []
      })
    },
    regTaskByPage() {
      this.regTaskListLoading = true
      regTaskAction.regTasks(this.regTaskFormData).then(res => {
        this.regTaskListTotal = res.result.totalCount
        this.regTaskFormData.pageSize = res.result.pageSize
        this.regTaskDataList = res.result.items
        this.regTaskListLoading = false
      })
    },
    onRegTaskSearch() {
      this.regTaskFormData.pageIndex = 1
      this.regTaskByPage()
    },
    onSelectTask(val) {
      console.log('val: ', val)
    },
    onRegTaskBatchStop() {
      if (this.regTaskSelectIds.length <= 0) {
        Message({ type: 'error', message: '请至少选择一项进行操作！' })
        return false
      }
      MessageBox({
        title: '提示',
        message: '此操作将批量停止任务，是否继续？',
        type: 'warning',
        showCancelButton: true
      }).then(() => {
        console.log('ids: ', this.regTaskSelectIds)
        regTaskAction
          .regTaskToggleStatus({
            regTaskIds: this.regTaskSelectIds,
            stop: true
          })
          .then(res => {
            Message({
              type: res ? 'success' : 'error',
              message: `批量停止任务${res ? '成功' : '失败'}`
            })
            res && this.regTaskByPage()
          })
      })
    },
    onRegTaskBatchStart() {
      if (this.regTaskSelectIds.length <= 0) {
        Message({ type: 'error', message: '请至少选择一项进行操作！' })
        return false
      }
      MessageBox({
        title: '提示',
        message: '此操作将批量开始任务，是否继续？',
        type: 'warning',
        showCancelButton: true
      }).then(() => {
        regTaskAction
          .regTaskToggleStatus({
            regTaskIds: this.regTaskSelectIds,
            stop: false
          })
          .then(res => {
            Message({
              type: res ? 'success' : 'error',
              message: `批量开始任务${res ? '成功' : '失败'}`
            })
            res && this.regTaskByPage()
          })
      })
    },
    onBatchRegTask() {
      this.deviceAll()
      this.addressInit()
      this.cardAll()
      this.regTaskBatchShow = true
    },
    onRegTaskEdit(row) {
      this.deviceAll()
      this.addressInit()
      this.cardAll()
      this.regTaskBatchFormModel = JSON.parse(JSON.stringify(row))
      this.regTaskBatchShow = true
    },
    regTaskBatchClose() {
      this.regTaskBatchFormModel = {
        regTaskName: '',
        deviceIds: [],
        province: '',
        city: '',
        carderId: '',
        processDateStart: '',
        processDateEnd: '',
        processTimeStart: '',
        processTimeEnd: '',
        regTotal: 1
      }
      this.$refs['regTaskBatchForm'].clearValidate()
      this.$refs['regTaskBatchForm'].resetFields()
      this.regTaskBatchShow = false
    },
    regTaskBatchSave() {
      this.$refs['regTaskBatchForm'].validate(valid => {
        if (!valid) return false

        if (
          this.regTaskBatchFormModel.processDateStart >
          this.regTaskBatchFormModel.processDateEnd
        ) {
          Message({
            type: 'error',
            message: '执行结束日期需大于开始日期'
          })
          return false
        }

        if (
          this.regTaskBatchFormModel.processTimeStart >
          this.regTaskBatchFormModel.processTimeEnd
        ) {
          Message({
            type: 'error',
            message: '执行结束时间需大于开始时间'
          })
          return false
        }
        if (this.regTaskBatchFormModel.regTotal <= 0) {
          Message({
            type: 'error',
            message: '请输入累计执行次数'
          })
          return false
        }

        const data = JSON.parse(JSON.stringify(this.regTaskBatchFormModel))

        regTaskAction.regTask(data).then(res => {
          if (res && res.result) {
            Message({ type: 'success', message: '保存成功' })
            this.regTaskBatchClose()
            this.regTaskByPage()
          }
        })
      })
    },
    regTaskExpand(row, expandedRows) {
      this.regMachineFormData.pageIndex = 1
      if (expandedRows.length <= 0) {
        this.regTaskExpandIds = []
        return
      }
      this.regTaskExpandIds = [row.regTaskId]
      this.regMachineFormData.regTaskId = row.regTaskId
      this.regMachineByPage()
    },
    regTaskSortChange(res) {
      this.regTaskFormData.sortName = res.prop || ''
      this.regTaskFormData.sortOrder = res.order == 'ascending' ? 1 : 0
      this.regTaskByPage()
    },
    onregTaskSelect(res) {
      this.regTaskSelectIds = res.map(item => item.regTaskId)
    },
    regTaskSizeChange(size) {
      this.regTaskFormData.pageIndex = 1
      this.regTaskFormData.pageSize = size
      this.regTaskByPage()
    },
    regTaskCurrentChange(index) {
      this.regTaskFormData.pageIndex = index
      this.regTaskByPage()
    },
    regMachineByPage() {
      this.regMachineLoding = true
      regTaskAction.regTaskDevices(this.regMachineFormData).then(res => {
        this.regMachineListTotal = res.result.totalCount
        this.regMachineFormData.pageSize = res.result.pageSize
        this.regMachineDataList = res.result.items
        this.regMachineLoding = false
      })
    },
    regMachineExpand(row, expandedRows) {
      this.regTaskItemFormData.pageIndex = 1
      if (expandedRows.length <= 0) {
        this.regTaskItemE = []
        return
      }
      this.regMachineExpandIds = [row.deviceId]
      this.regTaskItemFormData.regTaskId = this.regTaskExpandIds[0]
      this.regTaskItemFormData.deviceId = row.deviceId
      this.regTaskItemByPage()
    },
    regMachineSortChange(res) {
      this.regMachineFormData.sortName = res.prop || ''
      this.regMachineFormData.sortOrder = res.order == 'ascending' ? 1 : 0
      this.regMachineByPage()
    },
    regMachineSizeChange(size) {
      this.regMachineFormData.pageIndex = 1
      this.regMachineFormData.pageSize = size
      this.regMachineByPage()
    },
    regMachineCurrentChange(index) {
      this.regMachineFormData.pageIndex = index
      this.regMachineByPage()
    },
    regTaskItemByPage() {
      this.regTaskItemLoding = true
      regTaskAction.regTaskItems(this.regTaskItemFormData).then(res => {
        this.regTaskItemListTotal = res.result.totalCount
        this.regTaskItemFormData.pageSize = res.result.pageSize
        this.regTaskItemDataList = res.result.items
        this.regTaskItemLoding = false
      })
    },
    regTaskItemSortChange(res) {
      this.regTaskItemFormData.sortName = res.prop || ''
      this.regTaskItemFormData.sortOrder = res.order == 'ascending' ? 1 : 0
      this.regTaskItemByPage()
    },
    regTaskItemSizeChange(size) {
      this.regTaskItemFormData.pageIndex = 1
      this.regTaskItemFormData.pageSize = size
      this.regTaskItemByPage()
    },
    regTaskItemCurrentChange(index) {
      this.regTaskItemFormData.pageIndex = index
      this.regTaskItemByPage()
    },
    carderProvinceChange(name) {
      const province = this.allProvince.find(a => a.cname == name)
      if (province) { this.curCitity = this.allCitity.filter(a => a.state_id == province.id) } else this.curCitity = []
      this.regTaskBatchFormModel.city = ''
    },
    awFileClick(row) {
      regTaskAction
        .regTaskItemAW({ regTaskItemId: row.regTaskItemId })
        .then(res => {
          this.awFile = JSON.stringify(res.result)
          this.awFileShow = true
        })
    },
    regTaskHistoryClick(row) {
      this.regTaskHistoryFormData.regTaskId = this.regTaskExpandIds[0]
      this.regTaskHistoryFormData.deviceId = row.deviceId
      this.regTaskHistoryByPage()
    },
    regTaskHistoryByPage() {
      this.regTaskHistoryLoding = true
      regTaskAction
        .regTaskDeviceSummaries(this.regTaskHistoryFormData)
        .then(res => {
          this.regTaskHistoryListTotal = res.result.totalCount
          this.regTaskHistoryFormData.pageSize = res.result.pageSize
          this.regTaskHistoryDataList = res.result.items
          this.regTaskHistoryShow = true
          this.regTaskHistoryLoding = false
        })
    },
    regTaskHistorySizeChange(size) {
      this.regTaskHistoryFormData.pageIndex = 1
      this.regTaskHistoryFormData.pageSize = size
      this.regTaskHistoryByPage()
    },
    regTaskHistoryCurrentChange(index) {
      this.regTaskHistoryFormData.pageIndex = index
      this.regTaskHistoryByPage()
    },

    regTaskJournalClick(row) {
      this.regTaskJournalFormData.regTaskItemId = row.regTaskItemId
      this.regTaskJournalByPage()
    },
    regTaskJournalByPage() {
      this.regTaskJournalLoding = true
      regTaskAction.regTaskItemLogs(this.regTaskJournalFormData).then(res => {
        this.regTaskJournalListTotal = res.result.totalCount
        this.regTaskJournalFormData.pageSize = res.result.pageSize
        this.regTaskJournalDataList = res.result.items
        this.regTaskJournalShow = true
        this.regTaskJournalLoding = false
      })
    },
    regTaskJournalSizeChange(size) {
      this.regTaskJournalFormData.pageIndex = 1
      this.regTaskJournalFormData.pageSize = size
      this.regTaskJournalByPage()
    },
    regTaskJournalCurrentChange(index) {
      this.regTaskJournalFormData.pageIndex = index
      this.regTaskJournalByPage()
    },
    awFileCopy() {
      var _this = this
      this.$copyText(this.awFile).then(
        function(e) {
          Message({
            type: 'success',
            message: '复制成功'
          })
          _this.awFileShow = false
        },
        function(e) {
          Message({
            type: 'error',
            message: '复制失败'
          })
        }
      )
    },
    awFileDown() {
      utils.locationDown(this.awFile, null, 'aw.txt')
      this.awFileShow = false
    }
  }
}
</script>
