import React from 'react';
import Modal from 'app/components/modal';
import FlatButton from 'material-ui/FlatButton';

const actions = [
  <FlatButton
    label="Cancel"
    primary={true}
  />,
  <FlatButton
    label="Submit"
    primary={true}
    keyboardFocused={true}
  />,
];

export default function EditCaravana() {
  return (
    <Modal
      title="Editar Caravana"
      isOpen
      actions={actions}
    >
      Something here
    </Modal>
  );
}
