/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Retrieves the list of all Azure Cosmos DB Mongo Role Definitions.
 *
 * @summary Retrieves the list of all Azure Cosmos DB Mongo Role Definitions.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/preview/2023-03-15-preview/examples/CosmosDBMongoDBRoleDefinitionList.json
 */
async function cosmosDbMongoDbroleDefinitionList() {
  const subscriptionId =
    process.env["COSMOSDB_SUBSCRIPTION_ID"] || "mySubscriptionId";
  const resourceGroupName =
    process.env["COSMOSDB_RESOURCE_GROUP"] || "myResourceGroupName";
  const accountName = "myAccountName";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.mongoDBResources.listMongoRoleDefinitions(
    resourceGroupName,
    accountName
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  cosmosDbMongoDbroleDefinitionList();
}

main().catch(console.error);
