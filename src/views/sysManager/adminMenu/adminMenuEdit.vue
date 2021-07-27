<template>
  <div class="app-container">
    <el-form
      ref="menuForm"
      :model="menu"
      :rules="rules"
      label-position="left"
      label-width="120px"
      style="width:800px; margin-left:50px;"
    >
      <el-form-item label="父菜单">
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
      <el-form-item label="菜单名" prop="name" required>
        <el-input v-model="menu.name" placeholder="请输入菜单名" />
      </el-form-item>
      <el-form-item label="标识Code" prop="code" required>
        <el-input v-model="menu.code" placeholder="请输入标识code" />
      </el-form-item>
      <el-form-item label="是否验证" prop="requireAuth" required>
        <el-select v-model="menu.requireAuth" placeholder="请选择是否验证" style="width: 100%">
          <el-option
            v-for="(value, key) in requireAuthMap"
            :key="key"
            :title="key+value"
            :label="value"
            :value="key"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="menu.requireAuth==1" label="验证路径" prop="authPath">
        <el-input v-model="menu.authPath" placeholder="请输入验证路径" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="menu.description" placeholder="请输入描述" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="menu.remark"
          type="textarea"
          :rows="5"
          placeholder="请输入备注"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-input v-model="menu.icon" placeholder="请输入图标" />
      </el-form-item>
      <el-form-item label="Url" prop="url">
        <el-input v-model="menu.url" placeholder="请输入Url地址" />
      </el-form-item>
      <el-form-item label="排序" prop="idx" required>
        <el-input v-model.number="menu.idx" placeholder="数字越小排越上" />
      </el-form-item>
      <el-form-item label="可见状态" prop="visible" required>
        <el-select v-model="menu.visible" placeholder="请选择可见状态" style="width: 100%">
          <el-option
            v-for="(value, key) in menuVisibleMap"
            :key="key"
            :title="key+value"
            :label="value"
            :value="key"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status" required>
        <el-select v-model="menu.status" placeholder="请选择状态" style="width: 100%">
          <el-option
            v-for="(value, key) in menuStatusMap"
            :key="key"
            :title="key+value"
            :label="value"
            :value="key"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-col align="right">
          <el-button type="primary" @click="onSave">保存</el-button>
          <el-button @click="closeTag('/sysManager/adminMenu', false)">取消</el-button>
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
  name: 'AdminMenuEdit',
  components: {},
  mixins: [routeHelper],
  data() {
    return {
      dataTree: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      menuVisible: false,
      menu: {
        menuId: 0,
        name: '',
        authPath: '',
        description: '',
        remark: '',
        icon: '',
        url: '',
        idx: 0,
        requireAuth: '1',
        visible: '1',
        status: '1'
      },
      rules: {
        name: [{ required: true, message: '请输入菜单名' }],
        code: [{ required: true, message: '请输入标识Code' }],
        requireAuth: [{ required: true, message: '请选择是否验证' }],
        idx: [{ required: true, message: '请输入排序数字' }],
        visible: [{ required: true, message: '请选择可见状态' }],
        status: [{ required: true, message: '请选择状态' }]
      },
      pIds: []
    }
  },
  computed: {
    ...mapGetters({
      menuStatusMap: 'adminManage/menuStatusMap',
      requireAuthMap: 'adminManage/requireAuthMap',
      menuVisibleMap: 'adminManage/menuVisibleMap'
    })
  },
  created() {
    this.menu.menuId = this.$route.query.menuId
    this.onGetMenuAllTree()
    if (this.menu.menuId > 0) {
      this.i++
      this.onGetMenu()
    }
  },
  mounted() {
  },
  methods: {
    ...mapActions({
      createOrUpdateMenu: 'adminManage/createOrUpdateMenu',
      getMenuAllTree: 'adminManage/getMenuAllTree',
      getMenu: 'adminManage/getMenu'
    }),
    onGetMenu() {
      this.getMenu({ 'menuId': this.menu.menuId }).then(res => {
        this.menu = res
        this.menu.status += ''
        this.menu.requireAuth += ''
        this.menu.visible += ''
        this.$refs.tree.setCheckedKeys([this.menu.pId])
        if (this.menu.pId > 0) {
          this.pIds.push(this.menu.pId)
        }
        // console.log('res',res);
      })
    },
    handleClick(data, checked, node) {
      this.pIds = this.$refs.tree.getCheckedNodes().map(a => a.id)
      if (checked) {
        if (this.pIds.length > 1) {
          Message({ type: 'error', message: '只能选择一个父菜单！' })
        }
      }
    },
    // 全部树形分类
    onGetMenuAllTree() {
      this.getMenuAllTree().then(res => {
        this.dataTree = res
      })
    },
    onSave() {
      this.$refs['menuForm'].validate(valid => {
        if (!valid) return false
        if (this.pIds.length > 1) {
          Message({ type: 'error', message: '只能选择一个父菜单！' })
          return false
        }
        this.menu.pId = 0
        if (this.pIds.length == 1) {
          this.menu.pId = this.pIds[0]
        }
        this.createOrUpdateMenu(this.menu).then(res => {
          if (res) {
            setTimeout(() => {
              Message({ type: 'success', message: '保存成功' })
              this.closeTag('/sysManager/adminMenu', false)
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
