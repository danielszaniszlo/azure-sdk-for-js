/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Project, StorageMoverClient } from "@azure/arm-storagemover";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Creates or updates a Project resource, which is a logical grouping of related jobs.
 *
 * @summary Creates or updates a Project resource, which is a logical grouping of related jobs.
 * x-ms-original-file: specification/storagemover/resource-manager/Microsoft.StorageMover/stable/2024-07-01/examples/Projects_CreateOrUpdate.json
 */
async function projectsCreateOrUpdate() {
  const subscriptionId =
    process.env["STORAGEMOVER_SUBSCRIPTION_ID"] ||
    "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const resourceGroupName =
    process.env["STORAGEMOVER_RESOURCE_GROUP"] || "examples-rg";
  const storageMoverName = "examples-storageMoverName";
  const projectName = "examples-projectName";
  const project: Project = { description: "Example Project Description" };
  const credential = new DefaultAzureCredential();
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.projects.createOrUpdate(
    resourceGroupName,
    storageMoverName,
    projectName,
    project,
  );
  console.log(result);
}

async function main() {
  projectsCreateOrUpdate();
}

main().catch(console.error);
