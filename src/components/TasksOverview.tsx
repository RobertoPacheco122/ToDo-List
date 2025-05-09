import React from "react";

import { AddTask } from "./AddTask";
import { Separator } from "./ui/separator";
import { FileText } from "lucide-react";
import { Task } from "./Task";
import { toast } from "sonner";

export type TaskStatus = "Pending" | "Concluded";

export interface TaskInfos {
  id: string;
  description: string;
  status: TaskStatus;
}

export const TasksOverview = () => {
  const [tasks, setTasks] = React.useState<TaskInfos[]>([]);
  const [taskDescription, setTaskDescription] = React.useState("");

  const handleTaskFormSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    description: string
  ) => {
    event.preventDefault();

    if (description === "") {
      toast("Ocorreu um problema ao criar a tarefa!", {
        description: "A tarefa precisa ter uma descrição",
      });

      return;
    }

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

    toast("Tarefa criada com sucesso!");

    setTaskDescription("");
  };

  const handleDeleteTaskClick = (id: string) => {
    setTasks((previousValues) => {
      const newValues = [...previousValues].filter((task) => task.id !== id);

      return newValues;
    });

    toast("Tarefa excluída com sucesso");
  };

  const handleToggleTaskStatusClick = (id: string) => {
    setTasks((previousValues) => {
      const taskIndex = previousValues.findIndex((task) => task.id === id);
      if (taskIndex === -1) return previousValues;

      const task = previousValues[taskIndex];

      // Cria uma nova task com status alternado
      const updatedTask: TaskInfos = {
        ...task,
        status: task.status === "Concluded" ? "Pending" : "Concluded",
      };

      // Retorna nova lista com a task atualizada
      return [
        ...previousValues.slice(0, taskIndex),
        updatedTask,
        ...previousValues.slice(taskIndex + 1),
      ];
    });
  };

  return (
    <main>
      <AddTask
        taskDescription={taskDescription}
        setTaskDescription={setTaskDescription}
        handleTaskFormSubmit={handleTaskFormSubmit}
      />
      <section className="flex items-center justify-center mt-16">
        <div className="w-full max-w-3xl">
          <TasksOverviewHeader tasks={tasks} />
          <TasksOverviewContent
            tasks={tasks}
            handleDeleteTaskClick={handleDeleteTaskClick}
            handleToggleTaskStatusClick={handleToggleTaskStatusClick}
          />
        </div>
      </section>
    </main>
  );
};

interface TasksOverviewHeader {
  tasks: TaskInfos[];
}

const TasksOverviewHeader = ({ tasks }: TasksOverviewHeader) => {
  const concludedTasks = tasks.filter(({ status }) => status === "Concluded");
  const pendingTasks = tasks.filter(({ status }) => status === "Pending");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <span className="text-product-blue text-sm flex gap-2">
          Tarefas criadas{" "}
          <TasksOverviewStatus
            variant="Pending"
            pending={pendingTasks.length}
          />
        </span>
        <span className="text-product-purple text-sm flex gap-2">
          Concluídas{" "}
          <TasksOverviewStatus
            variant="Concluded"
            concluded={concludedTasks.length}
            pending={pendingTasks.length}
          />
        </span>
      </div>
      <Separator className="bg-base-gray-400" />
    </div>
  );
};

interface TasksOverviewStatusProps {
  variant: TaskStatus;
  concluded?: number;
  pending?: number;
}

const TasksOverviewStatus = ({
  variant,
  concluded = 0,
  pending = 0,
}: TasksOverviewStatusProps) => {
  return (
    <div className="bg-base-gray-400 rounded-md text-white text-xs text-center block pt-1 pb-1 pr-2 pl-2">
      {variant === "Pending" ? pending : `${concluded} de ${pending}`}
    </div>
  );
};

interface TasksOverviewContentProps {
  tasks: TaskInfos[];
  handleDeleteTaskClick: (id: string) => void;
  handleToggleTaskStatusClick: (id: string) => void;
}

const TasksOverviewContent = ({
  handleDeleteTaskClick,
  handleToggleTaskStatusClick,
  tasks,
}: TasksOverviewContentProps) => {
  if (tasks.length === 0) return <TasksOverviewContentEmpty />;

  return (
    <div className="flex items-center flex-col mt-6 mb-6">
      <ul className="w-full space-y-3">
        {tasks.map((task) => {
          return (
            <li key={task.id}>
              <Task
                data={task}
                handleDeleteTaskClick={handleDeleteTaskClick}
                handleToggleTaskStatusClick={handleToggleTaskStatusClick}
              />
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
