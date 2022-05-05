import dynamoDBClient from "../model/index";
import TodoServerice from "./todo";

const todoService = new TodoServerice(dynamoDBClient());
export default todoService;
