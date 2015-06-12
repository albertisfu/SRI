$(document).ready(function(){

	window.io = io.connect();

	io.on( 'connect', function(socket){

		console.log('hi');
		io.emit('hello?');


	});

	io.on('saludo', function(data){


console.log(data);

	});

io.on('message', function(data){

	$('#digitos li').each(function  (i, item){

			$(item).remove();

	});

	$('#digitos').append('<li>'+data.ID+'</li>');

	if (data.ID)
	{
		$( '#digitos1' ).removeClass( 'iluv' );
		$( '#digitos1' ).addClass( 'ilua' );
		$( '#digitos1' ).addClass( 'ilu' );

	}



	if (data.off)
	{

		$( '#digitos1' ).removeClass( 'ilu' );
console.log('off');
		$('#digitos li').each(function  (i, item){

			$(item).remove();

	});

		$( '#digitos1' ).removeClass( 'ilua' );
		$( '#digitos1' ).addClass( 'ilug' );

	}


	if (data.dev)
	{
		console.log('dev');

		$('#digitos li').each(function  (i, item){

			$(item).remove();

	});

		$('#digitos').append('<li>'+data.dev+'</li>');

		$( '#digitos1' ).removeClass( 'ilug' );
		$( '#digitos1' ).addClass( 'ilua' );

		  var delay = setTimeout(function(){
        $('#digitos1').removeClass('ilua' );
        $( '#digitos1' ).addClass( 'iluv' );

        $('#digitos li').each(function  (i, item){

			$(item).remove();

	});


        
     }, 800);

	}



if ($( "#digitos1" ).hasClass( "ilu" ))
	{
		$.post( "/autorizacion" );
	}




});


io.on('log-out', function(data){


	$('#users li').each(function  (i, item){
		if(item.innerText === data.username){

			$(item).remove();
		}

	});

});

});