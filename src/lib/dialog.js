
window.dialogIsShowing = false
window.dialogIsMounted = false
window.loading = function () {
  if(!dialogIsMounted) {
    window.dialogIsMounted = true
    $('body').append(`<div class="spinner"></div>`)
  }
  if(window.dialogIsShowing)return
  $('.spinner').css('display', 'block');
  window.dialogIsShowing = true
}
window.loadingdone = function () {
  $('.spinner').css('display', 'none');
  window.dialogIsShowing = false
}

