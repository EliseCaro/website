const arachnid_index = {
     option :{
          model  : -1,
          html:`<div class="item_prefix form-group col-sm-5 p-1 badge-primary mb-3 form-group-prefix" data-key="[ID]">
                 <div class="input-daterange input-group">
                     <input type="text" class="form-control form-control-sm" name="domain-title" placeholder="站点名字">
                     <div class="input-group-prepend input-group-append">
                        <span class="input-group-text font-w600"><i class="fa fa-fw fa-link"></i></span>
                     </div>
                     <input type="text" class="form-control form-control-sm col-sm-5" name="domain-tags" placeholder="www.test.com">
                 </div>
                 <div class="prefix_delete badge-primary"><i class="si si-close"></i></div>
           </div>`,
     },
     action:{
          check:function () {
               arachnid_index.option.model = -1
               $.each($(".item_prefix"),function(i,j){
                    if (arachnid_index.option.model <= parseInt($(j).data("key"))){
                         arachnid_index.option.model = parseInt($(j).data("key"))
                    }
               });
               return ++arachnid_index.option.model
          },
          create:function (){
               $("#domain_row").prepend(arachnid_index.option.html.replace(/\[ID\]/g,arachnid_index.action.check()));
          }
     },
     begin:{
          createClick:function (){
               $(".item_create").click(function () {
                    arachnid_index.action.create()
               });
               if (!arachnid_index.action.check()) {
                    arachnid_index.action.create()
                    arachnid_index.action.create()
               }
          },
          deleteClick:function (){
               $("body").on("click",".prefix_delete",function(){$(this).parent().remove();})
          }

     },
}
$(document).ready(function() {
     arachnid_index.begin.createClick();
     arachnid_index.begin.deleteClick();
});