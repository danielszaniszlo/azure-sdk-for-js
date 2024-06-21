/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { FirewallPolicyDrafts } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { NetworkManagementClient } from "../networkManagementClient";
import {
  FirewallPolicyDraft,
  FirewallPolicyDraftsCreateOrUpdateOptionalParams,
  FirewallPolicyDraftsCreateOrUpdateResponse,
  FirewallPolicyDraftsDeleteOptionalParams,
  FirewallPolicyDraftsGetOptionalParams,
  FirewallPolicyDraftsGetResponse,
} from "../models";

/** Class containing FirewallPolicyDrafts operations. */
export class FirewallPolicyDraftsImpl implements FirewallPolicyDrafts {
  private readonly client: NetworkManagementClient;

  /**
   * Initialize a new instance of the class FirewallPolicyDrafts class.
   * @param client Reference to the service client
   */
  constructor(client: NetworkManagementClient) {
    this.client = client;
  }

  /**
   * Create or update a draft Firewall Policy.
   * @param resourceGroupName The name of the resource group.
   * @param firewallPolicyName The name of the Firewall Policy.
   * @param parameters Parameters supplied to the create or update Firewall Policy Draft operation.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    firewallPolicyName: string,
    parameters: FirewallPolicyDraft,
    options?: FirewallPolicyDraftsCreateOrUpdateOptionalParams,
  ): Promise<FirewallPolicyDraftsCreateOrUpdateResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, firewallPolicyName, parameters, options },
      createOrUpdateOperationSpec,
    );
  }

  /**
   * Delete a draft policy.
   * @param resourceGroupName The name of the resource group.
   * @param firewallPolicyName The name of the Firewall Policy.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    firewallPolicyName: string,
    options?: FirewallPolicyDraftsDeleteOptionalParams,
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { resourceGroupName, firewallPolicyName, options },
      deleteOperationSpec,
    );
  }

  /**
   * Get a draft Firewall Policy.
   * @param resourceGroupName The name of the resource group.
   * @param firewallPolicyName The name of the Firewall Policy.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    firewallPolicyName: string,
    options?: FirewallPolicyDraftsGetOptionalParams,
  ): Promise<FirewallPolicyDraftsGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, firewallPolicyName, options },
      getOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/firewallPolicies/{firewallPolicyName}/firewallPolicyDrafts/default",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.FirewallPolicyDraft,
    },
    201: {
      bodyMapper: Mappers.FirewallPolicyDraft,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  requestBody: Parameters.parameters24,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.firewallPolicyName1,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/firewallPolicies/{firewallPolicyName}/firewallPolicyDrafts/default",
  httpMethod: "DELETE",
  responses: {
    200: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.firewallPolicyName1,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/firewallPolicies/{firewallPolicyName}/firewallPolicyDrafts/default",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.FirewallPolicyDraft,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.firewallPolicyName1,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
