import aiohttp
import asyncio
import json


async def client():
    async with aiohttp.ClientSession() as session:
        async with session.ws_connect('ws://model-runner:8080') as ws:
            ws.send_str(json.dumps({'a': 5, 'b': 6}))


loop = asyncio.get_event_loop()

loop.run_until_complete(client())
