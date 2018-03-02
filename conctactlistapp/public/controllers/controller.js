var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

  

  var refresh = function(){
    $http.get("/contactlist").then(function (success){
        $scope.contactList = success.data;
        $scope.contact = {};
      },function (error){

    });
  }

  refresh();

  $scope.addContact = function(){
    $http.post("/contactlist", $scope.contact).then(function (success){
        refresh();
      },function (error){

    });
  }

  $scope.removeContact = function(id){
    $http.delete('/contactlist/'+id).then(function (success){
        refresh();
      },function (error){

    });
  }

  $scope.editContact = function(id){
    $http.get('/contactlist/'+id).then(function (success){
      $scope.contact = success.data;
      },function (error){

    });
  }

  $scope.updateContact = function(){
    console.log($scope.contact._id);
    $http.put('/contactlist/'+ $scope.contact._id, $scope.contact).then(function (success){
      console.log(success.data);
      refresh();
      },function (error){
    });
  }

  $scope.clear = function(){
    $scope.contact = {};
  }
    
}]);