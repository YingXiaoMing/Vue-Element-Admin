<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="menuConditions.name" placeholder="菜单名称" clearable style="width: 150px" />
      <el-button type="primary" icon="el-icon-search" @click="onMenuSearch">搜索</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="onMenuEdit(0)">添加</el-button>
    </div>
    <el-table v-loading="menuLoading" row-key="menuId" :data="menus" fit border highlight-current-row style="width: 99.9%" @sort-change="menuSortChange">
      <el-table-column prop="pName" label="父菜单名称" width="130" />
      <el-table-column prop="name" label="菜单名称" width="160" />
      <el-table-column prop="requireAuth" label="是否需要验证" width="90">
        <template slot-scope="scope">
          <span>{{ requireAuthMap[scope.row.requireAuth+''] || '' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="code" label="标识Code" width="200" />
      <el-table-column prop="authPath" label="验证路径" width="270" />
      <el-table-column prop="url" label="URL" width="270" />
      <el-table-column prop="idx" label="排序" sortable="custom" width="75" />
      <el-table-column prop="visible" label="可见状态" width="70">
        <template slot-scope="scope">
          <span>{{ menuVisibleMap[scope.row.visible+''] || '' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="50">
        <template slot-scope="scope">
          <span>{{ menuStatusMap[scope.row.status+''] || '' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" sortable="custom" width="130" />
      <el-table-column prop="updateTime" label="更新时间" sortable="custom" width="130" />
      <!-- <el-table-column prop="icon" label="图标" width="100"/>
      <el-table-column prop="description" label="描述" width="120"/>
      <el-table-column prop="remark" label="备注"  width="120"/> -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="onMenuEdit(scope.row.menuId)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination v-show="menuTotal>0" :current-page="menuConditions.pageIndex" :page-sizes="[10, 20, 30, 50]" :page-size="menuConditions.pageSize" :total="menuTotal" background layout="total, sizes, prev, pager, next, jumper" @size-change="menuSizeChange" @current-change="menuCurrentChange" />
    </div>

    <el-dialog :title="'编辑'" :visible.sync="menuVisible" width="45%" @close="onMenuClose">
      <el-form ref="menuForm" :rules="rules" :model="menu" label-position="left" label-width="160px" style="width: 700px; margin-left:50px;">
        <el-form-item label="父菜单">
          <el-tree
            ref="tree"
            :data="dataTree"
            show-checkbox
            :default-expand-all="false"
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
        <el-form-item label="是否验证" prop="requireAuth" required>
          <el-select v-model="menu.requireAuth" placeholder="是否验证" clearable style="width: 100%">
            <el-option v-for="(value, key) in requireAuthMap" :key="key" :title="key+value" :label="value" :value="key" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="menu.requireAuth==1" label="验证路径" prop="authPath">
          <el-input v-model="menu.authPath" placeholder="请输入验证路径" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="menu.description" placeholder="请输入描述" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="menu.remark" type="textarea" :rows="5" placeholder="请输入备注" style="width: 100%" />
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
          <el-select v-model="menu.visible" placeholder="可见状态" clearable style="width: 100%">
            <el-option v-for="(value, key) in menuVisibleMap" :key="key" :title="key+value" :label="value" :value="key" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status" required>
          <el-select v-model="menu.status" placeholder="状态" clearable style="width: 100%">
            <el-option v-for="(value, key) in menuStatusMap" :key="key" :title="key+value" :label="value" :value="key" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onMenuClose">取消</el-button>
        <el-button type="primary" @click="onMenuSave">保存</el-button>
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
  name: 'AdminMenu',
  components: {},
  mixins: [routeHelper],
  data() {
    return {
      i: 0,
      menuLoading: false,
      menuConditions: {
        pageSize: 10,
        pageIndex: 1
      },
      dataTree: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      menuVisible: false,
      menu: {
        status: ''
      },
      rules: {
        // userName: [{ required: true, message: "请输入用户名" }],
      }
    }
  },
  computed: {
    ...mapGetters({
      menus: 'adminManage/menus',
      menuTotal: 'adminManage/menuTotal',
      menuStatusMap: 'adminManage/menuStatusMap',
      requireAuthMap: 'adminManage/requireAuthMap',
      menuVisibleMap: 'adminManage/menuVisibleMap'
    })
  },
  created() {
    this.onGetMenuAllTree()
    this.onGetMenuPage()
  },
  methods: {
    ...mapActions({
      getMenuAllPage: 'adminManage/getMenuAllPage',
      createOrUpdateMenu: 'adminManage/createOrUpdateMenu',
      getMenuAllTree: 'adminManage/getMenuAllTree'
    }),
    handleClick(data, checked, node) {
      this.i++
      if (this.i % 2 === 0) {
        if (checked) {
          this.$refs.tree.setCheckedNodes([])
          console.log('data', data)
          this.$refs.tree.setCheckedNodes([data])
          // 交叉点击节点
        } else {
          this.$refs.tree.setCheckedNodes([])
          // 点击已经选中的节点，置空
        }
      }
    },
    // 全部树形分类
    onGetMenuAllTree() {
      this.getMenuAllTree().then(res => {
        this.dataTree = res
      })
    },
    onMenuSearch() {
      this.menuConditions.pageIndex = 1
      this.onGetMenuPage()
    },
    onGetMenuPage() {
      this.menuLoading = true
      this.getMenuAllPage(this.menuConditions).then(res => {
        this.menuLoading = false
      })
    },
    menuSizeChange(size) {
      this.menuConditions.pageSize = size
      this.onGetMenuPage()
    },
    menuCurrentChange(index) {
      this.menuConditions.pageIndex = index
      this.onGetMenuPage()
    },
    menuSortChange(res) {
      this.menuConditions.sortName = res.prop || ''
      this.menuConditions.sortOrder = res.order == 'ascending' ? 1 : 0
      this.onGetMenuPage()
    },
    // //全部角色信息
    // onGetRoleAll() {
    //   this.getRoleAll().then(res => {
    //     this.roleMap = res.map(a => {
    //       return { id: a.code, name: a.name };
    //     });
    //   });
    // },
    onMenuEdit(menuId) {
      const path = `/sysManager/adminMenu/adminMenuEdit?menuId=${menuId}`
      this.gotoTag(path, true)
    },
    onMenuClose() {
      this.menuVisible = false
      this.menu = {
      }
      this.$refs['menuForm'].clearValidate()
      this.$refs['menuForm'].resetFields()
    },
    onMenuSave() {
      this.$refs['menuForm'].validate(valid => {
        if (!valid) return false
      })
    }

  }
}
</script>
