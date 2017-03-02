/*
 * QCRI, NADEEF LICENSE
 * NADEEF is an extensible, generalized and easy-to-deploy data cleaning platform built at QCRI.
 * NADEEF means "Clean" in Arabic
 *
 * Copyright (c) 2011-2013, Qatar Foundation for Education, Science and Community Development (on
 * behalf of Qatar Computing Research Institute) having its principle place of business in Doha,
 * Qatar with the registered address P.O box 5825 Doha, Qatar (hereinafter referred to as "QCRI")
 *
 * NADEEF has patent pending nevertheless the following is granted.
 * NADEEF is released under the terms of the MIT License, (http://opensource.org/licenses/MIT).
 */

define([
    "render",
    "text!mvc/template/tab.template.html",
    "text!mvc/template/dashboard.template.html"
], function (renderer, widgetTemplate, dashboardTemplate) {
    "use strict";
    function start() {
        render();

        renderer.drawOverview('overview');
        renderer.drawAttribute('attribute');
        renderer.drawDistribution('distribution');
		renderer.drawTupleRank('tupleRank');
    }
    
    function render() {
        var tabTemplate = _.template(widgetTemplate);
        var overviewHtml =
            tabTemplate({tabs:
                [{tag : "overview", head : "概览", isActive : true}]
            });
        var attributeHtml =
            tabTemplate({tabs:
                [{tag : "attribute", head : "规则属性", isActive : true}]
            });
        var distributionHtml =
            tabTemplate({tabs:
                [{tag : "distribution",
                  head : "规则分布",
                  isActive : true}]
            });
        var tupleRankHtml =
            tabTemplate({tabs:
                [{tag : "tupleRank",
                  head : "元组排名",
                  isActive : true}]
            });
        
        var dashboardTemplate = _.template(dashboardTemplate);
        var dashboardHtml = dashboardTemplate(
            {
                placeholder1: overviewHtml,
                placeholder2: attributeHtml,
                placeholder3: tupleRankHtml,
                placeholder4: distributionHtml
            });

        $('#container').html(dashboardHtml);
    }
    
    return {
        start: start
    };
});
