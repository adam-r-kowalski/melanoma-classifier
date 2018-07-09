from aiohttp import web
import tensorflow as tf
import json


routes = web.RouteTableDef()


def model(file_name):
    with open(file_name) as f:
        return json.loads(f.read())


def models():
    files = tf.gfile.Glob('/models/**/*.json')
    models_generator = (model(file_name) for file_name in files)
    return {m['name']: m for m in models_generator}


@routes.get('/')
async def root(request):
    return web.json_response(models())


app = web.Application()

app.router.add_routes(routes)

web.run_app(app)
