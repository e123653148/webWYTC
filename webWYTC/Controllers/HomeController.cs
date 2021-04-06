using System.Web.Mvc;

namespace Wytc.Controllers {
	public sealed class HomeController : Controller {
		public ActionResult Index() {
			return File("index.html", "text/html");
		}
	}
}