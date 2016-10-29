jQuery(document).ready(function() {
  var $number = jQuery('#card-number');
  var $number_field = jQuery('#card-number-field');

  Rx.Observable.fromEvent($number_field, 'input')
    .map(function(e) { return e.target.value; })
    .map(function(v) {
      return jQuery.map(v.split(''), function(v) {
        if (!isNaN(v))
          return v;
      }).join('').substring(0, 16);
    })
    .do(function(v) { $number_field.val(v); })
    .map(function(v) {
      return v + Array
        .apply(0, Array(16 - v.length))
        .map(function() { return '_'; })
        .join('');
    })
    .map(function(v) { return v.match(/.{1,4}/g).join(' '); })
    .subscribe(function(v) {
      $number.html(v);
    });
});
