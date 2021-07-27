<template>
  <div class="print_page" style="text-align:center">
    <table class="table">
      <thead>
        <tr>
          <th>流水号</th>
          <th>指标编码</th>
          <th>名称</th>
          <th>性别</th>
          <th>年龄上限</th>
          <th>年龄下限</th>
          <th>视力/身高上限</th>
          <th>视力/身高下限</th>
          <th>体重上限</th>
          <th>体重下限</th>
          <th>BMI上限</th>
          <th>BMI下限</th>
          <th>删除标记</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, key) in propData">
          <tr>
            <td>{{ item.num }}</td>
            <td>{{ item.code }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.gender }}</td>
            <td>{{ item.ageUp }}</td>
            <td>{{ item.ageDown }}</td>
            <td width="65">{{ item.optionUp }}</td>
            <td width="65">{{ item.optionDown }}</td>
            <td>{{ item.weightUp }}</td>
            <td>{{ item.weightDown }}</td>
            <td>{{ item.BMIUp }}</td>
            <td>{{ item.BMIDown }}</td>
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
        padding: 10px 2px;
        font-size: 11px;
    }
    .table tbody tr td {
        font-size: 10px;
        border: 1px solid #ccc;
        padding: 10px 2px;
    }
}

</style>

