import { Context, Router } from "oak";
import {
  handleError,
  sendOKResponse,
} from "../../../lib/utils/globalErrorHandler.ts";
import {
  create,
  getNumericDate,
  Header,
  Payload,
} from "https://deno.land/x/djwt@v2.8/mod.ts";
import { StreamClient } from "stream-io/node-sdk";

const router = new Router();

const apiSecret = Deno.env.get("STREAM_API_SECRET")!;
const baseUrl = "https://video.stream-io-api.com/video";
const apiKey = Deno.env.get("STREAM_API_KEY")!;

/**
 * Delete a call (Hard Delete)
 * POSTMAN cURL :
 * curl --location --request DELETE 'http://127.0.0.1:54321/functions/v1/doctorekem/booking/delete-call' \
 * --header 'Authorization: Bearer YOUR_ANON_KEY' \
 * --header 'Content-Type: application/json' \
 * --data '{
 *  "callType":"default",
 *  "callId": "400de4d7-aef8-4dab-9552-22ff28a79647"
 *
 * }'
 */
router.delete("/delete-call", async (ctx: Context) => {
  try {
    const body = await ctx.request.body.json();
    const { callType, callId, hard = true } = body;

    if (!callType || !callId) {
      return handleError(ctx, {
        message: "callType and callId are required",
        code: 400,
        name: "BadRequest",
      });
    }
    const userId = "";
    const vailidity = 60 * 60;
    // validity is optional (by default the token is valid for an hour)
    //FIXME: Update the expirations
    const client = new StreamClient(apiKey, apiSecret, { timeout: 3000 }),
      newToken = client.generateUserToken({
        user_id: userId,
        validity_in_seconds: vailidity,
      }),
      _data = {
        apiKey: apiKey,
        token: newToken,

        user: {
          id: userId,
          name: "Admin",
          //TODO:add images
          image: "https://getstream.io/random_svg/?id=Snoke&name=Snoke",
        },
      };

    const resp = await fetch(`${baseUrl}/call/${callType}/${callId}`, {
      method: "DELETE",
      headers: {
        Authorization: newToken,
        "stream-auth-type": "jwt",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hard }),
    });

    const result = await resp.json();
    if (result.ok) {
      sendOKResponse(
        result,
        `Call ${hard ? "hard" : "soft"} deleted`,
        200,
        ctx,
        null,
      );
    }
  } catch (err) {
    return handleError(ctx, {
      message: (err as Error)?.message ?? "Failed to delete call",
      code: 500,
      name: "ServerError",
    });
  }
});

/**
 * Just for tests in developments: Generate a secure JWT for Stream Video API
 */
async function generateStreamToken(
  permissions: Record<string, any> = {},
): Promise<string> {
  const header: Header = { alg: "HS256", typ: "JWT" };
  const payload: Payload = {
    user_id: "server",
    exp: getNumericDate(60 * 5),
    call: permissions,
  };
  return await create(header, payload, apiSecret);
}

export default router;
