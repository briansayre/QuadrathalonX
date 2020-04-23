import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

// serverless invoke local --function create --path mocks/create-event.json
export const main = handler(async (event) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      scoreId: uuid.v1(),
      highscore: data.highscore,
      game1score: data.game1score,
      game2score: data.game2score,
      game3score: data.game3score,
      game4score: data.game4score,
      totalscore: parseInt(data.game4score)+parseInt(data.game3score)+parseInt(data.game2score)+parseInt(data.game1score),
      createdAt: Date.now()
    }
  };

  await dynamoDb.put(params);

  return params.Item;
});