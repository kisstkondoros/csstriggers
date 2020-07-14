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
	data["background"] = data["background-color"];
	data["block-size"] = data["height"];
	data["border"] = data["border-left-width"];
	data["border-block"] = data["border-top-width"];
	data["border-block-color"] = data["border-top-color"];
	data["border-block-end"] = data["border-bottom-end"];
	data["border-block-end-color"] = data["border-bottom-color"];
	data["border-block-end-style"] = data["border-bottom-style"];
	data["border-block-end-width"] = data["border-bottom-width"];
	data["border-block-start"] = data["border-top-width"];
	data["border-block-start-color"] = data["border-top-color"];
	data["border-block-start-style"] = data["border-top-style"];
	data["border-block-start-width"] = data["border-top-width"];
	data["border-block-style"] = data["border-top-style"];
	data["border-block-width"] = data["border-top-width"];
	data["border-color"] = data["border-left-color"];
	data["border-inline"] = data["border-left-width"];
	data["border-inline-color"] = data["border-left-color"];
	data["border-inline-end"] = data["border-right-end"];
	data["border-inline-end-color"] = data["border-right-color"];
	data["border-inline-end-style"] = data["border-right-style"];
	data["border-inline-end-width"] = data["border-right-width"];
	data["border-inline-start"] = data["border-left-width"];
	data["border-inline-start-color"] = data["border-left-color"];
	data["border-inline-start-style"] = data["border-left-style"];
	data["border-inline-start-width"] = data["border-left-width"];
	data["border-inline-style"] = data["border-left-style"];
	data["border-inline-width"] = data["border-left-width"];
	data["border-radius"] = data["border"];
	data["border-start-start-radius"] = data["border"];
	data["border-start-end-radius"] = data["border"];
	data["border-end-start-radius"] = data["border"];
	data["border-end-end-radius"] = data["border"];
	data["border-style"] = data["border-left-style"];
	data["border-width"] = data["border-left-width"];
	data["inline-size "] = data["height"];
	data["inset"] = data["top"];
	data["inset-block"] = data["top"];
	data["inset-block-end"] = data["bottom"];
	data["inset-block-start"] = data["top"];
	data["inset-inline"] = data["left"];
	data["inset-inline-end"] = data["right"];
	data["inset-inline-start"] = data["left"];
	data["margin"] = data["margin-left"];
	data["margin-inline"] = data["margin-left"];
	data["margin-inline-start"] = data["margin-left"];
	data["margin-inline-end"] = data["margin-right"];
	data["margin-block"] = data["margin-top"];
	data["margin-block-end"] = data["margin-bottom"];
	data["margin-block-start"] = data["margin-top"];
	data["max-block-size"] = data["max-height"];
	data["max-inline-size"] = data["max-width"];
	data["min-block-size"] = data["min-height"];
	data["min-inline-size"] = data["min-width"];
	data["outline"] = data["outline-width"];
	data["overflow"] = data["overflow-x"];
	data["overflow-block"] = data["overflow-y"];
	data["overflow-inline"] = data["overflow-x"];
	data["padding"] = data["padding-left"];
	data["padding-inline"] = data["padding-left"];
	data["padding-inline-end"] = data["padding-right"];
	data["padding-inline-start"] = data["padding-left"];
	data["padding-block"] = data["padding-top"];
	data["padding-block-end"] = data["padding-bottom"];
	data["padding-block-start"] = data["padding-top"];
}
