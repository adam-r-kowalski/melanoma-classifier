from aiohttp import web

routes = web.RouteTableDef()


@routes.post('/')
async def root(request):
    print(request)
    return web.json_response({'some': 'data'})


app = web.Application()

app.router.add_routes(routes)

web.run_app(app)
