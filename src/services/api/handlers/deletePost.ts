import { handler as h } from "../libs/handler";

export const handler = h(async ({ pathParameters }) => {
  const { id } = pathParameters;

  return {
    statusCode: 200,
    body: JSON.stringify({ post: `Post with ${id} was deleted` }),
  };
});