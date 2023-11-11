using Microsoft.AspNetCore.Mvc;

namespace CommonApp
{
    public class APIResponseFinal
    {
        public int statusCode { get; set; }
        public string? resMsg { get; set; }
        public dynamic? result { get; set; }
        public bool isSuccess { get; set; }

        public static ObjectResult Response(int statusCode, bool isSuccess, dynamic? result = null, string resMsg = "")
        {
            return new ObjectResult(new APIResponseFinal()
            {
                statusCode = statusCode,
                isSuccess = isSuccess,
                result = result,
                resMsg = resMsg,
            });
        }
    }
}
