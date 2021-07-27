<template>
  <div class="print_page" style="text-align:center">
    <table class="table">
      <thead>
        <tr>
          <th>序号</th>
          <th>班级流水号</th>
          <th>班级名称</th>
          <th>拼音码</th>
          <th>排序</th>
          <th>删除标记</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, key) in propData">
          <tr>
            <td>{{ key + 1 }}</td>
            <td>{{ item.num }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.pinyin }}</td>
            <td>{{ item.sort }}</td>
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

