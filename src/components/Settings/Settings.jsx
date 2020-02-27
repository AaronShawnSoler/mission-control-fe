/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { useState, useCallback, useContext } from 'react';
import { bottomLinks } from './Settings.module.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useMutation } from 'urql';
import { CREATE_LABEL as createLabel } from '../Project/Queries';

import LabelList from './LabelList';
import CreateLabelForm from './CreateLabel';
import { LabelContext } from '../../contexts/LabelContext';

const Settings = props => {
  const { label, setLabel } = useContext(LabelContext);

  const { className } = props;

  const [modal, setModal] = useState(false);

  const [, executeCreate] = useMutation(createLabel);

  const toggle = () => {
    setModal(!modal)
    setLabel({ id: '', color: '', name: '' })
  };

  const disableTer = !label.color || !label.name;

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      executeCreate(label);
      toggle();
    },
    [executeCreate, label, setLabel]
  );

  return (
    <div className={bottomLinks}>
      <Button size="sm" color="secondary" onClick={toggle}>
        Settings
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Settings</ModalHeader>
        <ModalBody>
          <CreateLabelForm toggle={toggle} />
          <LabelList />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" disabled={disableTer} onClick={handleSubmit}>
            Save
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Settings;