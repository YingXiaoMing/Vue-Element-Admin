<template>
  <div class="print_page" style="text-align:center">
    <table class="table">
      <thead>
        <tr>
          <th>序号</th>
          <th>学生索引号</th>
          <th>学生健康卡号</th>
          <th>学号</th>
          <th>学生姓名</th>
          <th>性别</th>
          <th>身份证号码</th>
          <th>推荐卡号</th>
          <th>籍贯</th>
          <th>联系手机</th>
          <th>微信</th>
          <th>QQ号</th>
          <th>删除标记</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, key) in propData">
          <tr>
            <td>{{ key + 1 }}</td>
            <td>{{ item.num1 }}</td>
            <td>{{ item.num2 }}</td>
            <td>{{ item.num3 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.gender }}</td>
            <td>{{ item.num }}</td>
            <td>{{ item.cardNum }}</td>
            <td>{{ item.jg }}</td>
            <td>{{ item.tel }}</td>
            <td>{{ item.weixin }}</td>
            <td>{{ item.qq }}</td>
            <td>{{ item.tags }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    propData: {
      type: Array,
      default: []
    }
  }
}
</script>

<style>
.print_page {
    display: none;
}
@media print {
    .print_page {
        opacity: 1;
        display: block;
    }
    .table {
        width: 100%;
        padding: 0;
        margin: 0;
        border-collapse: collapse;
        border: 1px solid #ccc;
    }
    .table thead {
        border: 1px solid #ccc;
    }
    .table thead th {
        border: 1px solid #ccc;
        padding: 10px 0px;
        font-size: 10px;
    }
    .table tbody tr td {
        font-size: 8px;
        border: 1px solid #ccc;
        padding: 10px 6px;
    }
}

</style>

