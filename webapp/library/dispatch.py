# https://adambard.com/blog/implementing-multimethods-in-python/
# These two methods are available for public use on the blog mentioned above


def multi(dispatch_fn):
    def _inner(*args, **kwargs):
        result = dispatch_fn(*args, **kwargs)
        default = _inner.__multi_default__
        return _inner.__multi__.get(result, default)(*args, **kwargs)

    _inner.__multi__ = {}
    _inner.__multi_default__ = lambda *args, **kwargs: None
    return _inner


def method(dispatch_fn, dispatch_key=None):
    def apply_decorator(fn):
        if dispatch_key is None:
            dispatch_fn.__multi_default__ = fn
        else:
            dispatch_fn.__multi__[dispatch_key] = fn
        return dispatch_fn

    return apply_decorator
