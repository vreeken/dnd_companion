<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">

		{{-- CSRF Token --}}
		<meta name="csrf-token" content="{{ csrf_token() }}">
		<!--<script> window.Laravel = {!! json_encode(['csrfToken' => csrf_token(),]) !!}; </script>-->

		<title>{{ env('APP_TITLE') }} A Dungeon Master's Best Friend</title>
		<meta name="description" content="DnD Companion: A Dungeon Master's Best Friend. Made for D&D 5e, usable by all.">
		<meta name="author" content="Michael Vreeken">

		<link rel="apple-touch-icon" sizes="180x180" href="{{ asset('/apple-touch-icon.png') }}">
		<link rel="icon" type="image/png" sizes="32x32" href="{{ asset('/favicon-32x32.png') }}">
		<link rel="icon" type="image/png" sizes="16x16" href="{{ asset('/favicon-16x16.png') }}">
		<link rel="manifest" href="{{ asset('/site.webmanifest') }}">
		<link rel="mask-icon" href="{{ asset('/safari-pinned-tab.svg') }}" color="#43aef1">
		<meta name="msapplication-TileColor" content="#43aef1">
		<meta name="theme-color" content="#ffffff">

		{{-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries --}}
		<!--[if lt IE 9]>
			<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
			<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
		<![endif]-->

		
		{{-- Styles --}}
		<link href="https://fonts.googleapis.com/css?family=Abril+Fatface|Montserrat:400,600" rel="stylesheet">

		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossorigin="anonymous">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css">

		<link href="{{ asset('css/app.css') }}" rel="stylesheet">

		<!-- Prefetch Future JS Assets -->
		<link rel="prefetch" href="{{ asset('/js/vendor.js') }}" as="script" />
		<link rel="prefetch" href="{{ asset('/js/posts.js') }}" as="script" />
		<link rel="prefetch" href="{{ asset('/js/npcs.js') }}" as="script" />

		<style type="text/css">
			.glide__arrow{position:absolute;display:block;top:50%;z-index:2;color:white;text-transform:uppercase;padding:9px 12px;background-color:transparent;border:2px solid rgba(255,255,255,0.5);border-radius:4px;box-shadow:0 0.25em 0.5em 0 rgba(0,0,0,0.1);text-shadow:0 0.25em 0.5em rgba(0,0,0,0.1);opacity:1;cursor:pointer;transition:opacity 150ms ease, border 300ms ease-in-out;transform:translateY(-50%);line-height:1}.glide__arrow:focus{outline:none}.glide__arrow:hover{border-color:white}.glide__arrow--left{left:2em}.glide__arrow--right{right:2em}.glide__arrow--disabled{opacity:0.33}.glide__bullets{position:absolute;z-index:2;bottom:2em;left:50%;display:inline-flex;list-style:none;transform:translateX(-50%)}.glide__bullet{background-color:rgba(255,255,255,0.5);width:9px;height:9px;padding:0;border-radius:50%;border:2px solid transparent;transition:all 300ms ease-in-out;cursor:pointer;line-height:0;box-shadow:0 0.25em 0.5em 0 rgba(0,0,0,0.1);margin:0 0.25em}.glide__bullet:focus{outline:none}.glide__bullet:hover,.glide__bullet:focus{border:2px solid white;background-color:rgba(255,255,255,0.5)}.glide__bullet--active{background-color:white}.glide--swipeable{cursor:grab;cursor:-moz-grab;cursor:-webkit-grab}.glide--dragging{cursor:grabbing;cursor:-moz-grabbing;cursor:-webkit-grabbing}
			.glide{position:relative;width:100%;box-sizing:border-box}.glide *{box-sizing:inherit}.glide__track{overflow:hidden}.glide__slides{position:relative;width:100%;list-style:none;backface-visibility:hidden;transform-style:preserve-3d;touch-action:pan-Y;overflow:hidden;padding:0;white-space:nowrap;display:flex;flex-wrap:nowrap;will-change:transform}.glide__slides--dragging{user-select:none}.glide__slide{width:100%;height:100%;flex-shrink:0;white-space:normal;user-select:none;-webkit-touch-callout:none;-webkit-tap-highlight-color:transparent}.glide__slide a{user-select:none;-webkit-user-drag:none;-moz-user-select:none;-ms-user-select:none}.glide__arrows{-webkit-touch-callout:none;user-select:none}.glide__bullets{-webkit-touch-callout:none;user-select:none}.glide--rtl{direction:rtl}	
		</style>
	</head>
	<body>
		<div id="app" >
				@include('templates.partials.nav')
				
				<div class="body-container">
				
					<div class="container alerts-container">
						@include('templates.partials.form-status')
					</div>

					<div class="content-container-full">
						<div id="glide" class="glide">
							<div class="glide__track" data-glide-el="track">
								<ul id="glide__slides" class="glide__slides"></ul>
							</div>
							<div class="glide__arrows is-hidden-mobile" data-glide-el="controls">
								<button class="glide__arrow glide__arrow--left" data-glide-dir="<"><i class="fas fa-arrow-left"></i></button>
								<button class="glide__arrow glide__arrow--right" data-glide-dir=">"><i class="fas fa-arrow-right"></i></button>
							</div>
							<div id="glide__progressbar"></div>
						</div>
						
						<div id="home__icons">
							<div class="columns">
								<a class="column is-half" href="npcs">
									<img src="{{ asset('/img/btns/npc_generator_btn.jpg') }}" style="height: 100px;" />
									<div>NPC Generator</div>
								</a>
								<a class="column is-half" href="hooks">
									<img src="{{ asset('/img/btns/plot_hooks_btn.jpg') }}" style="height: 100px;" />
									<div>Plot Hooks</div>
								</a>
							</div>
							<!--
							<div class="columns">
								<a class="column is-half" href="names">
									<img src="{{ asset('/img/btns/name_generator_btn.jpg') }}" style="height: 100px;" />
									<div>Name Generator</div>
								</a>
								<a class="column is-half" href="dungeons">
									<img src="{{ asset('/img/btns/dungeons_btn.jpg') }}" style="height: 100px;" />
									<div>Dungeons</div>
								</a>
							</div>
							-->
							<div class="columns">
								<a class="column is-half" href="items">
									<img src="{{ asset('/img/btns/unique_items_btn.jpg') }}" style="height: 100px;" />
									<div>Unique Items</div>
								</a>
								<a class="column is-half" href="maps">
									<img src="{{ asset('/img/btns/encounter_maps_btn.jpg') }}" style="height: 100px;" />
									<div>Encounter Maps</div>
								</a>
							</div>
							<div class="columns">
								<a class="column is-half" href="riddles">
									<img src="{{ asset('/img/btns/riddles_btn.jpg') }}" style="height: 100px;" />
									<div>Riddles</div>
								</a>
								<a class="column is-half" href="puzzles">
									<img src="{{ asset('/img/btns/puzzles_btn.jpg') }}" style="height: 100px;" />
									<div>Puzzles</div>
								</a>
							</div>
							<!--
							<div class="columns">
								<a class="column is-half" href="dice">
									<img src="{{ asset('/img/btns/dice_roller_btn.jpg') }}" style="height: 100px;" />
									<div>Dice Roller</div>
								</a>
								<a class="column is-half" href="loot">
									<img src="{{ asset('/img/btns/loot_generator_btn.jpg') }}" style="height: 100px;" />
									<div>Loot Generator</div>
								</a>
							</div>
							<div class="columns">
								<a class="column is-half" href="adventures">
									<img src="{{ asset('/img/btns/adventures_btn.jpg') }}" style="height: 100px;" />
									<div>Adventures</div>
								</a>
								<a class="column is-half" href="encounters">
									<img src="{{ asset('/img/btns/encounters_btn.jpg') }}" style="height: 100px;" />
									<div>Encounters</div>
								</a>
							</div>
							<div class="columns">
								<a class="column is-half" href="d100">
									<img src="{{ asset('/img/btns/d100_btn.jpg') }}" style="height: 100px;" />
									<div>d100 Lists</div>
								</a>
								<a class="column is-half" href="resources">
									<img src="{{ asset('/img/btns/urls_btn.jpg') }}" style="height: 100px;" />
									<div>External Resources</div>
								</a>
							</div>
							<div class="columns">
								<a class="column is-half" href="enemies">
									<img src="{{ asset('/img/btns/enemies_btn.jpg') }}" style="height: 100px;" />
									<div>Unique Enemies</div>
								</a>
								<a class="column is-half" href="resources">
									
								</a>
							</div>
							-->
						</div>
					</div>
				</div>

				@include('templates.partials.footer')
		</div>

		<script type="text/javascript" src="{{ asset('/js/glide.min.js') }}"></script>
		<script>
			/************************************************
							Burger Menu Toggle
			************************************************/
			var burger = document.querySelector('.burger');
			console.log(burger);
			var menu = document.querySelector('#'+burger.dataset.target);
			burger.addEventListener('click', function() {
				console.log('burger');
				burger.classList.toggle('is-active');
				menu.classList.toggle('is-active');
			});


			var encounters = [
				{
					url: "dark_woods",
					d100: [		
						"You come across a small ravine about six feet deep, the remains of a recently dried up creek. The earth is muddy and the edges of the ravine threaten to give way. At the bottom, blackened, broken bones jut up from the mud. Something glints in the murk.",
						"You find yourselves traveling down a dark path. The trees crowd close, their canopies blocking out almost all light even during high noon. Black birds perch on branches overhead, watching travelers, and bright pairs of yellow eyes glint from the shadows.",
						"While marching along the trail you spot a corpse, standing upright and tied to the trunk of a tree by thick ropes, its face contorted in final agony. The abdomen looks like it burst from the inside, and a strange yellow ichor clings to the inside of the cavity. A long drag of gore stretches across the ground, disappearing into the nearby trees.",
						"You spot the large, recent footprints of a barefoot man. They are clearly visible in the soft, loamy soil. With every step, the footprint elongates, transforming in a giant monstrous paw. The tracks disappear shortly after into ground with deeper leaf cover. Before you realize what it is, you hear a deep steady breathing right behind you...",
						"Just off the path you see a huge moth, the size of a small dog, fanning its wings on the trunk of a tree. Its wings have strange patterns that seem to writhe and twist, always changing. You can't help but stare at them, even to the point of ignoring the sensation of something with several sharp, barbed legs crawling up your leg."
					],
					currRandIndex: 0
				},
				{
					url: "road",
					d100: [
						"In the distance you hear faint singing. You happen across a lone bard singing stories of myth and legend. He asks you if you have any stories for him.",
						"You encounter a couple of gnomes with a partially disassembled wagon, arguing over the proper way to fix it.",
						"A stone's throw from the road you see a handful of actors rehearsing a play before their evening show in the next town.",
						"At the bottom of a small valley you see a lone paladin, deep in prayer, cleansing the land of evil.",
						"The road crests a hill, and spread out before you is a stunning, sweeping vista of the land beyond. A painter sits nearby, capturing the scene, and asks you to pose for his foreground."
					],
					currRandIndex: 0
				},
				{
					url: "stones",
					d100: [
						"You begin to pass by a strange, formless rock formation, but after passing it and looking back upon it, it looks eerily like a grinning goblin from that angle.",
						"Off the side of the trail you see the ruins of a tower once connected to a series of watch stations that surrounded this area in another life. There are several of these towers, each pleading to keep their secrets hidden from the modern world.",
						"Directly in the center of the path you see a weathered treestump about the height of a man. Dozens of age-tarnished coins from distant lands have been hammered into one side of the stump.",
						"As you pass through a narrow canyon you look up and spot a giant's skeleton stuck to the side of a cliff, a large sword still impaled through its chest.",
						"A short distance form the road you see a massive oak tree standing alone in a vast field. It bears the scars of numerous lightning strikes and more than one attempt to chop it down, but it is still healthy and strong."
					],
					currRandIndex: 0
				},
				{
					url: "tavern",
					d100: [
						"Upon sitting down to eat the first decent meal in as long as you can remember you overhear a group recanting their adventures. But you soon realize that all of their stories are actually your deeds!",
						"A forgetful spellcaster seems to have left their spellbook in a booth. As you reach to pick it up it bites down onto your hand and doesn't seem like it's letting go.",
						"Partway through your dinner an old codger asks for you to leave his table, that's where he's been sitting for the last 40 years and everyone knows he always sits there. After things get heated the other patrons begin to defend him.",
						"The chef storms out of the tavern in a fit of rage. The owner approaches you and asks if you would mind stepping in as cook for the evening.",
						"It's Comedy Night! Tell a good joke and maybe someone will buy you a glass.",
						"Today is the annual Bonny Beard Competition. The most elaborately styled beard, as judged by the patrons, nets the winner a night of free drinks. The losers have to shave their beards off.",
						"A love potion is accidentally slipped into your drink instead of the beautiful lady's at the next table..."
					],
					currRandIndex: 0
				},
				{
					url: "town",
					d100: [
						"A traveler drops a crate he was carrying under his arm, as the crate cracks against the cobbletone a blur of movement scatters in all directions. A dozen lizards escape into the street as the traveler desperately tries to round them all up.",
						"An excited collie runs up to you and begins barking and whimpering; it seems as though he is attempting to lead you somewhere.",
						"Walking down the street you nearly trip on an uneven cobblestone. Upon close inspection you find it to be loose and has a note underneath it.",
						"Down the street you see an excited gathering of people cheering and shouting. Various people are betting on a fight between two birds.",
						"A coachman in a carriage pulls up along side you. His carriage is being pulled by two buffalo. He offers you a free ride to promote his new business.",
						"A mother with a bundle in her arms runs up to you. She thrusts the bundle into your hands and screams, \"I cant handle it.\" and runs away, leaving a newborn child in your arms."
					],
					currRandIndex: 0
				},
				{
					url: "trail",
					d100: [
						"To one side of the trail you see a rain weathered statue of a human standing five feet tall, with a crystal clear liquid dripping from the statue's cupped hands. Tasting the water reveals it is salty, much like tears.",
						"A bear emerges from the tree line, limping its way onto the path in front of you. A trap is clamped to its hind leg with a chain and peg trailing behind it.",
						"Traversing down the path the sky begins to grow dim. Looking up reveals a luminescent bird circling above you. It appears to be following you along your journey.",
						"You stumble upon a pond alongside the trail. Partially submerged in the stagnant, murky water is an old rotting throne.",
						"Up ahead you see an archway that the trail passes under. After getting closer it reveals to be a dragon's jawbone spanning overhead. There are mysterious runes carved into each of the dragon's teeth.",
						"Around the next bend in the road you hear a song, sung by a beautiful voice, that mentions each of you by name. But upon rounding the bend there is nobody to be seen and the last notes of the song fade into eerie silence."
					],
					currRandIndex: 0
				}
			];

			//Build out Slides HTML
			var slidesHtml = "";
			for (var i=0; i<encounters.length; i++) {
				var r = Math.floor(Math.random() * encounters[i].d100.length);
				encounters[i].currRandIndex = r;
				slidesHtml += glideSlideTemplate(encounters[i].url, encounters[i].d100[r]);
			}
			function glideSlideTemplate(s, d) {
				var o = "<li class=\"glide__slide\" style=\"background-image: url('/img/hero/" + s + ".jpg');\">";
				o += "<div class=\"glide__slide__caption\" style=\"background-image: url('/img/hero/" + s + "_blurred.jpg');\">";
				o += "<p class=\"d100_text\">" + d + "</p>";
				o += "<div class=\"glide__slide__dice\">";
				o += "D100 Snippet <i class=\"fas fa-dice\"></i>";
				o += "</div></div></li>";
				return o;
			}
			
			//Append slidesHtml to the DOM #glide__slides
			var target = document.getElementById('glide__slides');
			var temp_div = document.createElement('div');
			temp_div.innerHTML = slidesHtml;
			while (temp_div.firstChild) {
				target.appendChild(temp_div.firstChild);
			}

			//Init Glide
			var glide = new Glide('.glide', {
				type: "carousel",
				focusAt: 'center',
				gap: 0,
				hoverpause: true,
				perView: 1,
				autoplay: false,
				startAt: 0,
				keyboard: true,
				animationDuration: 1000
			});
			
			//Mount Glide
			glide.mount();
			
			var isGlideMouseOver=false;
			var glideProgressBar = document.getElementById("glide__progressbar");
			var gpb_width=0.0;
			var id = setInterval(onGlideTimer, 10);
			function onGlideTimer() {
				if (!isGlideMouseOver) {
					if (gpb_width >= 100) {
						gpb_width=0.0;
						glideNextSlide();
					} else {
						gpb_width+=0.1; 
						glideProgressBar.style.width = gpb_width + '%';
					}
				}
			}

			function glideNextSlide() { glide.go('>'); }

			document.getElementById("glide").addEventListener("mouseover", glideMouseOver);
			document.getElementById("glide").addEventListener("mouseout", glideMouseOut);
			function glideMouseOver() { isGlideMouseOver=true; }
			function glideMouseOut() { isGlideMouseOver=false; }

			//Set up event listener that is called after a slide transition
			glide.on('move.after', function() {
				//Get next slide, choose random number from d100 and change .d100_text to have that text
				var i = glide._i+1;
				i %= encounters.length;
				var j = encounters[i].d100.length;

				var r = Math.floor(Math.random() * j); 
				//Prevent repeat of current d100
				while(r==encounters[i].currRandIndex) {
					r = Math.floor(Math.random() * j);
				}
				encounters[i].currRandIndex = r;

				var n = i%encounters.length+2;
				
				document.body.querySelector(".glide__slide:nth-child("+n+") .d100_text").innerHTML = encounters[i].d100[r];

				//The way Glide works is it duplicates the first and last slide and reverts to that slide when transitioning to it
				//so we have to update those slides as well any time we update the first or last slide
				if (i==0) {
					document.body.querySelector(".glide__slide:nth-child("+(encounters.length+2)+") .d100_text").innerHTML = encounters[i].d100[r];
				}
				else if (i==encounters.length-1) {
					document.body.querySelector(".glide__slide:nth-child(1) .d100_text").innerHTML = encounters[i].d100[r];
				}
				
				//Get previous slide, choose random number from d100 and change .d100_text to have that text
				i-=2;
				i = (i+encounters.length)%encounters.length;
				j = encounters[i].d100.length;
				r = Math.floor(Math.random() * j);
				n = i%encounters.length+2;
				
				document.body.querySelector(".glide__slide:nth-child("+n+") .d100_text").innerHTML = encounters[i].d100[r];

				//The way Glide works is it duplicates the first and last slide and reverts to that slide when transitioning to it
				//so we have to update those slides as well any time we update the first or last slide
				if (i==0) {
					document.body.querySelector(".glide__slide:nth-child("+(encounters.length+2)+") .d100_text").innerHTML = encounters[i].d100[r];
				}
				else if (i==encounters.length-1) {
					document.body.querySelector(".glide__slide:nth-child(1) .d100_text").innerHTML = encounters[i].d100[r];
				}
			});
			glide.on('move', function() {
				//Update Glide progressbar
				gpb_width=0.0;
				glideProgressBar.style.width = gpb_width + '%';
			});

			//This event is dispatched from glide.js
			var dices = document.addEventListener("diceclick", randomizeCurrSlide);

			function randomizeCurrSlide(evt) {
				console.log(evt);
				var i = glide._i;

				var r = Math.floor(Math.random() * encounters[i].d100.length);
				//Prevent repeat of current d100
				while(r==encounters[i].currRandIndex) {
					r = Math.floor(Math.random() * encounters[i].d100.length);
				}
				encounters[i].currRandIndex = r;
				document.body.querySelector(".glide__slide:nth-child("+(i+2)+") .d100_text").innerHTML = encounters[i].d100[r];
			}
		</script>
		
	</body>
</html>
