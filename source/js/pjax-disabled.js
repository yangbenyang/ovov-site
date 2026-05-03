class Pjax {
  constructor() {}

  loadUrl(url) {
    window.location.href = url;
  }

  refresh() {}
}

window.Pjax = Pjax;
