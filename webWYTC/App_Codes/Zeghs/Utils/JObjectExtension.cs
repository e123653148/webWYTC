namespace Newtonsoft.Json.Linq {
	public static class JObjectExtension {
		public static T ValueOrDefault<T>(this JObject obj, string name) {
			JToken cValue = null;
			bool bHave = obj.TryGetValue(name, out cValue);
			if (bHave) {
				switch (cValue.Type) {
					case JTokenType.Boolean:
					case JTokenType.Date:
					case JTokenType.Float:
					case JTokenType.Integer:
					case JTokenType.String:
						return cValue.Value<T>();
					default:
						return default(T);
				}
			} else {
				return default(T);
			}
		}
	}
}