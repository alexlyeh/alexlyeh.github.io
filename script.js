		var cardClosed = false;
		var cardNum;

		var closeCard = function (section_id) {
			cardClosed = true;
			cardNum = section_id;
			console.log(cardClosed);
			$(".main-card").css({
				'opacity' : '0',
				"display" : "none"
			});

			$("#underline").css({
				'width' : '0px',
				'opacity' : '1'
			});

			$(".corner").css({
				'min-width' : '84px',
				'min-height' : '72px',
			});
		
			$("#center-div").css({
				'width' : '86px',
				'height' : '75px',
				'min-width' : '0px',
				'min-height': '0'
			});

			if (section_id == 1) {
				$("#about-section").css({
					'display' : 'inherit'
				});
			} else if (section_id == 2) {
				$("#project-section").css({
					'display' : 'inherit'
				});
			} else if (section_id == 3) {
				$("#experience-section").css({
					'display' : 'inherit'
				});
			}

			setTimeout(function(){
				$("#center-div").css({
					'width' : '90%',
					'height' : '85%',
					'min-height' : '630px',
					'min-width' : '650px',
					'max-height': 'none'
				});

				if (section_id == 1) {
					$("#about-section").css({
						'opacity' : '1'
					});
				} else if (section_id == 2) {
					$("#project-section").css({
						'opacity' : '1'
					});
				} else if (section_id == 3) {
					$("#experience-section").css({
						'opacity' : '1'
					});
				}
			}, 500);
		}

		var openCard = function (section_id) {
			cardClosed = false;
			cardNum = 0;
			if (section_id == 1) {
				$("#about-section").css({
					'opacity' : '0',
					"display" : "none"
				});
			} else if (section_id == 2) {
				$("#project-section").css({
					'opacity' : '0',
					"display" : "none"
				});
			} else if (section_id == 3) {
				$("#experience-section").css({
					'opacity' : '0',
					"display" : "none"
				});
			}

			$("#corner").removeAttr('style');

			$("#center-div").css({
				'min-height' : '0px',
				'width' : '86px',
				'height' : '75px',
				'min-width' : '0px'
			});

			setTimeout(function(){
				$("#center-div").removeAttr('style');

				$(".main-card").css({
					"display" : "inherit"	
				});

				setTimeout(function(){
					$(".main-card").css({
						'opacity' : '1'
					});

					$("#name").css({
						'display' : 'inline-block'
					});

					$("#underline").css({
						'width' : $("#name").width() + 'px'
					});
				}, 100);
			}, 500);
		}

		$(window).on('load', function() {
			var width = $("#name").width();
			$("#underline").css({
				'width' : width + 'px'
			});

			var hPerc = '20%'
			var wPerc = '12%'

			$(".corner").css({
				'width' : wPerc,
				'height' : hPerc,
			});

			console.log($(window).width());		

			$('#about-x').click(function () { openCard(1); });

			$('#about').click(function () { closeCard(1); });

			$('#project-x').click(function () { openCard(2); });

			$('#projects').click(function () { closeCard(2); });

			$('#experience-x').click(function () { openCard(3); });

			$('#experience').click(function () { closeCard(3); });
		});

		$(window).resize(function(){
			if ($(window).width() < 985) {
				$("#about-section").css({
					"display" : "inherit",
					'opacity' : '1'
				});

				$("#project-section").css({
					"display" : "inherit",
					'opacity' : '1'
				});

				$("#experience-section").css({
					"display" : "inherit",
					'opacity' : '1'
				});

				$("#section-div").css({
					"display" : "none",
					'opacity' : '0'
				});

				if (cardClosed) {
					$("#center-div").css({
						'width' : 'initial'
					});
					$(".main-card").css({
						"display" : "inherit",
						'opacity' : '1'
					});

					$("#section-div").css({
						"display" : "none",
						'opacity' : '0'
					});

					$("#center-div").css({
						'min-width' : '0px'
					});
				}
			} else {
				if (cardClosed) {
					$("#center-div").css({
						'width' : '90%',
					});

					$(".main-card").css({
						"display" : "none",
						'opacity' : '0'
					});

					$("#center-div").css({
						'min-width' : '650px'
					});
				} else {
					$("#section-div").css({
						"display" : "initial",
						'opacity' : '1'
					});
				}

				if (cardNum == 1) {
					$("#project-section").css({
						"display" : "none",
						'opacity' : '0'
					});

					$("#experience-section").css({
						"display" : "none",
						'opacity' : '0'
					});
				} else if (cardNum == 2) {
					$("#about-section").css({
						"display" : "none",
						'opacity' : '0'
					});

					$("#experience-section").css({
						"display" : "none",
						'opacity' : '0'
					});
				} else if (cardNum == 3){
					$("#about-section").css({
						"display" : "none",
						'opacity' : '0'
					});

					$("#project-section").css({
						"display" : "none",
						'opacity' : '0'
					});
				} else {
					var width = $("#name").width();
					$("#underline").css({
						'width' : width + 'px'
					});

					var hPerc = '20%'
					var wPerc = '12%'

					$(".corner").css({
						'width' : wPerc,
						'height' : hPerc,
					});

					console.log($(window).width());
					// if ($(window).width() >= 985) {
					// 	var height = $("#name").outerHeight(true) +
					// 			 + $("#about").outerHeight() + $("#projects").outerHeight(true)
					// 			 + $("#experience").outerHeight(true) + 50;
					// }

					// $("#center-div").css({
					// 	'height' : height + 'px'
					// });	

					$("#about-section").css({
						"display" : "none",
						'opacity' : '0'
					});

					$("#project-section").css({
						"display" : "none",
						'opacity' : '0'
					});

					$("#experience-section").css({
						"display" : "none",
						'opacity' : '0'
					});
				}
			}
		});