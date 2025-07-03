// TODO: Move this function to @beexy/tools

import {
  BeePlainTextFileClient,
  Adapt_TXTPlain2Json,
  RequestResponse
} from "@beexy/tools"

export async function loadData(path: string): Promise<RequestResponse> {

  const response = await new BeePlainTextFileClient().requestData( path, Adapt_TXTPlain2Json );

  return response;

}
