// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createRecordedDeidentificationClient, createRecorder } from "./utils/recordedClient.js";
import { beforeEach, afterEach, it, describe } from "vitest";
import { DeidentificationClient } from "../../src/clientDefinitions.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { DeidentificationJob } from "../../src/models.js";
import {
  DeidentificationJobOutput,
  HealthFileDetailsOutput,
  PagedHealthFileDetailsOutput,
} from "../../src/outputModels.js";
import { assert } from "@azure-tools/test-utils";
import {
  Recorder,
  assertEnvironmentVariable,
  isPlaybackMode,
  isRecordMode,
} from "@azure-tools/test-recorder";
import { ErrorResponse } from "@azure-rest/core-client";
import { getLongRunningPoller } from "../../src/pollingHelper.js";
import { paginate } from "../../src/paginateHelper.js";

const testPollingOptions = {
  intervalInMs: isPlaybackMode() ? 0 : undefined,
};

const TEST_TIMEOUT_MS: number = 40000;

const fakeServiceEndpoint = "fakeserviceId.api.cac001.deid.azure.com";
const replaceableVariables: Record<string, string> = {
  DEID_SERVICE_ENDPOINT: fakeServiceEndpoint,
  STORAGE_ACCOUNT_SAS_URI:
    "https://fake_storage_account_sas_uri.blob.core.windows.net/container-sdk-dev-fakeid",
};

const generateJobName = (testName?: string): string => {
  let jobName = "js-sdk-job-" + Date.now();
  if (isPlaybackMode() || isRecordMode()) {
    jobName = `js-sdk-job-recorded-${testName}`;
  }
  return jobName;
};

const pollJobStatus = async (
  client: DeidentificationClient,
  jobName: string,
  statusToWait: string,
  intervalInMS = 2000,
): Promise<DeidentificationJobOutput> => {
  let jobOutput = await client.path("/jobs/{name}", jobName).get();

  while ((jobOutput.body as DeidentificationJobOutput).status !== statusToWait) {
    await new Promise((resolve) => setTimeout(resolve, intervalInMS));
    jobOutput = await client.path("/jobs/{name}", jobName).get();
    if ((jobOutput.body as DeidentificationJobOutput).error !== undefined) {
      console.log(`Job error: ${(jobOutput.body as DeidentificationJobOutput).error?.message}`);
    }
  }
  return jobOutput.body as DeidentificationJobOutput;
};

const OUTPUT_FOLDER = "_output";

// Note: To ensure playback mode functions correctly, it's essential that both `rushx test:node` and `rushx test:browser` utilize identical recordings.
// Follow these steps to achieve consistent recordings across tests:
// 1. Update all instances of `jobName`.
// 2. Execute `rushx test:node` in record mode to capture the new test recording.
// 3. Once again, update all instances of `jobName`.
// 4. Execute `rushx test:browser` in record mode to align the browser test recordings with those of the node.
// 5. Ensure the same `jobId` is used in both browser and node recordings, identifiable by the string pattern `js-sdk-job-recorded-**`.
//    To accomplish this, you may need to edit the files located at `sdk\healthdataaiservices\azure-health-deidentification\recordings\browsers\batch\recording_*.json`.

describe("Batch", () => {
  let recorder: Recorder;
  let client: DeidentificationClient;

  beforeEach(async function (context) {
    recorder = await createRecorder(context);
    await recorder.start({
      envSetupForPlayback: replaceableVariables,
      sanitizerOptions: {
        bodyKeySanitizers: [
          {
            value: replaceableVariables.STORAGE_ACCOUNT_SAS_URI,
            jsonPath: "$..location",
            regex: "^(?!.*FAKE_STORAGE_ACCOUNT).*",
          },
        ],
      },
      removeCentralSanitizers: ["AZSDK3493", "AZSDK4001", "AZSDK3430"],
    });
    const credential = createTestCredential();
    if (process.env.DEID_SERVICE_ENDPOINT) {
      client = await createRecordedDeidentificationClient(recorder, credential);
    } else {
      throw new Error("DEID_SERVICE_ENDPOINT is not set");
    }
  });

  afterEach(async function () {
    await recorder.stop();
  });

  // Note: When your re-run recording you need to update jobName to avoid conflict with existing job
  it(
    "CreateJob returns expected",
    async function () {
      const jobName = generateJobName("21");
      const inputPrefix = "example_patient_1";
      const storageAccountSASUri = assertEnvironmentVariable("STORAGE_ACCOUNT_SAS_URI");

      const job: DeidentificationJob = {
        dataType: "Plaintext",
        operation: "Surrogate",
        sourceLocation: { location: storageAccountSASUri, prefix: inputPrefix, extensions: ["*"] },
        targetLocation: { location: storageAccountSASUri, prefix: OUTPUT_FOLDER },
      };

      const response = await client.path("/jobs/{name}", jobName).put({ body: job });

      const jobOutput = response.body as DeidentificationJobOutput;

      assert.isNotNull(jobOutput);
      assert.equal(jobName, jobOutput.name);
      assert.isNotNull(jobOutput.createdAt);
      assert.isNotNull(jobOutput.lastUpdatedAt);
      assert.isUndefined(jobOutput.startedAt);
      assert.equal("NotStarted", jobOutput.status);
      assert.isUndefined(jobOutput.error);
      assert.isUndefined(jobOutput.redactionFormat);
      assert.isUndefined(jobOutput.summary);
      assert.equal(inputPrefix, jobOutput.sourceLocation.prefix);
      assert.isTrue(storageAccountSASUri.includes("blob.core.windows.net"));
      assert.equal(OUTPUT_FOLDER, jobOutput.targetLocation.prefix);
      assert.isTrue(storageAccountSASUri.includes("blob.core.windows.net"));
    },
    TEST_TIMEOUT_MS,
  );

  it(
    "CreateThenList returns expected",
    async function () {
      const jobName = generateJobName("22");
      const inputPrefix = "example_patient_1";
      const storageAccountSASUri = assertEnvironmentVariable("STORAGE_ACCOUNT_SAS_URI");

      const job: DeidentificationJob = {
        dataType: "Plaintext",
        operation: "Surrogate",
        sourceLocation: { location: storageAccountSASUri, prefix: inputPrefix, extensions: ["*"] },
        targetLocation: { location: storageAccountSASUri, prefix: OUTPUT_FOLDER },
      };

      await client.path("/jobs/{name}", jobName).put({ body: job });

      // Test list jobs with pagination
      const jobs = await client.path("/jobs").get();
      const items = [];
      const iter = paginate(client, jobs);
      for await (const item of iter) {
        items.push(item);
      }
      const foundJob = (items as DeidentificationJobOutput[]).find((j) => j.name === jobName);

      assert.isTrue(foundJob !== undefined);
      assert.isNotNull(foundJob!.createdAt);
      assert.isNotNull(foundJob!.lastUpdatedAt);
      assert.isNotNull(foundJob!.startedAt);
      assert.equal("NotStarted", foundJob!.status);
      assert.isUndefined(foundJob!.error);
      assert.isUndefined(foundJob!.redactionFormat);
      assert.isUndefined(foundJob!.summary);
      assert.equal(inputPrefix, foundJob!.sourceLocation.prefix);
      assert.isTrue(storageAccountSASUri.includes("blob.core.windows.net"));
      assert.equal(OUTPUT_FOLDER, foundJob!.targetLocation.prefix);
      assert.isTrue(storageAccountSASUri.includes("blob.core.windows.net"));
    },
    TEST_TIMEOUT_MS,
  );

  it(
    "JobE2E wait until success",
    async function () {
      const jobName = generateJobName("23");
      const inputPrefix = "example_patient_1";
      const storageAccountSASUri = assertEnvironmentVariable("STORAGE_ACCOUNT_SAS_URI");

      const job: DeidentificationJob = {
        dataType: "Plaintext",
        operation: "Surrogate",
        sourceLocation: { location: storageAccountSASUri, prefix: inputPrefix, extensions: ["*"] },
        targetLocation: { location: storageAccountSASUri, prefix: OUTPUT_FOLDER },
      };

      const initialResponse = await client.path("/jobs/{name}", jobName).put({ body: job });

      const poller = await getLongRunningPoller(client, initialResponse, testPollingOptions);
      await poller.pollUntilDone();
      assert.equal(poller.getOperationState().status, "succeeded");

      const finalJobOutputBody = await pollJobStatus(client, jobName, "Succeeded");
      assert.equal(finalJobOutputBody.status, "Succeeded");
      assert.notEqual(finalJobOutputBody.startedAt, null);
      assert.notEqual(finalJobOutputBody.summary, null);
      assert.equal(finalJobOutputBody.summary!.total, 2);
      assert.equal(finalJobOutputBody.summary!.successful, 2);

      const reports = await client.path("/jobs/{name}/files", jobName).get();
      reports.body = reports.body as PagedHealthFileDetailsOutput;
      const items = [];
      const iter = paginate(client, reports);

      for await (const item of iter) {
        items.push(item);
      }

      assert.isTrue((items as unknown[] as HealthFileDetailsOutput[]).length === 2);
      assert.isTrue(
        (items as unknown[] as HealthFileDetailsOutput[]).every(
          (obj) => obj.status === "Succeeded",
        ),
      );
      assert.isTrue(
        (items as unknown[] as HealthFileDetailsOutput[]).every((obj) =>
          obj.output!.path.startsWith(OUTPUT_FOLDER),
        ),
      );
      assert.isTrue(
        (items as unknown[] as HealthFileDetailsOutput[]).every((obj) => obj.id.length === 36),
      );
    },
    TEST_TIMEOUT_MS,
  );

  it(
    "JobE2E cancel job then delete it deletes job",
    async function () {
      const jobName = generateJobName("24");
      const inputPrefix = "example_patient_1";
      const storageAccountSASUri = assertEnvironmentVariable("STORAGE_ACCOUNT_SAS_URI");

      const job: DeidentificationJob = {
        dataType: "Plaintext",
        operation: "Surrogate",
        sourceLocation: { location: storageAccountSASUri, prefix: inputPrefix, extensions: ["*"] },
        targetLocation: { location: storageAccountSASUri, prefix: OUTPUT_FOLDER },
      };

      const initialResponse = await client.path("/jobs/{name}", jobName).put({ body: job });
      const poller = await getLongRunningPoller(client, initialResponse, testPollingOptions);
      await poller.pollUntilDone();
      assert.equal(poller.getOperationState().status, "succeeded");

      await pollJobStatus(client, jobName, "Running");

      const cancelledJob = await client.path("/jobs/{name}:cancel", jobName).post();
      assert.equal(cancelledJob.status, "200");

      const cancelledJobOutput = cancelledJob.body as DeidentificationJobOutput;
      assert.equal("Canceled", cancelledJobOutput.status);

      const deleteRequest = await client.path("/jobs/{name}", jobName).delete();
      assert.equal(deleteRequest.status, "204");

      const deletedJob = await client.path("/jobs/{name}", jobName).get();
      assert.equal(deletedJob.status, "404");
    },
    TEST_TIMEOUT_MS,
  );

  it(
    "JobE2E cannot access storage create job returns 404",
    async function () {
      const jobName = generateJobName("25");
      const inputPrefix = "example_patient_1";
      const storageAccountSASUri = "FAKE_STORAGE_ACCOUNT";

      const job: DeidentificationJob = {
        dataType: "Plaintext",
        operation: "Surrogate",
        sourceLocation: { location: storageAccountSASUri, prefix: inputPrefix, extensions: ["*"] },
        targetLocation: { location: storageAccountSASUri, prefix: OUTPUT_FOLDER },
      };

      const initialResponse = await client.path("/jobs/{name}", jobName).put({ body: job });

      const poller = await getLongRunningPoller(client, initialResponse, testPollingOptions);

      await poller.pollUntilDone();
      assert.equal(poller.getOperationState().status, "failed");

      const createdJob = await client.path("/jobs/{name}", jobName).get();
      assert.equal(createdJob.status, "404");
      const createdJobOutput = createdJob.body as ErrorResponse;
      assert.isNotNull(createdJobOutput.error);
      assert.equal("JobNotFound", createdJobOutput.error.code);
      assert.isTrue(createdJobOutput.error!.message.length > 10);
    },
    TEST_TIMEOUT_MS,
  );
});
