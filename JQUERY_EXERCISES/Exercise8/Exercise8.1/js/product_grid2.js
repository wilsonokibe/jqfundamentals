"use strict";

class Product {

  init() {
    this.getProducts();
    this.showHideBrandOptions();
    this.showHideColorOptions();
    this.showAll();
    this.bindEvent();
  }

  /* FETCH JSON DATA */
  getProducts() {
    $.getJSON('./product_data/product_data.json', function(data) {
      this.displayProducts(data);
    }.bind(this));
  }

  /* DISPLAY PRODUCTS WITH NO FILTER  */
  displayProducts(data) {
    let html = '';
    $.each(data, function(entryIndex, entry) {
        html = $('<li></li>');
        $(html).addClass('products');
        $(html).attr({
          'data-name': entry.name,
          'data-color': entry.color,
          'data-brand': entry.brand,
          'data-sold_out': entry.sold_out
          });
        let $image = $('<img />').attr('src', './product_data/images/' + entry.url);
      
      $(html).html($image)
      $('.products_container').append(html);
    });
  }

  /* TOGGLE BRAND OPTION  */
  showHideBrandOptions() {
    $('#filter_brand ul').hide();
    $('#filter_brand').click(function(event) {
      if ($(event.target).is('#filter_brand')) {
        $('#filter_brand ul').slideToggle( "slow", "linear" );
      }
    });
  }

  /* TOGGLE COLOR OPTION  */
  showHideColorOptions() {
    $('#filter_color ul').hide();
    $('#filter_color').click(function(event) {
      if ($(event.target).is('#filter_color')) {
        $('#filter_color ul').slideToggle( "slow", "linear" );
      }
    });
  }

  /* SHOW ALL PRODUCTS  */
  showAll() {
    $('#filter_all').click(function() {  
      //uncheck all input checkboxes  
      $('input').prop('checked', false);  
      $('li.products').show();      
    });
  }

  /* BRAND FILTER  */
  bindEvent() {
    let $brandCheckBoxes = $('#filter_brand').find('input');
    let $colorCheckboxes = $('#filter_color').find('input');

    $colorCheckboxes
      .add($brandCheckBoxes)
      .add('#available')
      .click(function() {
        this.getCheckedOptions();
      }.bind(this));
  }

  getCheckedOptions() {
    let availableStatus;
    let $checkedBrands = $('#filter_brand').find('input:checked');
    let $checkedColors = $('#filter_color').find('input:checked');
    let $checkedAvailable = $('input#available').is(':checked');

    if($checkedAvailable) {
      availableStatus = 0;
    }

    this.filterProducts($checkedBrands, $checkedColors, availableStatus);
  }

  filterProducts(checkedBrands, checkedColors, availableStatus) {
    $('li.products').hide();
    if(checkedBrands.length) {
      checkedBrands.each(function() {
        let brandId = $(this).attr('id');
        if(checkedColors.length) {
          checkedColors.each(function() {  
            let colorId = $(this).attr('id');
            if(availableStatus == 0) {
              $('.products').filter('li[data-brand="'+brandId+'"][data-color = "'+colorId+'"][data-sold_out = "'+availableStatus+'"]').show();
            } else{
              $($('.products').filter('li[data-brand="'+brandId+'"][data-color = "'+colorId+'"]')).show();
            }
          });
        } else {
          if(availableStatus == 0) {
            $('.products').filter('li[data-brand="'+brandId+'"][data-sold_out = "'+availableStatus+'"]').show();
          } else{ $('.products').filter('li[data-brand="'+brandId+'"]').show(); }
        }
      });
    } else if(checkedColors.length) {
      checkedColors.each(function() {  
        let colorId = $(this).attr('id');
        if(availableStatus == 0) {
          $($('.products').filter('[data-color = "'+colorId+'"][data-sold_out = "'+availableStatus+'"]')).show();
        } else{
          $($('.products').filter('[data-color = "'+colorId+'"]')).show();
        }
      });
    } else if(availableStatus == 0) {
      $('.products').filter("li[data-sold_out='"+ availableStatus +"']").show();
    } else {
      $('li.products').show();
    }
  }
}

$(document).ready(function() {
  const product = new Product();
  product.init();
})