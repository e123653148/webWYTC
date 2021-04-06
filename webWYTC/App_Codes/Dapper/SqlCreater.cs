using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Dapper {
	internal enum EDatabase {
		Offical = 0
	}

	internal sealed class SqlCreater {
		private static Dictionary<EDatabase, string> __cConnectionStrings = null;

		static SqlCreater() {
			__cConnectionStrings = new Dictionary<EDatabase, string>() {
				{ EDatabase.Offical, ConfigurationManager.ConnectionStrings["WytcConnectionString"].ConnectionString }
			};
		}

		public static SqlConnection Create(EDatabase database) {
			return new SqlConnection(__cConnectionStrings[database]);
		}
	}
}