//图片预加载
(function($){
	//构造函数
	function Preload(imgs,opt){
		this.imgs=(typeof imgs ==='string') ? [imgs] : imgs;
		this.opts=$.extend({},Preload.init,opt);
		if(this.opts.order==true){
			this._orderLoad();
		}else {
			this.opts._unorderLoad();
		}   
	}
	//默认数据
	Preload.init={
		order:false,
		eachF:null,
		loaded:null
	}
	Preload.prototype._orderLoad=function() { //有序预加载
		var count=0,
		    img=this.imgs,
		    len=img.length,
		    opts=this.opts;   
		function load() {
			  opts.eachF&&opts.eachF(count);
		    	var imgObj=new Image();
		    	$(imgObj).on('error load', function () {
		    		if (count >=len) {
		    			opts.loaded&&opts.loaded();
		    		} else {
		    			load();
		    		}
		    		count++;
		    		
		    	})
		    	imgObj.src=img[count];
		    }
		 load();
	}
	Preload.prototype._unorderLoad=function() { //无序预加载
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
