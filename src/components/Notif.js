import React from 'react';

const Notif = ({ kind = 'info', componentClassName, actionLabel, onActionClick, id, message }) => {
  const handleActionClick = (ev) => {
    ev.preventDefault();

    if (!onActionClick) {
      return;
    }

    onActionClick(id);
  };

  return (
    <div className={`${componentClassName} ${componentClassName}--${kind}`}>
      <div className={`${componentClassName}__icon`} />
      <div className={`${componentClassName}__content`}>
        <span className={`${componentClassName}__message`}>{message}</span>
      </div>
      {actionLabel &&
        <span className={`${componentClassName}__action`}>
          <button onClick={handleActionClick}>{actionLabel}</button>
        </span>
      }
      <div className={`${componentClassName}__close`} />
    </div>
  );
};

export default Notif;
