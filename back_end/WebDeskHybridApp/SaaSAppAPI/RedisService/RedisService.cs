using SaaSAppAPI.Utility;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
using System.Text;

namespace SaaSAppAPI.RedisService
{
    public class RedisService: IRedisService
    {
        private readonly IDistributedCache _cache;
            public RedisService(IDistributedCache cache)
            {
                _cache = cache;
            }

            public async Task SetRedisCacheData<T>(string cacheKey, T data)
            {
                string serializeObject =JsonConvert.SerializeObject(data); // Obj to String
                var bytesObject = Encoding.UTF8.GetBytes(serializeObject); // String to Bytes
                int timeOut = Int32.Parse(StaticConfigurationManager.AppSetting["RedisCacheTimeOut"]);
                var options = new DistributedCacheEntryOptions().SetAbsoluteExpiration(DateTime.Now.AddMinutes(timeOut)).SetSlidingExpiration(TimeSpan.FromMinutes(timeOut));
                await _cache.SetAsync(cacheKey, bytesObject, options);
            }

            public async Task<T?> GetRedisCacheData<T>(string cacheKey)
            {
                var bytesObject = await _cache.GetAsync(cacheKey);
                if (bytesObject != null)
                {
                    string serializeObject = Encoding.UTF8.GetString(bytesObject);
                    return JsonConvert.DeserializeObject<T>(serializeObject);
                }
                return default(T);
            }

            public async Task RemoveRedisCacheData(string cacheKey)
            {
                await _cache.RemoveAsync(cacheKey);
            }
        }
    }
