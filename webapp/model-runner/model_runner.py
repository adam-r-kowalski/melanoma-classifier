# Copyright (c) 2018 Adam Kowalski
# This code is available under the "Apache License 2.0"
# Please see the file COPYING in this distribution for license terms.

from aiohttp import web
import json

from run_keras import train_model

routes = web.RouteTableDef()


def directory_name(model_json):
    return '/models/{}'.format(model_json['name'])


@routes.get('/')
async def root(request):
    ws = web.WebSocketResponse()
    await ws.prepare(request)

    async for msg in ws:
        msg_json = json.loads(msg.data)
        print(msg_json)

        ws.send_json({'message': 'started'})
        train_model(ws, msg_json)
        ws.send_json({'message': 'finished'})

    print('ws connection closed')
    return ws


app = web.Application()

app.router.add_routes(routes)

web.run_app(app)
