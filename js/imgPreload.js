//图片预加载
(function($){
	//构造函数
	function Preload(imgs,opt){
		this.imgs=(typeof imgs ==='string') ? [imgs] : imgs;
		this.opts=$.extend({},Preload.init,opt);
    this._unorderLoad()
	}
	Preload.init={
		eachF:null,
		loaded:null
	}
	Preload.prototype._unorderLoad=function(){
		var count=0,
		    img=this.imgs,
		    len=img.length,
		    opts=this.opts;
		$.each(img,function(i,item){
			console.log(typeof item );
			if(typeof item != 'string') return;
			
			var imgObj= new Image();
			$(imgObj).on('load error',function(){
				opts.eachF&&opts.eachF(count);
				if(count>=len-1){
					opts.loaded&&opts.loaded();
				}
				count++
			});
			imgObj.src=item;
		})
	}
	$.extend({
		preload:function(imgs,opt){
			new Preload(imgs,opt);
		}
	});
})(jQuery)
