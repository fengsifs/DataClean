/**
 * Created by FengSi on 2017/04/24 0024.
 */

define([
    'state',
    "render",
    'html2canvas',
    'canvg',
    'jspdf',
    "mvc/EvaluationReportView",
    'text!mvc/template/evaluationreport.template.html'
], function (State, Renderer, html2canvas, canvg, jspdf, EvaluationReport, EvaluationReportTemplate) {
    "use strict";
    function start(id) {
        var html = _.template(EvaluationReportTemplate)();
        $('#' + id).html(html);
        Renderer.drawOverview("report-overview");
        // Renderer.drawAttribute("report-attribute");
        // Renderer.drawDistribution("report-distribution");
        // Renderer.drawTupleRank("report-tupleRank");
        $("#generate-pdf").click(function () {
            $(".modal-body svg").each(function (index, node) {
                var parentNode = node.parentNode;
                //由于现在的IE不支持直接对svg标签node取内容，所以需要在当前标签外面套一层div，通过外层div的innerHTML属性来获取
                var tempNode = document.createElement('div');
                tempNode.appendChild(node);
                var svg = tempNode.innerHTML;
                var canvas = document.createElement('canvas');
                //转换
                canvg(canvas, svg);
                parentNode.appendChild(canvas);
            });
        });

        $("#export-pdf").click(function () {
            html2canvas($("#report"), {
                onrendered: function (canvas) {
                    var imgData = canvas.toDataURL('image/jpeg');
                    var img = new Image();
                    img.src = imgData;
                    //根据图片的尺寸设置pdf的规格，要在图片加载成功时执行，之所以要*0.225是因为比例问题
                    img.onload = function () {
                        //此处需要注意，pdf横置和竖置两个属性，需要根据宽高的比例来调整，不然会出现显示不完全的问题
                        var doc = new jspdf('p', 'mm', [210, 297]);
                        doc.addImage(imgData, 'jpeg', 0, 0);
                        //根据下载保存成不同的文件名
                        doc.save('report_pdf_' + new Date().getTime() + '.pdf');
                    }
                },
                background: "#fff",
                //这里给生成的图片默认背景，不然的话，如果你的html根节点没设置背景的话，会用黑色填充。
                allowTaint: true //避免一些不识别的图片干扰，默认为false，遇到不识别的图片干扰则会停止处理html2canvas
            });
        });
    }

    return {
        start: start
    };
});