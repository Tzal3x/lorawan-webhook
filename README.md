# lorawan-webhook

The purpose of this webhook is to be integrated with a "The Things Network" console application.
You can find a guide on how to do this [here](https://www.thethingsindustries.com/docs/integrations/webhooks/).

To expose the service from your localhost to the internet, you can use [ngrok](https://ngrok.com/).

Keep in mind that the requests sent from the TTN are `POST`.

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.1.7. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
