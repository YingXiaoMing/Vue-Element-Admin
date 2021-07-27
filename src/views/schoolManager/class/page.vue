<template>
  <div class="print_page" style="text-align:center">
    <table class="table">
      <thead>
        <tr>
          <th>序号</th>
          <th>学校班级索引</th>
          <th>班级编码</th>
          <th>班级名称</th>
          <th>学校编码</th>
          <th>学校名称</th>
          <th>班级拼音码</th>
          <th>学制</th>
          <th>入学年度</th>
          <th>往届</th>
          <th>删除标记</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, key) in propData">
          <tr>
            <td>{{ key + 1 }}</td>
            <td>{{ item.suyin }}</td>
            <td>{{ item.classCode }}</td>
            <td>{{ item.className }}</td>
            <td>{{ item.schoolCode }}</td>
            <td>{{ item.schoolName }}</td>
            <td>{{ item.pinyin }}</td>
            <td>{{ item.level }}</td>
            <td>{{ item.year }}</td>
            <td>{{ item.wj }}</td>
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
        padding: 10px 5px;
        font-size: 11px;
    }
    .table tbody tr td {
        font-size: 8px;
        border: 1px solid #ccc;
        padding: 10px 6px;
    }
}

</style>

