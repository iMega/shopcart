var shopcartApp = angular.module('shopcartApp', [], function($interpolateProvider) {
    $interpolateProvider.startSymbol('{|').endSymbol('|}');
});

shopcartApp.filter('getIndexByUuid', function() {
    return function(input, id) {
        var i=0, len=input.length;
        for (; i<len; i++) {
            if (input[i].uuid == id) {
                return i;
            }
        }
        return null;
    }
});

shopcartApp.filter('getTotal', function() {
    return function(input, id) {
        var total = 0;
        var i=0, len=input.length;
        for (; i<len; i++) {
            total += input[i].price * input[i].qty;
        }
        return total;
    }
});

shopcartApp.controller('cart', ['$scope', '$filter', function($scope, $filter) {
    $scope.products = [
        {uuid:'678193d6-4740-4eb8-83b5-84f0a2174cde', title:'Apple iPhone 6S 16Gb', price:749, url:'http://store.storeimages.cdn-apple.com/4861/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone6s/plus/iphone6s-plus-silver-select-2015?wid=270&fmt=png-alpha&qlt=95'},
        {uuid:'ebc03f74-8468-4e3c-8481-228a7bc13be8', title:'Apple iPad mini 2 16Gb', price:269, url:'http://store.storeimages.cdn-apple.com/4861/as-images.apple.com/is/image/AppleInc/aos/published/images/i/pa/ipad/mini/ipad-mini-retina-step1-white-2013_GEO_US?wid=270&fmt=png-alpha&qlt=95'},
        {uuid:'d969a708-7c75-4b32-b690-abe2e3f4f090', title:'Apple TV 32Gb', price:149, url:'http://store.storeimages.cdn-apple.com/4861/as-images.apple.com/is/image/AppleInc/aos/published/images/a/pp/apple/tv/apple-tv-hero-select-201510?wid=270&fmt=png-alpha&qlt=95'},
        {uuid:'ad1d571a-3805-4590-9572-6c6fdf4a9faf', title:'Mac mini 500 GB', price:499, url:'http://store.storeimages.cdn-apple.com/4861/as-images.apple.com/is/image/AppleInc/aos/published/images/m/ac/mac/mini/mac-mini-select-hero-201505?wid=270&fmt=png-alpha&qlt=95'}
    ];
    $scope.total = 0;
    $scope.basket = [];

    $scope.add = function(product) {
        var index = $filter('getIndexByUuid')($scope.basket, product.uuid);
        if (null == index) {
            $scope.basket.push({
                uuid: product.uuid,
                title: product.title,
                price: product.price,
                url: product.url,
                qty: 1
            });
        } else {
            $scope.basket[index] = {
                uuid: product.uuid,
                title: product.title,
                price: product.price,
                url: product.url,
                qty: $scope.basket[index].qty + 1
            }
        }
        $scope.total = $filter('getTotal')($scope.basket);
    };

    $scope.del = function(product) {
        var index = $filter('getIndexByUuid')($scope.basket, product.uuid);
        if ($scope.basket[index].qty > 1) {
            $scope.basket[index] = {
                uuid: product.uuid,
                title: product.title,
                price: product.price,
                url: product.url,
                qty: $scope.basket[index].qty - 1
            }
        } else {
            $scope.basket.splice(index, 1);
        }
        $scope.total = $filter('getTotal')($scope.basket);
    };

    $scope.generateUUID = function() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });

        return uuid;
    };
}]);
