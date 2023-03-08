const nunjucks = require('nunjucks');

module.exports = {
	async renderChart(metricName, report) {
		return new Promise(async (resolve, reject) => {
			try {
				let red = report.Red || 0;
				let blue = report.Blue || 0;
				let yellow = report.Yellow || 0;
				let green = report.Green || 0;
				let purple = report.Purple || 0;
				let orange = report.Orange || 0;

				let chart = `
					{% extends "chart.html" %}
					{% block chart_metric %}
					'# of ${metricName}'
					{% endblock %}

					{% block chart_data %}
					[${red}, ${blue}, ${yellow}, ${green}, ${purple}, ${orange}]
					{% endblock %}
				`;

				resolve(nunjucks.renderString(chart, report));
			} catch(e) {
				reject(e);
			}
		})
	}
};