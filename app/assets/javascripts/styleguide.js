require([
  "jquery",
  "lib/utils/konami",
  "lib/core/ad_manager",
  "lib/components/slider",
  "lib/styleguide/charts",
  "lib/components/poi_map",
  "lib/components/poi_list",
  "lib/components/page_hopper",
  "lib/components/thumb_slider",
  "lib/widgets/car_rental",
  "lib/page/swipe",
  "lib/styleguide/svg",
  "lib/styleguide/copy",
  "lib/styleguide/alert",
  "lib/page/scroll_perf",
  "lib/styleguide/swipe",
  "pickadate/lib/legacy",
  "pickadate/lib/picker",
  "lib/styleguide/konami",
  "lib/styleguide/colours",
  "lib/components/lightbox",
  "lib/styleguide/lightbox",
  "lib/components/parallax",
  "lib/styleguide/typography",
  "pickadate/lib/picker.date",
  "lib/utils/last_input_device",
  "lib/components/range_slider",
  "lib/components/toggle_active",
  "lib/styleguide/snippet-expand",
  "lib/components/select_group_manager"
], function($, Konami, AdManager, Slider, Charts, POIMap, POIList, PageHopper, ThumbSlider, CarRentalWidget) {

  "use strict";

  new Konami();
  new POIList(null, new POIMap);
  new Slider({ el: ".js-slider", assetReveal: true ,listener: document });
  new ThumbSlider();
  new PageHopper();

  new AdManager({
    template: "styleguide"
  });

  var d = new Date();
  $(".input--datepicker").not(".js-car-rental-widget input").pickadate({
    min: [ d.getFullYear(), (d.getMonth() + 1), d.getDate() ]
  });

  // This require directive loads in the World Nomads insurance booking widget
  require([ "https://www.worldnomads.com/Partner/GetPartnerWidget?partnerCode=LNYPLT&source=&loadWithPanelExpanded=true&excludeStyles=true" ], function() {});

  if ($(".js-car-rental-widget").length) {
    new CarRentalWidget;
  }

});
