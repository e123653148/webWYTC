using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using WebApiThrottle;

namespace Wytc {
	public static class WebApiConfig {
		public static void Register(HttpConfiguration config) {
			// Web API 路由
			config.MapHttpAttributeRoutes();

			config.Routes.MapHttpRoute(
			    name: "DefaultApi",
			    routeTemplate: "api/{controller}/{action}/{id}",
			    defaults: new {
				    id = RouteParameter.Optional
			    }
			);

			var appXmlType = config.Formatters.XmlFormatter.SupportedMediaTypes.FirstOrDefault(t => t.MediaType == "application/xml");
			config.Formatters.XmlFormatter.SupportedMediaTypes.Remove(appXmlType);
		}
	}
}