import redis

# Set up Redis connection for caching
redis_client = redis.StrictRedis(host='localhost', port=6379, db=0)

# Define functions for interacting with the cache
def set_cache(key, value):
    redis_client.set(key, value)

def get_cache(key):
    return redis_client.get(key)
