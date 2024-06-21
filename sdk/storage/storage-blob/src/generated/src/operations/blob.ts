/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { Blob } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { StorageClient } from "../storageClient";
import {
  BlobDownloadOptionalParams,
  BlobDownloadResponse,
  BlobGetPropertiesOptionalParams,
  BlobGetPropertiesResponse,
  BlobDeleteOptionalParams,
  BlobDeleteResponse,
  BlobUndeleteOptionalParams,
  BlobUndeleteResponse,
  BlobExpiryOptions,
  BlobSetExpiryOptionalParams,
  BlobSetExpiryResponse,
  BlobSetHttpHeadersOptionalParams,
  BlobSetHttpHeadersResponse,
  BlobSetImmutabilityPolicyOptionalParams,
  BlobSetImmutabilityPolicyResponse,
  BlobDeleteImmutabilityPolicyOptionalParams,
  BlobDeleteImmutabilityPolicyResponse,
  BlobSetLegalHoldOptionalParams,
  BlobSetLegalHoldResponse,
  BlobSetMetadataOptionalParams,
  BlobSetMetadataResponse,
  BlobAcquireLeaseOptionalParams,
  BlobAcquireLeaseResponse,
  BlobReleaseLeaseOptionalParams,
  BlobReleaseLeaseResponse,
  BlobRenewLeaseOptionalParams,
  BlobRenewLeaseResponse,
  BlobChangeLeaseOptionalParams,
  BlobChangeLeaseResponse,
  BlobBreakLeaseOptionalParams,
  BlobBreakLeaseResponse,
  BlobCreateSnapshotOptionalParams,
  BlobCreateSnapshotResponse,
  BlobStartCopyFromURLOptionalParams,
  BlobStartCopyFromURLResponse,
  BlobCopyFromURLOptionalParams,
  BlobCopyFromURLResponse,
  BlobAbortCopyFromURLOptionalParams,
  BlobAbortCopyFromURLResponse,
  AccessTier,
  BlobSetTierOptionalParams,
  BlobSetTierResponse,
  BlobGetAccountInfoOptionalParams,
  BlobGetAccountInfoResponse,
  BlobQueryOptionalParams,
  BlobQueryResponse,
  BlobGetTagsOptionalParams,
  BlobGetTagsResponse,
  BlobSetTagsOptionalParams,
  BlobSetTagsResponse,
} from "../models";

/** Class containing Blob operations. */
export class BlobImpl implements Blob {
  private readonly client: StorageClient;

  /**
   * Initialize a new instance of the class Blob class.
   * @param client Reference to the service client
   */
  constructor(client: StorageClient) {
    this.client = client;
  }

  /**
   * The Download operation reads or downloads a blob from the system, including its metadata and
   * properties. You can also call Download to read a snapshot.
   * @param options The options parameters.
   */
  download(
    options?: BlobDownloadOptionalParams,
  ): Promise<BlobDownloadResponse> {
    return this.client.sendOperationRequest({ options }, downloadOperationSpec);
  }

  /**
   * The Get Properties operation returns all user-defined metadata, standard HTTP properties, and system
   * properties for the blob. It does not return the content of the blob.
   * @param options The options parameters.
   */
  getProperties(
    options?: BlobGetPropertiesOptionalParams,
  ): Promise<BlobGetPropertiesResponse> {
    return this.client.sendOperationRequest(
      { options },
      getPropertiesOperationSpec,
    );
  }

  /**
   * If the storage account's soft delete feature is disabled then, when a blob is deleted, it is
   * permanently removed from the storage account. If the storage account's soft delete feature is
   * enabled, then, when a blob is deleted, it is marked for deletion and becomes inaccessible
   * immediately. However, the blob service retains the blob or snapshot for the number of days specified
   * by the DeleteRetentionPolicy section of [Storage service properties]
   * (Set-Blob-Service-Properties.md). After the specified number of days has passed, the blob's data is
   * permanently removed from the storage account. Note that you continue to be charged for the
   * soft-deleted blob's storage until it is permanently removed. Use the List Blobs API and specify the
   * "include=deleted" query parameter to discover which blobs and snapshots have been soft deleted. You
   * can then use the Undelete Blob API to restore a soft-deleted blob. All other operations on a
   * soft-deleted blob or snapshot causes the service to return an HTTP status code of 404
   * (ResourceNotFound).
   * @param options The options parameters.
   */
  delete(options?: BlobDeleteOptionalParams): Promise<BlobDeleteResponse> {
    return this.client.sendOperationRequest({ options }, deleteOperationSpec);
  }

  /**
   * Undelete a blob that was previously soft deleted
   * @param options The options parameters.
   */
  undelete(
    options?: BlobUndeleteOptionalParams,
  ): Promise<BlobUndeleteResponse> {
    return this.client.sendOperationRequest({ options }, undeleteOperationSpec);
  }

  /**
   * Sets the time a blob will expire and be deleted.
   * @param expiryOptions Required. Indicates mode of the expiry time
   * @param options The options parameters.
   */
  setExpiry(
    expiryOptions: BlobExpiryOptions,
    options?: BlobSetExpiryOptionalParams,
  ): Promise<BlobSetExpiryResponse> {
    return this.client.sendOperationRequest(
      { expiryOptions, options },
      setExpiryOperationSpec,
    );
  }

  /**
   * The Set HTTP Headers operation sets system properties on the blob
   * @param options The options parameters.
   */
  setHttpHeaders(
    options?: BlobSetHttpHeadersOptionalParams,
  ): Promise<BlobSetHttpHeadersResponse> {
    return this.client.sendOperationRequest(
      { options },
      setHttpHeadersOperationSpec,
    );
  }

  /**
   * The Set Immutability Policy operation sets the immutability policy on the blob
   * @param options The options parameters.
   */
  setImmutabilityPolicy(
    options?: BlobSetImmutabilityPolicyOptionalParams,
  ): Promise<BlobSetImmutabilityPolicyResponse> {
    return this.client.sendOperationRequest(
      { options },
      setImmutabilityPolicyOperationSpec,
    );
  }

  /**
   * The Delete Immutability Policy operation deletes the immutability policy on the blob
   * @param options The options parameters.
   */
  deleteImmutabilityPolicy(
    options?: BlobDeleteImmutabilityPolicyOptionalParams,
  ): Promise<BlobDeleteImmutabilityPolicyResponse> {
    return this.client.sendOperationRequest(
      { options },
      deleteImmutabilityPolicyOperationSpec,
    );
  }

  /**
   * The Set Legal Hold operation sets a legal hold on the blob.
   * @param legalHold Specified if a legal hold should be set on the blob.
   * @param options The options parameters.
   */
  setLegalHold(
    legalHold: boolean,
    options?: BlobSetLegalHoldOptionalParams,
  ): Promise<BlobSetLegalHoldResponse> {
    return this.client.sendOperationRequest(
      { legalHold, options },
      setLegalHoldOperationSpec,
    );
  }

  /**
   * The Set Blob Metadata operation sets user-defined metadata for the specified blob as one or more
   * name-value pairs
   * @param options The options parameters.
   */
  setMetadata(
    options?: BlobSetMetadataOptionalParams,
  ): Promise<BlobSetMetadataResponse> {
    return this.client.sendOperationRequest(
      { options },
      setMetadataOperationSpec,
    );
  }

  /**
   * [Update] The Lease Blob operation establishes and manages a lock on a blob for write and delete
   * operations
   * @param options The options parameters.
   */
  acquireLease(
    options?: BlobAcquireLeaseOptionalParams,
  ): Promise<BlobAcquireLeaseResponse> {
    return this.client.sendOperationRequest(
      { options },
      acquireLeaseOperationSpec,
    );
  }

  /**
   * [Update] The Lease Blob operation establishes and manages a lock on a blob for write and delete
   * operations
   * @param leaseId Specifies the current lease ID on the resource.
   * @param options The options parameters.
   */
  releaseLease(
    leaseId: string,
    options?: BlobReleaseLeaseOptionalParams,
  ): Promise<BlobReleaseLeaseResponse> {
    return this.client.sendOperationRequest(
      { leaseId, options },
      releaseLeaseOperationSpec,
    );
  }

  /**
   * [Update] The Lease Blob operation establishes and manages a lock on a blob for write and delete
   * operations
   * @param leaseId Specifies the current lease ID on the resource.
   * @param options The options parameters.
   */
  renewLease(
    leaseId: string,
    options?: BlobRenewLeaseOptionalParams,
  ): Promise<BlobRenewLeaseResponse> {
    return this.client.sendOperationRequest(
      { leaseId, options },
      renewLeaseOperationSpec,
    );
  }

  /**
   * [Update] The Lease Blob operation establishes and manages a lock on a blob for write and delete
   * operations
   * @param leaseId Specifies the current lease ID on the resource.
   * @param proposedLeaseId Proposed lease ID, in a GUID string format. The Blob service returns 400
   *                        (Invalid request) if the proposed lease ID is not in the correct format. See Guid Constructor
   *                        (String) for a list of valid GUID string formats.
   * @param options The options parameters.
   */
  changeLease(
    leaseId: string,
    proposedLeaseId: string,
    options?: BlobChangeLeaseOptionalParams,
  ): Promise<BlobChangeLeaseResponse> {
    return this.client.sendOperationRequest(
      { leaseId, proposedLeaseId, options },
      changeLeaseOperationSpec,
    );
  }

  /**
   * [Update] The Lease Blob operation establishes and manages a lock on a blob for write and delete
   * operations
   * @param options The options parameters.
   */
  breakLease(
    options?: BlobBreakLeaseOptionalParams,
  ): Promise<BlobBreakLeaseResponse> {
    return this.client.sendOperationRequest(
      { options },
      breakLeaseOperationSpec,
    );
  }

  /**
   * The Create Snapshot operation creates a read-only snapshot of a blob
   * @param options The options parameters.
   */
  createSnapshot(
    options?: BlobCreateSnapshotOptionalParams,
  ): Promise<BlobCreateSnapshotResponse> {
    return this.client.sendOperationRequest(
      { options },
      createSnapshotOperationSpec,
    );
  }

  /**
   * The Start Copy From URL operation copies a blob or an internet resource to a new blob.
   * @param copySource Specifies the name of the source page blob snapshot. This value is a URL of up to
   *                   2 KB in length that specifies a page blob snapshot. The value should be URL-encoded as it would
   *                   appear in a request URI. The source blob must either be public or must be authenticated via a shared
   *                   access signature.
   * @param options The options parameters.
   */
  startCopyFromURL(
    copySource: string,
    options?: BlobStartCopyFromURLOptionalParams,
  ): Promise<BlobStartCopyFromURLResponse> {
    return this.client.sendOperationRequest(
      { copySource, options },
      startCopyFromURLOperationSpec,
    );
  }

  /**
   * The Copy From URL operation copies a blob or an internet resource to a new blob. It will not return
   * a response until the copy is complete.
   * @param copySource Specifies the name of the source page blob snapshot. This value is a URL of up to
   *                   2 KB in length that specifies a page blob snapshot. The value should be URL-encoded as it would
   *                   appear in a request URI. The source blob must either be public or must be authenticated via a shared
   *                   access signature.
   * @param options The options parameters.
   */
  copyFromURL(
    copySource: string,
    options?: BlobCopyFromURLOptionalParams,
  ): Promise<BlobCopyFromURLResponse> {
    return this.client.sendOperationRequest(
      { copySource, options },
      copyFromURLOperationSpec,
    );
  }

  /**
   * The Abort Copy From URL operation aborts a pending Copy From URL operation, and leaves a destination
   * blob with zero length and full metadata.
   * @param copyId The copy identifier provided in the x-ms-copy-id header of the original Copy Blob
   *               operation.
   * @param options The options parameters.
   */
  abortCopyFromURL(
    copyId: string,
    options?: BlobAbortCopyFromURLOptionalParams,
  ): Promise<BlobAbortCopyFromURLResponse> {
    return this.client.sendOperationRequest(
      { copyId, options },
      abortCopyFromURLOperationSpec,
    );
  }

  /**
   * The Set Tier operation sets the tier on a blob. The operation is allowed on a page blob in a premium
   * storage account and on a block blob in a blob storage account (locally redundant storage only). A
   * premium page blob's tier determines the allowed size, IOPS, and bandwidth of the blob. A block
   * blob's tier determines Hot/Cool/Archive storage type. This operation does not update the blob's
   * ETag.
   * @param tier Indicates the tier to be set on the blob.
   * @param options The options parameters.
   */
  setTier(
    tier: AccessTier,
    options?: BlobSetTierOptionalParams,
  ): Promise<BlobSetTierResponse> {
    return this.client.sendOperationRequest(
      { tier, options },
      setTierOperationSpec,
    );
  }

  /**
   * Returns the sku name and account kind
   * @param options The options parameters.
   */
  getAccountInfo(
    options?: BlobGetAccountInfoOptionalParams,
  ): Promise<BlobGetAccountInfoResponse> {
    return this.client.sendOperationRequest(
      { options },
      getAccountInfoOperationSpec,
    );
  }

  /**
   * The Query operation enables users to select/project on blob data by providing simple query
   * expressions.
   * @param options The options parameters.
   */
  query(options?: BlobQueryOptionalParams): Promise<BlobQueryResponse> {
    return this.client.sendOperationRequest({ options }, queryOperationSpec);
  }

  /**
   * The Get Tags operation enables users to get the tags associated with a blob.
   * @param options The options parameters.
   */
  getTags(options?: BlobGetTagsOptionalParams): Promise<BlobGetTagsResponse> {
    return this.client.sendOperationRequest({ options }, getTagsOperationSpec);
  }

  /**
   * The Set Tags operation enables users to set tags on a blob.
   * @param options The options parameters.
   */
  setTags(options?: BlobSetTagsOptionalParams): Promise<BlobSetTagsResponse> {
    return this.client.sendOperationRequest({ options }, setTagsOperationSpec);
  }
}
// Operation Specifications
const xmlSerializer = coreClient.createSerializer(Mappers, /* isXml */ true);

const downloadOperationSpec: coreClient.OperationSpec = {
  path: "/{containerName}/{blob}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: {
        type: { name: "Stream" },
        serializedName: "parsedResponse",
      },
      headersMapper: Mappers.BlobDownloadHeaders,
    },
    206: {
      bodyMapper: {
        type: { name: "Stream" },
        serializedName: "parsedResponse",
      },
      headersMapper: Mappers.BlobDownloadHeaders,
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.BlobDownloadExceptionHeaders,
    },
  },
  queryParameters: [
    Parameters.timeoutInSeconds,
    Parameters.snapshot,
    Parameters.versionId,
  ],
  urlParameters: [Parameters.url],
  headerParameters: [
    Parameters.version,
    Parameters.requestId,
    Parameters.accept1,
    Parameters.leaseId,
    Parameters.ifModifiedSince,
    Parameters.ifUnmodifiedSince,
    Parameters.range,
    Parameters.rangeGetContentMD5,
    Parameters.rangeGetContentCRC64,
    Parameters.encryptionKey,
    Parameters.encryptionKeySha256,
    Parameters.encryptionAlgorithm,
    Parameters.ifMatch,
    Parameters.ifNoneMatch,
    Parameters.ifTags,
  ],
  isXML: true,
  serializer: xmlSerializer,
};
const getPropertiesOperationSpec: coreClient.OperationSpec = {
  path: "/{containerName}/{blob}",
  httpMethod: "HEAD",
  responses: {
    200: {
      headersMapper: Mappers.BlobGetPropertiesHeaders,
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.BlobGetPropertiesExceptionHeaders,
    },
  },
  queryParameters: [
    Parameters.timeoutInSeconds,
    Parameters.snapshot,
    Parameters.versionId,
  ],
  urlParameters: [Parameters.url],
  headerParameters: [
    Parameters.version,
    Parameters.requestId,
    Parameters.accept1,
    Parameters.leaseId,
    Parameters.ifModifiedSince,
    Parameters.ifUnmodifiedSince,
    Parameters.encryptionKey,
    Parameters.encryptionKeySha256,
    Parameters.encryptionAlgorithm,
    Parameters.ifMatch,
    Parameters.ifNoneMatch,
    Parameters.ifTags,
  ],
  isXML: true,
  serializer: xmlSerializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/{containerName}/{blob}",
  httpMethod: "DELETE",
  responses: {
    202: {
      headersMapper: Mappers.BlobDeleteHeaders,
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.BlobDeleteExceptionHeaders,
    },
  },
  queryParameters: [
    Parameters.timeoutInSeconds,
    Parameters.snapshot,
    Parameters.versionId,
    Parameters.blobDeleteType,
  ],
  urlParameters: [Parameters.url],
  headerParameters: [
    Parameters.version,
    Parameters.requestId,
    Parameters.accept1,
    Parameters.leaseId,
    Parameters.ifModifiedSince,
    Parameters.ifUnmodifiedSince,
    Parameters.ifMatch,
    Parameters.ifNoneMatch,
    Parameters.ifTags,
    Parameters.deleteSnapshots,
  ],
  isXML: true,
  serializer: xmlSerializer,
};
const undeleteOperationSpec: coreClient.OperationSpec = {
  path: "/{containerName}/{blob}",
  httpMethod: "PUT",
  responses: {
    200: {
      headersMapper: Mappers.BlobUndeleteHeaders,
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.BlobUndeleteExceptionHeaders,
    },
  },
  queryParameters: [Parameters.timeoutInSeconds, Parameters.comp8],
  urlParameters: [Parameters.url],
  headerParameters: [
    Parameters.version,
    Parameters.requestId,
    Parameters.accept1,
  ],
  isXML: true,
  serializer: xmlSerializer,
};
const setExpiryOperationSpec: coreClient.OperationSpec = {
  path: "/{containerName}/{blob}",
  httpMethod: "PUT",
  responses: {
    200: {
      headersMapper: Mappers.BlobSetExpiryHeaders,
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.BlobSetExpiryExceptionHeaders,
    },
  },
  queryParameters: [Parameters.timeoutInSeconds, Parameters.comp11],
  urlParameters: [Parameters.url],
  headerParameters: [
    Parameters.version,
    Parameters.requestId,
    Parameters.accept1,
    Parameters.expiryOptions,
    Parameters.expiresOn,
  ],
  isXML: true,
  serializer: xmlSerializer,
};
const setHttpHeadersOperationSpec: coreClient.OperationSpec = {
  path: "/{containerName}/{blob}",
  httpMethod: "PUT",
  responses: {
    200: {
      headersMapper: Mappers.BlobSetHttpHeadersHeaders,
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.BlobSetHttpHeadersExceptionHeaders,
    },
  },
  queryParameters: [Parameters.comp, Parameters.timeoutInSeconds],
  urlParameters: [Parameters.url],
  headerParameters: [
    Parameters.version,
    Parameters.requestId,
    Parameters.accept1,
    Parameters.leaseId,
    Parameters.ifModifiedSince,
    Parameters.ifUnmodifiedSince,
    Parameters.ifMatch,
    Parameters.ifNoneMatch,
    Parameters.ifTags,
    Parameters.blobCacheControl,
    Parameters.blobContentType,
    Parameters.blobContentMD5,
    Parameters.blobContentEncoding,
    Parameters.blobContentLanguage,
    Parameters.blobContentDisposition,
  ],
  isXML: true,
  serializer: xmlSerializer,
};
const setImmutabilityPolicyOperationSpec: coreClient.OperationSpec = {
  path: "/{containerName}/{blob}",
  httpMethod: "PUT",
  responses: {
    200: {
      headersMapper: Mappers.BlobSetImmutabilityPolicyHeaders,
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.BlobSetImmutabilityPolicyExceptionHeaders,
    },
  },
  queryParameters: [Parameters.timeoutInSeconds, Parameters.comp12],
  urlParameters: [Parameters.url],
  headerParameters: [
    Parameters.version,
    Parameters.requestId,
    Parameters.accept1,
    Parameters.ifUnmodifiedSince,
    Parameters.immutabilityPolicyExpiry,
    Parameters.immutabilityPolicyMode,
  ],
  isXML: true,
  serializer: xmlSerializer,
};
const deleteImmutabilityPolicyOperationSpec: coreClient.OperationSpec = {
  path: "/{containerName}/{blob}",
  httpMethod: "DELETE",
  responses: {
    200: {
      headersMapper: Mappers.BlobDeleteImmutabilityPolicyHeaders,
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.BlobDeleteImmutabilityPolicyExceptionHeaders,
    },
  },
  queryParameters: [Parameters.timeoutInSeconds, Parameters.comp12],
  urlParameters: [Parameters.url],
  headerParameters: [
    Parameters.version,
    Parameters.requestId,
    Parameters.accept1,
  ],
  isXML: true,
  serializer: xmlSerializer,
};
const setLegalHoldOperationSpec: coreClient.OperationSpec = {
  path: "/{containerName}/{blob}",
  httpMethod: "PUT",
  responses: {
    200: {
      headersMapper: Mappers.BlobSetLegalHoldHeaders,
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.BlobSetLegalHoldExceptionHeaders,
    },
  },
  queryParameters: [Parameters.timeoutInSeconds, Parameters.comp13],
  urlParameters: [Parameters.url],
  headerParameters: [
    Parameters.version,
    Parameters.requestId,
    Parameters.accept1,
    Parameters.legalHold,
  ],
  isXML: true,
  serializer: xmlSerializer,
};
const setMetadataOperationSpec: coreClient.OperationSpec = {
  path: "/{containerName}/{blob}",
  httpMethod: "PUT",
  responses: {
    200: {
      headersMapper: Mappers.BlobSetMetadataHeaders,
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.BlobSetMetadataExceptionHeaders,
    },
  },
  queryParameters: [Parameters.timeoutInSeconds, Parameters.comp6],
  urlParameters: [Parameters.url],
  headerParameters: [
    Parameters.version,
    Parameters.requestId,
    Parameters.accept1,
    Parameters.metadata,
    Parameters.leaseId,
    Parameters.ifModifiedSince,
    Parameters.ifUnmodifiedSince,
    Parameters.encryptionKey,
    Parameters.encryptionKeySha256,
    Parameters.encryptionAlgorithm,
    Parameters.ifMatch,
    Parameters.ifNoneMatch,
    Parameters.ifTags,
    Parameters.encryptionScope,
  ],
  isXML: true,
  serializer: xmlSerializer,
};
const acquireLeaseOperationSpec: coreClient.OperationSpec = {
  path: "/{containerName}/{blob}",
  httpMethod: "PUT",
  responses: {
    201: {
      headersMapper: Mappers.BlobAcquireLeaseHeaders,
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.BlobAcquireLeaseExceptionHeaders,
    },
  },
  queryParameters: [Parameters.timeoutInSeconds, Parameters.comp10],
  urlParameters: [Parameters.url],
  headerParameters: [
    Parameters.version,
    Parameters.requestId,
    Parameters.accept1,
    Parameters.ifModifiedSince,
    Parameters.ifUnmodifiedSince,
    Parameters.action,
    Parameters.duration,
    Parameters.proposedLeaseId,
    Parameters.ifMatch,
    Parameters.ifNoneMatch,
    Parameters.ifTags,
  ],
  isXML: true,
  serializer: xmlSerializer,
};
const releaseLeaseOperationSpec: coreClient.OperationSpec = {
  path: "/{containerName}/{blob}",
  httpMethod: "PUT",
  responses: {
    200: {
      headersMapper: Mappers.BlobReleaseLeaseHeaders,
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.BlobReleaseLeaseExceptionHeaders,
    },
  },
  queryParameters: [Parameters.timeoutInSeconds, Parameters.comp10],
  urlParameters: [Parameters.url],
  headerParameters: [
    Parameters.version,
    Parameters.requestId,
    Parameters.accept1,
    Parameters.ifModifiedSince,
    Parameters.ifUnmodifiedSince,
    Parameters.action1,
    Parameters.leaseId1,
    Parameters.ifMatch,
    Parameters.ifNoneMatch,
    Parameters.ifTags,
  ],
  isXML: true,
  serializer: xmlSerializer,
};
const renewLeaseOperationSpec: coreClient.OperationSpec = {
  path: "/{containerName}/{blob}",
  httpMethod: "PUT",
  responses: {
    200: {
      headersMapper: Mappers.BlobRenewLeaseHeaders,
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.BlobRenewLeaseExceptionHeaders,
    },
  },
  queryParameters: [Parameters.timeoutInSeconds, Parameters.comp10],
  urlParameters: [Parameters.url],
  headerParameters: [
    Parameters.version,
    Parameters.requestId,
    Parameters.accept1,
    Parameters.ifModifiedSince,
    Parameters.ifUnmodifiedSince,
    Parameters.leaseId1,
    Parameters.action2,
    Parameters.ifMatch,
    Parameters.ifNoneMatch,
    Parameters.ifTags,
  ],
  isXML: true,
  serializer: xmlSerializer,
};
const changeLeaseOperationSpec: coreClient.OperationSpec = {
  path: "/{containerName}/{blob}",
  httpMethod: "PUT",
  responses: {
    200: {
      headersMapper: Mappers.BlobChangeLeaseHeaders,
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.BlobChangeLeaseExceptionHeaders,
    },
  },
  queryParameters: [Parameters.timeoutInSeconds, Parameters.comp10],
  urlParameters: [Parameters.url],
  headerParameters: [
    Parameters.version,
    Parameters.requestId,
    Parameters.accept1,
    Parameters.ifModifiedSince,
    Parameters.ifUnmodifiedSince,
    Parameters.leaseId1,
    Parameters.action4,
    Parameters.proposedLeaseId1,
    Parameters.ifMatch,
    Parameters.ifNoneMatch,
    Parameters.ifTags,
  ],
  isXML: true,
  serializer: xmlSerializer,
};
const breakLeaseOperationSpec: coreClient.OperationSpec = {
  path: "/{containerName}/{blob}",
  httpMethod: "PUT",
  responses: {
    202: {
      headersMapper: Mappers.BlobBreakLeaseHeaders,
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.BlobBreakLeaseExceptionHeaders,
    },
  },
  queryParameters: [Parameters.timeoutInSeconds, Parameters.comp10],
  urlParameters: [Parameters.url],
  headerParameters: [
    Parameters.version,
    Parameters.requestId,
    Parameters.accept1,
    Parameters.ifModifiedSince,
    Parameters.ifUnmodifiedSince,
    Parameters.action3,
    Parameters.breakPeriod,
    Parameters.ifMatch,
    Parameters.ifNoneMatch,
    Parameters.ifTags,
  ],
  isXML: true,
  serializer: xmlSerializer,
};
const createSnapshotOperationSpec: coreClient.OperationSpec = {
  path: "/{containerName}/{blob}",
  httpMethod: "PUT",
  responses: {
    201: {
      headersMapper: Mappers.BlobCreateSnapshotHeaders,
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.BlobCreateSnapshotExceptionHeaders,
    },
  },
  queryParameters: [Parameters.timeoutInSeconds, Parameters.comp14],
  urlParameters: [Parameters.url],
  headerParameters: [
    Parameters.version,
    Parameters.requestId,
    Parameters.accept1,
    Parameters.metadata,
    Parameters.leaseId,
    Parameters.ifModifiedSince,
    Parameters.ifUnmodifiedSince,
    Parameters.encryptionKey,
    Parameters.encryptionKeySha256,
    Parameters.encryptionAlgorithm,
    Parameters.ifMatch,
    Parameters.ifNoneMatch,
    Parameters.ifTags,
    Parameters.encryptionScope,
  ],
  isXML: true,
  serializer: xmlSerializer,
};
const startCopyFromURLOperationSpec: coreClient.OperationSpec = {
  path: "/{containerName}/{blob}",
  httpMethod: "PUT",
  responses: {
    202: {
      headersMapper: Mappers.BlobStartCopyFromURLHeaders,
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.BlobStartCopyFromURLExceptionHeaders,
    },
  },
  queryParameters: [Parameters.timeoutInSeconds],
  urlParameters: [Parameters.url],
  headerParameters: [
    Parameters.version,
    Parameters.requestId,
    Parameters.accept1,
    Parameters.metadata,
    Parameters.leaseId,
    Parameters.ifModifiedSince,
    Parameters.ifUnmodifiedSince,
    Parameters.ifMatch,
    Parameters.ifNoneMatch,
    Parameters.ifTags,
    Parameters.immutabilityPolicyExpiry,
    Parameters.immutabilityPolicyMode,
    Parameters.tier,
    Parameters.rehydratePriority,
    Parameters.sourceIfModifiedSince,
    Parameters.sourceIfUnmodifiedSince,
    Parameters.sourceIfMatch,
    Parameters.sourceIfNoneMatch,
    Parameters.sourceIfTags,
    Parameters.copySource,
    Parameters.blobTagsString,
    Parameters.sealBlob,
    Parameters.legalHold1,
  ],
  isXML: true,
  serializer: xmlSerializer,
};
const copyFromURLOperationSpec: coreClient.OperationSpec = {
  path: "/{containerName}/{blob}",
  httpMethod: "PUT",
  responses: {
    202: {
      headersMapper: Mappers.BlobCopyFromURLHeaders,
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.BlobCopyFromURLExceptionHeaders,
    },
  },
  queryParameters: [Parameters.timeoutInSeconds],
  urlParameters: [Parameters.url],
  headerParameters: [
    Parameters.version,
    Parameters.requestId,
    Parameters.accept1,
    Parameters.metadata,
    Parameters.leaseId,
    Parameters.ifModifiedSince,
    Parameters.ifUnmodifiedSince,
    Parameters.ifMatch,
    Parameters.ifNoneMatch,
    Parameters.ifTags,
    Parameters.immutabilityPolicyExpiry,
    Parameters.immutabilityPolicyMode,
    Parameters.encryptionScope,
    Parameters.tier,
    Parameters.sourceIfModifiedSince,
    Parameters.sourceIfUnmodifiedSince,
    Parameters.sourceIfMatch,
    Parameters.sourceIfNoneMatch,
    Parameters.copySource,
    Parameters.blobTagsString,
    Parameters.legalHold1,
    Parameters.xMsRequiresSync,
    Parameters.sourceContentMD5,
    Parameters.copySourceAuthorization,
    Parameters.copySourceTags,
  ],
  isXML: true,
  serializer: xmlSerializer,
};
const abortCopyFromURLOperationSpec: coreClient.OperationSpec = {
  path: "/{containerName}/{blob}",
  httpMethod: "PUT",
  responses: {
    204: {
      headersMapper: Mappers.BlobAbortCopyFromURLHeaders,
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.BlobAbortCopyFromURLExceptionHeaders,
    },
  },
  queryParameters: [
    Parameters.timeoutInSeconds,
    Parameters.comp15,
    Parameters.copyId,
  ],
  urlParameters: [Parameters.url],
  headerParameters: [
    Parameters.version,
    Parameters.requestId,
    Parameters.accept1,
    Parameters.leaseId,
    Parameters.copyActionAbortConstant,
  ],
  isXML: true,
  serializer: xmlSerializer,
};
const setTierOperationSpec: coreClient.OperationSpec = {
  path: "/{containerName}/{blob}",
  httpMethod: "PUT",
  responses: {
    200: {
      headersMapper: Mappers.BlobSetTierHeaders,
    },
    202: {
      headersMapper: Mappers.BlobSetTierHeaders,
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.BlobSetTierExceptionHeaders,
    },
  },
  queryParameters: [
    Parameters.timeoutInSeconds,
    Parameters.snapshot,
    Parameters.versionId,
    Parameters.comp16,
  ],
  urlParameters: [Parameters.url],
  headerParameters: [
    Parameters.version,
    Parameters.requestId,
    Parameters.accept1,
    Parameters.leaseId,
    Parameters.ifTags,
    Parameters.rehydratePriority,
    Parameters.tier1,
  ],
  isXML: true,
  serializer: xmlSerializer,
};
const getAccountInfoOperationSpec: coreClient.OperationSpec = {
  path: "/{containerName}/{blob}",
  httpMethod: "GET",
  responses: {
    200: {
      headersMapper: Mappers.BlobGetAccountInfoHeaders,
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.BlobGetAccountInfoExceptionHeaders,
    },
  },
  queryParameters: [
    Parameters.comp,
    Parameters.timeoutInSeconds,
    Parameters.restype1,
  ],
  urlParameters: [Parameters.url],
  headerParameters: [
    Parameters.version,
    Parameters.requestId,
    Parameters.accept1,
  ],
  isXML: true,
  serializer: xmlSerializer,
};
const queryOperationSpec: coreClient.OperationSpec = {
  path: "/{containerName}/{blob}",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: {
        type: { name: "Stream" },
        serializedName: "parsedResponse",
      },
      headersMapper: Mappers.BlobQueryHeaders,
    },
    206: {
      bodyMapper: {
        type: { name: "Stream" },
        serializedName: "parsedResponse",
      },
      headersMapper: Mappers.BlobQueryHeaders,
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.BlobQueryExceptionHeaders,
    },
  },
  requestBody: Parameters.queryRequest,
  queryParameters: [
    Parameters.timeoutInSeconds,
    Parameters.snapshot,
    Parameters.comp17,
  ],
  urlParameters: [Parameters.url],
  headerParameters: [
    Parameters.contentType,
    Parameters.accept,
    Parameters.version,
    Parameters.requestId,
    Parameters.leaseId,
    Parameters.ifModifiedSince,
    Parameters.ifUnmodifiedSince,
    Parameters.encryptionKey,
    Parameters.encryptionKeySha256,
    Parameters.encryptionAlgorithm,
    Parameters.ifMatch,
    Parameters.ifNoneMatch,
    Parameters.ifTags,
  ],
  isXML: true,
  contentType: "application/xml; charset=utf-8",
  mediaType: "xml",
  serializer: xmlSerializer,
};
const getTagsOperationSpec: coreClient.OperationSpec = {
  path: "/{containerName}/{blob}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BlobTags,
      headersMapper: Mappers.BlobGetTagsHeaders,
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.BlobGetTagsExceptionHeaders,
    },
  },
  queryParameters: [
    Parameters.timeoutInSeconds,
    Parameters.snapshot,
    Parameters.versionId,
    Parameters.comp18,
  ],
  urlParameters: [Parameters.url],
  headerParameters: [
    Parameters.version,
    Parameters.requestId,
    Parameters.accept1,
    Parameters.leaseId,
    Parameters.ifTags,
  ],
  isXML: true,
  serializer: xmlSerializer,
};
const setTagsOperationSpec: coreClient.OperationSpec = {
  path: "/{containerName}/{blob}",
  httpMethod: "PUT",
  responses: {
    204: {
      headersMapper: Mappers.BlobSetTagsHeaders,
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.BlobSetTagsExceptionHeaders,
    },
  },
  requestBody: Parameters.tags,
  queryParameters: [
    Parameters.timeoutInSeconds,
    Parameters.versionId,
    Parameters.comp18,
  ],
  urlParameters: [Parameters.url],
  headerParameters: [
    Parameters.contentType,
    Parameters.accept,
    Parameters.version,
    Parameters.requestId,
    Parameters.leaseId,
    Parameters.ifTags,
    Parameters.transactionalContentMD5,
    Parameters.transactionalContentCrc64,
  ],
  isXML: true,
  contentType: "application/xml; charset=utf-8",
  mediaType: "xml",
  serializer: xmlSerializer,
};
