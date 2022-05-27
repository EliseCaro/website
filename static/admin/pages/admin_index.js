const admin_index = {
    begin:{
        update:function (){
            $(".update-btn").click(function () {
                application.ajax.post($(this).data("update"),
                {"urls":$(this).data("download"),"vers":$(this).data("vers")},
                function (result){
                    application.ajax.requestBack(result.message,result.status,result.url,function (){
                        result.status  &&  admin_index.begin.restart();
                    })
                });
            });
        },
        restart:function (){
            application.ajax.post(
                $(".update-btn").data("update"),
                {"restart":"yes"},function (res){
                setTimeout( function(){
                    application.ajax.requestBack(res.message,res.status,res.url)
                }, application.cms.requestStatus.layerTime * 3);
            })
        }
    }
}
$(document).ready(function() {
    admin_index.begin.update();
});