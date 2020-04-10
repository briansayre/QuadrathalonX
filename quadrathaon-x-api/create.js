import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    // 'Item' contains the attributes of the item to be created
    // - 'userId': user identities are federated through the
    //             Cognito Identity Pool, we will use the identity id
    //             as the user id of the authenticated user
    // - 'game#score': score of that game
    // - 'total': total of all scores
    // - 'createdAt': current Unix timestamp
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      game1score: data.game1score,
      game2score: data.game2score,
      game3score: data.game3score,
      game4score: data.game4score,
      total: data.total,
      createdAt: Date.now()
    }
  };

  await dynamoDb.put(params);

  return params.Item;
});