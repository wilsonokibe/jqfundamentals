"use strict";

class Product {

  init() {
    this.getProducts();
    this.showHideBrands();
    this.showHideColors();
    this.filterProducts();
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

  showHideBrands() {
    $('#filter_brand ul').hide();
    $('#filter_brand').click(function(event) {
      if ($(event.target).is('#filter_brand')) {
        $('#filter_brand ul').slideToggle( "slow", "linear" );
      }
    });
  }

  showHideColors() {
    $('#filter_color ul').hide();
    $('#filter_color').click(function(event) {
      if ($(event.target).is('#filter_color')) {
        $('#filter_color ul').slideToggle( "slow", "linear" );
      }
    });
  }

  filterProducts() {
    let self = this;
    $('#filter_brand').on('change', 'input[type = checkbox]', function() {
      let $checkedSum = $('#filter_brand').find('input[type = checkbox]:checked').length
      console.log(this.id+' '+this.name+' '+this.value+' '+this.checked);
      // console.log('Number of checked: '+$checkedSum);
      if($checkedSum == 1) {
        $('li.products').hide();
      }
      else if($checkedSum < 1) {
        $('li.products').show();        
      }

        let brandCheckboxCount = $('#filter_brand').find('input[type = checkbox]').length;
        //console.log(brandCheckboxCount);
        for(let a = 1; a <= brandCheckboxCount; a++) {
          let brand = "";

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

          if(this.id == 'brand_'+a && this.checked == true) {
            console.log('OK!');
            $('.products').filter('li[data-brand="'+brand+'"]').show();
          }
          else if(this.id == 'brand_'+a && this.checked == false) {
            console.log('Brand is: '+brand);
            $('.products').filter('li[data-brand="'+brand+'"]').hide();
          }
        }       
      // } 
      // else {
      //   $('li.products').show();       
      // }
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