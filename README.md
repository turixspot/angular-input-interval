# angular-input-interval
PEGjs based input interval. You can specify a time unit after a time value 'X', such as Xw, Xd, Xh, Xm or Xs, to represent weeks (w), days (d), hours (h), minutes (m) and seconds (s), respectively. interval will be available in controller $scope in ms.

This component is inspired by JIRA input interval component.

<a href="http://htmlpreview.github.io/?https://github.com/turixspot/angular-input-interval/blob/master/example/index.html" target="_blank">Demo</a> page

## Usage:

1. include as a dependency for your app.

    ```js
    angular.module('myApp', ['angular-input-interval'])
    ```
    
2. include the supplied JS file.

    ```html
    <script type='text/javascript' src='angular-input-interval.min.js'></script>
    ```

3. That's it -- you're done!

#### via bower:
```
$ bower install angular-input-interval
```
#### via npm:
```
$ npm install angular-input-interval
```
