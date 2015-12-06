var shopcartApp = angular.module('shopcartApp', [], function($interpolateProvider) {
    $interpolateProvider.startSymbol('{|').endSymbol('|}');
});

shopcartApp.controller('cart', ['$scope', function($scope) {
    $scope.products = [
        {uuid:'678193d6-4740-4eb8-83b5-84f0a2174cde', title:'Apple iPhone 6S 16Gb', price:749, url:'http://store.storeimages.cdn-apple.com/4861/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone6s/plus/iphone6s-plus-silver-select-2015?wid=270&fmt=png-alpha&qlt=95'},
        {uuid:'ebc03f74-8468-4e3c-8481-228a7bc13be8', title:'Apple iPad mini 2 16Gb', price:269, url:'http://store.storeimages.cdn-apple.com/4861/as-images.apple.com/is/image/AppleInc/aos/published/images/i/pa/ipad/mini/ipad-mini-retina-step1-white-2013_GEO_US?wid=270&fmt=png-alpha&qlt=95'},
        {uuid:'d969a708-7c75-4b32-b690-abe2e3f4f090', title:'Apple TV 32Gb', price:149, url:'http://store.storeimages.cdn-apple.com/4861/as-images.apple.com/is/image/AppleInc/aos/published/images/a/pp/apple/tv/apple-tv-hero-select-201510?wid=270&fmt=png-alpha&qlt=95'},
        {uuid:'ad1d571a-3805-4590-9572-6c6fdf4a9faf', title:'Mac mini 500 GB', price:499, url:'http://store.storeimages.cdn-apple.com/4861/as-images.apple.com/is/image/AppleInc/aos/published/images/m/ac/mac/mini/mac-mini-select-hero-201505?wid=270&fmt=png-alpha&qlt=95'}
    ];
    $scope.basket = [];

    $scope.add = function(product) {
        console.log(product);
        $scope.basket.push(product);
    };
}]);
