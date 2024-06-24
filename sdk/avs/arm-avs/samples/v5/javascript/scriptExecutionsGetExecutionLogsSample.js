/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Return the logs for a script execution resource
 *
 * @summary Return the logs for a script execution resource
 * x-ms-original-file: specification/vmware/resource-manager/Microsoft.AVS/stable/2023-09-01/examples/ScriptExecutions_GetExecutionLogs.json
 */
async function scriptExecutionsGetExecutionLogs() {
  const subscriptionId =
    process.env["AVS_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["AVS_RESOURCE_GROUP"] || "group1";
  const privateCloudName = "cloud1";
  const scriptExecutionName = "addSsoServer";
  const scriptOutputStreamType = ["Information", "Warnings", "Errors", "Output"];
  const options = {
    scriptOutputStreamType,
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.scriptExecutions.getExecutionLogs(
    resourceGroupName,
    privateCloudName,
    scriptExecutionName,
    options,
  );
  console.log(result);
}

async function main() {
  scriptExecutionsGetExecutionLogs();
}

main().catch(console.error);
