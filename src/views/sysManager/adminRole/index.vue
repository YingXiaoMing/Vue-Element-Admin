<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="roleConditions.name" placeholder="角色名" clearable style="width: 150px" />
      <el-button type="primary" icon="el-icon-search" @click="onRoleSearch">搜索</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="onRoleEdit">添加</el-button>
    </div>
    <el-table
      v-loading="roleLoading"
      row-key="roleId"
      :data="roles"
      fit
      border
      highlight-current-row
      style="width: 99.9%"
      @sort-change="roleSortChange"
    >
      <el-table-column prop="name" label="角色名" />
      <el-table-column prop="description" label="描述" />
      <el-table-column prop="remark" label="备注" width="600" />
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status==1" size="mini" type="success">启用</el-tag>
          <el-tag v-if="scope.row.status==0" size="mini" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" sortable="custom" />
      <el-table-column prop="updateTime" label="更新时间" sortable="custom" />
      <el-table-column label="操作" width="190">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="onRoleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="success" @click="onRoleMenuEdit(scope.row.roleId)">角色菜单编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        v-show="roleTotal>0"
        :current-page="roleConditions.pageIndex"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="roleConditions.pageSize"
        :total="roleTotal"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="roleSizeChange"
        @current-change="roleCurrentChange"
      />
    </div>

    <el-dialog :title="'编辑'" :visible.sync="roleVisible" width="45%" @close="onRoleClose">
      <el-form
        ref="roleForm"
        :rules="rules"
        :model="role"
        label-position="left"
        label-width="160px"
        style="width: 700px; margin-left:50px;"
      >
        <el-form-item label="角色名" prop="name" required>
          <el-input v-model="role.name" placeholder="请输入角色名" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="role.description" placeholder="请输入描述" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="role.remark"
            type="textarea"
            :rows="5"
            placeholder="请输入备注"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status" required>
          <el-select v-model="role.status" placeholder="请选择状态" clearable style="width: 100%">
            <el-option
              v-for="(value, key) in roleStatusMap"
              :key="key"
              :title="key+value"
              :label="value"
              :value="key"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onRoleClose">取消</el-button>
        <el-button type="primary" @click="onRoleSave">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { Message, MessageBox } from 'element-ui'
import Vue from 'vue'
import routeHelper from '@/layout/mixin/routeHelper'
export default {
  name: 'AdminRole',
  components: {},
  mixins: [routeHelper],
  data() {
    return {
      roleLoading: false,
      roleConditions: {
        pageSize: 10,
        pageIndex: 1
      },
      roleVisible: false,
      role: {
        roleId: 0,
        name: '',
        description: '',
        remark: '',
        status: '',
        pid: 0
      },
      rules: {
        name: [{ required: true, message: '请输入角色名' }],
        status: [{ required: true, message: '请选择状态' }]
      }
    }
  },
  computed: {
    ...mapGetters({
      roles: 'adminManage/roles',
      roleTotal: 'adminManage/roleTotal',
      roleStatusMap: 'adminManage/roleStatusMap'
    })
  },
  created() {
    this.onGetRolePage()
  },
  methods: {
    ...mapActions({
      getRoleAllPage: 'adminManage/getRoleAllPage',
      getRole: 'adminManage/getRole',
      createOrUpdateRole: 'adminManage/createOrUpdateRole'
    }),
    onRoleSearch() {
      this.roleConditions.pageIndex = 1
      this.onGetRolePage()
    },
    onGetRolePage() {
      this.roleLoading = true
      this.getRoleAllPage(this.roleConditions).then(res => {
        this.roleLoading = false
      })
    },
    roleSizeChange(size) {
      this.roleConditions.pageSize = size
      this.onGetRolePage()
    },
    roleCurrentChange(index) {
      this.roleConditions.pageIndex = index
      this.onGetRolePage()
    },
    roleSortChange(res) {
      this.roleConditions.sortName = res.prop || ''
      this.roleConditions.sortOrder = res.order == 'ascending' ? 1 : 0
      this.onGetRolePage()
    },
    onRoleEdit(index, row) {
      console.log('onRoleEdit:', row)
      if (!row) {
        this.role = {
          roleId: 0,
          name: '',
          description: '',
          remark: '',
          status: '',
          pid: 0
        }
      } else {
        this.role = JSON.parse(JSON.stringify(row))
        // console.log('role',this.role)
        this.role.status += ''
      }
      this.roleVisible = true
    },
    onRoleClose() {
      this.roleVisible = false
      this.role = {
        roleId: 0,
        name: '',
        description: '',
        remark: '',
        status: '',
        pid: 0
      }
      this.$refs['roleForm'].clearValidate()
      this.$refs['roleForm'].resetFields()
    },
    onRoleSave() {
      this.$refs['roleForm'].validate(valid => {
        if (!valid) return false

        this.createOrUpdateRole(this.role).then(res => {
          Message({ type: res ? 'success' : 'error', message: `保存${res ? '成功' : '失败'}` })
          if (res) {
            this.onGetRolePage()
            this.roleVisible = false
          }
        })

        // console.log('role',this.role)
      })
    },
    onRoleMenuEdit(roleId) {
      const path = `/sysManager/adminRole/adminRoleMenuEdit?roleId=${roleId}`
      this.gotoTag(path, true)
    }
  }
}
</script>
