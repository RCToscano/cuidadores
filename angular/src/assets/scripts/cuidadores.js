$(document).ready(function () {
  // Setup - add a text input to each footer cell
  $('#example tfoot th').each(function (i) {
      var title = $('#example thead th').eq($(this).index()).text();
      $(this).html('<input type="text" placeholder="' + title + '" data-index="' + i + '" />');
  });

  // DataTable
  var table = $('#example').DataTable({
      "language": {
          "search": "Buscar",
          "info": "Total _TOTAL_ registros",
          "infoFiltered": "(filtered from _MAX_ total entries)",
      },
      "searching": false,
      scrollY: "450px",
      scrollX: true,
      scrollCollapse: true,
      paging: false,
      fixedColumns: true
  });

  // Filter event handler
  $(table.table().container()).on('keyup', 'tfoot input', function () {
      table.column($(this).data('index')).search(this.value).draw();
  });
});
