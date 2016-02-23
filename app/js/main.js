$(function() {
	$( "#slider-range" ).slider({
		range: true,
		min: 0,
		max: 30000,
		values: [ 100, 13000 ],
		slide: function( event, ui ) {
		$( "#goods-prices__min" ).val( ui.values[ 0 ]);
		$( "#goods-prices__max" ).val( ui.values[ 1 ]);
		}
});

$( "#goods-prices__min" ).val( $( "#slider-range" ).slider( "values", 0 ) );
$( "#goods-prices__max" ).val( $( "#slider-range" ).slider( "values", 1 ) );
});