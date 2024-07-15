/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { AvailabilitySetsDeleteOptionalParams, ScVmm } from "@azure/arm-scvmm";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Deregisters the ScVmm availability set from Azure.
 *
 * @summary Deregisters the ScVmm availability set from Azure.
 * x-ms-original-file: specification/scvmm/resource-manager/Microsoft.ScVmm/stable/2023-10-07/examples/AvailabilitySets_Delete_MaximumSet_Gen.json
 */
async function availabilitySetsDeleteMaximumSet() {
  const subscriptionId =
    process.env["SCVMM_SUBSCRIPTION_ID"] ||
    "79332E5A-630B-480F-A266-A941C015AB19";
  const resourceGroupName = process.env["SCVMM_RESOURCE_GROUP"] || "rgscvmm";
  const force = "true";
  const availabilitySetResourceName = "_";
  const options: AvailabilitySetsDeleteOptionalParams = { force };
  const credential = new DefaultAzureCredential();
  const client = new ScVmm(credential, subscriptionId);
  const result = await client.availabilitySets.beginDeleteAndWait(
    resourceGroupName,
    availabilitySetResourceName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Deregisters the ScVmm availability set from Azure.
 *
 * @summary Deregisters the ScVmm availability set from Azure.
 * x-ms-original-file: specification/scvmm/resource-manager/Microsoft.ScVmm/stable/2023-10-07/examples/AvailabilitySets_Delete_MinimumSet_Gen.json
 */
async function availabilitySetsDeleteMinimumSet() {
  const subscriptionId =
    process.env["SCVMM_SUBSCRIPTION_ID"] ||
    "79332E5A-630B-480F-A266-A941C015AB19";
  const resourceGroupName = process.env["SCVMM_RESOURCE_GROUP"] || "rgscvmm";
  const availabilitySetResourceName = "6";
  const credential = new DefaultAzureCredential();
  const client = new ScVmm(credential, subscriptionId);
  const result = await client.availabilitySets.beginDeleteAndWait(
    resourceGroupName,
    availabilitySetResourceName,
  );
  console.log(result);
}

async function main() {
  availabilitySetsDeleteMaximumSet();
  availabilitySetsDeleteMinimumSet();
}

main().catch(console.error);
