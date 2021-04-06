using System.Web.Mvc;
using System.Web.Http;
using System.Web.Routing;

namespace Wytc {
	public class MvcApplication : System.Web.HttpApplication {
		protected void Application_Start() {
			// 應用程式啟動時執行的程式碼
			log4net.Config.XmlConfigurator.Configure();

			AreaRegistration.RegisterAllAreas();
			GlobalConfiguration.Configure(WebApiConfig.Register);
			FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
			RouteConfig.RegisterRoutes(RouteTable.Routes);
		}
	}
}