import React, { useState } from 'react';
import plusIcon from '../../Icon/plus.png';

const TaskForm = ({ onAddClick }) => {
  const [formData, setFormData] = useState({
    title: '',
    about: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (formData.title.trim() === '' || formData.about.trim() === '') {
      alert('Заполни все поля живо');
      return;
    }
    onAddClick(formData);
    setFormData({ title: '', about: '' });
  };

  return (
    <div className="input-container-wrapper">
      <div className="input-container">
        <input
          type="text"
          name="title"
          className="input-field"
          placeholder="Title..."
          value={formData.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="about"
          className="input-field"
          placeholder="About..."
          value={formData.about}
          onChange={handleChange}
        />
      </div>
      <button className="add-button" onClick={handleSubmit}>
        <img src={plusIcon} alt="Add Task" className="add-icon" />
      </button>
    </div>
  );
};

export default TaskForm;
