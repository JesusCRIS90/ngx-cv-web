// TODO: Move this function to @beexy/tools

import {
  BeeJSONFileClient,
  RequestResponse
} from "@beexy/tools"

export async function loadData(path: string): Promise<RequestResponse> {

  const response = await new BeeJSONFileClient().requestData( path );

  return response;

}
