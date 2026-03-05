module.exports = {
  content: ['_site/**.html'],
  css: ['_site/assets/css/**.css', 'assets/css/**.css'],
  variables: true,
  safelist: {
    standard: ["fa-tags", "fa-copy", "far", "fas", "fa-fw",
    "fa-check", "copied", "fa-folder-open", "fa-x-twitter", "fa-screwdriver",
    "fa-book", "fa-chalkboard-user", "fa-facebook", "fa-linkedin",
    "fa-bluesky", "btn--x", "btn--linkedin", "btn--facebook", "btn--bluesky",
    "search-content", "pagination", "pagination--pager", "is--hidden", "is--visible",
    "search-content__inner-wrap", "search-content__form", "search-input", "sr-only",
    "results", "clipboard-copy-button", "faqcontainer"],
    deep: [/mfp-*/]
  }
}