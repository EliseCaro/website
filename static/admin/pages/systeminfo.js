
const systeminfo = {
    cpuChartCon : $(".cpuSysteminfo"),
    memChartCon : $(".memSysteminfo"),
    actionUrl   : "/admin/endorse/system",
    cpuObject   : null,
    memObject   : null,
    init:()=>{
       $(".systemClick").click(()=>{
           systeminfo.cpuinfo()
           systeminfo.meninfo()
           systeminfo.getData((data)=>{
               systeminfo.update(data)
               systeminfo.diskinfo(data.disk)
           })
       })
     // setInterval(function (){systeminfo.getData((data)=>{systeminfo.update(data)})},1000 * 5)
    },
    update:(data)=>{
        systeminfo.cpuObject.data.datasets[0].data = systeminfo.percentSum(data.cpu[0].cpu_percent)
        systeminfo.memObject.data.datasets[0].data = systeminfo.percentSum(data.men.user_percent)
        systeminfo.memObject.update();
        systeminfo.cpuObject.update();
    },
    percentSum:(percent)=>{
        let num = percent.replace(/%/, "")
        return [parseFloat(num),100 - parseFloat(num)]
    },
    getData:(callback)=>{
        application.ajax.post(systeminfo.actionUrl,{
            hideLoader:true,
        },(res)=>{callback(res.data)});
    },
    meninfo:()=>{
        systeminfo.memObject = new Chart(systeminfo.memChartCon, {
            type: 'pie',
            borderWidth:0,
            data: {labels: [' 占用', ' 剩余'],datasets: [{data: [0, 100],backgroundColor: ['rgba(204, 0, 51, 1)','rgba(51, 204, 153, 1)']}]},
        })
        systeminfo.memObject.options.tooltips.callbacks = {
            label: function(tooltipItems, data) {return data.labels[tooltipItems.index]+ ":" + data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index] + "%";}
        };
    },
    cpuinfo:()=>{
        systeminfo.cpuObject = new Chart(systeminfo.cpuChartCon, {
            type: 'pie',
            borderWidth:0,
            data: {labels: [' 占用', ' 剩余'],datasets: [{data:[0, 100],backgroundColor: ['rgba(102, 0, 51, 1)', 'rgba(51, 255, 103, 1)']}]},
        })
        systeminfo.cpuObject.options.tooltips.callbacks = {
            label: function(tooltipItems, data) {return data.labels[tooltipItems.index]+ ":" + data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index] + "%";}
        };
    },
    diskinfo:(data)=>{
        let html  = ``
        for(j = 0; j < data.length; j++) {
        html += `<div class="col-lg-6">
                    <div class="block btn-alt-dual-tianhe-2 mb-0" style="border-radius: 10px">
                        <div class="block-content pt-2 pl-0 pr-0 pb-2">
                             <canvas class="disk_`+j+`" style="height:84px"></canvas>
                        </div>
                        <div class="block-content p-0 text-center pb-2">硬盘（`+data[j].path.replace(/:/, "")+`）</div>
                    </div>
                </div>`
        }
        $(".disk_box").html(html).show();
        systeminfo.diskInitialize(data)
    },
    diskInitialize:(data)=>{
        for(j = 0; j < data.length; j++) {
            let used_percent = parseFloat(data[j].used_percent)
            new Chart($(".disk_"+j), {
                type: 'pie',
                borderWidth:0,
                data: {labels: [' 占用', ' 剩余'],datasets: [{data:[used_percent, 100-used_percent],backgroundColor: ['rgba(102, 0, 102, 1)', 'rgba(51, 204, 255, 1)']}]},
                options:{tooltips:{callbacks:{label:(tooltipItems, data)=>{return data.labels[tooltipItems.index]+ ":" + data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index] + "%";}}}}
            });
        }
    }
}

$(document).ready(function() {
    Chart.defaults.global.elements.arc.borderWidth = 2
    Chart.defaults.global.title.display = false
    Chart.defaults.global.legend.display = false
    Chart.defaults.global.responsive = true
    Chart.defaults.global.maintainAspectRatio = false
    systeminfo.init();
});