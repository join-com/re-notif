'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactTransitionGroup = require('react-transition-group');

var _Notif = require('./Notif');

var _Notif2 = _interopRequireDefault(_Notif);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This checks to see if object is immutable and properly access it
var getter = function getter(obj, propName) {
  return obj.get ? obj.get(propName) : obj[propName];
};

var Notifs = function Notifs(props) {
  var notifications = props.notifications,
      _props$className = props.className,
      className = _props$className === undefined ? null : _props$className,
      _props$componentClass = props.componentClassName,
      componentClassName = _props$componentClass === undefined ? 'notif' : _props$componentClass,
      _props$CustomComponen = props.CustomComponent,
      CustomComponent = _props$CustomComponen === undefined ? null : _props$CustomComponen,
      _props$transitionEnte = props.transitionEnterTimeout,
      transitionEnterTimeout = _props$transitionEnte === undefined ? 600 : _props$transitionEnte,
      _props$transitionLeav = props.transitionLeaveTimeout,
      transitionLeaveTimeout = _props$transitionLeav === undefined ? 600 : _props$transitionLeav;


  var NotifComponent = CustomComponent || _Notif2.default;

  var renderedNotifications = notifications.map(function (notification, i) {
    return _react2.default.createElement(
      _reactTransitionGroup.CSSTransition,
      {
        key: getter(notification, 'id') || 'key-' + i,
        classNames: componentClassName + '-transition',
        timeout: {
          enter: transitionEnterTimeout,
          exit: transitionLeaveTimeout
        }
      },
      _react2.default.createElement(NotifComponent, _extends({}, props, {
        componentClassName: componentClassName,
        key: getter(notification, 'id'),
        id: getter(notification, 'id'),
        message: getter(notification, 'message'),
        title: getter(notification, 'title'),
        description: getter(notification, 'description'),
        link: getter(notification, 'link'),
        kind: getter(notification, 'kind')
      }))
    );
  });

  var classes = [componentClassName + '__container', className].join(' ').split();

  return _react2.default.createElement(
    'div',
    { className: classes },
    _react2.default.createElement(
      _reactTransitionGroup.TransitionGroup,
      null,
      renderedNotifications
    )
  );
};

function mapStateToProps(state) {
  return { notifications: state.get ? state.get('notifs') : state.notifs };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Notifs);