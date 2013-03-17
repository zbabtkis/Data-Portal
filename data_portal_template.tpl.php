<!-- Begin data portal -->
<article id='cec-data'>
	<nav id='cec-data-selector'>
		<header id='data-selector-head'>
			<nav id='cec-data-nav-buttons'>
				<div id='cec-portal-full-screen' class='cec-button' title='Full Screen' alt='Full Screen'></div>
				<div class='cec-button back'></div>
			</nav>
			<aside class='data-head-wrapper'>
				<label class='cec-data-header-text'>Path: </label>
				<span id='data-path'></span>
			</aside>
		</header>
		<ul id='cec-data-list'>
			<script type="text/x-handlebars-template" id='cec-data-list-template'>              
				{{#zebra files}}
					<li class='cec-data-list-item {{stripeClass}}' data-parent-id='{{pid}}' data-file-id='{{id}}' data-file-type='{{type}}' data-file-title='{{title}}'>{{title}}</li>
				{{/zebra}}
			</script>
		</ul>
	</nav>
	<article id='cec-data-wrapper'>
		<h2 class='cec-data-header-text'>Data</h2>
		<p id='cec-data-data'></p>
	</article>
</article>
<!-- End data portal -->