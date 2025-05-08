import { Check, Trash2 } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { TaskInfos } from "./TasksOverview";

interface TaskProps {
  data: TaskInfos;
  handleDeleteTaskClick: (id: string) => void;
}

export const Task = ({ data, handleDeleteTaskClick }: TaskProps) => {
  return (
    <div className="bg-base-gray-400 p-4 rounded-sm">
      <div className="flex ">
        <div className="flex gap-4 grow">
          <TaskConcludeButton />
          <span className="text-sm text-base-gray-100">{data.description}</span>
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

const TaskConcludeButton = () => {
  return (
    <Button className="w-5 h-5 rounded-full bg-product-purple-dark shrink-0 mt-1 p-0 hover:cursor-pointer hover:bg-product-purple">
      <i className="flex items-center justify-center w-full h-full">
        <Check size={10} className="text-base-gray-100" strokeWidth={2} />
      </i>
    </Button>
  );
};
