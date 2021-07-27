<template>
  <div class="print_page" style="text-align:center">
    <table class="table">
      <thead>
        <tr>
          <th>序号</th>
          <th>编号</th>
          <th>拼音码</th>
          <th>名称</th>
          <th>删除标记</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, key) in propData">
          <tr>
            <td>{{ key + 1 }}</td>
            <td>{{ item.num }}</td>
            <td>{{ item.pinyin }}</td>
            <td>{{ item.name }}</td>
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
        padding: 10px 10px;
        font-size: 13px;
    }
    .table tbody tr td {
        font-size: 12px;
        border: 1px solid #ccc;
        padding: 10px 6px;
    }
}

</style>

