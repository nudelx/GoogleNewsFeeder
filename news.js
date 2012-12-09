$(document).ready(function(){
	
	$('button.go').click(function(){
		
		NewsFeeder.init({ feedHolder:  $('ul.news-holder'),	q: $('input[name="q"]').val()});
	});

			

			
});