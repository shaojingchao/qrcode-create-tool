$(function() {


    $("#qr_size").html((function(num) {
        var tpl = '';
        for (var i = 0;(i * 20 + 80) <= num; i++) {
            var newnum = i * 20 + 80;
            tpl += '<option value="' + newnum + '">' + newnum + ' * ' + newnum + '</option>';
        }
        return tpl;
    })(1000)).val(200);

    var formatQrName = function (index){
        var index = index + 1;
        var $qrName = $("#qr_name").val().trim();
        var name = $qrName.length === 0 ? 'qrcode' : $qrName;
        return name + "_" + (index > 9 ? index : "0" + index);
    }

    // 生成二维码
    $("#qr_preview").on("click", function() {
        var qrtext = $("#qr_text").val();
        if (qrtext.length > 0) {
            var arr = qrtext.replace(/(\s+)/gm, "\n").split("\n");
            var newarr = arr.filter(function(n) {
                return n.length > 0
            });

            var $size = parseInt($("#qr_size").val(), 10);

            function createList(arr) {
                var tpl = '<ol class="qr_list clearfix">';
                for (var i = 0; i < arr.length; i++) {
                    tpl += '<li>' + arr[i] + '</li>';
                }
                tpl += '</ol>';
                return tpl;
            }
            $("#J_previewBox").html(createList(newarr));
            var $li = $("#J_previewBox").find("li");
            $li.width($size);
            $li.each(function(index,n) {
                var item = $(this).text();
                $(this).wrapInner("<p></p>").prepend('<p><b>'+(index+1)+'. </b>'+formatQrName(index)+'.jpg</p>');
                $(this).qrcode({
                    width: $size,
                    height: $size,
                    // size: $size,
                    background: "#fff",
                    text: item
                });
            });
        } else {
            alert("请输入内容");
        }
    })

    // // 自动下载图片
    $("#qr_save").on("click", function() {
        if ($("canvas").length) {
            $("canvas").each(function(index) {
                var $src = $(this).get(0).toDataURL('image/jpeg');
                var aaa = document.createElement("a");
                aaa.download = formatQrName(index);
                aaa.href = $src;
                aaa.click();
            });
        } else {
            alert("请先生成二维码")
        }
    })
});