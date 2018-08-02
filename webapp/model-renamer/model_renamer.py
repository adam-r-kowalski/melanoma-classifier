# Copyright (c) 2018 Adam Kowalski
# This code is available under the "Apache License 2.0"
# Please see the file COPYING in this distribution for license terms.

from aiohttp import web
import os
import json

routes = web.RouteTableDef()


def rename_json(path, new_name):
    full_path = '{}/model.json'.format(path)

    with open(full_path, 'r') as f:
        model_json = json.loads(f.read())

    model_json['name'] = new_name

    with open(full_path, 'w') as f:
        f.write(json.dumps(model_json))


def rename_model(old_name, new_name):
    path = '/models/{}'.format(old_name)
    rename_json(path, new_name)
    os.rename(path, '/models/{}'.format(new_name))


@routes.post('/')
async def root(request):
    names = await request.json()
    rename_model(names['old'], names['new'])
    return web.json_response({'status': 'renamed'})


app = web.Application()

app.router.add_routes(routes)

web.run_app(app)
