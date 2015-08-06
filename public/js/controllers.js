(function () {
    var app = angular.module('PresentationControllers', []);

    app.controller('PresentationController', ['WebSocket', '$scope', '$http', function (WebSocket, $scope, $http) {
        var self = this;

		$scope.page = {
            number: 0,
            title: 'Title',
            content: null
        };

        $scope.presentation = null;

        $scope.layout = '';

        $scope.setPresentation = function (presentation) {
            $scope.presentation = presentation;

            $http.get('/data/layouts/' + presentation + '.html')
                .success(function (response) {
                    //self.change(presentation);
//                    $location.path('/data/layouts/' + presentation + '.html');
//                    self.layout = response;
                    $scope.presentation = presentation;
                    $scope.layout = response;
                });
        };

        WebSocket(self);

        WebSocket.socket.emit('hello', {
            uuid: 'u478'
        });
	}]);
/*
    app.controller('RemoteController', ['WebSocket', '$http', function (WebSocket, $http) {
        var self = this;

        WebSocket(self);

        self.startRemote = function () {
            console.log('started remote');
            WebSocket.socket.emit('remote', {});
        };
    }]);

    app.directive('layout', function () {
        return {
            restrict: 'A',
            template: '<div ng-include="layout"></div>',
            controller: function ($scope) {
                $scope.layout = '/data/layouts/inespresentation.html';
                $scope.change = function (layout) {
                    $scope.layout = '/data/layouts/' + layout + '.html';
                }
            }
        };
    });
*/
	app.factory('WebSocket', ['$q', '$rootScope', function($q, $rootScope) {
        var socket = io.connect(window.location.origin);

        var service = function (controller) {
            socket.on('page', function (data) {
                console.log('received page', data);
            });

            socket.on('welcome', function (data) {
                console.log('received welcome', data);
                //$rootScope.page = data.page;
                controller.setPresentation(data.presentation);
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
            })
        };

        service.socket = socket;

        return service;
	}]);
})();