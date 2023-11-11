namespace VendorMgtWebAPI.Services.RedisServices
{
    public interface IRedisService
    {
        Task SetRedisCacheData<T>(string cacheKey, T data);
        Task<T?> GetRedisCacheData<T>(string cacheKey);
        Task RemoveRedisCacheData(string cacheKey);
    }
}
