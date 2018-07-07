from aiohttp import web

routes = web.RouteTableDef()


def directory_name(model_json):
    return '/models/{}'.format(model_json['name'])


@routes.post('/')
async def root(request):
    model_json = await request.json()
    print(model_json)
    return web.json_response({'status': 'finished'})


app = web.Application()

app.router.add_routes(routes)

web.run_app(app)
