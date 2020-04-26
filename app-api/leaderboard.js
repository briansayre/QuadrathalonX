import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {

    const params = {
        TableName: process.env.tableName,
        ProjectionExpression: "highscore, #n",
        ExpressionAttributeNames: {'#n':'name'}
    };

    const result = await dynamoDb.scan(params);

    // Return the matching list of items in response body
    return result.Items;

});

/*
aws dynamodb scan \
    --table-name user \
    --projection-expression "highscore" \
    --page-size 100  \


*/