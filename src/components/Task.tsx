import React from "react";

import { Check, Circle, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { TaskInfos, TaskStatus } from "./TasksOverview";

interface TaskProps {
  data: TaskInfos;
  handleDeleteTaskClick: (id: string) => void;
  handleToggleTaskStatusClick: (id: string) => void;
}

export const Task = ({
  data,
  handleDeleteTaskClick,
  handleToggleTaskStatusClick,
}: TaskProps) => {
  return (
    <div className="bg-base-gray-400 p-4 rounded-sm">
      <div className="flex ">
        <div className="flex gap-4 grow">
          <TaskConcludeButton
            id={data.id}
            status={data.status}
            handleToggleTaskStatusClick={handleToggleTaskStatusClick}
          />
          <span
            className={`text-sm text-base-gray-100 ${
              data.status === "Concluded" && "line-through text-base-gray-300"
            }`}
          >
            {data.description}
          </span>
        </div>
        <Button
          className="group p-1 h-6 m-0 bg-transparent hover:cursor-pointer hover:bg-base-gray-500"
          onClick={() => handleDeleteTaskClick(data.id)}
        >
          <i>
            <Trash2
              className="text-base-gray-300 group-hover:text-feedback-danger transition-colors duration-200"
              size={15}
            />
          </i>
        </Button>
      </div>
    </div>
  );
};

interface TaskConcludeButtonProps {
  handleToggleTaskStatusClick: (id: string) => void;
  id: string;
  status: TaskStatus;
}

const TaskConcludeButton = ({
  handleToggleTaskStatusClick,
  id,
  status,
}: TaskConcludeButtonProps) => {
  if (status === "Concluded")
    return (
      <Button
        className="w-4 h-4 rounded-full bg-product-purple-dark shrink-0 mt-1 p-0 hover:cursor-pointer hover:bg-product-purple"
        onClick={() => handleToggleTaskStatusClick(id)}
      >
        <i className="flex items-center justify-center w-full h-full">
          <Check size={4} className="text-base-gray-100" strokeWidth={2} />
        </i>
      </Button>
    );

  return (
    <Button
      className="w-4 h-4 rounded-full bg-transparent shrink-0 mt-1 p-0 hover:cursor-pointer hover:bg-product-blue-dark"
      onClick={() => handleToggleTaskStatusClick(id)}
    >
      <i className="flex items-center justify-center w-full h-full">
        <Circle size={12} className="text-product-blue" strokeWidth={2} />
      </i>
    </Button>
  );
};
