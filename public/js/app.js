(function () {
	var app = angular.module('presentation', []);

    app.controller('PresentationController', ['WebSocket', '$scope', '$http', function (WebSocket, $scope, $http) {
        var self = this;

        self.page = {
            number: -1,
            title: 'Title',
            content: null
        };
        self.title = 'Presentation title';
        self.listeners = 0;

        $scope.layoutPath = '';

        self.setPresentation = function (data) {
            $scope.layoutPath = '/data/layouts/' + data.presentation + '.html';
            self.page.number = data.page;
            self.title = data.title;

            self.nextPage(data.page);
        };

        self.nextPage = function (page) {
            if (undefined === page) {
                self.page.number++;   
            }
            else {
                self.page.number = page;
            }

            $scope.pagePath = '/data/pages/' + self.page.number + '.html';
        }

        WebSocket(self);
    }]);

    app.controller('RemoteController', ['WebSocket', '$scope', function (WebSocket, $scope) {
        var self = this;

        WebSocket(self);

        self.key = null;

        self.startRemote = function () {
            if (null === self.key) {
                console.log('started remote');
                WebSocket.socket.emit('remote', {});
            }
            else {
                console.log('next');
                self.page++;
                WebSocket.socket.emit('navigation', {
                    key: self.key,
                    type: 'next'
                });
            }
        };

        self.setKey = function (key) {
            self.key = key;
        };
    }]);

    app.directive('layout', function () {
        return {
            restrict: 'EA',
            template: '<div ng-include="layoutPath"></div>'
        };
    });

    app.directive('page', function () {
        return {
            restrict: 'EA',
            template: '<div ng-include="pagePath"></div>'
        }
    });

    app.factory('WebSocket', ['$q', '$rootScope', function($q, $rootScope) {
        var socket = io.connect(window.location.origin);

        var service = function (controller) {
            socket.on('page', function (data) {
                console.log('received page', data);
            });

            socket.on('welcome', function (data) {
                console.log('received welcome', data);
                controller.setPresentation(data);
                $rootScope.$apply();
            });

            socket.on('ninja', function (data) {
                console.log('received ninja', data);
            });

            socket.on('remote', function (data) {
                console.log('received remote', data);
                if (data.success) {
                    controller.setKey(data.key);
                }
                else {
                    alert(data.message);
                }
            });

            socket.on('next', function (data) {
                console.log('received next');
                controller.nextPage();
                $rootScope.$apply();
            });
        };

        service.socket = socket;

        return service;
    }]);
})();
