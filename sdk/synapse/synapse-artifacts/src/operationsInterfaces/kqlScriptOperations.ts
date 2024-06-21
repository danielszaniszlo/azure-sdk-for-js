/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { SimplePollerLike, OperationState } from "@azure/core-lro";
import {
  KqlScriptResource,
  KqlScriptCreateOrUpdateOptionalParams,
  KqlScriptCreateOrUpdateResponse,
  KqlScriptGetByNameOptionalParams,
  KqlScriptGetByNameResponse,
  KqlScriptDeleteByNameOptionalParams,
  ArtifactRenameRequest,
  KqlScriptRenameOptionalParams,
} from "../models";

/** Interface representing a KqlScriptOperations. */
export interface KqlScriptOperations {
  /**
   * Creates or updates a KQL Script
   * @param kqlScriptName KQL script name
   * @param kqlScript KQL script
   * @param options The options parameters.
   */
  beginCreateOrUpdate(
    kqlScriptName: string,
    kqlScript: KqlScriptResource,
    options?: KqlScriptCreateOrUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<KqlScriptCreateOrUpdateResponse>,
      KqlScriptCreateOrUpdateResponse
    >
  >;
  /**
   * Creates or updates a KQL Script
   * @param kqlScriptName KQL script name
   * @param kqlScript KQL script
   * @param options The options parameters.
   */
  beginCreateOrUpdateAndWait(
    kqlScriptName: string,
    kqlScript: KqlScriptResource,
    options?: KqlScriptCreateOrUpdateOptionalParams,
  ): Promise<KqlScriptCreateOrUpdateResponse>;
  /**
   * Get KQL script by name
   * @param kqlScriptName KQL script name
   * @param options The options parameters.
   */
  getByName(
    kqlScriptName: string,
    options?: KqlScriptGetByNameOptionalParams,
  ): Promise<KqlScriptGetByNameResponse>;
  /**
   * Delete KQL script by name
   * @param kqlScriptName KQL script name
   * @param options The options parameters.
   */
  beginDeleteByName(
    kqlScriptName: string,
    options?: KqlScriptDeleteByNameOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Delete KQL script by name
   * @param kqlScriptName KQL script name
   * @param options The options parameters.
   */
  beginDeleteByNameAndWait(
    kqlScriptName: string,
    options?: KqlScriptDeleteByNameOptionalParams,
  ): Promise<void>;
  /**
   * Rename KQL script
   * @param kqlScriptName KQL script name
   * @param renameRequest Rename request
   * @param options The options parameters.
   */
  beginRename(
    kqlScriptName: string,
    renameRequest: ArtifactRenameRequest,
    options?: KqlScriptRenameOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Rename KQL script
   * @param kqlScriptName KQL script name
   * @param renameRequest Rename request
   * @param options The options parameters.
   */
  beginRenameAndWait(
    kqlScriptName: string,
    renameRequest: ArtifactRenameRequest,
    options?: KqlScriptRenameOptionalParams,
  ): Promise<void>;
}
