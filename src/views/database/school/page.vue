<template>
  <div class="print_page" style="text-align:center">
    <table class="table">
      <thead>
        <tr>
          <th>学校流水号</th>
          <th>学校代码</th>
          <th>学校名称</th>
          <th>拼音码</th>
          <th>区域名称</th>
          <th>区域代码</th>
          <th>年度</th>
          <th>删除标记</th>
          <th width="60">说明</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, key) in propData">
          <tr>
            <td>{{ item.num }}</td>
            <td>{{ item.code }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.pinyin }}</td>
            <td>{{ item.areaName }}</td>
            <td>{{ item.areaCode }}</td>
            <td>{{ item.year }}</td>
            <td>{{ item.tags }}</td>
            <td>{{ item.note }}</td>
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

