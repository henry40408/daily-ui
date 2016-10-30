'use strict';

jQuery(document).ready(function () {
  var VISA = /^4[0-9]{6,}$/;
  var MASTER_CARD = /^5[1-5][0-9]{5,}|222[1-9][0-9]{3,}|22[3-9][0-9]{4,}|2[3-6][0-9]{5,}|27[01][0-9]{4,}|2720[0-9]{3,}$/;
  var AMERICAN_EXPRESS = /^3[47][0-9]{5,}$/;
  var DINERS_CLUB = /^3(?:0[0-5]|[68][0-9])[0-9]{4,}$/;
  var DISCOVER = /^6(?:011|5[0-9]{2})[0-9]{3,}$/;
  var JCB = /^(?:2131|1800|35[0-9]{3})[0-9]{3,}$/;

  var $number = jQuery('#card-number');
  var $expireOn = jQuery('#expire-on');
  var $cardHolder = jQuery('#card-holder');
  var $cvv = jQuery('#cvv');
  var $paymentIcon = jQuery('#payment-icon');

  var $expireMonthField = jQuery('#expire-month-field');
  var $expireYearField = jQuery('#expire-year-field');
  var $numberField = jQuery('#card-number-field');
  var $cardHolderField = jQuery('#card-holder-field');
  var $cvvField = jQuery('#cvv-field');

  function setPaymentIcon(type) {
    $paymentIcon.empty().html($('<i>').addClass('pf pf-' + type));
  }

  Rx.Observable.fromEvent($numberField, 'input').map(function (e) {
    return e.target.value;
  }).flatMap(function (v) {
    return Rx.Observable.from(v.split('')).filter(function (v) {
      return v.match(/[0-9]/g);
    }).take(16).reduce(function (acc, v) {
      return acc + v;
    }, '');
  }).do(function (v) {
    return $numberField.val(v);
  }).do(function(v) {
    switch (true) {
      case VISA.test(v): setPaymentIcon('visa'); break;
      case MASTER_CARD.test(v): setPaymentIcon('mastercard'); break;
      case AMERICAN_EXPRESS.test(v): setPaymentIcon('american-express'); break;
      case DINERS_CLUB.test(v): setPaymentIcon('diners'); break;
      case DISCOVER.test(v): setPaymentIcon('discover'); break;
      case JCB.test(v): setPaymentIcon('jcb'); break;
      default: $paymentIcon.empty();
    }
  }).map(function (v) {
    return (v + '________________').slice(0, 16);
  }).map(function (v) {
    return v.match(/.{1,4}/g).join(' ');
  }).subscribe(function (v) {
    return $number.html(v);
  });

  Rx.Observable.fromEvent($expireMonthField, 'change').map(function (e) {
    return e.target.value;
  }).map(function (v) {
    return ('0' + v).slice(-2);
  }).map(function (v) {
    return v + '/' + $expireOn.text().split('/')[1];
  }).subscribe(function (v) {
    return $expireOn.text(v);
  });

  Rx.Observable.fromEvent($expireYearField, 'input').map(function (e) {
    return e.target.value;
  }).map(function (v) {
    return ('__' + v).slice(-2);
  }).map(function (v) {
    return $expireOn.text().split('/')[0] + '/' + v;
  }).subscribe(function (v) {
    return $expireOn.text(v);
  });

  Rx.Observable.fromEvent($cardHolderField, 'input').map(function (e) {
    return e.target.value;
  }).subscribe(function (v) {
    return $cardHolder.text(v);
  });

  Rx.Observable.fromEvent($cvvField, 'input').map(function (e) {
    return e.target.value;
  }).flatMap(function (v) {
    return Rx.Observable.from(v.split('')).filter(function (v) {
      return v.match(/[0-9]/g);
    }).take(3).reduce(function (acc, v) {
      return acc + v;
    }, '');
  }).do(function (v) {
    return $cvvField.val(v);
  }).map(function (v) {
    return ('000' + v).slice(-3);
  }).subscribe(function (v) {
    return $cvv.text(v);
  });
});
