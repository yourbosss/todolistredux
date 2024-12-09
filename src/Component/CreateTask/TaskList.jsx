import React from 'react';
import { useSelector } from 'react-redux';
import { AdditionTask } from '../AdditionTask/AdditionTask.jsx';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  return (
    <div>
      {Array.isArray(tasks) && tasks.map((task) => (
        <AdditionTask
          key={task.id}
          taskId={task.id}
          taskTitle={task.title}
          taskAbout={task.about}
          expanded={task.expanded}
        />
      ))}
    </div>
  );
};

export default TaskList;