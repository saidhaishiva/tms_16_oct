

var application = angular.module('ticketManagement',['ngMaterial', 'ngMessages','appRoutes','userController','userServices','ngAnimate','mainController','authServices','managementController','issueController','allTicketsController','myTicketsController','issueServices','myTicketService','commentServices','dashBoardCtrl','resolutionService','resolutionRepo','myStatsCtrl'])


.config(function($httpProvider){
	$httpProvider.interceptors.push('AuthInterceptors');
});