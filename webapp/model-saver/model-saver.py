from aiohttp import web

routes = web.RouteTableDef()


@routes.get('/')
async def root(request):
    return web.Response(text='I will save your model!')


app = web.Application()

app.router.add_routes(routes)

web.run_app(app)
