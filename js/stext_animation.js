

	function tm_animate_text(){
	
		"use strict";
		
		var animateSpan			= jQuery('.sAnimation_text_word');
		
			animateSpan.typed({
				strings: ["Anunciando el Evangelio de Cristo a los Pueblos de Habla Hispana del mundo"],
				loop: true,
				startDelay: 1e3,
				backDelay: 3e3
			});
	}

	jQuery(document).on('ready', function () {
		(function ($) {
			tm_animate_text();
		})(jQuery);
	});