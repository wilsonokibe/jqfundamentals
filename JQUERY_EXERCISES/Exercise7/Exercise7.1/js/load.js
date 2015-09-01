"use strict";
/*
1.Create a target div after the headline for each blog post and store a reference to it on the headline element using $.fn.data.

2.Bind a click event to the headline that will use the $.fn.load method to load the appropriate content from /exercises/data/blog.html 
  into the target div. Don't forget to prevent the default action of the click event.

Note that each blog headline in index.html includes a link to the post. You'll need to leverage the href of that link to get the proper content from blog.html. Once you have the href, here's one way to process it into an ID that you can use as a selector in $.fn.load:

var href = 'blog.html#post1';
var tempArray = href.split('#');
var id = '#' + tempArray[1];
Remember to make liberal use of console.log to make sure you're on the right path!
*/

class Blog {

  init() {
    this.newDivForEachBlog();
  }

  newDivForEachBlog() {
    var $targetDiv = $('<div></div>');
    $('div.module ul > li h3').each(function(index, element) {
      var $targetDivClone = $targetDiv.clone();
      $targetDivClone.attr('id', 'post'+(index+1));
      $targetDivClone.insertAfter($(this));
      $(this).data('id', 'post'+(index+1));
    });
    this.bindEvent();
  }

  bindEvent() {
    let self = this;
    $('div.module ul > li a').click(function(event) {
      event.preventDefault();
      self.getBlogContent($(this));
      if($('div.module ul > li a').not($(this))) {
        $('div.module ul > li a').parent().siblings('div').hide();
        $(this).parent().siblings('div').show();
      }
    });
  }

  getBlogContent(selector) {
    var href = $(selector).attr('href');
    var tempArray = href.split('#');
    var id = '#' + tempArray[1];
    $('div.module ul > li div').load('./data/blog.html '+id);
  }
}

$(document).ready(function() {
  const blog = new Blog();
  blog.init();
});