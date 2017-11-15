/* global $location */

angular.module('contactsMgr', ['ngRoute', 'ngResource'])
.config(function($routeProvider, $locationProvider){

    $routeProvider.when('/', {
        controller: 'homeCtrl',
        templateUrl: 'home.html'
    })

    .when('/add-contact', {
        controller: 'addCtrl',
        templateUrl: 'add.html'
    })

    .when('/contact/:id', {
        controller: 'contactCtrl',
        templateUrl: 'contact.html'
    })

    .otherwise({
        redirectTo: '/'
    });

    // Opcjonalnie
    //$locationProvider.html5Mode(true);

})
.factory('contacts', function(){

    var contacts = [
        {
            name: 'username1',
            phone: '123123123'
        },
        {
            name: 'humanv2',
            phone: '111222333' 
        },
        {
            name: 'angularapp',
            phone: '99999' 
        }
    ];
    return {
        get: function(){
            return contacts;
        },
        find: function(index){
            return contacts[index];
        },
        set: function(contact){
            contacts.push(contact);
        },
        destroy: function(index){
            contacts.splice(index, 1);
        }
    };
})
.controller('appCtrl', function($scope, $location){
    $scope.wiad = 'really index';
    $scope.startSearch = function(){
        $location.path('/');
    };
    $scope.pageClass = function(path){
        return (path == $location.path()) ? 'active' : '';
    };
})
.controller('homeCtrl', function($scope, contacts, $http){
    $scope.message = 'home2 here';
    $scope.contacts = contacts.get();
    
    
    $scope.delete = function(index){
        contacts.destroy(index);
    };
})
.controller('addCtrl', function($scope, contacts){
    $scope.message = 'add here';
    $scope.submit = function(){
        contacts.set($scope.contact);
        $scope.contact = null;
        $scope.added = true;
    };
})
.controller('contactCtrl', function($scope, $routeParams, contacts){
    $scope.message = 'ctc here';
    $scope.contact = contacts.find($routeParams.id);
})
.directive('editable', function(){
    return {
        restrict: 'AE',
        templateUrl: 'editable.html',
        scope: {
            value: '=editable',
            field: '@fieldType'
        },
        controller: function($scope){
            $scope.field = ($scope.field) ? $scope.field : 'text';

            $scope.editor = {
                showing: false,
                value: $scope.value
            };

            $scope.toggleEditor = function(){
                $scope.editor.showing = !$scope.editor.showing;
                $scope.editor.value = $scope.value;
            };

            $scope.save = function(){
                $scope.value = $scope.editor.value;
                $scope.toggleEditor();
            };

        }
    };
})
.filter('paragraph', function(){
    return function(input){
        return input;
    };
})


;
