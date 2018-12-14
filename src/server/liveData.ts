import * as https from "https";
import { cssTriggers, ICssTrigger } from "./csstriggers";

export function fetchCssTriggers(): Thenable<ICssTrigger> {
	return new Promise((resolve, reject) => {
		https
			.get("https://raw.githubusercontent.com/GoogleChromeLabs/css-triggers/master/data/data.json", response => {
				var body = "";
				response.setEncoding("utf8");
				response.on("data", function(d) {
					body += d;
				});
				response.on("end", function() {
					var parsed = JSON.parse(body);
					Object.keys(parsed.data).forEach(key => {
						cssTriggers.data[key] = parsed.data[key];
					});
					resolveMissingValues(cssTriggers.data);
					resolve(cssTriggers);
				});
			})
			.on("error", function(e) {
				console.log("Got error while fetching css triggers data from github: " + e.message);
				resolveMissingValues(cssTriggers.data);
				resolve(cssTriggers);
			});
	});
}

function resolveMissingValues(data) {
	data["margin"] = data["margin-left"];
	data["padding"] = data["padding-left"];
	data["border"] = data["border-left-width"];
	data["border-radius"] = data["border"];
	data["border-color"] = data["border-left-color"];
	data["border-style"] = data["border-left-style"];
	data["border-width"] = data["border-left-width"];
	data["outline"] = data["outline-width"];
	data["overflow"] = data["overflow-x"];
	data["background"] = data["background-color"];
}
