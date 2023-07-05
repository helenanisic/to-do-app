import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  Button,
  Divider,
  Grid,
  GridItem,
  useMediaQuery,
} from "@chakra-ui/react";
import Item from "./Item";
import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState(items);
  const [inputValue, setInputValue] = useState("");

  const changeState = (i) => {
    console.log(i);
    let changedItems = filteredItems.map((item) =>
      item.id === i.id ? i : item
    );
    let it = items.map((item) => (item.id === i.id ? i : item));
    setItems(it);
    setFilteredItems(changedItems);
  };

  const deleteTodo = (task) => {
    console.log(items);
    console.log(task);
      let newItems = items.filter(
        (i) => i.id !== task.id
      );
      console.log(newItems);
      setItems(newItems);
      setFilteredItems(newItems);
    
  }


  const [pad, setPad] = useState(0);
  const [height, setHeight] = useState(100);
  const [isSmallerThan800] = useMediaQuery('(max-width: 1024px)');
  const [isSmallerThan640] = useMediaQuery('(max-width: 640px)');
  const [isSmallerThan420] = useMediaQuery('(max-width: 420px)');

  const list = (<Stack h="50vh" transitionDelay="1s">
  <Card h="100%">
    <CardBody>
      <Stack>
        {filteredItems.map((item) => (
          <Item key={item.id} todo={item} onCheck={changeState} onDeleteTodo={deleteTodo}/>
        ))}
      </Stack>
    </CardBody>
    <Divider color="#6C7A89"/>
    <Grid templateColumns='repeat(5, 1fr)' gap={isSmallerThan640 ? `0` : `2`} height="3.5rem">
      <GridItem colSpan={1} display="flex" justifyContent="center" alignItems="center">
        {!isSmallerThan420 ? 
        <Text paddingLeft={isSmallerThan640 ? `1` : `5`} fontSize={isSmallerThan640 ? `xs` : `sm`} color="#6C7A89">{items.length} {items.length === 1 ? "item" : "items"} left</Text> 
        :
        <Text paddingLeft={isSmallerThan640 ? `1` : `5`} fontSize={isSmallerThan640 ? `xs` : `sm`} color="#6C7A89">{items.length} todo</Text>  
      }
        
      </GridItem>
      <GridItem colSpan={3} display="flex" justifyContent="center" alignItems="center">
      <Flex >
        <Button 
        size={isSmallerThan640 ? `xs` : `md`}
        padding={1}
          variant="ghost"
          border="none"
          onClick={() => {
            setFilteredItems(items);
          }}
          _hover={{ bg: "white", color:"#0D98BA", borderColor:"white" }}
        _active={{
          bg: "white",
          transform: "scale(0.98)",
        }}
        _focus={{
          border:"none",
          outline:"none"
        }}
        >
          All
        </Button>
        <Button
        size={isSmallerThan640 ? `xs` : `md`}
        padding={1}
        border="none"
          variant="ghost"
          onClick={() => {
            let newItems = items.filter(
              (i) => i.state === "active"
            );
            console.log(newItems);
            setFilteredItems(newItems);
          }}
          _hover={{ bg: "white", color:"#0D98BA", borderColor:"white" }}
        _active={{
          bg: "white",
          transform: "scale(0.98)",
        }}
        _focus={{
          border:"none",
          outline:"none"
        }}
        >
          Active
        </Button>
        <Button
        size={isSmallerThan640 ? `xs` : `md`}
        padding={1}
        border="none"
          variant="ghost"
          onClick={() => {
            let newItems = items.filter(
              (i) => i.state === "completed"
            );
            setFilteredItems(newItems);
          }}

          _hover={{ bg: "white", color:"#0D98BA", borderColor:"white" }}
        _active={{
          bg: "white",
          transform: "scale(0.98)",
          border:"1px solid red",
        }}
        _focus={{
          border:"none",
          outline:"none"
        }}
        >
          Completed
        </Button>
      </Flex>
      </GridItem>
      <GridItem colSpan={1} display="flex" justifyContent="center" alignItems="center" >
      <Button
        size={isSmallerThan640 ? `xs` : `md`}
        variant="ghost"
        padding={1}
        paddingRight={isSmallerThan640 ? `1` : `5`}
        onClick={() => {
          let newItems = items.filter((i) => i.state === "active");
          let newFilteredItems = filteredItems.filter(
            (i) => i.state === "active"
          );
          console.log(newItems);
          setItems(newItems);
          setFilteredItems(newFilteredItems);
        }}
        color="#6C7A89"
        border="none"
        _hover={{ bg: "white", color:"#0D98BA", borderColor:"white" }}
        _active={{
          bg: "white",
          transform: "scale(0.98)",
          border:"1px solid red",
          outline:"none"
        }}
        _focus={{
          border:"none",
          outline:"none"
        }}
      >
        Clear Completed
      </Button>
      </GridItem>
    </Grid>
  </Card>
</Stack>);

  const empty = (    <>
    <Box bg="white" w="100vw" h="100vh">
      <Box bg="#0D98BA" w="100vw" h={`${height}vh`} display="flex" alignItems="center" justifyContent="center" transition="height 1s ease-in-out">
        <Box paddingTop={`${pad}%`} w={isSmallerThan800 ? `80vw` : `50vw`} margin="auto" h="30vh">
          <Heading color="white" letterSpacing=".5rem" size="2xl">
            TODO
          </Heading>
          <Input       
            focusBorderColor="white"
            placeholder="Type here..."
            w={isSmallerThan800 ? `80vw` : `50vw`}
            margin="5% 0%"
            size="lg"
            value={inputValue}
            backgroundColor="white"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setItems([
                  ...items,
                  {
                    id: items.length + 1,
                    task: e.target.value,
                    state: "active",
                  },
                ]);

                setPad(5);
                setHeight(35);
                setInputValue("");
                setFilteredItems([
                  ...items,
                  {
                    id: items.length + 1,
                    task: e.target.value,
                    state: "active",
                  },
                ]);
              }
            }}
          />
          {items.length !== 0 && list }
           
        </Box>
      </Box>
    </Box>
  </>);


  return empty;

}

export default App;
