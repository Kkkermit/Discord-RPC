require("dotenv").config();
const RPC = require("discord-rpc");

const { color, getTimestamp } = require("./utils/loggingEffects");
const { asciiText } = require("./utils/asciiText");

const appId = process.env.appid;

const client = new RPC.Client({ transport: "ipc" });

if (!appId) {
	console.log(
		`${
			color.red
		}[${getTimestamp()}] [ERROR] You need to provide an application ID in the .env file \n[${getTimestamp()}] [ERROR] Exiting... ${
			color.reset
		}`,
	);
	process.exit(1);
}

RPC.register(appId);

console.log(`${color.yellow}[${getTimestamp()}] [INFO] Launching RPC... ${color.reset}`);

async function activity() {
	if (!client) return;

	// DETAILS FOR THE DISCORD RICH PRESENCE
	client.setActivity({
		details: "Something cool I guess",
		state: "Something even cooler",
		largeImageKey: `https://cdn.buymeacoffee.com/uploads/profile_pictures/2024/09/SKCylmrnc4wdho5C.jpeg@300w_0e.webp`,
		largeImageText: "This is a large image, wow!",
		smallImageKey: "https://cdn.buymeacoffee.com/uploads/profile_pictures/2024/09/SKCylmrnc4wdho5C.jpeg@300w_0e.webp",
		smallImageText: "This is a small image, wow!",
		instance: false,
		startTimestamp: Date.now(),
	});
}

try {
    console.log(`${color.yellow}[${getTimestamp()}] [INFO] Setting RPC activity... ${color.reset}`);
	client.on("ready", async () => {
        asciiText()
		console.log(
			`${color.green}[${getTimestamp()}] [SUCCESS] RPC has launched successfully for: ${client.user.username}! ${
				color.reset
			}`,
		);
		activity();
        console.log(`${color.green}[${getTimestamp()}] [SUCCESS] ${client.user.username}'s activity has been set successfully ${color.reset}`);

		setInterval(() => {
			activity();
		}, 100000000);
	});
} catch (error) {
	console.log(
		`${color.red}[${getTimestamp()}] [ERROR] There has been an error launching the RPC \n[${getTimestamp()}] [ERROR]`,
		error,
		`${color.reset}`,
	);
}

client.login({ clientId: appId });
