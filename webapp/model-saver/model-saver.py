from aiohttp import web
import os
import shutil
import json

routes = web.RouteTableDef()


def directory_name(model):
    return '/models/{}'.format(model['name'])


def create_directory(model):
    path = directory_name(model)
    if os.path.exists(path):
        shutil.rmtree(path)
    os.makedirs(path)


async def write_json(model):
    path = '{}/model.json'.format(directory_name(model))
    with open(path, 'w') as f:
        f.write(json.dumps(model))


@routes.post('/')
async def root(request):
    model = await request.json()
    create_directory(model)
    await write_json(model)
    return web.json_response({'some': 'data'})


app = web.Application()

app.router.add_routes(routes)

web.run_app(app)
