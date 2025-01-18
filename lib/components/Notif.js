'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Notif = function Notif(_ref) {
  var _ref$kind = _ref.kind,
      kind = _ref$kind === undefined ? 'info' : _ref$kind,
      componentClassName = _ref.componentClassName,
      actionLabel = _ref.actionLabel,
      onActionClick = _ref.onActionClick,
      id = _ref.id,
      message = _ref.message;

  var handleActionClick = function handleActionClick(ev) {
    ev.preventDefault();

    if (!onActionClick) {
      return;
    }

    onActionClick(id);
  };

  return _react2.default.createElement(
    'div',
    { className: componentClassName + ' ' + componentClassName + '--' + kind },
    _react2.default.createElement('div', { className: componentClassName + '__icon' }),
    _react2.default.createElement(
      'div',
      { className: componentClassName + '__content' },
      _react2.default.createElement(
        'span',
        { className: componentClassName + '__message' },
        message
      )
    ),
    actionLabel && _react2.default.createElement(
      'span',
      { className: componentClassName + '__action' },
      _react2.default.createElement(
        'button',
        { onClick: handleActionClick },
        actionLabel
      )
    ),
    _react2.default.createElement('div', { className: componentClassName + '__close' })
  );
};

exports.default = Notif;