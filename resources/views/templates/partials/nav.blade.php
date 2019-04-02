<nav class="navbar has-shadow">
	<div class="navbar-brand">
		<a class="navbar-item" href="{{ url('/') }}"><img src="{{ asset('/img/dnd_companion_logo_simple.svg') }}" alt="DnD Companion" onerror="this.onerror=null; this.src='{{ asset('/img/dnd_companion_logo_small.png') }}'"/></a>

		<div class="navbar-burger burger" data-target="navMenu"><span></span><span></span><span></span></div>
	</div>
	<div class="navbar-menu" id="navMenu">
		<div class="navbar-start is-link">
			<div class="navbar-item has-dropdown is-hoverable">
				<a class="navbar-link">Sections</a>
				<div class="navbar-dropdown">
					<a class="navbar-item" href="{{ url('npcs') }}">NPC Generator</a>
					<a class="navbar-item" href="{{ url('hooks') }}">Plot Hooks</a>
					<a class="navbar-item" href="{{ url('items') }}">Unique Items</a>
					<a class="navbar-item" href="{{ url('maps') }}">Encounter Maps</a>
					<a class="navbar-item" href="{{ url('riddles') }}">Riddles</a>
					<a class="navbar-item" href="{{ url('puzzles') }}">Puzzles</a>
					<!--
					<a class="navbar-item" href="{{ url('dungeons') }}">Dungeons</a>
					<a class="navbar-item" href="{{ url('names') }}">Name Generator</a>
					<a class="navbar-item" href="{{ url('dice') }}">Dice Roller</a>
					<a class="navbar-item" href="{{ url('loot') }}">Loot Generator</a>
					<a class="navbar-item" href="{{ url('d100') }}">d100 Lists</a>
					-->
				</div>
			</div>
		</div>
		<div class="navbar-end">
		@if (Auth::check())
			<div class="navbar-item has-dropdown is-hoverable">
				<a class="navbar-link">Account</a>
				<div class="navbar-dropdown">
					<a class="navbar-item">Profile</a>
					<a class="navbar-item">Settings</a>
					<hr class="navbar-divider" />
					<a id="nav-logout" class="navbar-item" href="{{ url('auth/logout') }}">Logout</a>
				</div>
			</div>
		@else
			<a id="navbar-login" class="navbar-item" href="{{ url('auth/login') }}">
				Login
			</a>
			<a id="navbar-register" class="navbar-item" href="{{ url('auth/register') }}">
				Register
			</a>
		@endif
		</div>
	</div>
</nav>