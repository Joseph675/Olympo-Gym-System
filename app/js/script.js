$(document).ready(function (){
    excel = new ExcelGen({
        "src_id": "excel",
        "show_header": true
    });
    $("generate").click(function(){
        excel.generate();
    });
});