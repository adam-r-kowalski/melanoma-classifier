from aiohttp import web
import shutil
import os

routes = web.RouteTableDef()


@routes.post('/')
async def root(request):
    model = await request.json()
    path = '/models/{}'.format(model)
    if os.path.exists(path):
        shutil.rmtree(path)
    return web.json_response({'status': 'deleted'})


app = web.Application()

app.router.add_routes(routes)

web.run_app(app)
