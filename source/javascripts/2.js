jQuery(document).ready(() => {
  const $number = jQuery('#card-number');
  const $expireOn = jQuery('#expire-on');
  const $cardHolder = jQuery('#card-holder');
  const $cvv = jQuery('#cvv');

  const $expireMonthField = jQuery('#expire-month-field');
  const $expireYearField = jQuery('#expire-year-field');
  const $numberField = jQuery('#card-number-field');
  const $cardHolderField = jQuery('#card-holder-field');
  const $cvvField = jQuery('#cvv-field');

  Rx.Observable.fromEvent($numberField, 'input')
    .map(e => e.target.value)
    .flatMap(v => Rx.Observable.from(v.split(''))
      .filter(v => v.match(/[0-9]/g))
      .take(16)
      .reduce((acc, v) => acc + v, ''))
    .do(v => $numberField.val(v))
    .map(v => (`${v}________________`).slice(0, 16))
    .map(v => v.match(/.{1,4}/g).join(' '))
    .subscribe(v => $number.html(v));

  Rx.Observable.fromEvent($expireMonthField, 'change')
    .map(e => e.target.value)
    .map(v => `0${v}`.slice(-2))
    .map(v => `${v}/${$expireOn.text().split('/')[1]}`)
    .subscribe(v => $expireOn.text(v));

  Rx.Observable.fromEvent($expireYearField, 'input')
    .map(e => e.target.value)
    .map(v => `__${v}`.slice(-2))
    .map(v => `${$expireOn.text().split('/')[0]}/${v}`)
    .subscribe(v => $expireOn.text(v));

  Rx.Observable.fromEvent($cardHolderField, 'input')
    .map(e => e.target.value)
    .subscribe(v => $cardHolder.text(v));

  Rx.Observable.fromEvent($cvvField, 'input')
    .map(e => e.target.value)
    .flatMap(v => Rx.Observable.from(v.split(''))
      .filter(v => v.match(/[0-9]/g))
      .take(3)
      .reduce((acc, v) => acc + v, ''))
    .do(v => $cvvField.val(v))
    .map(v => `000${v}`.slice(-3))
    .subscribe(v => $cvv.text(v));
});
