from aiohttp import web
import os
import shutil
import json

routes = web.RouteTableDef()


def directoryName(model):
    return '/models/{}'.format(model['name'])


def createDirectory(model):
    path = directoryName(model)
    if os.path.exists(path):
        shutil.rmtree(path)
    os.makedirs(path)


async def writeJson(model):
    path = '{}/model.json'.format(directoryName(model))
    with open(path, 'w') as f:
        f.write(json.dumps(model))


@routes.post('/')
async def root(request):
    model = await request.json()
    createDirectory(model)
    await writeJson(model)
    return web.json_response({'some': 'data'})


app = web.Application()

app.router.add_routes(routes)

web.run_app(app)
