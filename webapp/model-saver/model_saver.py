# Copyright (c) 2018 Adam Kowalski
# This code is available under the "Apache License 2.0"
# Please see the file COPYING in this distribution for license terms.

from aiohttp import web
import os
import shutil
import json

routes = web.RouteTableDef()


def directory_name(model_json):
    return '/models/{}'.format(model_json['name'])


def create_directory(model_json):
    path = directory_name(model_json)
    if os.path.exists(path):
        shutil.rmtree(path)
    os.makedirs(path)


async def write_json(model_json):
    path = '{}/model.json'.format(directory_name(model_json))
    with open(path, 'w') as f:
        f.write(json.dumps(model_json))


@routes.post('/')
async def root(request):
    model_json = await request.json()
    create_directory(model_json)
    await write_json(model_json)
    return web.json_response({'status': 'saved'})


app = web.Application()

app.router.add_routes(routes)

web.run_app(app)
