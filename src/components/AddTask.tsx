import React from "react";

import { Button } from "./ui/button";
import { CirclePlus } from "lucide-react";

interface AddTaskProps {
  handleTaskFormSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    description: string
  ) => void;
}

export const AddTask = ({ handleTaskFormSubmit }: AddTaskProps) => {
  const [taskDescription, setTaskDescription] = React.useState("");

  return (
    <section className="flex items-center justify-center mt-[-1.5rem]">
      <div className="w-full max-w-3xl">
        <form
          onSubmit={(event) => handleTaskFormSubmit(event, taskDescription)}
        >
          <div className="flex items-center gap-2">
            <input
              className="bg-base-gray-400 text-base-gray-200 p-3 w-full rounded-sm"
              type="text"
              name="task-description"
              placeholder="Adicione uma nova tarefa"
              id="task-description"
              onChange={({ target: { value } }) => setTaskDescription(value)}
              value={taskDescription}
            />
            <Button className="bg-product-blue-dark p-6 flex items-center hover:cursor-pointer hover:bg-product-blue">
              Criar <CirclePlus size={17} />
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};
