var Slider = (function() {

	return{
		init: function(){
	 		$( "#slider-range" ).slider({
				range: true,
				min: 0,
				max: 30000,
				values: [ 100, 13000 ],
				slide: function( event, ui ) {
				$( "#goods-prices__min" ).val( ui.values[ 0 ]);
				$( "#goods-prices__max" ).val( ui.values[ 1 ]);
				},
				create: function( event, ui ) {
				$( "#goods-prices__min" ).val( $( "#slider-range" ).slider( "values", 0 ) );
				$( "#goods-prices__max" ).val( $( "#slider-range" ).slider( "values", 1 ) );
				}
			});
	 	}
	}

})();

var ChangeViewType = (function(){
	var _changeType = function($this){
		var viewType = $this.data('view'),
			catalogItems = $('#catalog__list'),
			prefix = 'catalog__list_view-',
			catalogItemsStyleName = prefix + viewType;
			_removeActive($this);
			catalogItems.attr('class', catalogItemsStyleName);
	};

	var _removeActive = function($this){
		$('.view__show-style').removeClass('active');
		$this.addClass('active');

	};

	return{
		init: function(){
			$('.view__show-style').on('click', function(e) {
				e.preventDefault();
				_changeType($(this));
			});
		}
	}
})();


var Slideshow = (function(){
	var _changeSlide = function($this){
		var parentNode = $this.closest('.catalog__item__slideshow'),
			pathPicture = $this.find('.slideshow__prew').data('bigpic'),
			bigPicture = parentNode.find('.slideshow__img');
		bigPicture.fadeOut( function() {
			$(this).attr('src', pathPicture).fadeIn();
		});
		_removeActive($this)
	};

	var _removeActive = function($this){
		$('.slideshow__item').removeClass('active');
		$this.closest('.slideshow__item').addClass('active');
	};

	return{
		init: function(){
			$('.slideshow__link').on('click', function(e) {
				e.preventDefault();
				_changeSlide($(this));
			});
		}
	}

})();

var Accordeon = (function(){
	var _openAccordeonSection = function($this){
		var parentNode = $this.closest('.goods__item'),
			accordeonSection = parentNode.find('.goods__trigger_content'),
			otherSection = $this.closest('.goods__list').find('.goods__trigger_content');
		if (!parentNode.hasClass('active')){
			otherSection.slideUp().closest('.goods__item').removeClass('active');
			parentNode.addClass('active');
			accordeonSection.stop(true, true).slideDown();
		} else {
			parentNode.removeClass('active');
			accordeonSection.stop(true, true).slideUp();
		}
		
	}

	return{
		init: function(){
			$('.goods__trigger').on('click', function(e) {
				e.preventDefault();
				_openAccordeonSection($(this));
			});
		}
	}
})();


$(document).ready(function() {
	if($('#slider-range').length){
		Slider.init();
	}

	if($(".catalog__view_select").length){
		$(".catalog__view_select").select2({minimumResultsForSearch: Infinity});
	}

	if($(".information__columnize").length){
		$(".information__columnize").columnize({ columns: 2 });
	}

	$('.goods__reset').on('click', function(e){
		e.preventDefault();

		var parentNode = $(this).closest('.goods__trigger_content'),
			allCheckboxes = parentNode.find('input:checkbox');
		allCheckboxes.each(function() {
			$(this).removeProp('checked');
		});
	});

	if($('.goods-filter').length){
		Accordeon.init();
	}

	ChangeViewType.init();
	Slideshow.init();
});