<template>
  <div class="print_page" style="text-align:center">
    <table class="table">
      <thead>
        <tr>
          <th>体检中心编码</th>
          <th>名称</th>
          <th>区域名称</th>
          <th>地区编码</th>
          <th>拼音码</th>
          <th>联系方式</th>
          <th>删除标记</th>
          <th width="88">说明</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, key) in propData">
          <tr>
            <td>{{ item.code }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.areaName }}</td>
            <td>{{ item.areaCode }}</td>
            <td>{{ item.pinyin }}</td>
            <td>{{ item.phone }}</td>
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

