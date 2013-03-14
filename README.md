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
Drupal 7.x
Background Tasks Module

Installation
---------------
# Enable the module by dragging unzipping or dragging module to sites/all/modules
# Navigate to admin/config/data-portal and type in the path that you would like the data portal to crawl.
# Click save
# Click Recrawl
# The module is crawling! The message box at the top of the page will notify you when the data crawl is complete
# Once the process is complete, click Run DB Update -- this will import the filesystem structure that we just collected.
# That's it! You can now view the portal by navigating to data/portal. Keep in mind that the module is likely still running the database update in the background, so not all of your data will be available right away.

Issues
---------
[ ] #3 Full screen doesn't open on first click
[ ] Path display not currently working
