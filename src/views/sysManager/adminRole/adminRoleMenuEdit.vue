<template>
  <div class="app-container">
    <el-form
      ref="roleForm"
      :model="role"
      label-position="left"
      label-width="120px"
      style="width:800px; margin-left:50px;"
    >
      <el-form-item label="全部菜单">
        <el-tree
          ref="tree"
          :data="dataTree"
          show-checkbox
          :default-expand-all="true"
          node-key="id"
          highlight-current
          :props="defaultProps"
          check-strictly
          @check-change="handleClick"
        />
      </el-form-item>
      <el-form-item>
        <el-col align="right">
          <el-button type="primary" @click="onSave">保存</el-button>
          <el-button @click="closeTag('/sysManager/adminRole', false)">取消</el-button>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { Message, MessageBox } from 'element-ui'
import Vue from 'vue'
import routeHelper from '@/layout/mixin/routeHelper'
export default {
  name: 'AdminRoleMenuEdit',
  components: {},
  mixins: [routeHelper],
  data() {
    return {
      dataTree: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      role: {
        roleId: 0
      },
      menuIds: []
    }
  },
  computed: {
    ...mapGetters({
    })
  },
  created() {
    this.role.roleId = this.$route.query.roleId
    this.onGetMenuAllTree()
    if (this.role.roleId > 0) {
      this.onGetRole()
    }
  },
  mounted() {
  },
  methods: {
    ...mapActions({
      createOrUpdateRoleMenu: 'adminManage/createOrUpdateRoleMenu',
      getMenuAllTree: 'adminManage/getMenuAllTree',
      getRole: 'adminManage/getRole'
    }),
    onGetRole() {
      this.getRole({ 'roleId': this.role.roleId }).then(res => {
        this.menuIds = res.map(a => a.menuId)
        this.$refs.tree.setCheckedKeys(this.menuIds)
      })
    },
    handleClick() {
      this.menuIds = this.$refs.tree.getCheckedNodes().map(a => a.id)
      // console.log('menuIds02',this.menuIds);
    },
    // 全部树形分类
    onGetMenuAllTree() {
      this.getMenuAllTree().then(res => {
        this.dataTree = res
      })
    },
    onSave() {
      this.$refs['roleForm'].validate(valid => {
        if (!valid) return false
        // console.log('menuIds03',this.menuIds)
        if (this.menuIds.length <= 0) {
          Message({ type: 'error', message: '请选择角色菜单！' })
          return false
        }
        var postData = {
          RoleId: this.role.roleId,
          menuIds: this.menuIds
        }
        this.createOrUpdateRoleMenu(postData).then(res => {
          if (res) {
            setTimeout(() => {
              Message({ type: 'success', message: '保存成功' })
              this.closeTag('/sysManager/adminRole', false)
            }, 300)
          } else {
            Message({ type: 'error', message: '保存失败！' })
          }
        })
      })
    }
  }
}
</script>
