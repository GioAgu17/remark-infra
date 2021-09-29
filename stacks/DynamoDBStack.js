import { CfnOutput } from "@aws-cdk/core";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as sst from "@serverless-stack/resources";

export default class DynamoDBStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const app = this.node.root;

    const newCollaborationTable = new dynamodb.Table(this, "NewCollaborationTable", {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST, // Use on-demand billing mode
      sortKey: { name: "offerId", type: dynamodb.AttributeType.STRING },
      partitionKey: { name: "influencerId", type: dynamodb.AttributeType.STRING },
    });

    newCollaborationTable.addGlobalSecondaryIndex({
      indexName: "business-index",
      partitionKey: {name: "businessId", type: dynamodb.AttributeType.STRING},
      sortKey: { name: "offerId", type: dynamodb.AttributeType.STRING }
    });

    newCollaborationTable.addGlobalSecondaryIndex({
      indexName: "explore-index",
      partitionKey: {name: "yearMonth", type: dynamodb.AttributeType.NUMBER},
      sortKey: {name: "status", type: dynamodb.AttributeType.STRING},
    });

    newCollaborationTable.addLocalSecondaryIndex({
      indexName: "collaborationscount-index",
      sortKey: { name: "yearMonth", type: dynamodb.AttributeType.NUMBER },
      partitionKey: { name: "influencerId", type: dynamodb.AttributeType.STRING },
    });

    // Output values
    new CfnOutput(this, "NewCollaborationTableName", {
      value: newCollaborationTable.tableName,
      exportName: app.logicalPrefixedName("ExtNewCollaborationTableName"),
    });

    new CfnOutput(this, "NewCollaborationTableArn", {
      value: newCollaborationTable.tableArn,
      exportName: app.logicalPrefixedName("ExtNewCollaborationTableArn"),
    });

    new CfnOutput(this, "NewCollaborationTableArnIndex",{
      value: newCollaborationTable.tableArn.concat("/index/*"),
      exportName: app.logicalPrefixedName("ExtNewCollaborationTableArnIndex"),
    });


    const userTable = new dynamodb.Table(this, "UserTable", {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST, // Use on-demand billing mode
      partitionKey: { name: "userId", type: dynamodb.AttributeType.STRING },
    });

    userTable.addGlobalSecondaryIndex({
      indexName: "usertype-index",
      partitionKey: {name: "userType", type: dynamodb.AttributeType.STRING}
    });

   new CfnOutput(this, "UserTableName", {
      value: userTable.tableName,
      exportName: app.logicalPrefixedName("ExtUserTableName"),
    });
    new CfnOutput(this, "UserTableArn", {
      value: userTable.tableArn,
      exportName: app.logicalPrefixedName("ExtUserTableArn"),
    });
    new CfnOutput(this, "UserTableArnIndex",{
      value: userTable.tableArn.concat("/index/*"),
      exportName: app.logicalPrefixedName("ExtUserTableArnIndex"),
    });

    const faqTable = new dynamodb.Table(this, "FaqsTable", {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST, // Use on-demand billing mode
      partitionKey: { name: "category", type: dynamodb.AttributeType.STRING },
      sortKey : {name: "faqId", type: dynamodb.AttributeType.STRING }
    });

    new CfnOutput(this, "FaqsTableName", {
      value: faqTable.tableName,
      exportName: app.logicalPrefixedName("ExtFaqsTableName"),
    });
    new CfnOutput(this, "FaqsTableArn", {
      value: faqTable.tableArn,
      exportName: app.logicalPrefixedName("ExtFaqsTableArn"),
    });

    const expiredOffersTable = new dynamodb.Table(this, "ExpiredOffersTable", {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST, // Use on-demand billing mode
      partitionKey: { name: "businessId", type: dynamodb.AttributeType.STRING },
      sortKey : {name: "offerId", type: dynamodb.AttributeType.STRING }
    });

    new CfnOutput(this, "ExpiredOffersTableName", {
      value: expiredOffersTable.tableName,
      exportName: app.logicalPrefixedName("ExtExpiredOffersTableName"),
    });
    new CfnOutput(this, "ExpiredOffersTableArn", {
      value: expiredOffersTable.tableArn,
      exportName: app.logicalPrefixedName("ExtExpiredOffersTableArn"),
    });

    const offersTableNew = new dynamodb.Table(this, "NewOffersTable", {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST, // Use on-demand billing mode
      partitionKey: { name: "hashKey", type: dynamodb.AttributeType.STRING },
      sortKey : {name: "rangeKey", type: dynamodb.AttributeType.STRING }
    });

    new CfnOutput(this, "NewOffersTableName", {
      value: offersTableNew.tableName,
      exportName: app.logicalPrefixedName("ExtNewOffersTableName"),
    });
    new CfnOutput(this, "NewOffersTableArn", {
      value: offersTableNew.tableArn,
      exportName: app.logicalPrefixedName("ExtNewOffersTableArn"),
    });

    offersTableNew.addGlobalSecondaryIndex({
      indexName: "offertable-index",
      partitionKey: { name: "businessId", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "offerId", type: dynamodb.AttributeType.STRING },
    });

    offersTableNew.addLocalSecondaryIndex({
      indexName: "geohash-index",
      sortKey: { name: "geohash", type: dynamodb.AttributeType.STRING },
      partitionKey: { name: "hashKey", type: dynamodb.AttributeType.STRING },
    });

    new CfnOutput(this, "NewOffersTableArnIndex",{
      value: offersTableNew.tableArn.concat("/index/*"),
      exportName: app.logicalPrefixedName("ExtNewOffersTableArnIndex"),
    });

    const connectionChatTable = new dynamodb.Table(this, "ConnectionChatTable", {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST, // Use on-demand billing mode
      partitionKey: { name: "userId", type: dynamodb.AttributeType.STRING },
    });

    connectionChatTable.addGlobalSecondaryIndex({
      indexName: "connectionIdIndex",
      partitionKey: {name: "connectionId", type: dynamodb.AttributeType.STRING},
    });

    new CfnOutput(this, "ConnectionChatTableArnIndex",{
      value: connectionChatTable.tableArn.concat("/index/*"),
      exportName: app.logicalPrefixedName("ExtConnectionChatTableArnIndex"),
    });

    new CfnOutput(this, "ConnectionChatTableName", {
      value: connectionChatTable.tableName,
      exportName: app.logicalPrefixedName("ExtConnectionChatTableName"),
    });
    new CfnOutput(this, "ConnectionChatTableArn", {
      value: connectionChatTable.tableArn,
      exportName: app.logicalPrefixedName("ExtConnectionChatTableArn"),
    });

    const conversationChatTable = new dynamodb.Table(this, "ConversationChatTable", {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST, // Use on-demand billing mode
      partitionKey: { name: "chatId", type: dynamodb.AttributeType.STRING },
    });

    new CfnOutput(this, "ConversationChatTableName", {
      value: conversationChatTable.tableName,
      exportName: app.logicalPrefixedName("ExtConversationChatTableName"),
    });
    new CfnOutput(this, "ConversationChatTableArn", {
      value: conversationChatTable.tableArn,
      exportName: app.logicalPrefixedName("ExtConversationChatTableArn"),
    });
  }
}
