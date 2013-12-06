angular.module('plunker', ['ui.bootstrap']);
function DialogDemoCtrl($scope, $dialog){

  // Inlined template for demo
  
  var t = '<div class="modal-dialog">' +
              '<div class="modal-content">' +
                '<div class="modal-header">' +
                 '<button type="button" class="close" ng-click="close()" aria-hidden="true">&times;</button>' +
                  '<h4 class="modal-title">Modal title</h4>' +
                '</div>' +
                '<div class="modal-body">' +
                  '<p>One fine body&hellip;</p>' +
                '</div>' +
                '<div class="modal-footer">' +
                  '<button type="button" class="btn btn-default" ng-click="close()">Close</button>' +
                  '<button type="button" class="btn btn-primary" ng-click="close()">Save changes</button>' +
                '</div>' +
              '</div><!-- /.modal-content -->' +
            '</div><!-- /.modal-dialog -->';
  
  $scope.opts = {
    backdrop: true,
    backdropFade: true,
    dialogFade: true,
    keyboard: true,
    backdropClick: true,
    template:  t, // OR: templateUrl: 'path/to/view.html',
    controller: 'TestDialogController'
  };

  $scope.openDialog = function(){
    var d = $dialog.dialog($scope.opts);
    d.open().then(function(result){
      if(result)
      {
        alert('dialog closed with result: ' + result);
      }
    });
  };

  $scope.openMessageBox = function(){
    var title = 'This is a message box';
    var msg = 'This is the content of the message box';
    var btns = [{result:'cancel', label: 'Cancel'}, {result:'ok', label: 'OK', cssClass: 'btn-primary'}];

    $dialog.messageBox(title, msg, btns)
      .open()
      .then(function(result){
        alert('dialog closed with result: ' + result);
    });
  };
}

// the dialog is injected in the specified controller
function TestDialogController($scope, dialog){
  $scope.close = function(result){
    dialog.close(result);
  };
}