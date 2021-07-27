<template>
  <div>
    <el-dialog
      :title="'加入后处理'"
      :visible.sync="taskChatRoomVisible"
      width="765px"
      top="20px"
      :before-close="onTaskChatRoomClose"
    >
      <el-form
        ref="taskChatRoomForm"
        :rules="rules"
        :model="taskChatRoom"
        label-position="left"
        label-width="160px"
        style="margin-left:20px;"
      >
        <el-container>
          <el-header
            style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);height:auto;margin-bottom:10px;"
          >
            <el-form-item label="自动回复话述" prop="replys" style="position:relative;">
              <el-popover
                v-for="(item, aindex) in taskChatRoom.replys"
                :key="aindex"
                placement="top-start"
                trigger="click"
                width="500"
                @after-enter="popoverShow(aindex)"
              >
                <el-input
                  :ref="'input_'+aindex"
                  v-model="taskChatRoom.replys[aindex]"
                  placeholder="自动回复"
                  type="textarea"
                  :autosize="{ minRows: 1, maxRows: 10 }"
                  :clearable="true"
                />
                <el-input
                  slot="reference"
                  :value="taskChatRoom.replys[aindex]"
                  placeholder="自动回复"
                  :readonly="true"
                >
                  <el-button
                    v-if="aindex+1==taskChatRoom.replys.length"
                    slot="append"
                    icon="el-icon-plus"
                    @click="taskChatRoom.replys.push('')"
                  />
                  <el-button
                    v-else
                    slot="append"
                    icon="el-icon-minus"
                    @click="taskChatRoom.replys.splice(aindex, 1)"
                  />
                </el-input>
              </el-popover>
            </el-form-item>
            <div style="font-size:12px;color:#9FA2A8;position:absolute;top: 108px;">
              说明:设置多条时
              <br>将会随机选择一条
            </div>
            <el-form-item label="回复模式" prop="replyType">
              <el-radio-group v-model="taskChatRoom.replyType">
                <el-radio :label="1">只回复一次</el-radio>
                <el-radio :label="2">每天一次</el-radio>
                <el-radio :label="3">始终回复</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-header>
          <el-main style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);">
            <el-form-item label="群列表">
              <div style="float:right;">
                <el-upload
                  :action="importPath"
                  :on-success="importSuccess"
                  :multiple="true"
                  :limit="3"
                  :show-file-list="false"
                  list-type="picture"
                  style="float:left;margin-right:10px;"
                >
                  <el-button type="primary">导入</el-button>
                </el-upload>
                <el-button
                  style="float:right;"
                  type="primary"
                  icon="el-icon-plus"
                  @click="addtaskChatRoomVisible=true"
                >增加</el-button>
              </div>
            </el-form-item>
            <el-table
              row-key="qrCode"
              :data="taskChatRoom.chatRoomModelList"
              :expand-row-keys="taskChatRoomExpandIds"
              fit
              border
              highlight-current-row
              style="width: 99.9%;margin:10px 0;height:250px;overflow: scroll;overflow-x:hidden;"
              @expand-change="taskChatRoomExpand"
            >
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-table
                    :data="taskBotList"
                    fit
                    border
                    highlight-current-row
                    style="width: 99.9%"
                  >
                    <el-table-column
                      prop="botId"
                      label="设备编号"
                      align="center"
                      width="95"
                      sortable="custom"
                    >
                      <template slot-scope="scope">
                        <el-tag
                          v-if="scope.row.isOnline==11"
                          size="mini"
                          type="success"
                        >{{ scope.row.botId }}</el-tag>
                        <el-tag v-else size="mini" type="danger">
                          {{ scope.row.botId }}
                          <el-tooltip
                            v-if="scope.row.memo.length>0"
                            class="item"
                            effect="dark"
                            :content="scope.row.memo"
                            placement="right"
                          >
                            <i class="el-icon-warning" style="color:#F56C6C" />
                          </el-tooltip>
                        </el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column prop="groupName" label="组名称" align="center" />
                    <el-table-column prop="botWxId" label="微信ID" align="center" />
                    <el-table-column prop="botWxNickName" label="昵称" align="center" />
                    <el-table-column prop="isJoin" label="是否入群" align="center">
                      <template slot-scope="scope">
                        <el-tag
                          size="mini"
                          :type="(scope.row.isJoin?'success':'info')"
                        >{{ scope.row.isJoin?'是':'否' }}</el-tag>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </el-table-column>

              <el-table-column label="序号" type="index" align="center" />
              <el-table-column prop="qrCode" width="100" label="群二维码" align="center">
                <template slot-scope="scope">
                  <viewer v-if="scope.row.qrCode!=''" :image="scope.row.qrCode">
                    <img
                      :key="scope.row.qrCode"
                      :src="'http://my.tv.sohu.com/user/a/wvideo/getQRCode.do?width=150&height=150&text='+scope.row.qrCode"
                      style="max-width: 36px;max-height: 36px;"
                    >
                  </viewer>
                </template>
              </el-table-column>
              <el-table-column label="群名称" prop="chatRoomName" align="center" />
              <el-table-column label="群状态" prop="taskChatRoomStatus" align="center">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.taskChatRoomStatus==0" size="mini" type="info">未知</el-tag>
                  <el-tag v-if="scope.row.taskChatRoomStatus==1" size="mini" type="success">正常</el-tag>
                  <el-tag v-if="scope.row.taskChatRoomStatus==2" size="mini" type="danger">二维码异常</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="群人数" prop="memberCount" align="center" />

              <el-table-column label="删除" width="100" align="center">
                <template slot-scope="scope">
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    @click="qrRemove(scope.row)"
                  />
                </template>
              </el-table-column>
            </el-table>
            <el-form-item
              :label="'共有群数:'+taskChatRoom.chatRoomModelList.length+',共有任务账号数:'+taskChatRoom.taskTotal"
              label-width="300"
            />
            <div>
              <el-form-item label="拉群关键字" prop="joinKeyWord">
                <el-input v-model="taskChatRoom.joinKeyWord" placeholder="拉群关键字" />
              </el-form-item>
              <el-form-item label="单群人数上限" prop="upperLimit">
                <el-input v-model="taskChatRoom.upperLimit" type="number" placeholder="单群人数上限" />
              </el-form-item>
              <el-form-item label="单群拉人帐号数" prop="sameExecuteNum">
                <el-input
                  v-model="taskChatRoom.sameExecuteNum"
                  type="number"
                  placeholder="单群拉人帐号数"
                  :max="taskChatRoom.taskTotal"
                />
              </el-form-item>
            </div>
          </el-main>
        </el-container>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onTaskChatRoomClose">取消</el-button>
        <el-button type="primary" @click="onTaskChatRoomSave">立即执行</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :title="'新增群'"
      :visible.sync="addtaskChatRoomVisible"
      width="765px"
      @close="qrCodeClose"
    >
      <el-input
        v-for="(item, aindex) in qrCodeList"
        :key="aindex"
        v-model="qrCodeList[aindex]"
        placeholder="请输入二维码地址"
        style="margin-bottom:20px;"
      >
        <el-button
          v-if="aindex+1==qrCodeList.length"
          slot="append"
          icon="el-icon-plus"
          @click="qrCodeList.push('')"
        />
        <el-button v-else slot="append" icon="el-icon-minus" @click="qrCodeList.splice(aindex, 1)" />
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="qrCodeSure">确定</el-button>
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
import taskChatRoomAcion from '@/services/taskChatRoomAcion.js'
import * as env from '@/utils/env'

export default {
  name: 'TaskChatRoomBox',
  props: ['taskChatRoomVisible', 'taskMasterId'],
  data() {
    return {
      importPath: env.VUE_APP_ADMIN_API + '/TaskChatRoom/QrCodeAnalysis',
      taskChatRoomExpandIds: [],
      taskBotList: [],
      addtaskChatRoomVisible: false,
      qrCodeList: [''],
      taskChatRoom: {
        taskMasterId: 0,
        replys: [],
        replyType: 1,
        joinKeyWord: '',
        upperLimit: 0,
        sameExecuteNum: 0,
        taskTotal: 0,
        chatRoomModelList: []
      },
      rules: {

      }
    }
  },
  watch: {
    taskMasterId(val) {
      if (this.taskMasterId == 0) return false
      this.Init()
    }
  },
  methods: {
    Init() {
      taskChatRoomAcion.taskChatRoomInfo(this.taskMasterId).then(res => {
        this.taskChatRoom = res.result
        if (this.taskChatRoom.replys.length == 0) this.taskChatRoom.replys.push('')
      })
    },
    popoverShow(index) {
      this.$refs['input_' + index][0].focus()
    },
    taskChatRoomExpand(row, expandedRows) {
      if (expandedRows.length <= 0) {
        this.taskChatRoomExpandIds = []
        return
      }
      this.taskChatRoomExpandIds = [row.qrCode]
      this.taskChatRoom.chatRoomModelList.forEach(res => {
        if (res.qrCode == row.qrCode) this.taskBotList = res.taskBotList
      })
    },
    importSuccess(res) {
      if (res.error) {
        Message({ type: 'error', message: res.error })
        return false
      } else {
        this.qrAdd(res.result)
      }
    },
    qrCodeClose() {
      this.qrCodeList = ['']
      this.addtaskChatRoomVisible = false
    },
    qrCodeSure() {
      if (this.qrCodeList.length <= 0) {
        Message({ type: 'error', message: '请输入二维码地址' })
        return false
      }
      var ischeck = true
      this.qrCodeList.forEach(res => {
        if (!res.startsWith('http')) {
          ischeck = false
        }
      })

      if (!ischeck) {
        Message({ type: 'error', message: '请输入二维码地址' })
        return false
      }

      this.qrAdd(this.qrCodeList)
      this.qrCodeClose()
    },
    qrAdd(dataList) {
      var qrList = []
      this.taskChatRoom.chatRoomModelList.forEach(res => {
        qrList.push(res.qrCode)
      })
      dataList.forEach(item => {
        if (qrList.indexOf(item) == -1) {
          qrList.push(item)
          this.taskChatRoom.chatRoomModelList.push({
            qrCode: item,
            chatRoomName: '未知',
            taskChatRoomStatus: 0,
            memberCount: 0
          })
        }
      })
    },
    qrRemove(row) {
      this.taskChatRoom.chatRoomModelList.forEach((item, index) => {
        if (item.qrCode == row.qrCode) this.taskChatRoom.chatRoomModelList.splice(index, 1)
      })
    },
    onTaskChatRoomClose() {
      this.$emit('taskChatRoomBoxClose')
    },
    onTaskChatRoomSave() {
      this.$refs['taskChatRoomForm'].validate(valid => {
        if (!valid) return false

        if (this.taskChatRoom.joinKeyWord != null && this.taskChatRoom.joinKeyWord.length > 0) {
          if (this.taskChatRoom.upperLimit <= 0) {
            Message({ type: 'error', message: '请输入单群人数上限' })
            return false
          }
          if (this.taskChatRoom.sameExecuteNum <= 0) {
            Message({ type: 'error', message: '请输入单群拉人帐号数' })
            return false
          }
          if (this.taskChatRoom.sameExecuteNum > this.taskChatRoom.taskTotal) {
            Message({ type: 'error', message: '拉群账号数需小于等于' + this.taskChatRoom.taskTotal })
            return false
          }
        }

        taskChatRoomAcion.addOrEditTaskChatRoom(this.taskChatRoom).then(res => {
          if (res && res.result) this.$emit('onTaskChatRoomSave')
        })
      })
    }
  }
}
</script>
