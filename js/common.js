var shopcartApp = angular.module('shopcartApp', [], function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{|').endSymbol('|}');
});

shopcartApp.filter('getIndexByUuid', function () {
    return function (input, id) {
        var i = 0, len = input.length;
        for (; i < len; i++) {
            if (input[i].product_id == id) {
                return i;
            }
        }
        return null;
    }
});

shopcartApp.filter('getTotal', function () {
    return function (input, id) {
        return input.reduce(function (total, item) {
            return total + item.price * item.quantity;
        }, 0);
    }
});

shopcartApp.controller('cartCtrl', ['$filter', '$http', function ($filter, $http) {
    this.products = [
        {
            product_id: '678193d6-4740-4eb8-83b5-84f0a2174cde',
            title: 'Apple iPhone 6S 16Gb',
            price: 749,
            url: 'http://store.storeimages.cdn-apple.com/4861/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone6s/plus/iphone6s-plus-silver-select-2015?wid=270&fmt=png-alpha&qlt=95'
        },
        {
            product_id: 'ebc03f74-8468-4e3c-8481-228a7bc13be8',
            title: 'Apple iPad mini 2 16Gb',
            price: 269,
            url: 'http://store.storeimages.cdn-apple.com/4861/as-images.apple.com/is/image/AppleInc/aos/published/images/i/pa/ipad/mini/ipad-mini-retina-step1-white-2013_GEO_US?wid=270&fmt=png-alpha&qlt=95'
        },
        {
            product_id: 'd969a708-7c75-4b32-b690-abe2e3f4f090',
            title: 'Apple TV 32Gb',
            price: 149,
            url: 'http://store.storeimages.cdn-apple.com/4861/as-images.apple.com/is/image/AppleInc/aos/published/images/a/pp/apple/tv/apple-tv-hero-select-201510?wid=270&fmt=png-alpha&qlt=95'
        },
        {
            product_id: 'ad1d571a-3805-4590-9572-6c6fdf4a9faf',
            title: 'Mac mini 500 GB',
            price: 499,
            url: 'http://store.storeimages.cdn-apple.com/4861/as-images.apple.com/is/image/AppleInc/aos/published/images/m/ac/mac/mini/mac-mini-select-hero-201505?wid=270&fmt=png-alpha&qlt=95'
        }
    ];
    this.basket = [];

    this.add = function (product) {
        var index = $filter('getIndexByUuid')(this.basket, product.product_id);
        if (null == index) {
            this.basket.push({
                product_id: product.product_id,
                title: product.title,
                price: product.price,
                url: product.url,
                quantity: 1
            });
        } else {
            this.basket[index] = {
                product_id: product.product_id,
                title: product.title,
                price: product.price,
                url: product.url,
                quantity: this.basket[index].quantity + 1
            }
        }
        $http.put('http://demo-teleport.imega.ru/cart', {
            price: product.price,
            title: product.title,
            preview: product.url,
            quantity: 1,
            url: product.url,
            cart_uuid: this.currentUuid,
            product_id: product.product_id
        }).then(
            function (res) {
                console.log(res);
            }
        );
    };

    this.del = function (product) {
        var index = $filter('getIndexByUuid')(this.basket, product.product_id);
        this.basket.splice(index, 1);
        $http.delete('http://demo-teleport.imega.ru/cart/' + this.currentUuid + '/' + product.product_id);
    };

    this.getTotal = function(){
        return this.basket.reduce(function (total, item) {
            return total + item.price * item.quantity;
        }, 0);
    };

    this.generateUUID = function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        this.currentUuid = uuid;
        return uuid;
    };

    this.getItems = function () {
        $http.get('http://demo-teleport.imega.ru/cart/' + this.currentUuid).then(
            function (res) {
                this.basket = res.data;
            }.bind(this)
        );
    };

    this.update = function (product) {
        $http.post(
            'http://demo-teleport.imega.ru/cart/',
            {
                price: product.price,
                title: product.title,
                preview: product.url,
                quantity: Number(product.quantity),
                url: product.url,
                cart_uuid: this.currentUuid,
                product_id: product.product_id
            }
        );
    };
}]);
