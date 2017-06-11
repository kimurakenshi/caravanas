import { connect } from 'react-redux';
import { saveCaravana, setListMode } from 'app/actions/caravana-actions';
import { getCaravanaById, hasCaravana } from 'app/reducers';
import React, { Component } from 'react';
import CARAVANA_LIST_MODE from '../caravanas-list/enum';
import Modal from 'app/components/modal';
import RaisedButton from 'material-ui/RaisedButton';
import PageSubtitle from 'app/components/page-subtitle';
import TextField from 'material-ui/TextField';
import isEmpty from 'lodash/isEmpty';
import styles from './style/edit-caravana.scss';

class EditCaravana extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      errorMessage: '',
      isDirty: false,
      isValid: true,
      number: '',
    };

    this.onSaveAction = this.onSaveAction.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  componentDidMount() {
    if (this.props.caravana) {
      this.setState({
        number: this.props.caravana.number,
        description: this.props.caravana.description,
      });
    }
  }

  actions = [
    <RaisedButton
      className={styles['edit-caravana-action']}
      label="Cancelar"
      onClick={() => this.props.setListMode(CARAVANA_LIST_MODE.VIEW_MODE)}
    />,
    <RaisedButton
      className={styles['edit-caravana-action']}
      label="Guardar"
      onClick={() => this.onSaveAction()}
      primary
    />,
  ];

  onSaveAction() {
    if (this.validateForm()) {
      this.props.saveCaravana({
        ...this.props.caravana,
        number: this.state.number.trim(),
        description: this.state.description.trim(),
      });

      this.props.setListMode(CARAVANA_LIST_MODE.VIEW_MODE);
    }
  }

  validateForm() {
    const caravanaNumber = this.state.number.trim();

    if (isEmpty(caravanaNumber)) {
      this.setState({
        errorMessage: 'El número de la caravana es requerido',
        isValid: false,
        isDirty: true,
      });

      return false;
    }
    if (this.props.isExistentCaravana(caravanaNumber, this.props.caravana.id)) {
      this.setState({
        errorMessage: 'El número de caravana ya existe.',
        isValid: false,
        isDirty: true,
      });

      return false;
    }

    return true;
  }

  render() {
    const errorStyle = {
      position: 'absolute',
      bottom: '-7px',
    };

    const {
      errorMessage,
    } = this.state;

    return (
      <Modal
        title="Editar Caravana"
        isOpen
        actions={this.actions}
      >
        <div className={styles['edit-caravana']}>
          <PageSubtitle title="Caravana" />

          <div>
            <TextField
              errorStyle={errorStyle}
              floatingLabelText="Número"
              errorText={errorMessage}
              value={this.state.number}
              onChange={(event) => this.setState({ number: event.target.value.toUpperCase() })}
            />
          </div>

          <div>
            <TextField
              floatingLabelText="Descripción"
              multiLine
              onChange={(event) => this.setState({ description: event.target.value })}
              value={this.state.description}
            />
          </div>
        </div>
      </Modal>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    caravana: getCaravanaById(state, ownProps.id),
    isExistentCaravana: (number, excludeId) => hasCaravana(state, number, excludeId),
  };
}

export default connect(
  mapStateToProps,
  {
    saveCaravana,
    setListMode,
  }
)(EditCaravana);
