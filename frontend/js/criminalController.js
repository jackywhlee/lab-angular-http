app.controller('CriminalController',['$scope','$http', CriminalController]);

function CriminalController($scope,$http){
  $scope.all = [];
  $scope.newCriminal = {}

  $scope.fields = {
    name     : 'Prof. Moriarty',
    location : 'Reichenbach Falls, CH',
    status   : ['DEAD','UNKNOWN']
  }

  function getAll(){
    $http({
      method : 'GET',
      url    : 'http://localhost:3000/criminals'
    }).then(function(res){
      $scope.all = res.data.criminals
    })
  }
  getAll();

  $scope.addNewCriminal = function(isValid){
    if (isValid){
      this.error = "";
      $http({
        method : 'POST',
        url    : 'http://localhost:3000/criminals',
        data   : {
          name     : this.newCriminal.name,
          location : this.newCriminal.location,
          status   : this.newCriminal.status
        }
      }).then(function(res){
        $scope.all.push(res.data.criminal)
      })
    }else{
      this.error = 'Incorrect Input'
    }
  }

  $scope.deleteCriminal = function(id){
    $http({
      method : 'DELETE',
      url    : 'http://localhost:3000/criminals/' + id
    }).then(function(res){
      var target = $scope.all.find(function(elem, index, array){
        return elem._id == id
      })
      $scope.all.splice($scope.all.indexOf(target), 1)
    })
  }

}