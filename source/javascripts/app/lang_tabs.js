function createLanguageTabs(langs) {
  var tabsHTML = "";
  langs.forEach(function(lang, i) {
    if (i === 0) {
      tabsHTML += "<a class='active' data-language-name='" + lang + "'>" + lang + "</a>";
    } else {
      tabsHTML += "<a data-language-name='" + lang + "'>" + lang + "</a>";
    }
  });
  var tabBarHTML = "<div class='lang-selector'>" + tabsHTML + "</div>";

  var sels = [];
  langs.forEach(function(lang) {
    sels.push(":not(pre) + pre." + lang);
  });
  $(sels.join(", ")).before(tabBarHTML);
};

$(document).ready(function() {
  setTimeout(function() {
    createLanguageTabs(window.languages);
    bindLanguageSelectors();
  }, 0);
});
