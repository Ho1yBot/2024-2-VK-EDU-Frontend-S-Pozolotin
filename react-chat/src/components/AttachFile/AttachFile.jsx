import React, { useState } from 'react';
import FileUpload from './../FileUpload/FileUpload';

const AttachFile = () => {
  const [isAttachOpen, setIsAttachOpen] = useState(false);

  const toggleAttach = () => {
    setIsAttachOpen(!isAttachOpen);
  };

  return (
    <div className="attach">
      <button onClick={toggleAttach}>Attach</button>
      {isAttachOpen && (
        <div className="attach_container">
          <ul className="attach_list">
            <li className="attach_item"><button>Photo or video</button></li>
            <li className="attach_item"><button>Choose from gallery</button></li>
            <li className="attach_item"><FileUpload /></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AttachFile;
