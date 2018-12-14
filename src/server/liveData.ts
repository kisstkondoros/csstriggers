import * as https from "https";
import { cssTriggers } from "./csstriggers";

export function fetchCssTriggers(): Thenable<any> {
	return new Promise((resolve, reject) => {
		https
			.get("https://raw.githubusercontent.com:443/GoogleChrome/css-triggers/master/data/blink.json", response => {
				var body = "";
				response.setEncoding("utf8");
				response.on("data", function(d) {
					body += d;
				});
				response.on("end", function() {
					var parsed = JSON.parse(body);
					var triggers = { data: {} };
					Object.keys(parsed.properties).forEach(key => {
						if (key.endsWith("-change")) {
							const propkey = key.substr(0, key.length - 7);
							triggers.data[propkey] = triggers.data[propkey] || { change: { blink: {} } };
							triggers.data[propkey].change.blink = parsed.properties[key];
						}
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
