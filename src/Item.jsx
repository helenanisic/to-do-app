import {
  Box,
  Card,
  CardBody,
  Checkbox,
  Divider,
  Flex,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";
const Item = ({ todo, onCheck, onDeleteTodo}) => {
  const [task, setTask] = useState(todo);
  const [exVisible, setExVisible] = useState(false);

  const changeState = (e) => {
    if (e.target.checked) {
        let t = task;
        t.state = "completed";
        setTask(t);
        onCheck(t);
      } else {
        let t = task;
        t.state = "active";
        setTask(t);
        onCheck(t);
      }
  }

  const deleteItem = () => {
    onDeleteTodo(task);
  }

  const changeExVisibility = (value) => {
    setExVisible(value);
  }

  return (
    <>
      <Flex justifyContent="space-between" onMouseEnter={()=>changeExVisibility(true)} onMouseLeave={()=>changeExVisibility(false)}>
        <Checkbox
          spacing="1rem"
          size="lg"
          color="#6C7A89"
          isChecked = {task.state === "active" ? false : true}
          as={task.state === "active" ? "p" : "del"}
          onChange={(e) => {
            changeState(e);
            
          }}
        >
          {todo.task}
        </Checkbox>
        {exVisible && <CloseIcon color="#6C7A89" onClick={deleteItem} cursor="pointer" display="flex" alignSelf="center" marginRight="2%"/>}   
      </Flex>
      <Divider />
    </>
  );
};

export default Item;
