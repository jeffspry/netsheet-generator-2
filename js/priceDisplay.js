    (function(){
      window.onload = function () {
        var field = document.getElementById('salesPrice');

        field.onkeydown = function(evt){
          if (numeral(field.value)._value < 1000 && numeral(field.value)._value > 99 && evt.key == 'Tab'){
            field.value = numeral(field.value)._value * 1000;
          } else if (numeral(field.value)._value <= 50 && evt.key == 'Tab'){
            field.value = numeral(field.value)._value * 1000000;
          }
        }
        
        field.onblur = _.debounce(function(){
          var rawValue = numeral(field.value)._value;
          if (rawValue >= 1 && rawValue != null && field.value != "$ 0" && field.value != "$ " && field.value != "$"){
            // console.log(numeral(field.value)._value);
            var formattedPrice = numeral(field.value).format('$ 0,0[.]00');
            // field.setAttribute('strippedPrice', numeral(field.value)._value);
            field.value = formattedPrice;
          } else {
            field.value = "";
          }
        }, 100);
      };
        
    })();