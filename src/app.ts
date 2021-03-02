require("dotenv").config();
/**
 * TWITCH_CLIENT_ID
 * TWITCH_CLIENT_SECRET
 * TWITCH_ACCESS_TOKEN
 * TWITCH_REFRESH_TOKEN
 */
import { ApiClient } from "twitch";
import { RefreshableAuthProvider, StaticAuthProvider } from "twitch-auth";
import { ChatClient } from "twitch-chat-client";

// # of users followed across all users included here < 800
// otherwise wait 1 min before next follow request
const usersToFollow = ["dominusbelli", "latertofu", "mezili"];

async function main() {
  const clientId = process.env.TWITCH_CLIENT_ID || "";
  const clientSecret = process.env.TWITCH_CLIENT_SECRET || "";
  const accessToken = process.env.TWITCH_ACCESS_TOKEN || "";
  const refreshToken = process.env.TWITCH_REFRESH_TOKEN || "";

  const auth = new RefreshableAuthProvider(
    new StaticAuthProvider(clientId, accessToken),
    { clientSecret: clientSecret, refreshToken: refreshToken }
  );
  const apiClient = new ApiClient({ authProvider: auth });

  // const channelsToListen = <string[]>[];
  // for (const user of usersToFollow) {
  //   const helixUser = await apiClient.helix.users.getUserByName(user);

  //   const res = await apiClient.helix.users
  //     .getFollowsPaginated({ user: helixUser?.id })
  //     .getAll();
  //   res.forEach((follow) => {
  //     channelsToListen.push(follow.followedUserName);
  //   });
  // }

  const chatClient = new ChatClient(auth, {
    channels: ["dominusbelli", "latertofu", "mezili", "mahcus_ttv"],
  });
  await chatClient.connect();

  chatClient.onMessage((channel, user, message) => {
    if (message === "!meziliW") {
      chatClient.say(
        channel,
        "meziliW meziliW meziliW meziliW meziliW meziliW meziliW meziliW meziliW meziliW meziliW meziliW meziliW meziliW meziliW meziliW"
      );
    }
  });
}

main();
