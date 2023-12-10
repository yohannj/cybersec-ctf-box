$(document).ready(() => {
	$('#metric_pens').on('click', () => {
		loadMetric('pens');
	});
	$('#metric_legos').on('click', () => {
		loadMetric('legos')
	});
	$('#metric_boxes').on('click', () => {
		loadMetric('boxes')
	});
	$('#metric_envelopes').on('click', () => {
		loadMetric('envelopes')
	});
});

function loadMetric(metricName) {
	window.location.href = '/?metric_name=' + metricName;
}