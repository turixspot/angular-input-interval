'use strict';

describe('Directive: ng-interval', function() {
  var element, scope;
  beforeEach(module('angular-input-interval'));
  beforeEach(inject(function($rootScope) {
        scope = $rootScope.$new();
  }));

  function compileDirective(tpl) {
    if (!tpl) tpl = '<input type="text" ng-model="model" ng-interval>';
    inject(function($compile) {
      element = $compile(tpl)(scope);
      scope.$digest();
    });
  };

  describe('initialisation', function() {
    it('model should be undefined', function() {
      compileDirective();
      expect(element.val()).toEqual('');
      expect(scope.model).toEqual(undefined);
    });

    it('view should be "1s"', function() {
      scope.model = 1000;
      compileDirective();
      expect(element.val()).toEqual('1s');
      expect(scope.model).toEqual(1000);
    });

    it('view should be "2m 1s"', function() {
      scope.model = 1000 + 2 * 60 * 1000;
      compileDirective();
      expect(element.val()).toEqual('2m 1s');
      expect(scope.model).toEqual(1000 + 2 * 60 * 1000);
    });
  });

  describe('edition', function() {
      it('model should be 1000', function() {
        compileDirective();
        element.val('1s').triggerHandler('input');
        expect(element.val()).toEqual('1s');
        expect(scope.model).toEqual(1000);
      });

      it('model should be 1000', function() {
        compileDirective();
        element.val('1m 1s').triggerHandler('input');
        expect(element.val()).toEqual('1m 1s');
        expect(scope.model).toEqual(60 * 1000 + 1000);
      });
  });

});
