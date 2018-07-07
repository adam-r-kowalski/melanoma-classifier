def field(layer_json, name):
    return [f for f in layer_json['fields'] if f['name'] == name][0]


def field_value(layer_json, name):
    return field(layer_json, name)['value']


def group(layer_json, name):
    return field(layer_json, name)['group']


def group_field_value(group, name):
    return [f for f in group if f['name'] == name][0]['value']


def field_values(layer_json, name, names):
    g = group(layer_json, name)
    values = [group_field_value(g, name) for name in names]
    return values
