CREATE TABLE user
(
	username String,
	password String
) ENGINE = MergeTree()
ORDER BY username;
