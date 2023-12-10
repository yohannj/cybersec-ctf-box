CREATE TABLE data
(
	color String,
	pens UInt8,
	legos UInt8,
	boxes UInt8,
	envelopes UInt8
) ENGINE = MergeTree()
ORDER BY color;
