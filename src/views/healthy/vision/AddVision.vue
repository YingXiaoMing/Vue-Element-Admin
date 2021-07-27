<template>
  <div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
      <el-row>
        <el-col :span="6">
          <el-form-item label="检测地址" prop="examAddress">
            <el-input v-model="ruleForm.examAddress" :disabled="infoType === 'info'" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="顾客姓名" prop="name">
            <el-input v-model="ruleForm.name" :disabled="infoType === 'info'" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="年龄" prop="age">
            <el-input v-model="ruleForm.age" :disabled="infoType === 'info'" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="检测日期" prop="date">
            <!--<el-input v-model="ruleForm.date"></el-input>-->
            <el-date-picker
              v-model="ruleForm.date"
              :disabled="infoType === 'info'"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="检测日期"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="关联信息" prop="statement">
            <el-input v-model="ruleForm.statement" :disabled="infoType === 'info'" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="主理验光师" prop="optometrist">
            <el-input v-model="ruleForm.optometrist" :disabled="infoType === 'info'" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="性别" prop="sex">
            <!--<el-input v-model="ruleForm.sex"></el-input>-->
            <el-select
              v-model="ruleForm.sex"
              :disabled="infoType === 'info'"
              placeholder="性别"
              style="width:100%;"
            >
              <el-option
                v-for="item in sexes"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="职业" prop="profession">
            <el-input v-model="ruleForm.profession" :disabled="infoType === 'info'" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="联系方式" prop="phone">
            <el-input v-model="ruleForm.phone" :disabled="infoType === 'info'" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="戴镜史" prop="glassesHistory">
            <!--<el-input v-model="ruleForm.glassesHistory"></el-input>-->
            <el-select
              v-model="ruleForm.glassesHistory"
              :disabled="infoType === 'info'"
              placeholder="戴镜史"
              style="width:100%;"
            >
              <el-option
                v-for="item in glassesHistories"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="疾病史" prop="diseaseHistory">
            <!--<el-input v-model="ruleForm.diseaseHistory"></el-input>-->
            <el-select
              v-model="ruleForm.diseaseHistory"
              :disabled="infoType === 'info'"
              placeholder="疾病史"
              style="width:100%;"
            >
              <el-option
                v-for="item in diseaseHistories"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="手术史" prop="surgeryHistory">
            <!--<el-input v-model="ruleForm.surgeryHistory"></el-input>-->
            <el-select
              v-model="ruleForm.surgeryHistory"
              :disabled="infoType === 'info'"
              placeholder="手术史"
              style="width:100%;"
            >
              <el-option
                v-for="item in surgeryHistories"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="配镜目的" prop="glassesPurpose">
            <!--<el-input v-model="ruleForm.glassesPurpose"></el-input>-->
            <el-select
              v-model="ruleForm.glassesPurpose"
              :disabled="infoType === 'info'"
              placeholder="配镜目的"
              style="width:100%;"
            >
              <el-option
                v-for="item in glassesPurposes"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="家族史" prop="familyHistory">
            <!--<el-input v-model="ruleForm.familyHistory"></el-input>-->
            <el-select
              v-model="ruleForm.familyHistory"
              :disabled="infoType === 'info'"
              placeholder="家族史"
              style="width:100%;"
            >
              <el-option
                v-for="item in familyHistories"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Worth四点测试" prop="worth4PointTest">
            <!--<el-input v-model="ruleForm.worth4PointTest"></el-input>-->
            <el-select
              v-model="ruleForm.worth4PointTest"
              :disabled="infoType === 'info'"
              placeholder="Worth四点测试"
              style="width:100%;"
            >
              <el-option
                v-for="item in worth4PointTestes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="色盲检查" prop="colorBindTest">
            <!--<el-input v-model="ruleForm.colorBindTest"></el-input>-->
            <el-select
              v-model="ruleForm.colorBindTest"
              :disabled="infoType === 'info'"
              placeholder="色盲检查"
              style="width:100%;"
            >
              <el-option
                v-for="item in colorBindTestes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="屈光层差" prop="quGuangChenCha">
            <!--<el-input v-model="ruleForm.quGuangChenCha"></el-input>-->
            <el-select
              v-model="ruleForm.quGuangChenCha"
              :disabled="infoType === 'info'"
              placeholder="屈光层差"
              style="width:100%;"
            >
              <el-option
                v-for="item in quGuangChenChaes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="右眼近远视趋势" prop="rightTrend">
            <!--<el-input v-model="ruleForm.rightTrend"></el-input>-->
            <el-select
              v-model="ruleForm.rightTrend"
              :disabled="infoType === 'info'"
              placeholder="右眼近远视趋势"
              style="width:100%;"
            >
              <el-option
                v-for="item in rightTrendes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="左眼近远视趋势" prop="leftTrend">
            <!--<el-input v-model="ruleForm.leftTrend"></el-input>-->
            <el-select
              v-model="ruleForm.leftTrend"
              :disabled="infoType === 'info'"
              placeholder="左眼近远视趋势"
              style="width:100%;"
            >
              <el-option
                v-for="item in leftTrendes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="球镜右" prop="spH_R">
            <el-input v-model="ruleForm.spH_R" :disabled="infoType === 'info'" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="球镜左" prop="spH_L">
            <el-input v-model="ruleForm.spH_L" :disabled="infoType === 'info'" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="柱镜右" prop="cyL_R">
            <el-input v-model="ruleForm.cyL_R" :disabled="infoType === 'info'" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="柱镜左" prop="cyL_L">
            <el-input v-model="ruleForm.cyL_L" :disabled="infoType === 'info'" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="轴向右" prop="axI_R">
            <el-input v-model="ruleForm.axI_R" :disabled="infoType === 'info'" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="轴向左" prop="axI_L">
            <el-input v-model="ruleForm.axI_L" :disabled="infoType === 'info'" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="瞳距右" prop="pD_R">
            <el-input v-model="ruleForm.pD_R" :disabled="infoType === 'info'" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="瞳距左" prop="pD_L">
            <el-input v-model="ruleForm.pD_L" :disabled="infoType === 'info'" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="下加光右" prop="adD_R">
            <el-input v-model="ruleForm.adD_R" :disabled="infoType === 'info'" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="下加光左" prop="adD_L">
            <el-input v-model="ruleForm.adD_L" :disabled="infoType === 'info'" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="瞳高右" prop="pH_R">
            <el-input v-model="ruleForm.pH_R" :disabled="infoType === 'info'" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="瞳高左" prop="pH_L">
            <el-input v-model="ruleForm.pH_L" :disabled="infoType === 'info'" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="纠正视力右" prop="v_R">
            <el-input v-model="ruleForm.v_R" :disabled="infoType === 'info'" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="纠正视力左" prop="v_L">
            <el-input v-model="ruleForm.v_L" :disabled="infoType === 'info'" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="远用" prop="farUse">
            <!--<el-input v-model="ruleForm.farUse"></el-input>-->
            <el-select
              v-model="ruleForm.farUse"
              :disabled="infoType === 'info'"
              placeholder="远用"
              style="width:100%;"
            >
              <el-option
                v-for="item in trueOrFalse"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="近用" prop="nearUse">
            <!-- <el-input v-model="ruleForm.nearUse"></el-input>-->
            <el-select
              v-model="ruleForm.nearUse"
              :disabled="infoType === 'info'"
              placeholder="近用"
              style="width:100%;"
            >
              <el-option
                v-for="item in trueOrFalse"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="检测结论" prop="conclusion">
            <el-input v-model="ruleForm.conclusion" :disabled="infoType === 'info'" />
          </el-form-item>
        </el-col>
        <el-col v-if="infoType !== 'info'" :span="24" style="text-align: center;">
          <el-button
            type="primary"
            icon="el-icon-circle-plus"
            @click.native="saveReport"
          >保存</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import userManageAction from '@/services/userManage.js'
import { Message, MessageBox } from 'element-ui'
export default {
  name: 'AddVision',
  data() {
    return {
      infoType: 'add',
      glassesHistories: [
        { label: '无', value: 0 },
        { label: '半年到一年', value: 1 },
        { label: '一年', value: 2 },
        { label: '两年以上', value: 3 }
      ],
      diseaseHistories: [
        '角膜炎', '意外受伤', '无'
      ],
      surgeryHistories: [
        { label: '无', value: 0 },
        { label: '有', value: 1 }
      ],
      glassesPurposes: [
        '近用', '看书报', '电脑', '学习与阅读', '看电视', '室内工作', '运动', '防护'
      ],
      familyHistories: [
        '无', '父亲', '母亲', '兄弟姐妹'
      ],
      worth4PointTestes: [
        { label: '正常', value: true },
        { label: '异常', value: false }
      ],
      colorBindTestes: [
        { label: '正常', value: true },
        { label: '异常', value: false }
      ],
      quGuangChenChaes: [
        { label: '无', value: 0 },
        { label: '一般', value: 1 },
        { label: '严重', value: 2 }
      ],
      rightTrendes: [
        { label: '是', value: true },
        { label: '否', value: false }
      ],
      leftTrendes: [
        { label: '是', value: true },
        { label: '否', value: false }
      ],
      sexes: [
        '男', '女'
      ],
      trueOrFalse: [
        { label: '是', value: true },
        { label: '否', value: false }
      ],
      ruleForm: {
        examAddress: '',
        name: '',
        age: '',
        sex: '',
        profession: '',
        phone: '',
        date: '',
        statement: '',
        optometrist: '',
        glassesHistory: '',
        diseaseHistory: '',
        surgeryHistory: '',
        familyHistory: '',
        glassesPurpose: '',
        worth4PointTest: '',
        colorBindTest: '',
        quGuangChenCha: '',
        leftTrend: '',
        rightTrend: '',
        conclusion: '',
        spH_R: '',
        spH_L: '',
        cyL_R: '',
        cyL_L: '',
        axI_R: '',
        axI_L: '',
        pD_R: '',
        pD_L: '',
        adD_R: '',
        adD_L: '',
        pH_R: '',
        pH_L: '',
        v_R: '',
        v_L: '',
        nearUse: false,
        farUse: false
      },
      rules: {
        examAddress: [
          { required: true, message: '请输入检测地址', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入顾客姓名', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '请输入年纪', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        profession: [
          { required: true, message: '请输入职业', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '请输入检测日期', trigger: 'blur' }
        ],
        statement: [
          { required: true, message: '请输入顾客对旧镜的配戴陈述', trigger: 'blur' }
        ],
        optometrist: [
          { required: true, message: '请输入检测师', trigger: 'blur' }
        ],
        glassesHistory: [
          { required: true, message: '请选择戴镜史', trigger: 'change' }
        ],
        diseaseHistory: [
          { required: true, message: '请选择疾病史', trigger: 'change' }
        ],
        surgeryHistory: [
          { required: true, message: '请选择手术史', trigger: 'change' }
        ],
        familyHistory: [
          { required: true, message: '请选择家庭史', trigger: 'change' }
        ],
        glassesPurpose: [
          { required: true, message: '请选择戴镜目的', trigger: 'change' }
        ],
        worth4PointTest: [
          { required: true, message: '请选择Worth四点测试', trigger: 'change' }
        ],
        colorBindTest: [
          { required: true, message: '请选择色盲测试', trigger: 'change' }
        ],
        quGuangChenCha: [
          { required: true, message: '请选择屈光层差', trigger: 'change' }
        ],
        leftTrend: [
          { required: true, message: '请选择左眼近远视趋视', trigger: 'change' }
        ],
        rightTrend: [
          { required: true, message: '请选择右眼近远视趋视', trigger: 'change' }
        ],
        conclusion: [
          { required: true, message: '请输入检测结论', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init(type) {
      this.infoType = type
      this.$refs.ruleForm.resetFields()
      /* this.ruleForm = {
          examAddress: '',
          name: '',
          age: '',
          sex: '',
          profession: '',
          phone: '',
          date: '',
          statement: '',
          optometrist: '',
          glassesHistory: '',
          diseaseHistory: '',
          surgeryHistory: '',
          familyHistory: '',
          glassesPurpose: '',
          worth4PointTest: '',
          colorBindTest: '',
          quGuangChenCha: '',
          leftTrend: '',
          rightTrend: '',
          conclusion: '',
          spH_R: '',
          spH_L: '',
          cyL_R: '',
          cyL_L: '',
          axI_R: '',
          axI_L: '',
          pD_R: '',
          pD_L: '',
          adD_R: '',
          adD_L: '',
          pH_R: '',
          pH_L: '',
          v_R: '',
          v_L: '',
          nearUse: false,
          farUse: false
        }*/
    },
    saveReport() {
      switch (this.infoType) {
        case 'edit':
          this.$refs.ruleForm.validate((valid) => {
            if (valid) {
              userManageAction.putVision(this.ruleForm).then(res => {
                if (res.code === 1) {
                  this.$parent.$parent.onSearch()
                  MessageBox({
                    title: '提示',
                    message: '保存成功！',
                    type: 'info',
                    showCancelButton: false
                  }).then(() => {
                    this.$parent.$parent.showDialog = false
                  })
                } else {
                  MessageBox({
                    title: '提示',
                    message: '保存失败！',
                    type: 'info',
                    showCancelButton: false
                  })
                }
              })
            } else {
              console.log('error submit!!')
              return false
            }
          })
          break
        case 'info':
          break
        default:
          this.$refs.ruleForm.validate((valid) => {
            if (valid) {
              userManageAction.postVision(this.ruleForm).then(res => {
                if (res.code === 1) {
                  this.$parent.$parent.onSearch()
                  MessageBox({
                    title: '提示',
                    message: '保存成功！',
                    type: 'info',
                    showCancelButton: false
                  }).then(() => {
                    this.$parent.$parent.showDialog = false
                  })
                } else {
                  MessageBox({
                    title: '提示',
                    message: '保存失败！',
                    type: 'info',
                    showCancelButton: false
                  })
                }
              })
            } else {
              console.log('error submit!!')
              return false
            }
          })
          break
      }
    },
    openVision(type, info) {
      this.infoType = type
      this.ruleForm = info
      switch (type) {
        case 'edit':
          break
        case 'info':
          break
      }
    }
  }
}
</script>

<style>
.el-form-item .el-form-item__content {
    height: 29px;
}
</style>
