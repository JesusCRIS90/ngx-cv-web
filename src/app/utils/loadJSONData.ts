// TODO: Move this function to @beexy/tools

import {
  JSONLocalFileClient,
  RequestResponse
} from "@beexy/tools"

export async function loadData(path: string): Promise<RequestResponse> {

  const response = await new JSONLocalFileClient().requestData( path );

  return response;

}
