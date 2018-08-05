using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Deanery.Models
{
    public class Captcher
    {
        public static bool CaptcherMethod(string captcha)
        {
            string secretKey = "6LfUQ2gUAAAAAJ-GJa5h0RG25-GQhVKqOV6qkJbN";
            var client = new WebClient();
            var result = client.DownloadString(string.Format("https://www.google.com/recaptcha/api/siteverify?secret={0}&response={1}", secretKey, captcha));
            var obj = JObject.Parse(result);
            var status = (bool)obj.SelectToken("success");
            return status;
        }
    }
}
