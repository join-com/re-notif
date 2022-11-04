import React from 'react';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Notif from './Notif';
import PropTypes from 'prop-types';

// This checks to see if object is immutable and properly access it
const getter = (obj, propName) => (obj.get ? obj.get(propName) : obj[propName]);

const Notifs = (props) => {
  const {
    notifications,
    className,
    componentClassName,
    CustomComponent,
    transitionEnterTimeout,
    transitionLeaveTimeout,
  } = props;

  const NotifComponent = CustomComponent || Notif;

  const renderedNotifications = notifications.map((notification, i) => (
    <CSSTransition
      key={getter(notification, 'id') || `key-${i}`}
      classNames={`${componentClassName}-transition`}
      timeout={{
        enter: transitionEnterTimeout,
        exit: transitionLeaveTimeout
      }}
    >
      <NotifComponent
        {...props}
        componentClassName={componentClassName}
        key={getter(notification, 'id')}
        id={getter(notification, 'id')}
        message={getter(notification, 'message')}
        title={getter(notification, 'title')}
        description={getter(notification, 'description')}
        kind={getter(notification, 'kind')}
      />
    </CSSTransition>
    )
  );

  const classes = [
    `${componentClassName}__container`,
    className,
  ].join(' ').split();

  return (
    <div className={classes} >
      <TransitionGroup>
        {renderedNotifications}
      </TransitionGroup>
    </div>
  );
};

Notifs.defaultProps = {
  className: null,
  componentClassName: 'notif',
  CustomComponent: null,
  transitionEnterTimeout: 600,
  transitionLeaveTimeout: 600,
};

Notifs.propTypes = {
  notifications: PropTypes.array.isRequired,
  className: PropTypes.string,
  CustomComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.element,
  ]),
  componentClassName: PropTypes.string,
  transitionEnterTimeout: PropTypes.number,
  transitionLeaveTimeout: PropTypes.number,
};

function mapStateToProps(state) {
  return { notifications: state.get ? state.get('notifs') : state.notifs };
}

export default connect(mapStateToProps)(Notifs);
