// src/components/TaskList.js
import React from 'react';
import { useSelector } from 'react-redux';
import { AdditionTask } from './AdditionTask';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);

  return (
    <div>
      {tasks.map((task) => (
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

export { TaskList };
