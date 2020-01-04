import React from 'react';
import BootstrapAlert from 'react-bootstrap/Alert';

import './Alert.css';

function Alert(props) {
  const { type, message, onClose } = props;
  return (
      <>
        {type !== null &&
          <BootstrapAlert variant={type}  className="Alert" onClose={onClose} dismissible>
            {/*<BootstrapAlert.Heading>Oh snap! You got an error!</BootstrapAlert.Heading>*/}
            <p>
              {message}
            </p>
          </BootstrapAlert>
        }
      </>
  );
}

export default Alert;
