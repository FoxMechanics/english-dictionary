var nui = (function(){
	var win;

	var els = {};

	var mode = {
		home: function() {
			els.search_bar.removeClass('search-mode');
			els.home_panel.addClass('scrolled');
			els.search_panel.addClass('inactive');
		},
		search: function() {
			els.search_bar.addClass('search-mode');
			els.home_panel.removeClass('scrolled');
			els.search_panel.removeClass('inactive');
		}
	};

	var display = function(i, element) {
		setTimeout(function(){
			element.css({
				"margin": "1em 0",
				"opacity": "1",
			});
		}, i*100);
	};

	var render = function (data) {
		var ex;
		var word = {"word":""};
		var html = '';

		for (var i in data) {
			ex = word;
			word = data[i];

			if (ex.word == word.word) {
				html += '	<div class="definition">';
			} else {
				html += '</article>';
				html += '<article class="result">';
				html += '	<h2><span class="term">'+word.word+'</span></h2>';
				html += '	<div class="definition">';
			}
			
			
			if (word.type != '') {
				html += '		<div class="type">';
				html += '			'+ word.type;
				html += '		</div>';
			}

			html += '		<p>';
			html += '			' + word.descr;
			html += '		</p>';
			html += '	</div>';
		}

		html += '</article>';
		els.search_panel.html(html);

		els.search_panel.children().each(function(i, el){
			display(i, $(el));
		});
	};

	var init = function(conf) {
		win = $(window);

		els.home_panel = $(conf.home_panel);
		els.search_panel = $(conf.search_panel);
		els.search_bar = $(conf.search_bar);
		els.about_panel = $(conf.about_panel);

		els.about_btn = $(conf.about_btn);
		els.cancel_btn = $(conf.cancel_btn);

		els.about_btn.click(function() {
			els.about_panel.addClass('visible');
		});

		els.cancel_btn.click(function() {
			els.about_panel.removeClass('visible');
		});

		els.search_bar.find('input').first().focus(function() {
			mode.search();
		}).blur(function(){
			if ($(this).val() == '') {
				mode.home();
			}
		}).keyup(function(){
			dictionary.search($(this).val(), render);
		});


		return {
			
		};
	};

	return {
		init: init,
	};

})().init({
	home_panel: "#home-panel",
	search_bar: ".search",
	search_panel: ".search-panel",
	about_panel: ".about-panel",
	about_btn: ".about",
	cancel_btn: ".cancel",
	rem: ".rem",
});