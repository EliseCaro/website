const module_upload = {
    option:{
        uploadObject   : {},
        uploadObjectFile   : {},
        upload_onLoad:function (object) {
            const items_object = object.parent().children(".upload_onLoad");
            items_object.children().each(function(i,n){
                if(typeof(object.createProgress) == 'function'){
                    object.createProgress($(n).data("name"),$(n).data("path"),$(n).data("size"));
                }
            });
        },
        upload_success:function (data,pd,object) {
            if(data && data.status === false){
                application.cms.alert({
                    title : application.cms.requestStatus.errorTitle,
                    text  : data.message,
                    type  : "error",
                    timer : application.cms.layerTime
                },function () {
                    pd.statusbar.remove();
                    module_upload.option.uploadObject.reset(false);
                })
            }else {
                object.parent().children("input[type='hidden']").val(data.data.id)
            }
        },
        delete_value:function (data,pd,object){
            object.parent().children("input[type='hidden']").val(0)
        },
        commonOpt:{
            url:application.cms.uploadImageUrls,
            dragDropStr:false,
            maxFileCount:1,
            fileName:"file",
            dragdropWidth : "90px",
            showDelete: true,
            deleteStr:'<i class="si si-close"></i>',
            showAbort:false,
            showError:false,
            showFileSize:false,
            showProgress:true,
        },
        fileLoad:function (obj){
            const object = obj.parent().children(".ajax-file-upload-container")
            const items  = obj.parent().children(".upload_onLoad").children(".upload_item_onLoad")
            object.children().each(function(i,n){
                var icon =  $(items[i]).data("icon") || "file-archive";
                var value = $(items[i]).data("value") || 0;
                $(n).prepend('<div class="files_box_upload pt-2" data-value="'+value+'"><i class="far fa-2x fa-'+icon+'"></i></div>')
            });
        }
    },
    begin :{
        initImage:function () {
            const core = $.extend(module_upload.option.commonOpt,{
                showPreview:true,
                previewHeight: "90px",
                previewWidth: "90px",
                uploadStr:'<div class="upload-dragdrop-plus"><i class="far fa-2x fa-images"></i></div>',
                onLoad:function(obj){
                    module_upload.option.upload_onLoad(obj)
                },
                onSuccess:function(files,data,xhr,pd){
                    module_upload.option.upload_success(data,pd,module_upload.option.uploadObject)
                },
                deleteCallback:function (data,pd) {
                    module_upload.option.delete_value(data,pd,module_upload.option.uploadObject)
                }
            })
            module_upload.option.uploadObject = $(".text_object").uploadFile(core)
        },
        initFiles:function (){
            const core = $.extend(module_upload.option.commonOpt,{
                showPreview:false,
                showFileName:false,
                uploadStr:'<div class="upload-dragdrop-plus"><i class="far fa-2x fa-folder-open"></i></div>',
                onLoad:function(obj){
                    module_upload.option.upload_onLoad(obj)
                    module_upload.option.fileLoad(obj)
                },
                onSuccess:function(files,data,xhr,pd){
                    module_upload.option.upload_success(data,pd,module_upload.option.uploadObjectFile)
                    module_upload.option.fileLoad(module_upload.option.uploadObjectFile)
                },
                deleteCallback:function (data,pd) {
                    module_upload.option.delete_value(data,pd,module_upload.option.uploadObjectFile)
                }
            })
            module_upload.option.uploadObjectFile = $(".file_object").uploadFile(core)
        },
    }
}

$(document).ready(function() {
    module_upload.begin.initImage();
    module_upload.begin.initFiles();
});
