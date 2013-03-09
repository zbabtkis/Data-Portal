<div id='cec-data'>
	<div id='cec-data-selector'>
		<div id='data-selector-head'>
			<div id='cec-data-nav-buttons'>
				<div id='cec-portal-full-screen' class='cec-button' title='Full Screen' alt='Full Screen'></div>
				<div class='cec-button back'></div>
			</div>
			<div class='data-head-wrapper'>
				<label class='cec-data-header-text'>Path: </label>
				<span id='data-path'></span>
			</div>
		</div>
		<ul id='cec-data-list'>
			<script type="text/x-handlebars-template" id='cec-data-list-template'>              
				{{#zebra files}}
					<li class='cec-data-list-item {{stripeClass}}' data-parent-id='{{pid}}' data-file-id='{{id}}' data-file-type='{{type}}' data-file-title='{{title}}'>{{title}}</li>
				{{/zebra}}
			</script>
		</ul>
	</div>
	<div id='cec-data-wrapper'>
		<h2 class='cec-data-header-text'>Data</h2>
		<div id='cec-data-data'>
	</div>
</div>
