Drupal Data Portal
===============

What is it?
--------------

This is a javascript based Drupal module that seeks to create
a multipurpose, dynamic data portal that can be used by
university research groups and others in need of a quick way
of displaying large amounts of data to a broader viewerbase.

Requirements
-------------------
* Drupal 7.x
* Background Tasks Module

Installation
---------------
1. Enable the module by dragging unzipping or dragging module to sites/all/modules
2. Navigate to admin/config/data-portal and type in the path that you would like the data portal to crawl.
3. Click save
4. Click Recrawl
5. The module is crawling! The message box at the top of the page will notify you when the data crawl is complete
6. Once the process is complete, click Run DB Update -- this will import the filesystem structure that we just collected.
7. That's it! You can now view the portal by navigating to data/portal. Keep in mind that the module is likely still running the database update in the background, so not all of your data will be available right away.

API / Hooking In
---------------
You might need to add additional file handlers for your data. Hook_data_type_handler() can help you with this. This module comes preloaded with a couple basic output options -- text and images. But let's say you have a bunch of .dat files that contain comma separated lists that can be rendered as a table... Here's an example of how you would make that happen:

```php
/**
 * Implements hook_data_type_handler().
 */
function myModule_data_type_handler() {
  $items = array();
  // Key can be anything, but must be unique.
  $items['tabled_data'] = array(
    'callback' => 'myModule_format_data_table', // The callback for rendering data.
    'title' => 'Data', // The readable name of the file type.
    'ext' => array( // Any extensions that should be rendered by this callback.
      'dat',
    ),
  );
  return $items;
}
```
So, here we created a new array filled with the information that the data-portal will use to determine whether your callback should be used when a file is requested through the User Interface.

But we still haven't provided any instructions for how to process the data! Let's give that a shot:

```php
/**
 * Callback from myModule_data_type_handler().
 * Renders data file as a table.
 */
function myModule_format_data($file, $method, &$header) {
  // Header is set after the callback has completed.
 	//$header = "Content-Type: plain/text";
 	$row_count = 0;
 	$file = fopen($file['path'], "r");
 	// Loop through csv lines to get header cols and rows.
 	while(($row = fgetcsv($file, 4000, ',')) !== FALSE) {
 	  if($row_count === 0) {
 	    $head = $row;
 	  } elseif($row_count > 0) {
 	    $rows[] = $row;
 	  }
    $row_count++;
 	}
 	// Render data as table.
 	$table = theme('table', array(
 	  'header' => $head,
 	  'rows' => $rows,
 	  'attributes' => array('class' => array($file['title']))
 	));
 	return $table;
}
```

You'll notice the three parameters that are passed into our callback. 
If you're curious, you can check out the structure using dsm($file); 
(if you have the devel module installed), but for now, all we really care
about are the file's path and title. A reference to the document header is 
also available to us as a string. This defaults to text, but if you change
the value of this reference to a different content type, the header will
be set after the callback has completed.

The parameter `$method` can be used to determine whether the request is 
coming from an XHR or an html object. This can be useful when you are dealing with elements like ```<audio>```, ```<object>``` or ```<img>``` to differentiate between needing to serve out the actual resource, or an element
that links to the resource.

I'm using the "theme('table', $header, $rows)" Drupal function to simplify 
the table rendering process, but if for some reason you want to output the 
table manually, I say go for it!


Issues
---------
* [ ] #3 Full screen doesn't open on first click
* [ ] Path display not currently working
