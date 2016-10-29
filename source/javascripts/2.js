'use strict';

jQuery(document).ready(function () {
  var $number = jQuery('#card-number');
  var $expireOn = jQuery('#expire-on');
  var $cardHolder = jQuery('#card-holder');
  var $cvv = jQuery('#cvv');

  var $expireMonthField = jQuery('#expire-month-field');
  var $expireYearField = jQuery('#expire-year-field');
  var $numberField = jQuery('#card-number-field');
  var $cardHolderField = jQuery('#card-holder-field');
  var $cvvField = jQuery('#cvv-field');

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
