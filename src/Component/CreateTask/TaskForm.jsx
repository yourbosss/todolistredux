import React from 'react';
import plusIcon from '../../Icon/plus.png';

const TaskForm = ({ title, setTitle, about, setAbout, onAddClick }) => {
  const handleSubmit = () => {
    if (title.trim() === '' || about.trim() === '') {
      alert('Заполни все поля!');
      return;
    }
    onAddClick();
  };

  return (
    <div className="input-container-wrapper">
      <div className="input-container">
        <input
          className="input-field"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title..."
        />
        <input
          className="input-field"
          type="text"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder="About..."
        />
      </div>
      <button className="add-button" onClick={handleSubmit}>
        <img src={plusIcon} alt="Add Task" className="add-icon" />
      </button>
    </div>
  );
};

export default TaskForm;
