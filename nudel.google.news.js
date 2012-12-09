/*    @ News-Feeder Plugin By Alex Nudelman  */	
var NewsFeeder = {

  		config :{

  			newsApi: 'https://ajax.googleapis.com/ajax/services/feed/find',
  			feedHolder:  null,
  			v:'1.0',
  			q: 'samsung', /// test default value 
  			callback:'?',
  			timer:null,
  			feedCounter:null

  		},


  		init: function(config){

  			$.extend(this.config,config);
  			this.getNews();
  			 
  		},

  		animate:function(){ ////  overriding basic animate 

  			var news = $('li',this.config.feedHolder).delay(5000).fadeOut();
  			var handler  = this;
  			
			this.config.timer = setInterval(function(){

												
				$(news[handler.config.feedCounter]).fadeIn().delay(7000).fadeOut();
				handler.config.feedCounter++;
				if(handler.config.feedCounter==$(news).length)
					{
						handler.config.feedCounter = 0;
						window.clearInterval(handler.config.timer);
						handler.getNews(); //// refresh with new portion of news
					}

			},8000);

  		},


  		publishFeed: function(feed){
  			
  			 this.config.feedHolder.html(

  			 		$.map(feed.entries,function(value, index){
  				
  								return '<li>'+
  										'<div class="post-title">'+value.title+'</div>'+
  										'<div class="post-content">'+value.contentSnippet+
  										'<span class="post-link"><a href="'+value.link+'">Read more...</a></span></div>'+
  								'</li>';
  								
  					 }).join(' '));
  		},

  		getNews: function(){
  			var handler = this;

  			$.ajax({

  				url:this.config.newsApi,
  				dataType: 'jsonp',
  				data: { 
  				 		     q:this.config.q,
  				 		     v:this.config.v,
  				 		     callback:this.config.callback
  						
  				 	},
  				type:'POST',

  				success:function(feed){
  					
  					handler.publishFeed(feed.responseData);
  					handler.animate();

  				},
  				error:function(){
              alert("Oops. Something went wrong ..." );
  				}
  			})
  		}



  	}