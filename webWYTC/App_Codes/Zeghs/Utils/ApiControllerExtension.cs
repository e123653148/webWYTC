using System.Reflection;
using System.Diagnostics;
using System.Runtime.CompilerServices;
using Zeghs.Utils;

namespace System.Web.Http {
	public static class ApiControllerExtension {
		[MethodImpl(MethodImplOptions.NoInlining)]
		public static dynamic Error(this ApiController target, int code, string id, dynamic args) {
			switch (id) {
				case ErrorCode.ERROR_MEMBER_USERTOKEN_EXPIRY:
					return Error(target, code, id, args, "Member userToken expiry", 3);
				case ErrorCode.ERROR_MEMBER_USERTOKEN_ILLEGAL:
					return Error(target, code, id, args, "Member userToken illegal", 3);
			}
			return null;
		}

		[MethodImpl(MethodImplOptions.NoInlining)]
		public static dynamic Error(this ApiController target, int code, string id, dynamic args, string comment, int stackFrame = 1) {
			StackTrace cTrace = new StackTrace(stackFrame);
			StackFrame cFrame = cTrace.GetFrame(0);
			MethodBase cMethod = cFrame.GetMethod();
			string sModule = (cMethod.DeclaringType == null) ? "System.Web.Http.ApiController" : cMethod.DeclaringType.FullName;

			dynamic cThrows = new { 
				id = id,
				module = sModule,
				method = cMethod.Name,
				args = args,
				comment = comment,
				time = DateTime.Now
			};

			return new {
				code = code,
				data = cThrows
			};
		}

		public static dynamic Result(this ApiController target, dynamic data) {
			return new {
				code = 0,
				data = data
			};
		}
	}
}