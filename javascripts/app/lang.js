/*
Copyright 2008-2013 Concur Technologies, Inc.

Licensed under the Apache License, Version 2.0 (the "License"); you may
not use this file except in compliance with the License. You may obtain
a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations
under the License.
*/
!function(t){"use strict";function e(t){if(t&&""!==t){var e=new ScrollPosition($("body")[0]);e.prepareFor("down"),$(".lang-selector a").removeClass("active"),$(".lang-selector a[data-language-name='"+t+"']").addClass("active");for(var i=0;i<n.length;i++)$(".highlight."+n[i]).hide();$(".highlight."+t).show(),e.restore()}}function i(t){var i=(t[0],localStorage.getItem("language"));window.languages=t,n=t,""!==location.search.substr(1)&&-1!=jQuery.inArray(location.search.substr(1),n)?(e(location.search.substr(1)),localStorage.setItem("language",location.search.substr(1))):e(null!==i&&-1!=jQuery.inArray(i,n)?i:n[0])}var n=[];t.setupLanguages=i,t.activateLanguage=e,window.bindLanguageSelectors=function(){$(function(){$(".lang-selector a").on("click",function(){var t=$(this).data("language-name");return e(t),!1})})}}(window);