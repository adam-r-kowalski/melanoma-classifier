from aiohttp import web
import json

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

    print('ws connection closed')


app = web.Application()

app.router.add_routes(routes)

web.run_app(app)
