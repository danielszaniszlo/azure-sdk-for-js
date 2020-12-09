// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { CanonicalCode } from "@opentelemetry/api";
import { createSpan } from "../tracing";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ArtifactsClient } from "../artifactsClient";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  TriggerResource,
  TriggerGetTriggersByWorkspaceResponse,
  TriggerCreateOrUpdateTriggerOptionalParams,
  TriggerCreateOrUpdateTriggerResponse,
  TriggerGetTriggerOptionalParams,
  TriggerGetTriggerResponse,
  TriggerSubscribeTriggerToEventsResponse,
  TriggerGetEventSubscriptionStatusResponse,
  TriggerUnsubscribeTriggerFromEventsResponse,
  TriggerGetTriggersByWorkspaceNextResponse
} from "../models";

/**
 * Class representing a Trigger.
 */
export class Trigger {
  private readonly client: ArtifactsClient;

  /**
   * Initialize a new instance of the class Trigger class.
   * @param client Reference to the service client
   */
  constructor(client: ArtifactsClient) {
    this.client = client;
  }

  /**
   * Lists triggers.
   * @param options The options parameters.
   */
  public listTriggersByWorkspace(
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<TriggerResource> {
    const iter = this.getTriggersByWorkspacePagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.getTriggersByWorkspacePagingPage(options);
      }
    };
  }

  private async *getTriggersByWorkspacePagingPage(
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<TriggerResource[]> {
    let result = await this._getTriggersByWorkspace(options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._getTriggersByWorkspaceNext(continuationToken, options);
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *getTriggersByWorkspacePagingAll(
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<TriggerResource> {
    for await (const page of this.getTriggersByWorkspacePagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Lists triggers.
   * @param options The options parameters.
   */
  private async _getTriggersByWorkspace(
    options?: coreHttp.OperationOptions
  ): Promise<TriggerGetTriggersByWorkspaceResponse> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-_getTriggersByWorkspace",
      coreHttp.operationOptionsToRequestOptionsBase(options || {})
    );
    const operationArguments: coreHttp.OperationArguments = {
      options: updatedOptions
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        getTriggersByWorkspaceOperationSpec
      );
      return result as TriggerGetTriggersByWorkspaceResponse;
    } catch (error) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Creates or updates a trigger.
   * @param triggerName The trigger name.
   * @param trigger Trigger resource definition.
   * @param options The options parameters.
   */
  async createOrUpdateTrigger(
    triggerName: string,
    trigger: TriggerResource,
    options?: TriggerCreateOrUpdateTriggerOptionalParams
  ): Promise<LROPoller<TriggerCreateOrUpdateTriggerResponse>> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-createOrUpdateTrigger",
      this.getOperationOptions(options, "undefined")
    );
    const operationArguments: coreHttp.OperationArguments = {
      triggerName,
      trigger,
      options: updatedOptions
    };
    const sendOperation = async (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      try {
        const result = await this.client.sendOperationRequest(args, spec);
        return result as TriggerCreateOrUpdateTriggerResponse;
      } catch (error) {
        span.setStatus({
          code: CanonicalCode.UNKNOWN,
          message: error.message
        });
        throw error;
      } finally {
        span.end();
      }
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      createOrUpdateTriggerOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: createOrUpdateTriggerOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Gets a trigger.
   * @param triggerName The trigger name.
   * @param options The options parameters.
   */
  async getTrigger(
    triggerName: string,
    options?: TriggerGetTriggerOptionalParams
  ): Promise<TriggerGetTriggerResponse> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-getTrigger",
      coreHttp.operationOptionsToRequestOptionsBase(options || {})
    );
    const operationArguments: coreHttp.OperationArguments = {
      triggerName,
      options: updatedOptions
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        getTriggerOperationSpec
      );
      return result as TriggerGetTriggerResponse;
    } catch (error) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Deletes a trigger.
   * @param triggerName The trigger name.
   * @param options The options parameters.
   */
  async deleteTrigger(
    triggerName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-deleteTrigger",
      this.getOperationOptions(options, "undefined")
    );
    const operationArguments: coreHttp.OperationArguments = {
      triggerName,
      options: updatedOptions
    };
    const sendOperation = async (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      try {
        const result = await this.client.sendOperationRequest(args, spec);
        return result as coreHttp.RestResponse;
      } catch (error) {
        span.setStatus({
          code: CanonicalCode.UNKNOWN,
          message: error.message
        });
        throw error;
      } finally {
        span.end();
      }
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      deleteTriggerOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: deleteTriggerOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Subscribe event trigger to events.
   * @param triggerName The trigger name.
   * @param options The options parameters.
   */
  async subscribeTriggerToEvents(
    triggerName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<TriggerSubscribeTriggerToEventsResponse>> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-subscribeTriggerToEvents",
      this.getOperationOptions(options, "undefined")
    );
    const operationArguments: coreHttp.OperationArguments = {
      triggerName,
      options: updatedOptions
    };
    const sendOperation = async (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      try {
        const result = await this.client.sendOperationRequest(args, spec);
        return result as TriggerSubscribeTriggerToEventsResponse;
      } catch (error) {
        span.setStatus({
          code: CanonicalCode.UNKNOWN,
          message: error.message
        });
        throw error;
      } finally {
        span.end();
      }
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      subscribeTriggerToEventsOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: subscribeTriggerToEventsOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Get a trigger's event subscription status.
   * @param triggerName The trigger name.
   * @param options The options parameters.
   */
  async getEventSubscriptionStatus(
    triggerName: string,
    options?: coreHttp.OperationOptions
  ): Promise<TriggerGetEventSubscriptionStatusResponse> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-getEventSubscriptionStatus",
      coreHttp.operationOptionsToRequestOptionsBase(options || {})
    );
    const operationArguments: coreHttp.OperationArguments = {
      triggerName,
      options: updatedOptions
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        getEventSubscriptionStatusOperationSpec
      );
      return result as TriggerGetEventSubscriptionStatusResponse;
    } catch (error) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Unsubscribe event trigger from events.
   * @param triggerName The trigger name.
   * @param options The options parameters.
   */
  async unsubscribeTriggerFromEvents(
    triggerName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<TriggerUnsubscribeTriggerFromEventsResponse>> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-unsubscribeTriggerFromEvents",
      this.getOperationOptions(options, "undefined")
    );
    const operationArguments: coreHttp.OperationArguments = {
      triggerName,
      options: updatedOptions
    };
    const sendOperation = async (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      try {
        const result = await this.client.sendOperationRequest(args, spec);
        return result as TriggerUnsubscribeTriggerFromEventsResponse;
      } catch (error) {
        span.setStatus({
          code: CanonicalCode.UNKNOWN,
          message: error.message
        });
        throw error;
      } finally {
        span.end();
      }
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      unsubscribeTriggerFromEventsOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: unsubscribeTriggerFromEventsOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Starts a trigger.
   * @param triggerName The trigger name.
   * @param options The options parameters.
   */
  async startTrigger(
    triggerName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-startTrigger",
      this.getOperationOptions(options, "undefined")
    );
    const operationArguments: coreHttp.OperationArguments = {
      triggerName,
      options: updatedOptions
    };
    const sendOperation = async (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      try {
        const result = await this.client.sendOperationRequest(args, spec);
        return result as coreHttp.RestResponse;
      } catch (error) {
        span.setStatus({
          code: CanonicalCode.UNKNOWN,
          message: error.message
        });
        throw error;
      } finally {
        span.end();
      }
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      startTriggerOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: startTriggerOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Stops a trigger.
   * @param triggerName The trigger name.
   * @param options The options parameters.
   */
  async stopTrigger(
    triggerName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-stopTrigger",
      this.getOperationOptions(options, "undefined")
    );
    const operationArguments: coreHttp.OperationArguments = {
      triggerName,
      options: updatedOptions
    };
    const sendOperation = async (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      try {
        const result = await this.client.sendOperationRequest(args, spec);
        return result as coreHttp.RestResponse;
      } catch (error) {
        span.setStatus({
          code: CanonicalCode.UNKNOWN,
          message: error.message
        });
        throw error;
      } finally {
        span.end();
      }
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      stopTriggerOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: stopTriggerOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * GetTriggersByWorkspaceNext
   * @param nextLink The nextLink from the previous successful call to the GetTriggersByWorkspace method.
   * @param options The options parameters.
   */
  private async _getTriggersByWorkspaceNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<TriggerGetTriggersByWorkspaceNextResponse> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-_getTriggersByWorkspaceNext",
      coreHttp.operationOptionsToRequestOptionsBase(options || {})
    );
    const operationArguments: coreHttp.OperationArguments = {
      nextLink,
      options: updatedOptions
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        getTriggersByWorkspaceNextOperationSpec
      );
      return result as TriggerGetTriggersByWorkspaceNextResponse;
    } catch (error) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  private getOperationOptions<TOptions extends coreHttp.OperationOptions>(
    options: TOptions | undefined,
    finalStateVia?: string
  ): coreHttp.RequestOptionsBase {
    const operationOptions: coreHttp.OperationOptions = options || {};
    operationOptions.requestOptions = {
      ...operationOptions.requestOptions,
      shouldDeserialize: shouldDeserializeLRO(finalStateVia)
    };
    return coreHttp.operationOptionsToRequestOptionsBase(operationOptions);
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getTriggersByWorkspaceOperationSpec: coreHttp.OperationSpec = {
  path: "/triggers",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.TriggerListResponse
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateTriggerOperationSpec: coreHttp.OperationSpec = {
  path: "/triggers/{triggerName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.TriggerResource
    },
    201: {
      bodyMapper: Mappers.TriggerResource
    },
    202: {
      bodyMapper: Mappers.TriggerResource
    },
    204: {
      bodyMapper: Mappers.TriggerResource
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.trigger,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.triggerName],
  headerParameters: [Parameters.accept, Parameters.contentType, Parameters.ifMatch],
  mediaType: "json",
  serializer
};
const getTriggerOperationSpec: coreHttp.OperationSpec = {
  path: "/triggers/{triggerName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.TriggerResource
    },
    304: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.triggerName],
  headerParameters: [Parameters.accept, Parameters.ifNoneMatch],
  serializer
};
const deleteTriggerOperationSpec: coreHttp.OperationSpec = {
  path: "/triggers/{triggerName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.triggerName],
  headerParameters: [Parameters.accept],
  serializer
};
const subscribeTriggerToEventsOperationSpec: coreHttp.OperationSpec = {
  path: "/triggers/{triggerName}/subscribeToEvents",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.TriggerSubscriptionOperationStatus
    },
    201: {
      bodyMapper: Mappers.TriggerSubscriptionOperationStatus
    },
    202: {
      bodyMapper: Mappers.TriggerSubscriptionOperationStatus
    },
    204: {
      bodyMapper: Mappers.TriggerSubscriptionOperationStatus
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.triggerName],
  headerParameters: [Parameters.accept],
  serializer
};
const getEventSubscriptionStatusOperationSpec: coreHttp.OperationSpec = {
  path: "/triggers/{triggerName}/getEventSubscriptionStatus",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.TriggerSubscriptionOperationStatus
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.triggerName],
  headerParameters: [Parameters.accept],
  serializer
};
const unsubscribeTriggerFromEventsOperationSpec: coreHttp.OperationSpec = {
  path: "/triggers/{triggerName}/unsubscribeFromEvents",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.TriggerSubscriptionOperationStatus
    },
    201: {
      bodyMapper: Mappers.TriggerSubscriptionOperationStatus
    },
    202: {
      bodyMapper: Mappers.TriggerSubscriptionOperationStatus
    },
    204: {
      bodyMapper: Mappers.TriggerSubscriptionOperationStatus
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.triggerName],
  headerParameters: [Parameters.accept],
  serializer
};
const startTriggerOperationSpec: coreHttp.OperationSpec = {
  path: "/triggers/{triggerName}/start",
  httpMethod: "POST",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.triggerName],
  headerParameters: [Parameters.accept],
  serializer
};
const stopTriggerOperationSpec: coreHttp.OperationSpec = {
  path: "/triggers/{triggerName}/stop",
  httpMethod: "POST",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.triggerName],
  headerParameters: [Parameters.accept],
  serializer
};
const getTriggersByWorkspaceNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.TriggerListResponse
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.nextLink],
  headerParameters: [Parameters.accept],
  serializer
};
