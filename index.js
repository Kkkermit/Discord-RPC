// APPLICATION ID IS THE ID FOR THIS. TO GET THIS, GO TO THE DISCORD DEV PORTAL AND CREATE A NEW APPLICATION AND COPY THE APPLICATION ID
const ID = 'APPLICATION ID';
// 'NPM I discord-rpc' IN THE TERMINAL
const DiscordRPC = require('discord-rpc');
const RPC = new DiscordRPC.Client({ transport: 'ipc'});

DiscordRPC.register(ID);

async function activity() {
    if (!RPC) return;

    // DETAILS FOR THE DISCORD RICH PRESENCE
    RPC.setActivity({
        details: ' RPC DETAILS ',
        state: ' RPC STATE ', 
        largeImageKey: ' ENTER AN IMAGE YOU WANT TO USE ',
        largeImageText: ' ALT TEXT FOR THE IMAGE ',
        smallImageKey: ' ENTER AN IMAGE YOU WANT TO USE ',
        smallImageText: 'ALT TEXT FOR THE IMAGE',
        instance: false,
        startTimestamp: Date.now(),
        // YOU CAN ONLY HAVE 2 BUTTONS, THEY APPEAR ON THE BOTTOM OF THE RPC"
        buttons: [
            {
                label: ` ENTER WHAT YOU WANT TO APPEAR ON YOUR BUTTON `,
                url: ` ENTER URL `
            },
            {
                label: ` ENTER WHAT YOU WANT TO APPEAR ON YOUR BUTTON `,
                url: ` URL `
            }
        ]


    })
}

// NODE. IN TERMINAL TO RUN THE CODE AND BRING THE RPC UP ONTO YOUR PROFILE
RPC.on('ready', async () => {
    console.log("RPC Presence up");
    activity();

    setInterval(() => {
        activity();

    }, 100000000)
})

RPC.login({ clientId: ID });
