angular.module('MerryChristmas', [ 'ngRoute' ])

.config(function($routeProvider){
  $routeProvider
    .when('/', {
      controller: 'HomeCtrl',
      templateUrl: 'partials/welcome.html'
    })
    .when('/lucky', {
      controller: 'LuckyCtrl',
      templateUrl: 'partials/lucky.html'
    });
})

.controller('HomeCtrl', function($scope){

})

.controller('LuckyCtrl', function($scope){
  $scope.list = [];
  var genArr = function(min, max){
    $scope.num = '?';
    $scope.stop();
    var arr = [];
    for(var i=min; i<=max; i++){
      arr.push(i);
    }
    $scope.list = arr;
  };

  $scope.$watch('min', function(val){
    genArr(val, $scope.max);
  });
  $scope.$watch('max', function(val){
    genArr($scope.min, val);
  });

  $scope.status = 'stop';

  $scope.start = function(){
    $scope.status = 'running';
    $scope.interval = setInterval(function(){
      var seed = Math.floor(Math.random()* $scope.list.length);
      var num = $scope.list[seed];
      if(num) $scope.num = num;
      $scope.$digest();
      if(!$scope.list.length){
        alert('没有候选人了');
        $scope.stop();
      }
    }, 100);
  };

  $scope.stop = function(){
    $scope.status = 'stop';
    clearInterval($scope.interval);
    var num = $scope.num;
    var index = $scope.list.indexOf(num);
    $scope.list.splice(index, 1);
  }

  $scope.control = function(){
    switch($scope.status){
      case 'stop':
        $scope.start();
        break;
      case 'running':
        $scope.stop();
        break;
    }
  };
});


;(function(win, jq,undefined){

  jq(function(){
    $(document).on('keydown', function(ev){
      switch(ev.keyCode){
        case 13:
        case 32:
          document.querySelector('.btn').click();
          break;
      }
    });
  });

})(window, jQuery);
