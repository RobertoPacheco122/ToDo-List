import React from "react";

import { AddTask } from "./AddTask";
import { Separator } from "./ui/separator";
import { FileText } from "lucide-react";
import { Task } from "./Task";

type TaskStatus = "Pending" | "Concluded";

export interface TaskInfos {
  id: string;
  description: string;
  status: TaskStatus;
}

export const TasksOverview = () => {
  const [tasks, setTasks] = React.useState<TaskInfos[]>([]);

  const handleTaskFormSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    description: string
  ) => {
    event.preventDefault();

    setTasks((previousValues) => {
      const newValues = [...previousValues];

      const newTask: TaskInfos = {
        description,
        id: Date.now().toString(),
        status: "Pending",
      };

      newValues.push(newTask);

      return newValues;
    });
  };

  return (
    <main>
      <AddTask handleTaskFormSubmit={handleTaskFormSubmit} />
      <section className="flex items-center justify-center mt-16">
        <div className="w-full max-w-3xl">
          <TasksOverviewHeader />
          <TasksOverviewContent tasks={tasks} />
        </div>
      </section>
    </main>
  );
};

interface TasksOverviewHeader {
  tasks: TaskInfos[];
}

const TasksOverviewHeader = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <span className="text-product-blue text-sm flex gap-2">
          Tarefas criadas <TasksOverviewStatus />
        </span>
        <span className="text-product-purple text-sm flex gap-2">
          Concluídas <TasksOverviewStatus />
        </span>
      </div>
      <Separator className="bg-base-gray-400" />
    </div>
  );
};

const TasksOverviewStatus = () => {
  return (
    <div className="bg-base-gray-400 rounded-md text-white text-xs text-center block pt-1 pb-1 pr-2 pl-2">
      3
    </div>
  );
};

interface TasksOverviewContentProps {
  tasks: TaskInfos[];
}

const TasksOverviewContent = ({ tasks }: TasksOverviewContentProps) => {
  if (tasks.length === 0) return <TasksOverviewContentEmpty />;

  return (
    <div className="flex items-center flex-col mt-6">
      <ul className="w-full">
        {tasks.map((task) => {
          return (
            <li key={task.id}>
              <Task data={task} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const TasksOverviewContentEmpty = () => {
  return (
    <div className="flex items-center flex-col mt-16">
      <FileText size={58} className="text-base-gray-400 mb-4" />
      <span className="text-base-gray-300 font-semibold">
        Você ainda não tem tarefas cadastradas
      </span>
      <span className="text-base-gray-300">
        Crie tarefas e organize seus itens a fazer
      </span>
    </div>
  );
};
