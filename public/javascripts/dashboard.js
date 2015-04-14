var app = angular.module('myApp', []).config(function($interpolateProvider){
    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});

app.factory('myFactory', function() {
  var d = new Date(Date.now());
  var documents = [
    { 
      id: 0,
      created: d,
      modified: d,
      title: 'Place Holder 1', 
      details: 'This document is here to show how this would work.  You can add more documents above or edit the details of this one!  You can also delete it.  There current is no persistance so refreshing the page would bring me back.',
      owner: 'UserID'
    },
    { 
      id: 1,
      created: d,
      modified: d,
      title: 'Place Holder 2', 
      details: 'This document is here to show how this would work.  You can add more documents above or edit the details of this one!  You can also delete it.  There current is no persistance so refreshing the page would bring me back.',
      owner: 'UserID'
    }
  ];
  
  var factory = {};
  factory.getDocuments = function () {
    return documents;
  }
  factory.pushDocument = function(document) {
    documents.push(document);
  }
  factory.deleteDocument= function(document) {
    var indexOfDoc;
    for (var i in documents) {
      if (documents[i] == document) documents.splice(i, 1);
    }
  }
  factory.sendFeedback = function(feedback) {
    alert('Your feedback, ' + feedback.subject + ', has been sent.');
  }
  
  return factory;
});

app.controller('myCtrl', function($scope, myFactory) {
  
  $scope.documents = [];
  $scope.selected = {};
	$scope.docChanges = {};
  
  init();
  
  function init() {
    $scope.documents = myFactory.getDocuments();
  }
  
  $scope.addDoc = function() {
    var d = new Date(Date.now());
    var document =
      { 
        id: Math.floor((Math.random() * 10000) + 1),
        created: d,
        modified: d,
        title: $scope.newDoc.title, 
        details: $scope.newDoc.details,
        owner: 'UserID'
    	};
    myFactory.pushDocument(document);
  }
  
  $scope.deleteDoc = function (doc) {
    if (confirm('Are you sure you want to delete this document?')) {
    	myFactory.deleteDocument(doc);
		}
  }
  
  $scope.openDoc = function (document) {
    alert("Opened document: " + document.id);
  }
  
  $scope.sendFeedback = function () {
    var d = new Date(Date.now());
    var feedback = {
      id: 0,
      created: d,
      subject: $scope.feedback.subject,
      body: $scope.feedback.body,
      owner: 'UserID'
    }
    myFactory.sendFeedback(feedback);
  }
  
  $scope.detailsModal = function (document) {
    $scope.selected = document;
    $scope.docChanges = JSON.parse(JSON.stringify(document))
  }
  
  $scope.saveDocChanges = function () {
    $scope.selected.title = $scope.docChanges.title;
    $scope.selected.details = $scope.docChanges.details;
  }
  
  $('.modal').on('shown.bs.modal', function() {
  	$scope.search = '';
	});

});

$(".content").on('click', function(event) {
  unselectDocuments();
  if ($(event.target).closest('.panel-doc').length) {
    selectDocument($(event.target).closest('.panel-doc'));
  }
});

function unselectDocuments() {
  $(".panel-doc").each(function() {
      $(this).removeClass('panel-info selected');
      $(this).addClass('panel-primary');
      $(this).find('.doc-details').show();
      $(this).find('button').hide();
      $(this).find('.delete-doc').hide();
    });
}

function selectDocument(document) {
  if (!document.hasClass('selected')) {
      document.removeClass('panel-primary');
      document.addClass('panel-info selected');
      document.find('.doc-details').hide();
      document.find('button').show();
      document.find('.delete-doc').show();
    }
}

$('#create-new-modal').on('hidden.bs.modal', function(){
  $(this).find('form')[0].reset();
});

$('#feedback-modal').on('hidden.bs.modal', function(){
  $(this).find('form')[0].reset();
});

$('#details-modal').on('hidden.bs.modal', function(){
  unselectDocuments();
});

$(".button").on('click', function () {
  $(this).toggleClass('sending').blur();
})