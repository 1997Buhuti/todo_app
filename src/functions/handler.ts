import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { middyfy } from "@libs/lambda";
import { v4 } from "uuid";
import todosService from "../service/index";
import { formatJSONResponse } from "@libs/apiGateway";

export const getAllTodos = middyfy(async (): Promise<APIGatewayProxyResult> => {
  const todos = await todosService.getAllTodos();
  return formatJSONResponse({
    todos,
  });
});

export const createTodo = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let data = JSON.parse(event.body);
    try {
      const id = v4();
      const todo = await todosService.createTodo({
        todosId: id,
        title: data.title,
        description: data.description,
        createdAt: new Date().toISOString(),
        status: false,
      });
      return formatJSONResponse({
        todo,
      });
    } catch (e) {
      return formatJSONResponse({
        status: 500,
        message: e,
      });
    }
  }
);

export const getTodo = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
      const todo = await todosService.getTodo(id);
      return formatJSONResponse({
        todo,
        id,
      });
    } catch (e) {
      return formatJSONResponse({
        status: 500,
        message: e,
      });
    }
  }
);

export const deleteTodo = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
      const todo = await todosService.deleteTodo(id);
      return formatJSONResponse({
        todo,
        id,
      });
    } catch (e) {
      return formatJSONResponse({
        status: 500,
        message: e,
      });
    }
  }
);
