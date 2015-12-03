angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})


.controller('ListController', 
  [
    '$scope', 'Chats', '$timeout', '$ionicLoading', '$ionicPopup',
    function($scope, Chats, $timeout, $ionicLoading, $ionicPopup) {
      $ionicLoading.show({
        template: '<ion-spinner icon="lines"></ion-spinner></br> Espere'
      });
      $timeout(function(){
        $ionicLoading.hide();
      },1000);
      $scope.chats = Chats.all();

      $scope.data = {};
      $scope.showAlert = showAlert;
      $scope.showConfirmed = showConfirmed;
      $scope.showInput = showInput;

      function showAlert(){
        $ionicPopup.alert({
          title: 'Cuidado',
          template: 'A occurrido un error'
        })
      }


      function showConfirmed(){
        var myPopup = $ionicPopup.confirm({
          title: 'Cuidado',
          template: '¿Esta seguro?'
        });

        myPopup.then(function(rta){
          console.log(rta);
        });
      }

      function showInput(){
        $ionicPopup.show({
          title: 'Cuidado',
          subTitle: '¿Esta seguro?',
          template: '<input type="password" ng-model="data.wifi">',
          scope: $scope,
          buttons:[
            {text: 'Cancelar', type: 'button-calm'},
            {
              text: 'Confirmar',
              onTap: function(){
                console.log($scope.data.wifi);
              }
            },
          ],
          
        });
      }

    }
  ]
);
