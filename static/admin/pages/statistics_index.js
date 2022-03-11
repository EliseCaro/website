const statistics_index = {
    spiderWeekData:(callback)=>{
        const action = $(".week-statistics").data("action")
        application.ajax.post(action,{
            hideLoader:true,
        },(res)=>{callback(res.data)});
    },
    articleWeekData:(callback)=>{
        const action = $(".week-articles").data("action")
        application.ajax.post(action,{
            hideLoader:true,
        },(res)=>{callback(res.data)});
    },
    articleWeekInit:(data)=>{
        const object = $(".week-articles")
        new Chart(object, {
            type: 'line',
            data: {labels: data.labels, datasets:data.datasets},
            options:{
                layout:{padding:{top:10,left:10,right:28,bottom:10}},
                legend:{display:true}
            }
        })
    },
    spiderWeekInit:(data)=>{
        const object = $(".week-statistics")
        new Chart(object, {
            type: 'line',
            data: {labels: data.labels, datasets:data.datasets},
            options:{
                layout:{padding:{top:10,left:10,right:28,bottom:10}},
                legend:{display:true}
            }
        })
    },
      begin:()=>{
          statistics_index.spiderWeekData((res)=>{
              statistics_index.spiderWeekInit(res)
          })
          statistics_index.articleWeekData((res)=>{
              statistics_index.articleWeekInit(res)
          })
      }
}
$(document).ready(function() {
    statistics_index.begin()
});