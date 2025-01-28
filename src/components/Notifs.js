import React from 'react';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Notif from './Notif';

// This checks to see if object is immutable and properly access it
const getter = (obj, propName) => (obj.get ? obj.get(propName) : obj[propName]);

const NotifItem = ({ notification, componentClassName, timeout, CustomComponent, ...props }) => {
  const nodeRef = React.useRef(null);
  const NotifComponent = CustomComponent || Notif;

  return (
    <CSSTransition
      key={getter(notification, 'id')}
      classNames={`${componentClassName}-transition`}
      timeout={timeout}
      nodeRef={nodeRef}
    >
      <NotifComponent
        {...props}
        ref={nodeRef}
        componentClassName={componentClassName}
        key={getter(notification, 'id')}
        id={getter(notification, 'id')}
        message={getter(notification, 'message')}
        title={getter(notification, 'title')}
        description={getter(notification, 'description')}
        link={getter(notification, 'link')}
        kind={getter(notification, 'kind')}
      />
    </CSSTransition>
  );
};

const Notifs = (props) => {
  const {
    notifications,
    className = null,
    componentClassName = 'notif',
    CustomComponent = null,
    transitionEnterTimeout = 600,
    transitionLeaveTimeout = 600,
  } = props;


  const renderedNotifications = notifications.map((notification, i) => (
    <NotifItem
      key={getter(notification, 'id') || `key-${i}`}
      notification={notification}
      CustomComponent={CustomComponent}
      componentClassName={componentClassName}
      timeout={{
        enter: transitionEnterTimeout,
        exit: transitionLeaveTimeout
      }}
      {...props}
    />
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

function mapStateToProps(state) {
  return { notifications: state.get ? state.get('notifs') : state.notifs };
}

export default connect(mapStateToProps)(Notifs);
