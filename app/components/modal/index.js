import React from 'react';
import Dialog from 'material-ui/Dialog';

export default function Modal(props) {
  return (
    <div>
      <Dialog
        title={props.title}
        actions={props.actions}
        modal
        open={props.isOpen}
      >
        {props.children}
      </Dialog>
    </div>
  );
}
