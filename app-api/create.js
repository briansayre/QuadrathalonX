import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

// serverless invoke local --function create --path mocks/create-event.json
export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      scoreId: uuid.v1(),
      game1score: data.game1score,
      game2score: data.game2score,
      game3score: data.game3score,
      game4score: data.game4score,
      totalscore: data.totalscore,
      createdAt: Date.now()
    }
  };

  await dynamoDb.put(params);

  return params.Item;
});