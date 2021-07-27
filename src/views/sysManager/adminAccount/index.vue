<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="accountConditions.userName"
        placeholder="用户名"
        clearable
        style="width: 150px"
      />
      <el-input
        v-model="accountConditions.accountName"
        placeholder="账户名"
        clearable
        style="width: 150px"
      />
      <el-button type="primary" icon="el-icon-search" @click="onAccountSearch">搜索</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="onAccountEdit">添加</el-button>
    </div>
    <el-table
      v-loading="accountLoading"
      row-key="accountId"
      :data="accounts"
      fit
      border
      highlight-current-row
      style="width: 99.9%"
      @sort-change="accountSortChange"
    >
      <el-table-column prop="userName" label="用户名" />
      <el-table-column prop="accountName" label="账户名" />
      <el-table-column prop="roleNames" label="角色名" />
      <el-table-column prop="lastLoginTime" label="最后登录时间" sortable="custom" />
      <el-table-column prop="statusName" label="状态" sortable="custom" />
      <el-table-column prop="createTime" label="创建时间" sortable="custom" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="onAccountEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        v-show="accountTotal>0"
        :current-page="accountConditions.pageIndex"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="accountConditions.pageSize"
        :total="accountTotal"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="accountSizeChange"
        @current-change="accountCurrentChange"
      />
    </div>

    <el-dialog :title="'编辑'" :visible.sync="accountVisible" width="45%" @close="onAccountClose">
      <el-form
        ref="accountForm"
        :rules="rules"
        :model="account"
        label-position="left"
        label-width="160px"
        style="width: 700px; margin-left:50px;"
      >
        <el-form-item label="所属角色" prop="roleId">
          <el-select v-model="account.roleId" placeholder="所属角色" clearable style="width:500px;">
            <el-option
              v-for="item in roleMap"
              :key="item.roleId"
              :title="item.roleId+item.name"
              :label="item.name"
              :value="item.roleId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" prop="userName" required>
          <el-input v-model="account.userName" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="账户名" prop="accountName" required>
          <el-input v-model="account.accountName" placeholder="请输入账户名" />
        </el-form-item>
        <el-form-item label="密码" prop="passwordHash" :required="account.accountId <= 0">
          <el-input v-model="account.passwordHash" placeholder="请输入密码" type="password" />
        </el-form-item>
        <el-form-item label="状态" prop="status" required>
          <el-select v-model="account.status" placeholder="状态" clearable style="width:100%">
            <el-option title="禁用" label="禁用" :value="-1" />
            <el-option title="启用" label="启用" :value="1" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onAccountClose">取消</el-button>
        <el-button type="primary" @click="onAccountSave">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { Message, MessageBox } from 'element-ui'
import Vue from 'vue'
export default {
  name: 'AdminAccount',
  data() {
    return {
      accountLoading: false,
      accountConditions: {
        pageSize: 10,
        pageIndex: 1
      },
      accountVisible: false,
      account: {
        accountId: 0,
        roleId: 0,
        userName: '',
        accountName: '',
        passwordHash: '',
        status: ''
      },
      roleMap: [],
      rules: {
        userName: [{ required: true, message: '请输入用户名' }],
        accountName: [{ required: true, message: '请输入账户名' }],
        status: [{ required: true, message: '请选择状态' }]
      },
      statusEnum: []
    }
  },
  computed: {
    ...mapGetters({
      accounts: 'adminManage/accounts',
      accountTotal: 'adminManage/accountTotal'
    })
  },
  created() {
    this.onGetAccountPage()
  },
  methods: {
    ...mapActions({
      getAccountAllPage: 'adminManage/getAccountAllPage',
      createOrUpdateAccount: 'adminManage/createOrUpdateAccount',
      getRoleAll: 'adminManage/getRoleAll'
    }),
    onAccountSearch() {
      this.accountConditions.pageIndex = 1
      this.onGetAccountPage()
    },
    onGetAccountPage() {
      this.accountLoading = true
      this.getAccountAllPage(this.accountConditions).then(res => {
        this.accountLoading = false
      })
    },
    accountSizeChange(size) {
      this.accountConditions.pageSize = size
      this.onGetAccountPage()
    },
    accountCurrentChange(index) {
      this.accountConditions.pageIndex = index
      this.onGetAccountPage()
    },
    accountSortChange(res) {
      this.accountConditions.sortName = res.prop || ''
      this.accountConditions.sortOrder = res.order == 'ascending' ? 1 : 0
      this.onGetAccountPage()
    },
    // 全部角色信息
    onGetRoleAll() {
      this.getRoleAll().then(res => {
        this.roleMap = res.map(a => {
          return { roleId: a.roleId, name: a.name }
        })
      })
    },
    onAccountEdit(index, row) {
      this.onGetRoleAll()
      if (!row) {
        this.account = {
          accountId: 0,
          roleId: 0,
          userName: '',
          accountName: '',
          passwordHash: '',
          status: ''
        }
      } else {
        this.account = row
        this.account.passwordHash = ''
      }
      this.accountVisible = true
    },
    onAccountClose() {
      this.accountVisible = false
      this.account = {
        accountId: 0,
        roleId: 0,
        userName: '',
        accountName: '',
        passwordHash: '',
        companyName: '',
        status: ''
      }
      this.$refs['accountForm'].clearValidate()
      this.$refs['accountForm'].resetFields()
    },
    onAccountSave() {
      this.$refs['accountForm'].validate(valid => {
        if (!valid) return false
        if (this.roleId <= 0) {
          Message({ type: 'error', message: '请选择所属角色！' })
          return false
        }

        if (this.account.accountId <= 0 && this.account.passwordHash.length <= 0) {
          Message({ type: 'error', message: '请输入密码' })
          return false
        }

        var postData = {
          model: this.account
        }

        this.createOrUpdateAccount(postData).then(res => {
          Message({ type: res ? 'success' : 'error', message: `保存${res ? '成功' : '失败'}` })
          if (res) {
            this.onGetAccountPage()
            this.accountVisible = false
          }
        })
      })
    }

  }
}
</script>
