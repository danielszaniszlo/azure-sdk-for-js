/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper";
import { Evidence } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { AppComplianceAutomationToolForMicrosoft365 } from "../appComplianceAutomationToolForMicrosoft365";
import {
  EvidenceResource,
  EvidenceListByReportNextOptionalParams,
  EvidenceListByReportOptionalParams,
  EvidenceListByReportResponse,
  EvidenceGetOptionalParams,
  EvidenceGetResponse,
  EvidenceCreateOrUpdateOptionalParams,
  EvidenceCreateOrUpdateResponse,
  EvidenceDeleteOptionalParams,
  EvidenceFileDownloadRequest,
  EvidenceDownloadOptionalParams,
  EvidenceDownloadResponse,
  EvidenceListByReportNextResponse,
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing Evidence operations. */
export class EvidenceImpl implements Evidence {
  private readonly client: AppComplianceAutomationToolForMicrosoft365;

  /**
   * Initialize a new instance of the class Evidence class.
   * @param client Reference to the service client
   */
  constructor(client: AppComplianceAutomationToolForMicrosoft365) {
    this.client = client;
  }

  /**
   * Returns a paginated list of evidences for a specified report.
   * @param reportName Report Name.
   * @param options The options parameters.
   */
  public listByReport(
    reportName: string,
    options?: EvidenceListByReportOptionalParams,
  ): PagedAsyncIterableIterator<EvidenceResource> {
    const iter = this.listByReportPagingAll(reportName, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        if (settings?.maxPageSize) {
          throw new Error("maxPageSize is not supported by this operation.");
        }
        return this.listByReportPagingPage(reportName, options, settings);
      },
    };
  }

  private async *listByReportPagingPage(
    reportName: string,
    options?: EvidenceListByReportOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<EvidenceResource[]> {
    let result: EvidenceListByReportResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listByReport(reportName, options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listByReportNext(
        reportName,
        continuationToken,
        options,
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByReportPagingAll(
    reportName: string,
    options?: EvidenceListByReportOptionalParams,
  ): AsyncIterableIterator<EvidenceResource> {
    for await (const page of this.listByReportPagingPage(reportName, options)) {
      yield* page;
    }
  }

  /**
   * Returns a paginated list of evidences for a specified report.
   * @param reportName Report Name.
   * @param options The options parameters.
   */
  private _listByReport(
    reportName: string,
    options?: EvidenceListByReportOptionalParams,
  ): Promise<EvidenceListByReportResponse> {
    return this.client.sendOperationRequest(
      { reportName, options },
      listByReportOperationSpec,
    );
  }

  /**
   * Get the evidence metadata
   * @param reportName Report Name.
   * @param evidenceName The evidence name.
   * @param options The options parameters.
   */
  get(
    reportName: string,
    evidenceName: string,
    options?: EvidenceGetOptionalParams,
  ): Promise<EvidenceGetResponse> {
    return this.client.sendOperationRequest(
      { reportName, evidenceName, options },
      getOperationSpec,
    );
  }

  /**
   * Create or Update an evidence a specified report
   * @param reportName Report Name.
   * @param evidenceName The evidence name.
   * @param properties Parameters for the create or update operation
   * @param options The options parameters.
   */
  createOrUpdate(
    reportName: string,
    evidenceName: string,
    properties: EvidenceResource,
    options?: EvidenceCreateOrUpdateOptionalParams,
  ): Promise<EvidenceCreateOrUpdateResponse> {
    return this.client.sendOperationRequest(
      { reportName, evidenceName, properties, options },
      createOrUpdateOperationSpec,
    );
  }

  /**
   * Delete an existent evidence from a specified report
   * @param reportName Report Name.
   * @param evidenceName The evidence name.
   * @param options The options parameters.
   */
  delete(
    reportName: string,
    evidenceName: string,
    options?: EvidenceDeleteOptionalParams,
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { reportName, evidenceName, options },
      deleteOperationSpec,
    );
  }

  /**
   * Download evidence file.
   * @param reportName Report Name.
   * @param evidenceName The evidence name.
   * @param body Parameters for the query operation
   * @param options The options parameters.
   */
  download(
    reportName: string,
    evidenceName: string,
    body: EvidenceFileDownloadRequest,
    options?: EvidenceDownloadOptionalParams,
  ): Promise<EvidenceDownloadResponse> {
    return this.client.sendOperationRequest(
      { reportName, evidenceName, body, options },
      downloadOperationSpec,
    );
  }

  /**
   * ListByReportNext
   * @param reportName Report Name.
   * @param nextLink The nextLink from the previous successful call to the ListByReport method.
   * @param options The options parameters.
   */
  private _listByReportNext(
    reportName: string,
    nextLink: string,
    options?: EvidenceListByReportNextOptionalParams,
  ): Promise<EvidenceListByReportNextResponse> {
    return this.client.sendOperationRequest(
      { reportName, nextLink, options },
      listByReportNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listByReportOperationSpec: coreClient.OperationSpec = {
  path: "/providers/Microsoft.AppComplianceAutomation/reports/{reportName}/evidences",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.EvidenceResourceListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.skipToken,
    Parameters.top,
    Parameters.select,
    Parameters.filter,
    Parameters.orderby,
    Parameters.offerGuid,
    Parameters.reportCreatorTenantId,
  ],
  urlParameters: [Parameters.$host, Parameters.reportName],
  headerParameters: [Parameters.accept],
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/providers/Microsoft.AppComplianceAutomation/reports/{reportName}/evidences/{evidenceName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.EvidenceResource,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.reportName,
    Parameters.evidenceName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path: "/providers/Microsoft.AppComplianceAutomation/reports/{reportName}/evidences/{evidenceName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.EvidenceResource,
    },
    201: {
      bodyMapper: Mappers.EvidenceResource,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.properties2,
  queryParameters: [
    Parameters.apiVersion,
    Parameters.offerGuid,
    Parameters.reportCreatorTenantId,
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.reportName,
    Parameters.evidenceName,
  ],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/providers/Microsoft.AppComplianceAutomation/reports/{reportName}/evidences/{evidenceName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.reportName,
    Parameters.evidenceName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const downloadOperationSpec: coreClient.OperationSpec = {
  path: "/providers/Microsoft.AppComplianceAutomation/reports/{reportName}/evidences/{evidenceName}/download",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.EvidenceFileDownloadResponse,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.body7,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.reportName,
    Parameters.evidenceName,
  ],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer,
};
const listByReportNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.EvidenceResourceListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  urlParameters: [Parameters.$host, Parameters.nextLink, Parameters.reportName],
  headerParameters: [Parameters.accept],
  serializer,
};
