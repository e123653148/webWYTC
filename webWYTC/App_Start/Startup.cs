using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(Wytc.Startup))]
namespace Wytc {
	public partial class Startup {
		public void Configuration(IAppBuilder app) {
			app.MapSignalR();
		}
	}
}