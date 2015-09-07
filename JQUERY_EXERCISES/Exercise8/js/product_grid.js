"use strict";

class Product {

  init() {
    this.getProducts();
    this.showHideBrandsOption();
    this.showHideColorsOption();
    this.filterBrandBased();
    this.filterColorBased();
    this.showAvailable();
    this.showAll();
  }

  getProducts() {
    $.getJSON('./product_data/product_data.json', function(data) {
      this.displayProducts(data);
    }.bind(this));
  }

  displayProducts(data) {
    let html = '';
    $.each(data, function(entryIndex, entry) {
      console.log(entry.name);
      html += '<li class="products" data-name="'+entry.name+'" data-color="'+entry.color+'" data-brand="'+entry.brand+'" data-sold_out="'+entry.sold_out+'"><img src="./product_data/images/'+entry.url +'" alt="'+entry.url +'"></li>';
    });
    $('.products_container').html(html)
  }

  showHideBrandsOption() {
    $('#filter_brand ul').hide();
    $('#filter_brand').click(function(event) {
      if ($(event.target).is('#filter_brand')) {
        $('#filter_brand ul').slideToggle( "slow", "linear" );
      }
    });
  }

  showHideColorsOption() {
    $('#filter_color ul').hide();
    $('#filter_color').click(function(event) {
      if ($(event.target).is('#filter_color')) {
        $('#filter_color ul').slideToggle( "slow", "linear" );
      }
    });
  }

  filterBrandBased() {
    $('#filter_brand').on('change', 'input[type = checkbox]', function() {      
      this.displayProductBasedOnCheckedBrandAndColor();      
    }.bind(this));
  }

  displayProductBasedOnCheckedBrandAndColor() {
    let $checkedBrandSum = $('#filter_brand').find('input[type = checkbox]:checked').length;    
    let $checkedColorSum = $('#filter_color').find('input[type = checkbox]:checked').length;
    let $totalColorCheckboxes = $('#filter_color').find('input[type = checkbox]').length;

    if($checkedBrandSum >= 1) {
      $('li.products').hide();
      this.filterAndDisplayProduct($totalColorCheckboxes, $checkedColorSum);      
    }
    else if($checkedColorSum >= 1) {
      this.isColorChecked($totalColorCheckboxes);
    }
    else {
      this.displayAllProducts();        
    }
  }

  displayAllProducts() {
    $('li.products').show();
  }

  isColorChecked($totalColorCheckboxes) {
    for(let b = 1; b <= $totalColorCheckboxes; b++) {
      let color = this.getCoresspondingColor(b);     
      if($('#'+color).is(':checked')) {
        this.displayProductsByColorChecked(color);
      }
    }
  }

  displayProductsByColorChecked(color) {
    $($('.products').filter('li[data-color = "'+color+'"]')).show();
  }

  filterAndDisplayProduct($totalColorCheckboxes, $checkedColorSum) {
    let $totalBrandCheckboxes = $('#filter_brand').find('input[type = checkbox]').length;

    for(let a = 1; a <= $totalBrandCheckboxes; a++) {
      let brand = this.getCoresspondingBrand(a);

      if($('#brand_'+a).is(':checked')) {

        if($checkedColorSum >= 1) {
          for(let b = 1; b <= $totalColorCheckboxes; b++) {               
            let color = this.getCoresspondingColor(b);

            if($('#'+color).is(':checked')) {
              $($('.products').filter('li[data-brand="'+brand+'"]').filter('li[data-color = "'+color+'"]')).show();
            }
          }
        }
        else {
          $('.products').filter('li[data-brand="'+brand+'"]').show();
        }
      }
    }
  }

  getCoresspondingBrand(a) {
    let brand = null;
    switch(a) {
      case 1:
        brand = "BRAND A";
        break;
      case 2:
        brand = "BRAND B";
        break;
      case 3:
        brand = "BRAND C";
        break;
      case 4:
        brand = "BRAND D";
        break;
    }
    return brand;
  }

  getCoresspondingColor(b) {
    let color = null;
    switch(b) {
      case 1:
        color = "Yellow";
        break;
      case 2:
        color = "Red";
        break;
      case 3:
        color = "Green";
        break;
      case 4:
        color = "Blue";
        break;
    }
    return color;
  }

  filterColorBased() {
    let self = this;
    $('#filter_color').on('change', 'input[type = checkbox]', function() {

      let $checkedBrandSum = $('#filter_brand').find('input[type = checkbox]:checked').length;
      let $totalBrandCheckboxes = $('#filter_brand').find('input[type = checkbox]').length;
      let $checkedColorSum = $('#filter_color').find('input[type = checkbox]:checked').length;
      let $totalColorCheckboxes = $('#filter_color').find('input[type = checkbox]').length;

      if($checkedColorSum >= 1) {
        $('li.products').hide();

        for(let b = 1; b <= $totalColorCheckboxes; b++) {
          let color = null;

          switch(b) {
            case 1:
              color = "Yellow";
              break;
            case 2:
              color = "Red";
              break;
            case 3:
              color = "Green";
              break;
            case 4:
              color = "Blue";
              break;
          }

          if($('#'+color).is(':checked')) {
            console.log(color);
            if($checkedBrandSum >= 1) {
              // $('li.products').hide();

              for(let a = 1; a <= $totalBrandCheckboxes; a++) {
                let brand = null;

                switch(a) {
                  case 1:
                    brand = "BRAND A";
                    break;
                  case 2:
                    brand = "BRAND B";
                    break;
                  case 3:
                    brand = "BRAND C";
                    break;
                  case 4:
                    brand = "BRAND D";
                    break;
                }

                if($('#brand_'+a).is(':checked')) {
                  $($('.products').filter('li[data-brand="'+brand+'"]').filter('li[data-color = "'+color+'"]')).show();
                }
              }
            }
            else {
              $('.products').filter('li[data-color="'+color+'"]').show();
            }
          }
        }
      }
      else if($checkedBrandSum >= 1) {
        // $('li.products').hide();

        for(let a = 1; a <= $totalBrandCheckboxes; a++) {
          let brand = null;

          switch(a) {
            case 1:
              brand = "BRAND A";
              break;
            case 2:
              brand = "BRAND B";
              break;
            case 3:
              brand = "BRAND C";
              break;
            case 4:
              brand = "BRAND D";
              break;
          }

          if($('#brand_'+a).is(':checked')) {
            $($('.products').filter('li[data-brand="'+brand+'"]')).show();
          }
        }
      }
      else {
        $('li.products').show();        
      }
    });
  }

  showAvailable() {
    $('#filter_available').click(function() {      
      $('li.products').hide();      
      $('.products').filter("li[data-sold_out='0']").show();
    });
  }

  showAll() {
    $('#filter_all').click(function() {      
      $('li.products').show();      
    });
  }

  brandFilter(selector) {
    console.log('selector2: '+$(selector).html());
  }
}

$(document).ready(function() {
  const product = new Product();
  product.init();
})